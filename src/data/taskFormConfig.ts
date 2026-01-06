import { FormConfig } from "@/types/formConfig";

export const taskFormConfig: FormConfig = {
  formId: "task-form",
  title: "Nova Tarefa",
  submitLabel: "Criar Tarefa",
  cancelLabel: "Cancelar",
  fields: [
    {
      id: "title",
      label: "Título",
      type: "text",
      order: 1,
      required: true,
      placeholder: "Digite o título da tarefa",
    },
    {
      id: "description",
      label: "Descrição",
      type: "textarea",
      order: 2,
      required: false,
      placeholder: "Descreva a tarefa...",
    },
    {
      id: "priority",
      label: "Prioridade",
      type: "select",
      order: 3,
      required: true,
      options: [
        { value: "low", label: "Baixa" },
        { value: "medium", label: "Média" },
        { value: "high", label: "Alta" },
      ],
      defaultValue: "medium",
    },
    {
      id: "dueDate",
      label: "Data de Vencimento",
      type: "date",
      order: 4,
      required: false,
    },
    {
      id: "estimatedHours",
      label: "Horas Estimadas",
      type: "number",
      order: 5,
      required: false,
      placeholder: "Ex: 4",
      min: 0,
      max: 100,
    },
    {
      id: "urgent",
      label: "Marcar como urgente",
      type: "checkbox",
      order: 6,
      required: false,
      defaultValue: false,
    },
  ],
};
