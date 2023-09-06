import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
interface TodoItemProps {
  title: string;
  description: string;
  id: string;
  onDelete: (id: string) => void;
}

function TodoItem({ title, description, id, onDelete }: TodoItemProps) {
  async function handleDelete() {
    try {
      await onDelete(id);
    } catch (error) {
      console.error(error, 'todo error');
    }
  }

  return (
    <div className="min-w-[500px] flex justify-between items-center border p-2 rounded hover:ring-2 hover:ring-blue-500 hover:border-none ">
      <div>
        <div className="font-bold text-white">{title}</div>
        <div className="text-white">{description}</div>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox className="bg-white" />
        <Trash2
          color="red"
          className="hover:cursor-pointer"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}

export default TodoItem;
