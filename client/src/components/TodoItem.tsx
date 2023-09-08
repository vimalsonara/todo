import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface TodoItemProps {
  title: string;
  description: string;
  id: string;
  onDelete: (id: string) => void;
  updateStatus: (id: string, completed: boolean) => void;
}

function TodoItem({
  title,
  description,
  id,
  onDelete,
  updateStatus,
}: TodoItemProps) {
  const [isCompleted, setIsCompleted] = useState(false); // Initialize with false

  const handleCheckboxClick = () => {
    const updatedCompleted = !isCompleted;
    setIsCompleted(updatedCompleted);

    updateStatus(id, updatedCompleted);
  };

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
        <input
          type="checkbox"
          className="bg-white"
          checked={isCompleted}
          onChange={handleCheckboxClick}
        />
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
