import { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { TabNav } from "@/components/layout/TabNav";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";

const Index = () => {
  const [activeTab, setActiveTab] = useState("quadro");

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header 
          title="Compras" 
          subtitle="Gerencie suas atividades de compras"
        />
        
        <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 p-6 overflow-hidden">
          {activeTab === "quadro" && <KanbanBoard />}
          
          {activeTab === "lista" && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Visualização em lista em breve...
            </div>
          )}
          
          {activeTab === "calendario" && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Visualização de calendário em breve...
            </div>
          )}
          
          {activeTab === "tickets" && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Todos os tickets em breve...
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
