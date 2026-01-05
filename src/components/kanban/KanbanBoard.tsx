import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { KanbanColumn } from "./KanbanColumn";
import { initialKanbanData } from "@/data/initialData";
import { Column, Task } from "@/types/kanban";
import { useToast } from "@/hooks/use-toast";

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialKanbanData.columns);
  const { toast } = useToast();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Dropped outside
    if (!destination) return;

    // Same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destColumn = columns.find((col) => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    // Same column reorder
    if (sourceColumn.id === destColumn.id) {
      const newTasks = Array.from(sourceColumn.tasks);
      const [movedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, movedTask);

      const newColumns = columns.map((col) =>
        col.id === sourceColumn.id ? { ...col, tasks: newTasks } : col
      );
      setColumns(newColumns);
    } else {
      // Different column
      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, movedTask);

      const newColumns = columns.map((col) => {
        if (col.id === sourceColumn.id) return { ...col, tasks: sourceTasks };
        if (col.id === destColumn.id) return { ...col, tasks: destTasks };
        return col;
      });
      setColumns(newColumns);

      toast({
        title: "Tarefa movida",
        description: `"${movedTask.title}" movida para ${destColumn.title}`,
      });
    }
  };

  const handleAddTask = (columnId: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: "Nova tarefa",
      description: "Clique para editar",
      priority: "medium",
    };

    const newColumns = columns.map((col) =>
      col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
    );
    setColumns(newColumns);

    toast({
      title: "Tarefa criada",
      description: "Nova tarefa adicionada com sucesso",
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onAddTask={handleAddTask}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
