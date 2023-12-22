import { todos } from '@/data/data';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const todoIndex = todos.findIndex(todo => todo.id === Number(id));

  if (todoIndex === -1) {
    res.status(404).end('Todo not found');
    return;
  }

  if (req.method === 'PUT') {
    const updatedTodo = { ...todos[todoIndex], ...req.body };
    todos[todoIndex] = updatedTodo;
    res.status(200).json(updatedTodo);
  } else if (req.method === 'DELETE') {
    todos.splice(todoIndex, 1);
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
