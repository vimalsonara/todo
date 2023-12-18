import { Trash2 } from "lucide-react";
import { useState } from "react";

interface TodoItemProps {
  title: string;
  description: string;
  id: number;
  completed: boolean;
  onDelete: (id: number) => void;
  updateStatus: (id: number, completed: boolean) => void;
}

function TodoItem({
  title,
  description,
  id,
  onDelete,
  completed,
  updateStatus,
}: TodoItemProps) {
  const handleCheckboxClick = () => {
    updateStatus(id, !completed);
  };

  const handleDelete = () => {
    onDelete(id);
  };
  console.log(completed);
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
          checked={completed}
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
