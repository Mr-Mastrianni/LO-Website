import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  Clock,
  MapPin,
  Calendar,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const UserAnalytics = ({ dateRange }) => {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(false);

  // Mock user analytics data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAnalytics({
        userMetrics: {
          totalUsers: 1247,
          newUsers: 89,
          returningUsers: 367,
          activeUsers: 456,
          averageSessionTime: '8m 34s',
          sessionsPerUser: 3.2
        },
        demographics: {
          ageGroups: [
            { range: '18-24', count: 156, percentage: 12.5 },
            { range: '25-34', count: 298, percentage: 23.9 },
            { range: '35-44', count: 387, percentage: 31.0 },
            { range: '45-54', count: 245, percentage: 19.6 },
            { range: '55-64', count: 123, percentage: 9.9 },
            { range: '65+', count: 38, percentage: 3.1 }
          ],
          userTypes: [
            { type: 'Patient/Survivor', count: 456, percentage: 36.6 },
            { type: 'Caregiver/Family', count: 389, percentage: 31.2 },
            { type: 'Healthcare Professional', count: 234, percentage: 18.8 },
            { type: 'General Visitor', count: 168, percentage: 13.4 }
          ]
        },
        geography: [
          { country: 'United States', users: 892, percentage: 71.5 },
          { country: 'Canada', users: 156, percentage: 12.5 },
          { country: 'United Kingdom', users: 89, percentage: 7.1 },
          { country: 'Australia', users: 67, percentage: 5.4 },
          { country: 'Germany', users: 43, percentage: 3.5 }
        ],
        userJourney: [
          { stage: 'Discovery', users: 1247, dropoff: 0 },
          { stage: 'Registration', users: 892, dropoff: 28.5 },
          { stage: 'Profile Setup', users: 734, dropoff: 17.7 },
          { stage: 'First Interaction', users: 623, dropoff: 15.1 },
          { stage: 'Active User', users: 456, dropoff: 26.8 }
        ],
        retentionCohort: [
          { period: 'Week 1', retained: 89, percentage: 100 },
          { period: 'Week 2', retained: 67, percentage: 75.3 },
          { period: 'Week 3', retained: 54, percentage: 60.7 },
          { period: 'Week 4', retained: 45, percentage: 50.6 },
          { period: 'Month 2', retained: 38, percentage: 42.7 },
          { period: 'Month 3', retained: 32, percentage: 36.0 }
        ],
        topUserActions: [
          { action: 'View Testimonials', count: 2847, users: 456 },
          { action: 'Download Resources', count: 1923, users: 234 },
          { action: 'Join Discussion', count: 1654, users: 189 },
          { action: 'Register for Event', count: 892, users: 156 },
          { action: 'Contact Form', count: 567, users: 123 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [dateRange]);

  const userMetricCards = [
    {
      title: 'Total Users',
      value: analytics.userMetrics?.totalUsers || 0,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'New Users',
      value: analytics.userMetrics?.newUsers || 0,
      icon: UserPlus,
      color: 'text-green-600'
    },
    {
      title: 'Active Users',
      value: analytics.userMetrics?.activeUsers || 0,
      icon: UserCheck,
      color: 'text-purple-600'
    },
    {
      title: 'Avg. Session',
      value: analytics.userMetrics?.averageSessionTime || '0m',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
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
      {/* User Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userMetricCards.map((metric, index) => (
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
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Demographics and Geography */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Types */}
        <Card>
          <CardHeader>
            <CardTitle>User Types</CardTitle>
            <CardDescription>Distribution of user categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.demographics?.userTypes?.map((type, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{type.type}</span>
                    <span>{type.count} ({type.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${type.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Users by country</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.geography?.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <h4 className="text-sm font-medium">{location.country}</h4>
                      <p className="text-xs text-gray-500">{formatNumber(location.users)} users</p>
                    </div>
                  </div>
                  <Badge variant="outline">{location.percentage}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Age Demographics */}
      <Card>
        <CardHeader>
          <CardTitle>Age Demographics</CardTitle>
          <CardDescription>User distribution by age groups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {analytics.demographics?.ageGroups?.map((group, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{group.count}</div>
                <div className="text-sm font-medium">{group.range}</div>
                <div className="text-xs text-gray-500">{group.percentage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Journey and Retention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Journey Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>User Journey Funnel</CardTitle>
            <CardDescription>User progression through key stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.userJourney?.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{stage.stage}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{formatNumber(stage.users)}</span>
                      {stage.dropoff > 0 && (
                        <Badge variant="outline" className="text-red-600">
                          -{stage.dropoff}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-primary to-primary/60 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(stage.users / analytics.userJourney[0].users) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Retention Cohort */}
        <Card>
          <CardHeader>
            <CardTitle>User Retention</CardTitle>
            <CardDescription>Retention rates over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.retentionCohort?.map((cohort, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <h4 className="text-sm font-medium">{cohort.period}</h4>
                      <p className="text-xs text-gray-500">{cohort.retained} users</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${cohort.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{cohort.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top User Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Top User Actions</CardTitle>
          <CardDescription>Most popular user activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.topUserActions?.map((action, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <Activity className="h-4 w-4 text-primary" />
                  <div>
                    <h4 className="text-sm font-medium">{action.action}</h4>
                    <p className="text-xs text-gray-500">{action.users} unique users</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{formatNumber(action.count)}</div>
                  <div className="text-xs text-gray-500">total actions</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAnalytics;
