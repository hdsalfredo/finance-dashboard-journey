import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TransactionForm = ({ transaction, onSubmit, onCancel }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: transaction || { date: '', description: '', amount: '', category: '' }
  });

  React.useEffect(() => {
    if (transaction) {
      Object.keys(transaction).forEach(key => {
        setValue(key, transaction[key]);
      });
    }
  }, [transaction, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="date"
        {...register('date', { required: true })}
        placeholder="Date"
      />
      <Input
        {...register('description', { required: true })}
        placeholder="Description"
      />
      <Input
        type="number"
        {...register('amount', { required: true, valueAsNumber: true })}
        placeholder="Amount"
      />
      <Select onValueChange={(value) => setValue('category', value)} defaultValue={transaction?.category || ''}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Food">Food</SelectItem>
          <SelectItem value="Income">Income</SelectItem>
          <SelectItem value="Utilities">Utilities</SelectItem>
          <SelectItem value="Shopping">Shopping</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default TransactionForm;