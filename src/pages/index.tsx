import { fetchTodos, useTodo } from "@/hooks/useTodo";
import { useQuery } from "@tanstack/react-query";
import { Form } from "@/component/Form";
import { NewTodo, Todo } from "@/types";

interface HomeProps {
  initialTodos: Todo[];
}

export async function getServerSideProps() {
  const todos = await fetchTodos();
  return { props: { initialTodos: todos } };
}

export default function Home({ initialTodos }: HomeProps) {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    initialData: initialTodos,
  });

  const { addMutation } = useTodo();

  const handleAddTodo = async (newTodo: NewTodo) => {
    addMutation.mutate(newTodo);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;

  return (
    <div>
      <Form onAddTodo={handleAddTodo} />
      {todos.map((todo: Todo) => (
        <p key={todo.id}>{todo.text}</p>
      ))}
    </div>
  );
}
