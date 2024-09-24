import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, MoreHorizontal, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Balance */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$82,758.10</div>
          <div className="text-xs text-muted-foreground">+20.1% from last month</div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Checking Account</span>
              <span className="font-medium">$22,426.10</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Savings Account</span>
              <span className="font-medium">$50,322.00</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spending Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Spending Overview</CardTitle>
          <select className="text-xs text-muted-foreground bg-transparent">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center">
            $12,521.10
            <span className="text-xs text-green-500 ml-2 flex items-center">
              <ArrowUpRight className="h-3 w-3" />
              +1.3%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">From $20,000.00</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Friend & Family</span>
              <span className="font-medium">$5,121.80</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Subscription</span>
              <span className="font-medium">$2,321.80</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Other</span>
              <span className="font-medium">$5,169.80</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Statistics</CardTitle>
          <select className="text-xs text-muted-foreground bg-transparent">
            <option>This Year</option>
            <option>Last Year</option>
          </select>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
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
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
          <button className="text-blue-500 text-xs">View All</button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <span className="text-red-500 font-bold text-xs">A</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Adobe Creative</p>
                  <p className="text-xs text-muted-foreground">08 Dec 2023</p>
                </div>
              </div>
              <span className="font-semibold text-red-500 text-sm">-$1,050.00</span>
            </div>
            {/* Add more transactions here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
