import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

export default function TodoEditor() {
  return (
    <div className="flex gap-2">
      <Input placeholder="새로운 할일을 입력하세요 ..." />
      <Button>추가</Button>
    </div>
  );
}
