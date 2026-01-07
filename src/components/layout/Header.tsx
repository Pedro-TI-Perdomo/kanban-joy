import { Search, Filter, ChevronDown, Menu, PanelLeftClose, PanelLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

export function Header({ title, subtitle, onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border/50 bg-sidebar">
      {/* Left: Brand + Mobile Menu */}
      <div className="flex items-center gap-3">
        {/* Menu Toggle Button - visível em todas as telas */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
        >
          <PanelLeft className="h-5 w-5" />
        </Button>

        {/* Brand */}
        <div className="flex items-center gap-2">
          <img src="/Images/Logo/logo-perdomo.png" className="h-8" alt="Logo" />
        </div>

        {/* Desktop: Page Title */}
        <div className="hidden md:flex items-center gap-3 ml-4 pl-4 border-l border-border/50">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <span className="text-accent">📦</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Right: Search + Filter + User */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search - Hidden on mobile */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar card"
            className="w-64 pl-10 bg-secondary/50 border-border/50 focus:border-accent"
          />
        </div>

        {/* Search icon for mobile */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-5 w-5 text-muted-foreground" />
        </Button>

        {/* Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filtro</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-popover border border-border z-50">
            <DropdownMenuItem>Todos</DropdownMenuItem>
            <DropdownMenuItem>Prioridade Alta</DropdownMenuItem>
            <DropdownMenuItem>Prioridade Média</DropdownMenuItem>
            <DropdownMenuItem>Prioridade Baixa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8 border-2 border-accent/30">
                <AvatarFallback className="bg-accent text-accent-foreground font-medium text-sm">
                  U
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm font-medium text-foreground">Usuário</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-popover border border-border z-50">
            <DropdownMenuItem>Meu Perfil</DropdownMenuItem>
            <DropdownMenuItem>Preferências</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}