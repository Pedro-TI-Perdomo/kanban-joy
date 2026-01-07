import { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

const KabanLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header title="Compras" onMenuClick={handleOpenSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
        
        {/* Main content com margin para compensar sidebar fixa */}
        <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default KabanLayout;
