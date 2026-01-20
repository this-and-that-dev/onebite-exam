import type { Todo } from "@/types.ts";
import { API_URL } from "@/lib/constants.ts";

//& {id : string} 을 선언 함으로써 Partial 에서 부족한 부분을 메울수있다.
//Partial 을 감싸면 내부의 필드들이 선택적 필드가 되버리는데 id는 필수라서 필수로 만들기 위해 &(교집합) 을 활용한다.
export async function updateTodo(todo: Partial<Todo> & { id: string }) {
  const response = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: "PATCH",
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Update Todo Failed");
  }

  const data: Todo = await response.json();
  return data;
}
