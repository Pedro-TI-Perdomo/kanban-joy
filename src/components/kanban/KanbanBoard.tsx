import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { KanbanColumn } from "./KanbanColumn";
import { DynamicFormModal } from "./DynamicFormModal";
import { initialKanbanData } from "@/data/initialData";
import { taskFormConfig } from "@/data/taskFormConfig";
import { Column, Task } from "@/types/kanban";
import { useToast } from "@/hooks/use-toast";

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialKanbanData.columns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const { toast } = useToast();

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

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

  const handleOpenCreateModal = (columnId: string) => {
    setActiveColumnId(columnId);
    setEditingTask(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveColumnId(null);
    setEditingTask(null);
  };

  const handleCreateTask = (formData: Record<string, unknown>) => {
    if (!activeColumnId) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: (formData.title as string) || "Nova tarefa",
      description: (formData.description as string) || "",
      priority: (formData.priority as "low" | "medium" | "high") || "medium",
      dueDate: formData.dueDate as string | undefined,
      tags: formData.urgent ? ["Urgente"] : undefined,
    };

    const newColumns = columns.map((col) =>
      col.id === activeColumnId ? { ...col, tasks: [...col.tasks, newTask] } : col
    );
    setColumns(newColumns);

    toast({
      title: "Tarefa criada",
      description: `"${newTask.title}" adicionada com sucesso`,
    });
  };

  const handleEditTask = (formData: Record<string, unknown>) => {
    if (!editingTask) return;

    const updatedTask: Task = {
      ...editingTask,
      title: (formData.title as string) || editingTask.title,
      description: (formData.description as string) || "",
      priority: (formData.priority as "low" | "medium" | "high") || editingTask.priority,
      dueDate: formData.dueDate as string | undefined,
      tags: formData.urgent ? ["Urgente"] : undefined,
    };

    const newColumns = columns.map((col) => ({
      ...col,
      tasks: col.tasks.map((task) =>
        task.id === editingTask.id ? updatedTask : task
      ),
    }));
    setColumns(newColumns);

    toast({
      title: "Tarefa atualizada",
      description: `"${updatedTask.title}" foi atualizada`,
    });
  };

  const handleSubmit = (formData: Record<string, unknown>) => {
    if (modalMode === "edit") {
      handleEditTask(formData);
    } else {
      handleCreateTask(formData);
    }
  };

  // Prepara os dados iniciais para o modal de edição
  const getInitialData = (): Record<string, unknown> | undefined => {
    if (modalMode === "edit" && editingTask) {
      return {
        title: editingTask.title,
        description: editingTask.description || "",
        priority: editingTask.priority || "medium",
        dueDate: editingTask.dueDate || "",
        urgent: editingTask.tags?.includes("Urgente") || false,
      };
    }
    return undefined;
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onAddTask={handleOpenCreateModal}
              onEditTask={handleOpenEditModal}
            />
          ))}
        </div>
      </DragDropContext>

      <DynamicFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        config={taskFormConfig}
        initialData={getInitialData()}
        mode={modalMode}
      />
    </>
  );
}
