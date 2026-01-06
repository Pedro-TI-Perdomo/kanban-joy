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
    <nav className="flex items-center gap-1 px-6 pt-1 border-b-2 border-white">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200",
              isActive
                ? "border-b-4 border-white"
                : "border-b-4 border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50"
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
