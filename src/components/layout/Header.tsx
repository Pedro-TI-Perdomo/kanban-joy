import { Search, Filter, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-2 border-b border-border/50">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <span className="text-accent">📦</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar card"
            className="w-64 pl-10 bg-secondary/50 border-border/50 focus:border-accent"
          />
        </div>

        {/* Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtro
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Todos</DropdownMenuItem>
            <DropdownMenuItem>Prioridade Alta</DropdownMenuItem>
            <DropdownMenuItem>Prioridade Média</DropdownMenuItem>
            <DropdownMenuItem>Prioridade Baixa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User */}
        <div className="flex items-center gap-3 pl-4 border-l border-border/50">
          <Avatar className="h-9 w-9 border-2 border-accent/30">
            <AvatarFallback className="bg-accent text-accent-foreground font-medium">
              U
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">Usuário</span>
        </div>
      </div>
    </header>
  );
}
