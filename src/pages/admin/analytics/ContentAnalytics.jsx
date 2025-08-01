import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Eye, 
  Download, 
  MessageSquare,
  Calendar,
  Star,
  TrendingUp,
  Clock,
  Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ContentAnalytics = ({ dateRange }) => {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(false);

  // Mock content analytics data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAnalytics({
        contentMetrics: {
          totalPages: 47,
          totalTestimonials: 89,
          totalResources: 156,
          totalEvents: 23,
          averageTimeOnPage: '4m 23s',
          totalDownloads: 2847
        },
        topContent: [
          { 
            title: 'Understanding Brain Cancer Types',
            type: 'resource',
            views: 2847,
            downloads: 456,
            engagement: 8.3,
            rating: 4.8
          },
          { 
            title: 'Sarah\'s Journey: A Survivor\'s Story',
            type: 'testimonial',
            views: 2156,
            shares: 89,
            engagement: 12.7,
            rating: 4.9
          },
          { 
            title: 'Monthly Support Group Meeting',
            type: 'event',
            views: 1923,
            registrations: 67,
            engagement: 15.2,
            rating: 4.7
          },
          { 
            title: 'Nutrition During Treatment',
            type: 'resource',
            views: 1654,
            downloads: 234,
            engagement: 6.8,
            rating: 4.6
          },
          { 
            title: 'Dr. Gatson\'s Treatment Approach',
            type: 'page',
            views: 1432,
            timeOnPage: '6m 45s',
            engagement: 9.4,
            rating: 4.8
          }
        ],
        contentPerformance: {
          testimonials: {
            total: 89,
            avgViews: 1234,
            avgRating: 4.7,
            totalShares: 456
          },
          resources: {
            total: 156,
            avgDownloads: 234,
            avgRating: 4.5,
            totalViews: 45678
          },
          events: {
            total: 23,
            avgRegistrations: 45,
            avgRating: 4.6,
            totalViews: 12345
          }
        },

        contentCategories: [
          { category: 'Treatment Information', count: 34, views: 15678, percentage: 32.1 },
          { category: 'Patient Stories', count: 28, views: 12456, percentage: 25.5 },
          { category: 'Support Resources', count: 22, views: 9876, percentage: 20.2 },
          { category: 'Research Updates', count: 18, views: 7654, percentage: 15.7 },
          { category: 'Community Events', count: 12, views: 3210, percentage: 6.5 }
        ],
        searchTerms: [
          { term: 'brain cancer treatment', searches: 456, results: 23 },
          { term: 'survivor stories', searches: 234, results: 18 },
          { term: 'support groups', searches: 189, results: 12 },
          { term: 'clinical trials', searches: 156, results: 8 },
          { term: 'nutrition guide', searches: 123, results: 15 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [dateRange]);

  const contentMetricCards = [
    {
      title: 'Total Content',
      value: (analytics.contentMetrics?.totalPages || 0) + 
             (analytics.contentMetrics?.totalTestimonials || 0) + 
             (analytics.contentMetrics?.totalResources || 0),
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Total Downloads',
      value: analytics.contentMetrics?.totalDownloads || 0,
      icon: Download,
      color: 'text-green-600'
    },
    {
      title: 'Avg. Time on Page',
      value: analytics.contentMetrics?.averageTimeOnPage || '0m',
      icon: Clock,
      color: 'text-purple-600'
    },
    {
      title: 'Total Events',
      value: analytics.contentMetrics?.totalEvents || 0,
      icon: Calendar,
      color: 'text-orange-600'
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'testimonial': return MessageSquare;
      case 'resource': return Download;
      case 'event': return Calendar;
      default: return FileText;
    }
  };

  const getContentTypeBadge = (type) => {
    const variants = {
      'testimonial': 'default',
      'resource': 'secondary',
      'event': 'outline',
      'page': 'destructive'
    };
    return <Badge variant={variants[type] || 'outline'}>{type}</Badge>;
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
      {/* Content Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contentMetricCards.map((metric, index) => (
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

      {/* Top Performing Content */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Content</CardTitle>
          <CardDescription>Most popular content across all types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.topContent?.map((content, index) => {
              const Icon = getContentTypeIcon(content.type);
              return (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 flex-1">
                    <Icon className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{content.title}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {formatNumber(content.views)} views
                        </span>
                        {content.downloads && (
                          <span className="text-xs text-gray-500 flex items-center">
                            <Download className="h-3 w-3 mr-1" />
                            {formatNumber(content.downloads)} downloads
                          </span>
                        )}
                        {content.registrations && (
                          <span className="text-xs text-gray-500 flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {content.registrations} registered
                          </span>
                        )}
                        <span className="text-xs text-gray-500 flex items-center">
                          <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {content.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getContentTypeBadge(content.type)}
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600">
                        {content.engagement}% engagement
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Content Performance by Type */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Testimonials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total</span>
                <span className="font-bold">{analytics.contentPerformance?.testimonials?.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Views</span>
                <span className="font-bold">{formatNumber(analytics.contentPerformance?.testimonials?.avgViews || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Rating</span>
                <span className="font-bold flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {analytics.contentPerformance?.testimonials?.avgRating}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Shares</span>
                <span className="font-bold">{analytics.contentPerformance?.testimonials?.totalShares}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total</span>
                <span className="font-bold">{analytics.contentPerformance?.resources?.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Downloads</span>
                <span className="font-bold">{analytics.contentPerformance?.resources?.avgDownloads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Rating</span>
                <span className="font-bold flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {analytics.contentPerformance?.resources?.avgRating}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Views</span>
                <span className="font-bold">{formatNumber(analytics.contentPerformance?.resources?.totalViews || 0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total</span>
                <span className="font-bold">{analytics.contentPerformance?.events?.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Registrations</span>
                <span className="font-bold">{analytics.contentPerformance?.events?.avgRegistrations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Rating</span>
                <span className="font-bold flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {analytics.contentPerformance?.events?.avgRating}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Views</span>
                <span className="font-bold">{formatNumber(analytics.contentPerformance?.events?.totalViews || 0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Categories and Search Terms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Categories</CardTitle>
            <CardDescription>Performance by content category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.contentCategories?.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{category.category}</span>
                    <span>{category.count} items ({category.percentage}%)</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{formatNumber(category.views)} views</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Search Terms</CardTitle>
            <CardDescription>What users are searching for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.searchTerms?.map((term, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <h4 className="text-sm font-medium">"{term.term}"</h4>
                    <p className="text-xs text-gray-500">{term.results} results found</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{term.searches}</div>
                    <div className="text-xs text-gray-500">searches</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentAnalytics;
