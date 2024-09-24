import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import BudgetForm from './BudgetForm';
import BudgetTable from './BudgetTable';
import { fetchBudgetItems, addBudgetItem, updateBudgetItem, deleteBudgetItem } from '../api/budgetApi';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BudgetPlanner = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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

  const filteredItems = budgetItems?.filter(item => {
    const itemDate = new Date(item.date);
    return (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
  }) || [];

  if (isLoading) return <div>Loading budget items...</div>;
  if (error) return <div>Error loading budget items: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Planner</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                placeholderText="Start Date"
                className="w-full sm:w-40"
              />
              <DatePicker
                selected={endDate}
                onChange={setEndDate}
                placeholderText="End Date"
                className="w-full sm:w-40"
              />
            </div>
            <Button onClick={() => { setCurrentItem(null); setIsFormOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" /> Add Budget Item
            </Button>
          </div>
          {isFormOpen && (
            <div className="mb-4">
              <BudgetForm
                item={currentItem}
                onSubmit={handleFormSubmit}
                onCancel={() => { setIsFormOpen(false); setCurrentItem(null); }}
              />
            </div>
          )}
          <div className="overflow-x-auto">
            <BudgetTable
              items={filteredItems}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetPlanner;
