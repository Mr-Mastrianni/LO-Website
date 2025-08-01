import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Users, 
  Flag, 
  Shield,
  Activity,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DiscussionModerator from './community/DiscussionModerator';
import GroupsManager from './community/GroupsManager';
import ReportsManager from './community/ReportsManager';
import CommunitySettings from './community/CommunitySettings';
import CommunityAnalytics from './community/CommunityAnalytics';

const CommunityManagement = () => {
  const [activeTab, setActiveTab] = useState('discussions');

  const managementAreas = [
    {
      id: 'discussions',
      name: 'Discussions',
      icon: MessageSquare,
      description: 'Moderate forum posts and comments',
      color: 'text-blue-600',
      count: 45
    },
    {
      id: 'groups',
      name: 'Groups',
      icon: Users,
      description: 'Manage community groups and memberships',
      color: 'text-green-600',
      count: 8
    },
    {
      id: 'reports',
      name: 'Reports',
      icon: Flag,
      description: 'Handle reported content and users',
      color: 'text-red-600',
      count: 3
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: Activity,
      description: 'Community engagement and activity metrics',
      color: 'text-purple-600',
      count: null
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      description: 'Configure community rules and features',
      color: 'text-gray-600',
      count: null
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Community Management
          </CardTitle>
          <CardDescription>
            Moderate discussions, manage groups, and maintain a healthy community environment
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Management Areas Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {managementAreas.map((area) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  activeTab === area.id ? 'border-primary bg-primary/5' : 'hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(area.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <area.icon className={`h-5 w-5 ${area.color}`} />
                  {area.count !== null && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      area.count > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {area.count}
                    </span>
                  )}
                </div>
                <h3 className="font-medium text-sm">{area.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{area.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Community Management Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="discussions" className="space-y-4">
              <DiscussionModerator />
            </TabsContent>

            <TabsContent value="groups" className="space-y-4">
              <GroupsManager />
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <ReportsManager />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <CommunityAnalytics />
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <CommunitySettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityManagement;
