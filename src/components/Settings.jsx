import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSettings from './settings/AccountSettings';
import CategorySettings from './settings/CategorySettings';
import TypeSettings from './settings/TypeSettings';
import ProfileSettings from './settings/ProfileSettings';

const Settings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <Tabs defaultValue="accounts">
        <TabsList>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="types">Types</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="accounts">
          <AccountSettings />
        </TabsContent>
        <TabsContent value="categories">
          <CategorySettings />
        </TabsContent>
        <TabsContent value="types">
          <TypeSettings />
        </TabsContent>
        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;