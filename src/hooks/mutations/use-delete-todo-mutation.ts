import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "@/api/delete-todo.ts";
import type { Todo } from "@/types.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";

export default function useDeleteTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    //매개변수에는 deleteTodo 함수에 넘어온 값이 들어온다.
    // onMutate: (id) => {
    //   queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
    //     if (!prevTodos) return [];
    //     return prevTodos.filter((prevTodo) => {
    //       return prevTodo.id !== id;
    //     });
    //   });
    // },
    onSuccess: (deletedTodo) => {
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.filter((prevTodo) => {
          return prevTodo.id !== deletedTodo.id;
        });
      });
    },
  });
}
