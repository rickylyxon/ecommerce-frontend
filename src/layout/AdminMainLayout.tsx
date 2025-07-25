// layout/AdminMainLayout.tsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/AdminSidebar";
import Header from "../components/layout/AdminHeader";
import { useState } from "react";

const AdminMainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract tab name from URL (e.g., /products -> 'products')
  const path = location.pathname.split("/")[1] || "dashboard";

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onTabChange = (tab: string) => {
    navigate(`/${tab}`);
  };

  const getPageTitle = () => {
    const titles: { [key: string]: string } = {
      dashboard: "Dashboard",
      products: "Products",
      categories: "Categories",
      orders: "Orders",
      customers: "Customers",
      analytics: "Analytics",
      notifications: "Notifications",
      support: "Support",
      settings: "Settings",
    };
    return titles[path] || "Dashboard";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeTab={path}
        onTabChange={onTabChange}
      />
      
      {/* Main Content Area - Add margin-left on desktop to account for fixed sidebar */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-72">
        <Header
          title={getPageTitle()}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminMainLayout;