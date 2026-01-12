import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useCreateTodo } from "@/store/todos.ts";
import { useState } from "react";

export default function TodoEditor() {
  const createTodo = useCreateTodo();
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
        onClick={() => {
          if (content.trim() === "") return;

          createTodo(content);
          setContent("");
        }}
      >
        추가
      </Button>
    </div>
  );
}
