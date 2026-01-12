import { Button } from "@/components/ui/button.tsx";
import type { Todo } from "@/types.ts";
import { useDeleteTodo } from "@/store/todos.ts";

export default function TodoItem({ id, content }: Todo) {
  const deleteTodo = useDeleteTodo();

  return (
    <div className="flex items-center justify-between border p-2">
      {content}
      <Button
        variant="destructive"
        onClick={() => {
          deleteTodo(id);
        }}
      >
        삭제
      </Button>
    </div>
  );
}
