import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "@/api/update-todo.ts";
import type { Todo } from "@/types.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    //매개변수에 updateTodo에 전달된 매개변수가 들어온다.
    onMutate: async (updatedTodo) => {
      //queryKey 에 해당하는 key를 조회하는 요청을 모두 취소시킨다.
      //이 상황은 거의 발생되지 않을거 같긴한다.
      //사용자가 체크박스를 눌러서 캐시데이터를 업데이트하기 젆에 조회를 먼저해야하는데 조회가 그렇게 느릴리가 없기 때문이다.
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.todo.list,
      });

      const prevTodos = queryClient.getQueryData<Todo[]>(QUERY_KEYS.todo.list);

      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.map((prevTodo) => {
          return prevTodo.id === updatedTodo.id
            ? { ...prevTodo, ...updatedTodo }
            : prevTodo;
        });
      });

      return {
        prevTodos,
      };
    },
    //context 에는 위의 onMutate에서 반환된 값이 들어온다.
    onError: (error, variable, context) => {
      if (context && context.prevTodos) {
        queryClient.setQueryData<Todo[]>(
          QUERY_KEYS.todo.list,
          context.prevTodos,
        );
      }
    },
    //요청이 종료됐을 때 호출된다. success, error 보다 늦게 호출된다.
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    },
  });
}
