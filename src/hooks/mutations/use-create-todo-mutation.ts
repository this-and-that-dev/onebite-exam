import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "@/api/create-todo.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import type { Todo } from "@/types.ts";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient(); //useQuery 를 사용하는 모든 데이터를 보관하는 저장소

  return useMutation({
    mutationFn: createTodo,
    //요청이 시작했을 때 이벤트
    onMutate: () => {},
    //요청이 종료됐을 때 이벤트
    onSettled: () => {},
    //요청이 성공했을 때 이벤트
    //매개변수로 createTodo 의 반환값이 들어온다.
    onSuccess: async (newTodo) => {
      //prevTodos 는 키값에 저장된 데이터가 들어있다.
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          if (!prevTodoIds) return [newTodo.id];
          return [...prevTodoIds, newTodo.id];
        },
      );

      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(newTodo.id),
        newTodo,
      );

      //캐시 무효화
      // await queryClient.invalidateQueries({
      //   queryKey: QUERY_KEYS.todo.list,
      // });
    },
    //요청이 에러났을 때 이벤트
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
