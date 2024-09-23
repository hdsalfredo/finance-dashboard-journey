import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from 'lucide-react';
import BudgetForm from './BudgetForm';

// Mock API functions (replace with actual API calls in a real application)
const fetchBudgetItems = async () => {
  // Simulating API call
  return [
    { id: 1, category: 'Housing', amount: 1000, type: 'expense' },
    { id: 2, category: 'Food', amount: 500, type: 'expense' },
    { id: 3, category: 'Salary', amount: 3000, type: 'income' },
  ];
};

const addBudgetItem = async (newItem) => {
  console.log('Adding budget item:', newItem);
  return { id: Date.now(), ...newItem };
};

const updateBudgetItem = async (updatedItem) => {
  console.log('Updating budget item:', updatedItem);
  return updatedItem;
};

const deleteBudgetItem = async (id) => {
  console.log('Deleting budget item:', id);
  return id;
};

const BudgetPlanner = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const queryClient = useQueryClient();

  const { data: budgetItems, isLoading, error } = useQuery({
    queryKey: ['budgetItems'],
    queryFn: fetchBudgetItems,
  });

  const addMutation = useMutation({
    mutationFn: addBudgetItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['budgetItems']);
      setIsFormOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateBudgetItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['budgetItems']);
      setIsFormOpen(false);
      setCurrentItem(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBudgetItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['budgetItems']);
    },
  });

  const handleFormSubmit = (data) => {
    if (currentItem) {
      updateMutation.mutate({ ...currentItem, ...data });
    } else {
      addMutation.mutate(data);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this budget item?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Loading budget items...</div>;
  if (error) return <div>Error loading budget items: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Budget Planner</h1>
      <Button onClick={() => { setCurrentItem(null); setIsFormOpen(true); }} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Add Budget Item
      </Button>
      {isFormOpen && (
        <div className="mb-4">
          <BudgetForm
            item={currentItem}
            onSubmit={handleFormSubmit}
            onCancel={() => { setIsFormOpen(false); setCurrentItem(null); }}
          />
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgetItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell className={`text-right ${item.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                ${item.amount.toFixed(2)}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
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

export default BudgetPlanner;