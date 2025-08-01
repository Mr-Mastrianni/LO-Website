import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Settings, 
  BarChart3, 
  Calendar,
  Shield,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserManagement from './UserManagement';
import ContentManagement from './ContentManagement';

const AdminDashboard = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsersThisMonth: 0,
    totalTestimonials: 0,
    totalEvents: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Get total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get new users this month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { count: newUsersThisMonth } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfMonth.toISOString());

      // Get testimonials count (if table exists)
      const { count: totalTestimonials } = await supabase
        .from('testimonials')
        .select('*', { count: 'exact', head: true })
        .catch(() => ({ count: 0 }));

      setStats({
        totalUsers: totalUsers || 0,
        newUsersThisMonth: newUsersThisMonth || 0,
        totalTestimonials: totalTestimonials || 0,
        totalEvents: 0 // Placeholder
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      description: 'Registered community members',
      color: 'text-blue-600'
    },
    {
      title: 'New This Month',
      value: stats.newUsersThisMonth,
      icon: Activity,
      description: 'New user registrations',
      color: 'text-green-600'
    },
    {
      title: 'Testimonials',
      value: stats.totalTestimonials,
      icon: MessageSquare,
      description: 'Community testimonials',
      color: 'text-purple-600'
    },
    {
      title: 'Events',
      value: stats.totalEvents,
      icon: Calendar,
      description: 'Upcoming events',
      color: 'text-orange-600'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Living Oncology</title>
        <meta name="description" content="Administrative dashboard for Living Oncology website management" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-gray-600">Welcome back, {profile?.full_name || 'Admin'}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-primary">Administrator</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Admin Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setActiveTab('users')}
                      className="p-4 border rounded-lg hover:bg-gray-50 text-left transition-colors"
                    >
                      <Users className="h-6 w-6 text-blue-600 mb-2" />
                      <h3 className="font-medium">Manage Users</h3>
                      <p className="text-sm text-gray-600">View and edit user accounts</p>
                    </button>
                    <button
                      onClick={() => setActiveTab('content')}
                      className="p-4 border rounded-lg hover:bg-gray-50 text-left transition-colors"
                    >
                      <FileText className="h-6 w-6 text-green-600 mb-2" />
                      <h3 className="font-medium">Content Management</h3>
                      <p className="text-sm text-gray-600">Edit testimonials and resources</p>
                    </button>
                    <button
                      onClick={() => setActiveTab('analytics')}
                      className="p-4 border rounded-lg hover:bg-gray-50 text-left transition-colors"
                    >
                      <BarChart3 className="h-6 w-6 text-purple-600 mb-2" />
                      <h3 className="font-medium">View Analytics</h3>
                      <p className="text-sm text-gray-600">Site usage and engagement</p>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="content">
              <ContentManagement />
            </TabsContent>

            <TabsContent value="community">
              <Card>
                <CardHeader>
                  <CardTitle>Community Management</CardTitle>
                  <CardDescription>Moderate discussions and manage community features</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Community management interface will be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure site settings and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Settings interface will be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
