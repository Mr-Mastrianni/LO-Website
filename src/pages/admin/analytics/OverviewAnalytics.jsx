import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Eye, 
  MessageSquare, 
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Globe,
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const OverviewAnalytics = ({ dateRange }) => {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(false);

  // Mock analytics data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAnalytics({
        keyMetrics: {
          totalUsers: 1247,
          activeUsers: 456,
          pageViews: 12847,
          sessionDuration: '8m 34s',
          bounceRate: '32.4%',
          newUsers: 89
        },
        growth: {
          users: 12.5,
          pageViews: 8.3,
          sessions: 15.7,
          engagement: -2.1
        },
        topPages: [
          { page: '/testimonials', views: 2847, change: 15.3 },
          { page: '/about-dr-gatson', views: 2156, change: 8.7 },
          { page: '/brainstorm-cancer', views: 1923, change: 22.1 },
          { page: '/resources', views: 1654, change: -5.2 },
          { page: '/community', views: 1432, change: 18.9 }
        ],
        trafficSources: [
          { source: 'Direct', visitors: 3456, percentage: 42.3 },
          { source: 'Google Search', visitors: 2134, percentage: 26.1 },
          { source: 'Social Media', visitors: 1567, percentage: 19.2 },
          { source: 'Referrals', visitors: 892, percentage: 10.9 },
          { source: 'Email', visitors: 123, percentage: 1.5 }
        ],
        recentActivity: [
          { type: 'user_signup', count: 23, time: 'Last 24 hours' },
          { type: 'testimonial_added', count: 5, time: 'Last 24 hours' },
          { type: 'resource_downloaded', count: 67, time: 'Last 24 hours' },
          { type: 'event_registration', count: 12, time: 'Last 24 hours' }
        ],
        deviceBreakdown: {
          desktop: 58.3,
          mobile: 35.7,
          tablet: 6.0
        }
      });
      setLoading(false);
    }, 1000);
  }, [dateRange]);

  const keyMetricCards = [
    {
      title: 'Total Users',
      value: analytics.keyMetrics?.totalUsers || 0,
      change: analytics.growth?.users || 0,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Page Views',
      value: analytics.keyMetrics?.pageViews || 0,
      change: analytics.growth?.pageViews || 0,
      icon: Eye,
      color: 'text-green-600'
    },
    {
      title: 'Active Users',
      value: analytics.keyMetrics?.activeUsers || 0,
      change: analytics.growth?.sessions || 0,
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Avg. Session',
      value: analytics.keyMetrics?.sessionDuration || '0m',
      change: analytics.growth?.engagement || 0,
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getChangeIcon = (change) => {
    return change >= 0 ? TrendingUp : TrendingDown;
  };

  const getChangeColor = (change) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
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
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetricCards.map((metric, index) => {
          const ChangeIcon = getChangeIcon(metric.change);
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {typeof metric.value === 'number' ? formatNumber(metric.value) : metric.value}
                  </div>
                  <p className={`text-xs flex items-center ${getChangeColor(metric.change)}`}>
                    <ChangeIcon className="h-3 w-3 mr-1" />
                    {Math.abs(metric.change)}% from last period
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages in the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topPages?.map((page, index) => {
                const ChangeIcon = getChangeIcon(page.change);
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{page.page}</h4>
                      <p className="text-xs text-gray-500">{formatNumber(page.views)} views</p>
                    </div>
                    <div className={`flex items-center text-xs ${getChangeColor(page.change)}`}>
                      <ChangeIcon className="h-3 w-3 mr-1" />
                      {Math.abs(page.change)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.trafficSources?.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <div>
                      <h4 className="text-sm font-medium">{source.source}</h4>
                      <p className="text-xs text-gray-500">{formatNumber(source.visitors)} visitors</p>
                    </div>
                  </div>
                  <Badge variant="outline">{source.percentage}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest user actions and engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.recentActivity?.map((activity, index) => {
                const getActivityIcon = (type) => {
                  switch (type) {
                    case 'user_signup': return Users;
                    case 'testimonial_added': return MessageSquare;
                    case 'resource_downloaded': return Download;
                    case 'event_registration': return Calendar;
                    default: return TrendingUp;
                  }
                };
                
                const getActivityLabel = (type) => {
                  switch (type) {
                    case 'user_signup': return 'New Signups';
                    case 'testimonial_added': return 'Testimonials Added';
                    case 'resource_downloaded': return 'Resource Downloads';
                    case 'event_registration': return 'Event Registrations';
                    default: return 'Activity';
                  }
                };

                const Icon = getActivityIcon(activity.type);
                
                return (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-4 w-4 text-primary" />
                      <div>
                        <h4 className="text-sm font-medium">{getActivityLabel(activity.type)}</h4>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-primary">{activity.count}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>Visitor device preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analytics.deviceBreakdown || {}).map(([device, percentage]) => (
                <div key={device} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize font-medium">{device}</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Bounce Rate</span>
                <span className="text-sm text-blue-600">{analytics.keyMetrics?.bounceRate}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-medium">New Users</span>
                <span className="text-sm text-green-600">{analytics.keyMetrics?.newUsers}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewAnalytics;
