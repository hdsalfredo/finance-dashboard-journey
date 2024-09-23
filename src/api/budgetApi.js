// Mock API functions (replace with actual API calls in a real application)
export const fetchBudgetItems = async () => {
  // Simulating API call
  return [
    { id: 1, date: '2023-03-15', category: 'Housing', amount: 1000, type: 'expense' },
    { id: 2, date: '2023-03-20', category: 'Food', amount: 500, type: 'expense' },
    { id: 3, date: '2023-04-01', category: 'Salary', amount: 3000, type: 'income' },
    { id: 4, date: '2023-04-05', category: 'Utilities', amount: 200, type: 'expense' },
    { id: 5, date: '2023-04-10', category: 'Entertainment', amount: 150, type: 'expense' },
  ];
};

export const addBudgetItem = async (newItem) => {
  console.log('Adding budget item:', newItem);
  return { id: Date.now(), ...newItem };
};

export const updateBudgetItem = async (updatedItem) => {
  console.log('Updating budget item:', updatedItem);
  return updatedItem;
};

export const deleteBudgetItem = async (id) => {
  console.log('Deleting budget item:', id);
  return id;
};