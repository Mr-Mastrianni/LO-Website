import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Share2, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const EngagementAnalytics = ({ dateRange }) => {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAnalytics({
        engagementMetrics: {
          totalComments: 456,
          totalShares: 234,
          totalLikes: 1234,
          eventRegistrations: 89
        },
        topEngagingContent: [
          { title: 'Sarah\'s Recovery Story', type: 'testimonial', engagement: 89, comments: 23 },
          { title: 'New Treatment Options', type: 'resource', engagement: 67, downloads: 156 },
          { title: 'Support Group Meeting', type: 'event', engagement: 45, registrations: 34 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [dateRange]);

  const engagementCards = [
    { title: 'Comments', value: analytics.engagementMetrics?.totalComments || 0, icon: MessageSquare, color: 'text-blue-600' },
    { title: 'Shares', value: analytics.engagementMetrics?.totalShares || 0, icon: Share2, color: 'text-green-600' },
    { title: 'Likes', value: analytics.engagementMetrics?.totalLikes || 0, icon: ThumbsUp, color: 'text-purple-600' },
    { title: 'Event Registrations', value: analytics.engagementMetrics?.eventRegistrations || 0, icon: Calendar, color: 'text-orange-600' }
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {engagementCards.map((metric, index) => (
          <motion.div key={metric.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value.toLocaleString()}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Engaging Content</CardTitle>
          <CardDescription>Content with highest user engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.topEngagingContent?.map((content, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <h4 className="text-sm font-medium">{content.title}</h4>
                  <p className="text-xs text-gray-500 capitalize">{content.type}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">{content.engagement}% engagement</div>
                  <div className="text-xs text-gray-500">
                    {content.comments && `${content.comments} comments`}
                    {content.downloads && `${content.downloads} downloads`}
                    {content.registrations && `${content.registrations} registrations`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EngagementAnalytics;
