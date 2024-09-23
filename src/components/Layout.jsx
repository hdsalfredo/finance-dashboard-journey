import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Receipt, PiggyBank, Settings, Search, Bell, User } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">Finanta.</h1>
        </div>
        <nav className="mt-8">
          <Link to="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link to="/transactions" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Receipt className="mr-3 h-5 w-5" />
            Transactions
          </Link>
          <Link to="/budget-planner" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <PiggyBank className="mr-3 h-5 w-5" />
            Budget Planner
          </Link>
          <Link to="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
              <Search className="h-5 w-5 text-gray-500" />
              <input type="text" placeholder="Search..." className="ml-2 bg-transparent focus:outline-none" />
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-gray-500" />
              <User className="h-6 w-6 text-gray-500" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;