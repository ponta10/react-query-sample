import { NewTodo, Todo } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function fetchTodos() {
  const { data } = await axios.get("/api/todos");
  return data;
}

async function addTodo(newTodo: NewTodo) {
  const { data } = await axios.post("/api/todos", newTodo);
  return data;
}

async function updateTodo(todo: Todo) {
  const { data } = await axios.put(`/api/todos/${todo.id}`, todo);
  return data;
}

async function deleteTodo(todoId: number) {
  await axios.delete(`/api/todos/${todoId}`);
  return todoId;
}

export function useTodo() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  return {
    data,
    isLoading,
    error,
    addMutation,
    updateMutation,
    deleteMutation,
  };
}
