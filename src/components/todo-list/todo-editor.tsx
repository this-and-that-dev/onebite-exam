import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { useCreateTodoMutation } from "@/hooks/mutations/use-create-todo-mutation.ts";

export default function TodoEditor() {
  const { mutate, isPending } = useCreateTodoMutation();
  const [content, setContent] = useState("");

  return (
    <div className="flex gap-2">
      <Input
        placeholder="새로운 할일을 입력하세요 ..."
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <Button
        disabled={isPending}
        onClick={() => {
          if (content.trim() === "") return;
          mutate(content);
          setContent("");
        }}
      >
        추가
      </Button>
    </div>
  );
}
