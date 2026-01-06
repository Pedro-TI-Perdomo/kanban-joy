import { Droppable } from "@hello-pangea/dnd";
import { Column } from "@/types/kanban";
import { KanbanCard } from "./KanbanCard";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KanbanColumnProps {
  column: Column;
  onAddTask?: (columnId: string) => void;
}

export function KanbanColumn({ column, onAddTask }: KanbanColumnProps) {
  return (
    <div className="flex flex-col w-72 min-w-72 bg-kanban-column rounded-xl border border-border/50 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">{column.title}</h3>
          <span className="flex items-center justify-center w-6 h-6 text-xs font-medium bg-accent/20 text-accent rounded-full">
            {column.tasks.length}
          </span>
        </div>
      </div>

      {/* Cards container */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex-1 p-3 space-y-3 overflow-y-auto scrollbar-thin min-h-[200px] max-h-[calc(100vh-300px)]
              transition-colors duration-200
              ${snapshot.isDraggingOver ? "bg-accent/5" : ""}
            `}
          >
            {column.tasks.map((task, index) => (
              <KanbanCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Add button */}
      <div className="p-3 border-t border-border/50">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          onClick={() => onAddTask?.(column.id)}
        >
          <Plus className="w-4 h-4" />
          Criar
        </Button>
      </div>
    </div>
  );
}
