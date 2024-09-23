import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

const BudgetForm = ({ item, onSubmit, onCancel }) => {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: item || { category: '', amount: '', type: 'expense', date: new Date() }
  });

  React.useEffect(() => {
    if (item) {
      Object.keys(item).forEach(key => {
        setValue(key, key === 'date' ? new Date(item[key]) : item[key]);
      });
    }
  }, [item, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('category', { required: true })}
        placeholder="Category"
      />
      <Input
        type="number"
        {...register('amount', { required: true, valueAsNumber: true })}
        placeholder="Amount"
      />
      <Select onValueChange={(value) => setValue('type', value)} defaultValue={item?.type || 'expense'}>
        <SelectTrigger>
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="expense">Expense</SelectItem>
          <SelectItem value="income">Income</SelectItem>
        </SelectContent>
      </Select>
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <DatePicker
            placeholderText="Select date"
            onChange={(date) => field.onChange(date)}
            selected={field.value}
          />
        )}
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default BudgetForm;
