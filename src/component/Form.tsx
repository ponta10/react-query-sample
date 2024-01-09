import React, { FormEvent, useState } from "react";
import { NewTodo } from "@/types";

interface FormProps {
  onAddTodo: (todo: NewTodo) => void;
}

export const Form: React.FC<FormProps> = ({ onAddTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    onAddTodo({ text: newTodoTitle, completed: false });
    setNewTodoTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        placeholder="Add new todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};
