import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "@/api/create-todo.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient(); //useQuery 를 사용하는 모든 데이터를 보관하는 저장소

  return useMutation({
    mutationFn: createTodo,
    //요청이 시작했을 때 이벤트
    onMutate: () => {},
    //요청이 종료됐을 때 이벤트
    onSettled: () => {},
    //요청이 성공했을 때 이벤트
    onSuccess: async () => {
      //캐시 무효화
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    },
    //요청이 에러났을 때 이벤트
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
