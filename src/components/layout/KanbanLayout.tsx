import { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const KabanLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev);
  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header title="Compras" onMenuClick={handleToggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar 
          isOpen={sidebarOpen} 
          onClose={handleCloseSidebar}
          onToggle={handleToggleSidebar}
        />
        
        {/* Main content com margin para compensar sidebar fixa */}
        <div className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          sidebarOpen ? "md:ml-64" : "md:ml-0"
        )}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default KabanLayout;