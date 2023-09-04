import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface TodoItemProps {
  title: string;
  description: string;
}

function TodoItem({ title, description }: TodoItemProps) {
  return (
    <div className="max-w-2xl flex justify-between items-center border p-2 rounded">
      <div>
        <div className="text-white">{title}</div>
        <div className="text-white">{description}</div>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox className="bg-white" />
        <Button variant={'destructive'}>Delete</Button>
      </div>
    </div>
  );
}

export default TodoItem;
