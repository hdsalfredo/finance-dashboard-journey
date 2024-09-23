import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, MoreHorizontal, ArrowRight } from 'lucide-react';

const data = [
  { name: 'Jan', income: 4000, spending: 2400 },
  { name: 'Feb', income: 3000, spending: 1398 },
  { name: 'Mar', income: 2000, spending: 9800 },
  { name: 'Apr', income: 2780, spending: 3908 },
  { name: 'May', income: 1890, spending: 4800 },
  { name: 'Jun', income: 2390, spending: 3800 },
  { name: 'Jul', income: 3490, spending: 4300 },
];

const Dashboard = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Total Balance */}
      <div className="col-span-2 bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Total Balance</h2>
          <MoreHorizontal className="text-gray-500" />
        </div>
        <p className="text-3xl font-bold">$82,758.10</p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Checking Account</span>
            <span className="font-semibold">$22,426.10</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Savings Account</span>
            <span className="font-semibold">$50,322.00</span>
          </div>
        </div>
      </div>

      {/* Spending Overview */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Spending Overview</h2>
          <select className="text-sm text-gray-500 bg-transparent">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
        <p className="text-3xl font-bold flex items-center">
          $12,521.10
          <span className="text-sm text-green-500 ml-2 flex items-center">
            <ArrowUpRight className="h-4 w-4" />
            +1.3%
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-1">From $20,000.00</p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Friend & Family</span>
            <span className="font-semibold">$5,121.80</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subscription</span>
            <span className="font-semibold">$2,321.80</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Other</span>
            <span className="font-semibold">$5,169.80</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="col-span-2 bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Statistics</h2>
          <select className="text-sm text-gray-500 bg-transparent">
            <option>This Year</option>
            <option>Last Year</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" fill="#8884d8" />
            <Bar dataKey="spending" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <button className="text-blue-500 text-sm">View All</button>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <span className="text-red-500 font-bold">A</span>
              </div>
              <div>
                <p className="font-semibold">Adobe Creative</p>
                <p className="text-sm text-gray-500">08 Dec 2023</p>
              </div>
            </div>
            <span className="font-semibold text-red-500">-$1,050.00</span>
          </div>
          {/* Add more transactions here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;