import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Users, 
  MessageSquare, 
  TrendingUp,
  Calendar,
  Eye,
  ThumbsUp,
  UserPlus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CommunityAnalytics = () => {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(false);

  // Mock analytics data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAnalytics({
        overview: {
          totalMembers: 156,
          activeMembers: 89,
          newMembersThisMonth: 23,
          totalDiscussions: 45,
          totalComments: 234,
          totalGroups: 8
        },
        engagement: {
          dailyActiveUsers: 34,
          weeklyActiveUsers: 78,
          monthlyActiveUsers: 134,
          averageSessionTime: '12m 34s',
          postsPerDay: 8.5,
          commentsPerPost: 5.2
        },
        topContent: [
          { title: 'Questions about new treatment options', views: 156, replies: 12 },
          { title: 'Support group meeting feedback', views: 89, replies: 8 },
          { title: 'Nutrition tips during treatment', views: 67, replies: 15 }
        ],
        topGroups: [
          { name: 'Brain Cancer Support', members: 45, activity: 'High' },
          { name: 'Caregivers Circle', members: 32, activity: 'Medium' },
          { name: 'Treatment Research Updates', members: 18, activity: 'Low' }
        ],
        recentActivity: [
          { type: 'new_member', user: 'Sarah M.', action: 'joined the community', time: '2 hours ago' },
          { type: 'new_post', user: 'Michael R.', action: 'created a new discussion', time: '4 hours ago' },
          { type: 'new_comment', user: 'Lisa K.', action: 'commented on a post', time: '6 hours ago' },
          { type: 'group_join', user: 'David L.', action: 'joined Brain Cancer Support', time: '8 hours ago' }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    {
      title: 'Total Members',
      value: analytics.overview?.totalMembers || 0,
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Members',
      value: analytics.overview?.activeMembers || 0,
      change: '+8%',
      icon: Activity,
      color: 'text-green-600'
    },
    {
      title: 'Discussions',
      value: analytics.overview?.totalDiscussions || 0,
      change: '+15%',
      icon: MessageSquare,
      color: 'text-purple-600'
    },
    {
      title: 'New This Month',
      value: analytics.overview?.newMembersThisMonth || 0,
      change: '+23%',
      icon: UserPlus,
      color: 'text-orange-600'
    }
  ];

  const getActivityIcon = (type) => {
    const icons = {
      'new_member': UserPlus,
      'new_post': MessageSquare,
      'new_comment': ThumbsUp,
      'group_join': Users
    };
    return icons[type] || Activity;
  };

  const getActivityColor = (type) => {
    const colors = {
      'new_member': 'text-green-600',
      'new_post': 'text-blue-600',
      'new_comment': 'text-purple-600',
      'group_join': 'text-orange-600'
    };
    return colors[type] || 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Community Analytics</h3>
        <p className="text-sm text-gray-600">Track community engagement and growth metrics</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
            <CardDescription>User activity and engagement statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Daily Active Users</p>
                <p className="text-2xl font-bold">{analytics.engagement?.dailyActiveUsers}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Weekly Active Users</p>
                <p className="text-2xl font-bold">{analytics.engagement?.weeklyActiveUsers}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Session Time</p>
                <p className="text-lg font-semibold">{analytics.engagement?.averageSessionTime}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Posts per Day</p>
                <p className="text-lg font-semibold">{analytics.engagement?.postsPerDay}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Content</CardTitle>
            <CardDescription>Most popular discussions this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topContent?.map((content, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium line-clamp-1">{content.title}</h4>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {content.views} views
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {content.replies} replies
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Groups and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Groups</CardTitle>
            <CardDescription>Most active community groups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topGroups?.map((group, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <h4 className="text-sm font-medium">{group.name}</h4>
                    <p className="text-xs text-gray-500">{group.members} members</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    group.activity === 'High' ? 'bg-green-100 text-green-800' :
                    group.activity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {group.activity}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest community actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.recentActivity?.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100`}>
                      <Icon className={`h-4 w-4 ${getActivityColor(activity.type)}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunityAnalytics;
