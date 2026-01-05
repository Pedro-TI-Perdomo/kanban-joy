import { KanbanData } from "@/types/kanban";

export const initialKanbanData: KanbanData = {
  columns: [
    {
      id: "backlog",
      title: "Backlog",
      tasks: [
        { id: "task-1", title: "Pesquisar fornecedores", description: "Encontrar novos fornecedores de embalagens", priority: "medium", tags: ["pesquisa"] },
        { id: "task-2", title: "Atualizar estoque", description: "Verificar níveis de estoque", priority: "high", tags: ["urgente"] },
      ],
    },
    {
      id: "todo",
      title: "A Fazer",
      tasks: [
        { id: "task-3", title: "Orçamento mensal", description: "Preparar orçamento do próximo mês", priority: "high", tags: ["financeiro"] },
        { id: "task-4", title: "Reunião com equipe", description: "Alinhar metas semanais", priority: "medium", tags: ["reunião"] },
        { id: "task-5", title: "Revisar contratos", description: "Analisar termos dos contratos", priority: "low" },
      ],
    },
    {
      id: "in-progress",
      title: "Em Progresso",
      tasks: [
        { id: "task-6", title: "Novo sistema de pedidos", description: "Implementar melhorias no sistema", priority: "high", tags: ["dev", "prioridade"] },
        { id: "task-7", title: "Treinamento da equipe", description: "Capacitação em novos processos", priority: "medium" },
      ],
    },
    {
      id: "review",
      title: "Revisão",
      tasks: [
        { id: "task-8", title: "Relatório semanal", description: "Revisar dados de vendas", priority: "medium", tags: ["relatório"] },
      ],
    },
    {
      id: "done",
      title: "Concluído",
      tasks: [
        { id: "task-9", title: "Setup do projeto", description: "Configuração inicial completa", priority: "low", tags: ["setup"] },
        { id: "task-10", title: "Design do sistema", description: "Interface aprovada", priority: "medium", tags: ["design"] },
      ],
    },
  ],
};
