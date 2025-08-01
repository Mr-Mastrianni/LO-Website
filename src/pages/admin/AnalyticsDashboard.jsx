import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Globe,
  Download,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewAnalytics from './analytics/OverviewAnalytics';
import UserAnalytics from './analytics/UserAnalytics';
import ContentAnalytics from './analytics/ContentAnalytics';
import TrafficAnalytics from './analytics/TrafficAnalytics';
import EngagementAnalytics from './analytics/EngagementAnalytics';
import ReportsExport from './analytics/ReportsExport';

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');

  const analyticsAreas = [
    {
      id: 'overview',
      name: 'Overview',
      icon: BarChart3,
      description: 'Key metrics and performance summary',
      color: 'text-blue-600'
    },
    {
      id: 'users',
      name: 'Users',
      icon: Users,
      description: 'User behavior and demographics',
      color: 'text-green-600'
    },
    {
      id: 'content',
      name: 'Content',
      icon: TrendingUp,
      description: 'Content performance and engagement',
      color: 'text-purple-600'
    },
    {
      id: 'traffic',
      name: 'Traffic',
      icon: Globe,
      description: 'Website traffic and sources',
      color: 'text-orange-600'
    },
    {
      id: 'engagement',
      name: 'Engagement',
      icon: Calendar,
      description: 'Community interaction metrics',
      color: 'text-pink-600'
    },
    {
      id: 'reports',
      name: 'Reports',
      icon: Download,
      description: 'Export and scheduled reports',
      color: 'text-gray-600'
    }
  ];

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Analytics Dashboard
              </CardTitle>
              <CardDescription>
                Comprehensive insights into website performance, user engagement, and content metrics
              </CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                {dateRangeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Analytics Areas Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {analyticsAreas.map((area) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  activeTab === area.id ? 'border-primary bg-primary/5' : 'hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(area.id)}
              >
                <area.icon className={`h-5 w-5 ${area.color} mb-2`} />
                <h3 className="font-medium text-sm">{area.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{area.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Analytics Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="traffic">Traffic</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <OverviewAnalytics dateRange={dateRange} />
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <UserAnalytics dateRange={dateRange} />
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <ContentAnalytics dateRange={dateRange} />
            </TabsContent>

            <TabsContent value="traffic" className="space-y-4">
              <TrafficAnalytics dateRange={dateRange} />
            </TabsContent>

            <TabsContent value="engagement" className="space-y-4">
              <EngagementAnalytics dateRange={dateRange} />
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <ReportsExport />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
