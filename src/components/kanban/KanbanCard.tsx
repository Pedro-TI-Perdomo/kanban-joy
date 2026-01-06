import { Draggable } from "@hello-pangea/dnd";
import { Task } from "@/types/kanban";
import { Calendar } from "lucide-react";

interface KanbanCardProps {
  task: Task;
  index: number;
  onEdit?: (task: Task) => void;
}

const priorityColors = {
  low: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  high: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

const priorityLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
};

export function KanbanCard({ task, index, onEdit }: KanbanCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Só abre o modal se não estiver arrastando
    if (onEdit && !e.defaultPrevented) {
      onEdit(task);
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleClick}
          className={`
            group p-4 rounded-lg bg-kanban-card border border-border/50
            hover:bg-kanban-card-hover hover:border-accent/30
            transition-all duration-200 cursor-grab active:cursor-grabbing
            ${snapshot.isDragging ? "shadow-xl ring-2 ring-accent/50 rotate-2 scale-105" : ""}
          `}
        >
          <h4 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
            {task.title}
          </h4>

          <div className="flex items-center justify-between gap-2">
            {task.priority && (
              <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
                {priorityLabels[task.priority]}
              </span>
            )}
          </div>

          {task.dueDate && (
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{task.dueDate}</span>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
