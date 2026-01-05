import { LayoutGrid, List, Calendar, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: "quadro", label: "Quadro", icon: LayoutGrid },
  { id: "lista", label: "Lista", icon: List },
  { id: "calendario", label: "Calendário", icon: Calendar },
  { id: "tickets", label: "Todos os tickets", icon: Ticket },
];

interface TabNavProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <nav className="flex items-center gap-1 px-6 py-3 border-b border-border/30">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
