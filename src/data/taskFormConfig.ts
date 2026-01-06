import { FormConfig } from "@/types/formConfig";

export const taskFormConfig: FormConfig = {
  title: "Nova Tarefa",
  submitLabel: "Criar Tarefa",
  cancelLabel: "Cancelar",
  fields: [
    {
      id: "title",
      label: "Título",
      type: "text",
      required: true,
      placeholder: "Digite o título da tarefa",
    },
    {
      id: "description",
      label: "Descrição",
      type: "textarea",
      required: false,
      placeholder: "Descreva a tarefa...",
    },
    {
      id: "priority",
      label: "Prioridade",
      type: "select",
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
      required: false,
    },
    {
      id: "estimatedHours",
      label: "Horas Estimadas",
      type: "number",
      required: false,
      placeholder: "Ex: 4",
      min: 0,
      max: 100,
    },
    {
      id: "urgent",
      label: "Marcar como urgente",
      type: "checkbox",
      required: false,
      defaultValue: false,
    },
  ],
};
