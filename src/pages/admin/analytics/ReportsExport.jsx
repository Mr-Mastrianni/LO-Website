import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Download, Calendar, FileText, Mail, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const ReportsExport = () => {
  const { toast } = useToast();
  const [scheduledReports, setScheduledReports] = useState([
    { id: 1, name: 'Weekly User Report', frequency: 'weekly', lastSent: '2024-01-15', status: 'active' },
    { id: 2, name: 'Monthly Analytics Summary', frequency: 'monthly', lastSent: '2024-01-01', status: 'active' },
    { id: 3, name: 'Content Performance Report', frequency: 'bi-weekly', lastSent: '2024-01-08', status: 'paused' }
  ]);

  const reportTypes = [
    { name: 'User Analytics Report', description: 'Comprehensive user behavior and demographics', icon: FileText },
    { name: 'Content Performance Report', description: 'Content engagement and performance metrics', icon: FileText },
    { name: 'Traffic Analysis Report', description: 'Website traffic sources and patterns', icon: FileText },
    { name: 'Community Engagement Report', description: 'Community activity and interaction metrics', icon: FileText }
  ];

  const handleExportReport = (reportType) => {
    toast({
      title: "Report Generated",
      description: `${reportType} has been generated and will be downloaded shortly.`,
    });
  };

  const handleScheduleReport = () => {
    toast({
      title: "Report Scheduled",
      description: "Your report has been scheduled successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Reports & Export</h3>
        <p className="text-sm text-gray-600">Generate and schedule analytics reports</p>
      </div>

      {/* Quick Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Quick Export
          </CardTitle>
          <CardDescription>Generate instant reports for download</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((report, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{report.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{report.description}</p>
                  </div>
                  <report.icon className="h-4 w-4 text-gray-400 ml-2" />
                </div>
                <Button 
                  size="sm" 
                  className="mt-3 w-full"
                  onClick={() => handleExportReport(report.name)}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Scheduled Reports
          </CardTitle>
          <CardDescription>Automated report delivery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-4">
            {scheduledReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <h4 className="text-sm font-medium">{report.name}</h4>
                  <p className="text-xs text-gray-500">
                    {report.frequency} • Last sent: {report.lastSent}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={report.status === 'active' ? 'default' : 'secondary'}>
                    {report.status}
                  </Badge>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={handleScheduleReport}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule New Report
          </Button>
        </CardContent>
      </Card>

      {/* Email Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Reports
          </CardTitle>
          <CardDescription>Send reports via email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email Recipients</label>
              <Input placeholder="Enter email addresses separated by commas" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Report Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>User Analytics Report</option>
                  <option>Content Performance Report</option>
                  <option>Traffic Analysis Report</option>
                  <option>Community Engagement Report</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Date Range</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                  <option>Last year</option>
                </select>
              </div>
            </div>
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              Send Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsExport;
