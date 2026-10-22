import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read .env.local
const envFile = fs.readFileSync(path.resolve(__dirname, "../.env.local"), "utf8");
const env = {};
for (const line of envFile.split("\n")) {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = (match[2] || "").trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[match[1]] = value;
  }
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("==================================================");
console.log("   SUPABASE FULL DIAGNOSTIC TEST SUITE");
console.log("==================================================");
console.log("Supabase URL        :", supabaseUrl);
console.log("Client Key Prefix   :", supabaseKey ? supabaseKey.substring(0, 16) + "..." : "MISSING");
console.log("Client Key Type     : Publishable (anon)");

const supabase = createClient(supabaseUrl, supabaseKey);

// Target tables requested by user with their verified live schema
const tablesConfig = [
  {
    name: "profiles",
    columns: ["id", "created_at", "full_name", "email", "role"],
    writePayload: {
      id: "00000000-0000-0000-0000-000000000001",
      full_name: "Diagnostic Test User",
      email: "diagnostic@example.com",
      role: "patient"
    }
  },
  {
    name: "doctors",
    columns: ["id", "created_at", "specialization", "experience_years", "age"],
    writePayload: {
      specialization: "Dermatologist",
      experience_years: 10,
      age: 40
    }
  },
  {
    name: "patients",
    columns: ["id", "created_at", "age"],
    writePayload: {
      age: 28
    }
  },
  {
    name: "scans",
    columns: ["id", "patient_id", "image_url", "confidence_score", "doctor_notes"],
    writePayload: {
      image_url: "https://example.com/test-scan.jpg",
      confidence_score: 94.5,
      doctor_notes: "Automated diagnostic test note"
    }
  },
  {
    name: "appointments",
    columns: ["id", "patient_id", "doctor_id", "status", "notes", "scheduled_at", "created_at"],
    writePayload: {
      notes: "Diagnostic routine appointment test",
      scheduled_at: new Date(Date.now() + 86400000).toISOString()
    }
  },
  {
    name: "messages",
    columns: ["id", "sender_id", "receiver_id", "message_text", "sent_at"],
    writePayload: {
      message_text: "Diagnostic test message between clients",
      sent_at: new Date().toISOString()
    }
  }
];

async function runDiagnostics() {
  const summary = {
    clientConnection: false,
    timestamp: new Date().toISOString(),
    supabaseUrl,
    tables: {},
    storage: {}
  };

  // 1. Verify Client Connection
  console.log("\n[1/3] VERIFYING SUPABASE CLIENT CONNECTIVITY...");
  try {
    const { status, error } = await supabase.from("profiles").select("id").limit(1);
    if (!error || status === 200 || error.code === "42501" || status < 500) {
      summary.clientConnection = true;
      console.log("   Client Connection : SUCCESS (Connected to endpoint)");
    } else {
      console.log("   Client Connection : FAILED -", error?.message);
    }
  } catch (e) {
    console.log("   Client Connection : EXCEPTION -", e.message);
  }

  // 2. Test Tables (Read and Write)
  console.log("\n[2/3] TESTING TABLES (READ & WRITE QUERIES)...");
  for (const t of tablesConfig) {
    const tableResult = {
      table: t.name,
      verifiedColumns: t.columns,
      read: { status: null, success: false, rowCount: 0, error: null },
      write: { status: null, success: false, error: null, reason: null }
    };

    // Read Query
    try {
      const { data, error, status, count } = await supabase
        .from(t.name)
        .select(t.columns.join(", "), { count: "exact" })
        .limit(5);

      tableResult.read.status = status;
      if (error) {
        tableResult.read.error = error.message;
        tableResult.read.code = error.code;
      } else {
        tableResult.read.success = true;
        tableResult.read.rowCount = count ?? (data ? data.length : 0);
      }
    } catch (err) {
      tableResult.read.error = err.message;
    }

    // Write Query
    try {
      const { data, error, status } = await supabase
        .from(t.name)
        .insert(t.writePayload)
        .select();

      tableResult.write.status = status;
      if (error) {
        tableResult.write.error = error.message;
        tableResult.write.code = error.code;
        if (error.code === "42501" || error.message?.includes("row-level security")) {
          tableResult.write.reason = "Blocked by Row-Level Security (RLS) policy (anon client unauthenticated)";
        } else {
          tableResult.write.reason = error.message;
        }
      } else {
        tableResult.write.success = true;
        // Clean up
        if (data && data[0] && data[0].id) {
          await supabase.from(t.name).delete().eq("id", data[0].id);
        }
      }
    } catch (err) {
      tableResult.write.error = err.message;
    }

    summary.tables[t.name] = tableResult;
    console.log(`\n - Table '${t.name}':`);
    console.log(`   Columns : ${t.columns.join(", ")}`);
    console.log(`   Read    : ${tableResult.read.success ? `PASS (HTTP ${tableResult.read.status}, ${tableResult.read.rowCount} rows)` : `FAIL (${tableResult.read.error})`}`);
    console.log(`   Write   : ${tableResult.write.success ? "PASS" : `FAIL (HTTP ${tableResult.write.status} - ${tableResult.write.reason || tableResult.write.error})`}`);
  }

  // 3. Test Storage Bucket (scan-images)
  console.log("\n[3/3] TESTING STORAGE (scan-images bucket)...");
  const storageResult = {
    bucket: "scan-images",
    bucketExists: false,
    list: { success: false, error: null },
    upload: { success: false, error: null },
    publicUrl: null
  };

  try {
    const { data: bucketData, error: bucketErr } = await supabase.storage.getBucket("scan-images");
    if (!bucketErr && bucketData) {
      storageResult.bucketExists = true;
    }

    // Attempt list
    const { data: listData, error: listErr } = await supabase.storage.from("scan-images").list("", { limit: 5 });
    if (listErr) {
      storageResult.list.error = listErr.message;
    } else {
      storageResult.list.success = true;
    }

    // Attempt upload test file
    const testFileName = `diagnostic-${Date.now()}.txt`;
    const testBuffer = Buffer.from("Supabase scan-images diagnostic test payload");
    const { data: uploadData, error: uploadErr } = await supabase.storage
      .from("scan-images")
      .upload(testFileName, testBuffer, { contentType: "text/plain", upsert: true });

    if (uploadErr) {
      storageResult.upload.error = uploadErr.message;
    } else {
      storageResult.upload.success = true;
      const { data: urlData } = supabase.storage.from("scan-images").getPublicUrl(testFileName);
      storageResult.publicUrl = urlData?.publicUrl;
      // Clean up
      await supabase.storage.from("scan-images").remove([testFileName]);
    }
  } catch (err) {
    storageResult.upload.error = err.message;
  }

  summary.storage["scan-images"] = storageResult;
  console.log(`   Bucket Exists : ${storageResult.bucketExists ? "YES" : "NO (NoSuchBucket)"}`);
  console.log(`   List Files    : ${storageResult.list.success ? "PASS" : `FAIL (${storageResult.list.error})`}`);
  console.log(`   Upload Test   : ${storageResult.upload.success ? "PASS" : `FAIL (${storageResult.upload.error})`}`);

  fs.writeFileSync(path.resolve(__dirname, "../diagnostic_result.json"), JSON.stringify(summary, null, 2));
  console.log("\n==================================================");
  console.log(" Diagnostic complete. Results saved to diagnostic_result.json");
  console.log("==================================================");
}

runDiagnostics().catch(console.error);
