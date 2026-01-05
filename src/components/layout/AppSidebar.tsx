import { useState } from "react";
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
  ChevronRight,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Compras", url: "/compras", icon: ShoppingCart },
  { title: "Produtos", url: "/produtos", icon: Package },
  { title: "Clientes", url: "/clientes", icon: Users },
  { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
  { title: "Documentos", url: "/documentos", icon: FileText },
  { title: "Calendário", url: "/calendario", icon: Calendar },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2 animate-slide-in">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <div>
              <h1 className="font-bold text-primary text-lg leading-none">Perdomo</h1>
              <span className="text-xs text-muted-foreground">DOCES</span>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                collapsed && "justify-center px-2"
              )}
              activeClassName="bg-sidebar-accent text-sidebar-primary"
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="animate-slide-in">{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Settings at bottom */}
      <div className="p-3 border-t border-sidebar-border">
        <NavLink
          to="/configuracoes"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
            "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed && "justify-center px-2"
          )}
          activeClassName="bg-sidebar-accent text-sidebar-primary"
        >
          <Settings className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Configurações</span>}
        </NavLink>
      </div>
    </aside>
  );
}
