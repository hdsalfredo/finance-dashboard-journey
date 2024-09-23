import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowUpDown, Search, Plus, Edit, Trash, Calendar } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DatePicker } from "@/components/ui/date-picker";
import TransactionForm from './TransactionForm';

// Mock API functions (replace with actual API calls in a real application)
const fetchTransactions = async () => {
  // Simulating API call with varied dates
  return [
    { id: 1, date: '2023-03-15', description: 'Grocery Shopping', amount: -120.50, category: 'Food' },
    { id: 2, date: '2023-03-14', description: 'Salary Deposit', amount: 3000.00, category: 'Income' },
    { id: 3, date: '2023-03-13', description: 'Electric Bill', amount: -85.20, category: 'Utilities' },
    { id: 4, date: '2023-03-12', description: 'Online Purchase', amount: -59.99, category: 'Shopping' },
    { id: 5, date: '2023-03-11', description: 'Restaurant Dinner', amount: -78.50, category: 'Food' },
    { id: 6, date: '2023-04-01', description: 'Rent Payment', amount: -1200.00, category: 'Housing' },
    { id: 7, date: '2023-04-02', description: 'Freelance Income', amount: 500.00, category: 'Income' },
  ];
};

const addTransaction = async (newTransaction) => {
  console.log('Adding transaction:', newTransaction);
  return { id: Date.now(), ...newTransaction };
};

const updateTransaction = async (updatedTransaction) => {
  console.log('Updating transaction:', updatedTransaction);
  return updatedTransaction;
};

const deleteTransaction = async (id) => {
  console.log('Deleting transaction:', id);
  return id;
};

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const queryClient = useQueryClient();

  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });

  const addMutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
      setIsFormOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
      setIsFormOpen(false);
      setCurrentTransaction(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
    },
  });

  if (isLoading) return <div>Loading transactions...</div>;
  if (error) return <div>Error loading transactions: {error.message}</div>;

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const transactionDate = new Date(transaction.date);
    const isWithinDateRange = (!startDate || transactionDate >= startDate) &&
      (!endDate || transactionDate <= endDate);

    return matchesSearch && isWithinDateRange;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'amount') {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
    return 0;
  });

  const handleFormSubmit = (data) => {
    if (currentTransaction) {
      updateMutation.mutate({ ...currentTransaction, ...data });
    } else {
      addMutation.mutate(data);
    }
  };

  const handleEdit = (transaction) => {
    setCurrentTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Search className="text-gray-400" />
        </div>
        <div className="flex items-center space-x-2">
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            placeholderText="Start Date"
            className="w-40"
          />
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            placeholderText="End Date"
            className="w-40"
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button onClick={() => { setCurrentTransaction(null); setIsFormOpen(true); }} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Add Transaction
      </Button>
      {isFormOpen && (
        <div className="mb-4">
          <TransactionForm
            transaction={currentTransaction}
            onSubmit={handleFormSubmit}
            onCancel={() => { setIsFormOpen(false); setCurrentTransaction(null); }}
          />
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell className={`text-right ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => handleEdit(transaction)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(transaction.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Transactions;
