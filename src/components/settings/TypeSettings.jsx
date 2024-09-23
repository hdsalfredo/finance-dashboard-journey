import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from 'lucide-react';

const TypeSettings = () => {
  const [types, setTypes] = useState([
    { id: 1, name: 'Income' },
    { id: 2, name: 'Expense' },
  ]);
  const [newType, setNewType] = useState('');

  const addType = () => {
    if (newType.trim()) {
      setTypes([...types, { id: Date.now(), name: newType.trim() }]);
      setNewType('');
    }
  };

  const deleteType = (id) => {
    setTypes(types.filter(type => type.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Manage Types</h2>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          placeholder="New type name"
        />
        <Button onClick={addType}><Plus className="mr-2 h-4 w-4" /> Add Type</Button>
      </div>
      <ul className="space-y-2">
        {types.map(type => (
          <li key={type.id} className="flex justify-between items-center">
            <span>{type.name}</span>
            <Button variant="ghost" size="icon" onClick={() => deleteType(type.id)}>
              <Trash className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypeSettings;