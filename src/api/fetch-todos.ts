import { API_URL } from "@/lib/constants.ts";
import type { Todo } from "@/types.ts";

export async function fetchTodos() {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) {
    throw new Error("Fetch Faild");
  }

  const data: Todo[] = await response.json();
  return data;
}
