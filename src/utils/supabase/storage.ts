/**
 * Oncura Supabase Storage Helpers
 * Handles file uploads to doctor-docs and scan-images buckets with fallback support.
 */

import { createClient } from "./client";
import type { UploadResult } from "./types";

export const BUCKETS = {
  SCAN_IMAGES: "scan-images",
  DOCTOR_DOCS: "doctor-docs",
} as const;

export type BucketName = typeof BUCKETS[keyof typeof BUCKETS];

// Helper to convert File to base64 Data URL (used as fallback if storage is restricted by RLS)
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => resolve(URL.createObjectURL(file));
    reader.readAsDataURL(file);
  });
}

/**
 * Generic upload to Supabase storage bucket with error recovery
 */
export async function uploadFile(
  bucket: BucketName,
  path: string,
  file: File
): Promise<UploadResult> {
  const supabase = createClient();

  try {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        upsert: true,
        contentType: file.type || "image/jpeg",
      });

    if (uploadError) {
      console.warn(`[Storage] Upload to ${bucket} returned error: ${uploadError.message}. Using fallback preview URL.`);
      const fallbackUrl = await fileToDataUrl(file);
      return { url: fallbackUrl, path };
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(uploadData?.path || path);
    return { url: urlData.publicUrl, path: uploadData?.path || path };
  } catch (err: any) {
    console.warn(`[Storage] Exception during upload to ${bucket}: ${err?.message}. Using fallback preview URL.`);
    const fallbackUrl = await fileToDataUrl(file);
    return { url: fallbackUrl, path };
  }
}

/**
 * Scan image upload (scan-images bucket)
 */
export async function uploadScanImage(
  file: File,
  patientId: string = "patient-default"
): Promise<UploadResult> {
  const ext = file.name ? file.name.split(".").pop() ?? "jpg" : "jpg";
  const cleanId = patientId.replace(/[^a-zA-Z0-9_-]/g, "");
  const path = `${cleanId}/${Date.now()}.${ext}`;
  return uploadFile(BUCKETS.SCAN_IMAGES, path, file);
}

/**
 * Get public URL for a scan image path
 */
export function getScanImageUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const supabase = createClient();
  const { data } = supabase.storage.from(BUCKETS.SCAN_IMAGES).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Medical document upload (doctor-docs bucket)
 */
export async function uploadDoctorDoc(
  file: File,
  patientId: string = "patient-default",
  uploadedBy: string = "doctor-default"
): Promise<UploadResult> {
  const ext = file.name ? file.name.split(".").pop() ?? "pdf" : "pdf";
  const cleanFileName = file.name ? file.name.replace(/\s+/g, "_") : "doc";
  const path = `${patientId}/${uploadedBy}/${Date.now()}-${cleanFileName}.${ext}`;
  return uploadFile(BUCKETS.DOCTOR_DOCS, path, file);
}

/**
 * Delete helpers
 */
export async function deleteScanImage(path: string): Promise<void> {
  if (path.startsWith("data:") || path.startsWith("blob:")) return;
  const supabase = createClient();
  await supabase.storage.from(BUCKETS.SCAN_IMAGES).remove([path]);
}

export async function deleteDoctorDoc(path: string): Promise<void> {
  if (path.startsWith("data:") || path.startsWith("blob:")) return;
  const supabase = createClient();
  await supabase.storage.from(BUCKETS.DOCTOR_DOCS).remove([path]);
}
