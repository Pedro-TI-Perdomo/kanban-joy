import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

const KabanLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Compras"
        />
        
        <Outlet />
      </div>
    </div>
  );
};

export default KabanLayout;
