import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

const KabanLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header title="Compras" />
      
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default KabanLayout;
