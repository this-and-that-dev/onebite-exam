import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutation.ts";
import useDeleteTodoMutation from "@/hooks/mutations/use-delete-todo-mutation.ts";
import { useTodoDataById } from "@/hooks/queries/use-todo-data-by-id.ts";

export default function TodoItem({ id }: { id: string }) {
  const { data: todo } = useTodoDataById(id, "LIST");

  if (!todo) {
    throw new Error("Todo data Undefined");
  }

  const { content, isDone } = todo;

  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo, isPending: isDeleteTodoPending } =
    useDeleteTodoMutation();

  const handleButtonClick = () => {
    deleteTodo(id);
  };

  const handleCheckboxClick = () => {
    updateTodo({
      id,
      isDone: !isDone,
    });
  };

  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <input
          type="checkbox"
          checked={isDone}
          onClick={handleCheckboxClick}
          disabled={isDeleteTodoPending}
        />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      <Button
        variant="destructive"
        onClick={handleButtonClick}
        disabled={isDeleteTodoPending}
      >
        삭제
      </Button>
    </div>
  );
}
