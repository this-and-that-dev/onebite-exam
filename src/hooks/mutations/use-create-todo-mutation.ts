import { useMutation } from "@tanstack/react-query";
import { createTodo } from "@/api/create-todo.ts";

export function useCreateTodoMutation() {
  return useMutation({
    mutationFn: createTodo,
    //요청이 시작했을 때 이벤트
    onMutate: () => {},
    //요청이 종료됐을 때 이벤트
    onSettled: () => {},
    //요청이 성공했을 때 이벤트
    onSuccess: () => {
      window.location.reload();
    },
    //요청이 에러났을 때 이벤트
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
