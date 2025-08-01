import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, TrendingUp, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TrafficAnalytics = ({ dateRange }) => {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAnalytics({
        trafficMetrics: {
          totalSessions: 8456,
          uniqueVisitors: 5234,
          pageViews: 23456,
          bounceRate: 32.4
        },
        trafficSources: [
          { source: 'Direct', sessions: 3456, percentage: 40.9 },
          { source: 'Google Search', sessions: 2134, percentage: 25.2 },
          { source: 'Social Media', sessions: 1567, percentage: 18.5 },
          { source: 'Referrals', sessions: 892, percentage: 10.5 },
          { source: 'Email', sessions: 407, percentage: 4.9 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [dateRange]);

  const trafficCards = [
    { title: 'Total Sessions', value: analytics.trafficMetrics?.totalSessions || 0, icon: Globe, color: 'text-blue-600' },
    { title: 'Unique Visitors', value: analytics.trafficMetrics?.uniqueVisitors || 0, icon: Users, color: 'text-green-600' },
    { title: 'Page Views', value: analytics.trafficMetrics?.pageViews || 0, icon: TrendingUp, color: 'text-purple-600' },
    { title: 'Bounce Rate', value: `${analytics.trafficMetrics?.bounceRate || 0}%`, icon: Clock, color: 'text-orange-600' }
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trafficCards.map((metric, index) => (
          <motion.div key={metric.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>Where your visitors are coming from</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.trafficSources?.map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{source.source}</span>
                  <span>{source.sessions.toLocaleString()} sessions ({source.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${source.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrafficAnalytics;
