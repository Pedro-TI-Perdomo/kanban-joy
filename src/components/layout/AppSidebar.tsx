import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  BarChart3,
  FileText,
  Calendar,
  ChevronLeft,
  X,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Compras", url: "/kanban", icon: ShoppingCart },
  { title: "Produtos", url: "/produtos", icon: Package },
  { title: "Clientes", url: "/clientes", icon: Users },
  { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
  { title: "Documentos", url: "/documentos", icon: FileText },
  { title: "Calendário", url: "/calendario", icon: Calendar },
];

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export function AppSidebar({ isOpen, onClose, onToggle }: AppSidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Overlay para fechar ao clicar fora */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:bg-transparent"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-[57px] left-0 h-[calc(100vh-57px)] bg-sidebar border-r border-sidebar-border z-50 flex flex-col transition-all duration-300",
          isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full md:w-0 md:translate-x-0"
        )}
      >
        {/* Header do Sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <span className={cn("font-semibold text-sidebar-foreground transition-opacity", !isOpen && "opacity-0")}>
            Menu
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={onToggle}
          >
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className={cn("flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden", !isOpen && "hidden")}>
          {menuItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              )}
              activeClassName="bg-sidebar-accent text-sidebar-primary"
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="whitespace-nowrap">{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Settings at bottom */}
        <div className={cn("p-3 border-t border-sidebar-border", !isOpen && "hidden")}>
          <NavLink
            to="/configuracoes"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            )}
            activeClassName="bg-sidebar-accent text-sidebar-primary"
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            <span className="whitespace-nowrap">Configurações</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}