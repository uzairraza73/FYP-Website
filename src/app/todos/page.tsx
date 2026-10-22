import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function TodosPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos, error } = await supabase.from("todos").select();

  return (
    <main className="min-h-screen p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase Todos Test</h1>
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
          Error: {error.message}
        </div>
      )}
      <ul className="list-disc pl-5 space-y-2">
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
      {todos && todos.length === 0 && (
        <p className="text-gray-500">No todos found in Supabase.</p>
      )}
    </main>
  );
}
