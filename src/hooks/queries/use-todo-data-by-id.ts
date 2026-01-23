import { useQuery } from "@tanstack/react-query";
import { fetchTodoById } from "@/api/fetch-todo-by-id.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";

export function useTodoDataById(id: string, type: "LIST" | "DETAIL") {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: QUERY_KEYS.todo.detail(id),
    staleTime: 5000, //5초 , data가 fresh 상태 일 때만 적용된다.
    enabled: type === "DETAIL", //상세 페이지에만 진입했을 경우 리페칭을 활성화 한다.
    gcTime: 5000,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    // refetchInterval: false,
    // refetchInterval: 1000, //1초
  });
}
