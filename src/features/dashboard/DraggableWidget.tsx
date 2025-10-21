import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';

interface DraggableWidgetProps {
  id: string;
  isEditMode: boolean;
  index: number;
  children: React.ReactNode;
}

export const DraggableWidget = ({ id, isEditMode, index, children }: DraggableWidgetProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isDragging ? 0.5 : 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className={`relative ${isEditMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
    >
      {isEditMode && (
        <div
          {...attributes}
          {...listeners}
          className="absolute -top-2 -right-2 z-10 rounded-full bg-primary p-2 shadow-[2px_2px_0px_hsl(var(--border))] border-[1.5px] border-border cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
        >
          <GripVertical className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
      <div className={isEditMode ? 'pointer-events-none' : ''}>{children}</div>
    </motion.div>
  );
};
