import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, PiggyBank, Settings, Search, Bell, User, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Layout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`w-64 bg-white shadow-md lg:relative lg:block ${isSidebarOpen ? 'fixed inset-y-0 left-0 z-50' : 'hidden'}`}>
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-blue-600">Finanta.</h1>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-8">
          <Link to="/" className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${isActive('/') ? 'bg-gray-200' : ''}`} onClick={() => setIsSidebarOpen(false)}>
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link to="/transactions" className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${isActive('/transactions') ? 'bg-gray-200' : ''}`} onClick={() => setIsSidebarOpen(false)}>
            <Receipt className="mr-3 h-5 w-5" />
            Transactions
          </Link>
          <Link to="/budget-planner" className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${isActive('/budget-planner') ? 'bg-gray-200' : ''}`} onClick={() => setIsSidebarOpen(false)}>
            <PiggyBank className="mr-3 h-5 w-5" />
            Budget Planner
          </Link>
          <Link to="/settings" className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${isActive('/settings') ? 'bg-gray-200' : ''}`} onClick={() => setIsSidebarOpen(false)}>
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={toggleSidebar}>
                <Menu className="h-6 w-6" />
              </Button>
              <div className="hidden sm:flex items-center bg-gray-100 rounded-md px-3 py-2">
                <Search className="h-5 w-5 text-gray-500" />
                <input type="text" placeholder="Search..." className="ml-2 bg-transparent focus:outline-none" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-gray-500" />
              <User className="h-6 w-6 text-gray-500" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
