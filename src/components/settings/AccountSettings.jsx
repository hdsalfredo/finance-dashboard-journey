import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from 'lucide-react';

const AccountSettings = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Checking Account' },
    { id: 2, name: 'Savings Account' },
  ]);
  const [newAccount, setNewAccount] = useState('');

  const addAccount = () => {
    if (newAccount.trim()) {
      setAccounts([...accounts, { id: Date.now(), name: newAccount.trim() }]);
      setNewAccount('');
    }
  };

  const deleteAccount = (id) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Manage Accounts</h2>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newAccount}
          onChange={(e) => setNewAccount(e.target.value)}
          placeholder="New account name"
        />
        <Button onClick={addAccount}><Plus className="mr-2 h-4 w-4" /> Add Account</Button>
      </div>
      <ul className="space-y-2">
        {accounts.map(account => (
          <li key={account.id} className="flex justify-between items-center">
            <span>{account.name}</span>
            <Button variant="ghost" size="icon" onClick={() => deleteAccount(account.id)}>
              <Trash className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountSettings;