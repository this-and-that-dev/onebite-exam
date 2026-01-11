import { useCountStore } from "@/store/count.ts";
import { Button } from "@/components/ui/button.tsx";

export default function CounterPage() {
  const count = useCountStore((store) => store.count);
  const increase = useCountStore((store) => store.increase);
  const decrease = useCountStore((store) => store.decrease);
  return (
    <div>
      <h1 className="text-2xl font-bold">{count}</h1>
      <Button
        onClick={() => {
          increase();
        }}
      >
        +
      </Button>
      <Button
        onClick={() => {
          decrease();
        }}
      >
        -
      </Button>
    </div>
  );
}
