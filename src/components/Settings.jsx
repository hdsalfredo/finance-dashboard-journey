import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSettings from './settings/AccountSettings';
import CategorySettings from './settings/CategorySettings';
import TypeSettings from './settings/TypeSettings';
import ProfileSettings from './settings/ProfileSettings';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
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
      </CardContent>
    </Card>
  );
};

export default Settings;
