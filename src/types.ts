export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// 新しいTodoを作成するときの型（IDは不要）
export interface NewTodo {
  text: string;
  completed: boolean;
}
