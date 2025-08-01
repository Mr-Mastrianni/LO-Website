import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import {
  Flag,
  Search,
  Filter,
  Eye,
  Check,
  X,
  AlertTriangle,
  MessageSquare,
  User
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const ReportsManager = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock data for reports
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setReports([
        {
          id: 1,
          type: 'inappropriate_content',
          content_type: 'discussion',
          content_title: 'Inappropriate language in support thread',
          content_id: 'disc_123',
          reported_by: 'Sarah M.',
          reported_user: 'Anonymous User',
          reason: 'Contains offensive language and inappropriate content',
          description: 'User posted content with profanity and inappropriate remarks in a support discussion.',
          status: 'pending',
          priority: 'high',
          created_at: '2024-01-21T10:30:00Z',
          reviewed_at: null,
          reviewed_by: null
        },
        {
          id: 2,
          type: 'spam',
          content_type: 'comment',
          content_title: 'Promotional content in comments',
          content_id: 'comment_456',
          reported_by: 'Michael R.',
          reported_user: 'SpamBot123',
          reason: 'Posting promotional links repeatedly',
          description: 'User is posting the same promotional content across multiple discussions.',
          status: 'resolved',
          priority: 'medium',
          created_at: '2024-01-20T14:15:00Z',
          reviewed_at: '2024-01-20T16:30:00Z',
          reviewed_by: 'Admin'
        },
        {
          id: 3,
          type: 'harassment',
          content_type: 'private_message',
          content_title: 'Harassment via private messages',
          content_id: 'pm_789',
          reported_by: 'Lisa K.',
          reported_user: 'TrollUser',
          reason: 'Sending threatening and harassing messages',
          description: 'User has been sending multiple threatening private messages.',
          status: 'investigating',
          priority: 'critical',
          created_at: '2024-01-19T09:45:00Z',
          reviewed_at: '2024-01-19T11:00:00Z',
          reviewed_by: 'Admin'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleResolveReport = (reportId, action) => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { 
            ...report, 
            status: action === 'approve' ? 'resolved' : 'dismissed',
            reviewed_at: new Date().toISOString(),
            reviewed_by: 'Admin'
          }
        : report
    ));

    toast({
      title: "Success",
      description: `Report ${action === 'approve' ? 'resolved' : 'dismissed'} successfully.`,
    });
  };

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setDetailDialogOpen(true);
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.content_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reported_user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reason?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const statuses = {
      'pending': { label: 'Pending', variant: 'destructive' },
      'investigating': { label: 'Investigating', variant: 'default' },
      'resolved': { label: 'Resolved', variant: 'secondary' },
      'dismissed': { label: 'Dismissed', variant: 'outline' }
    };
    const statusInfo = statuses[status] || statuses.pending;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const priorities = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorities[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const getTypeIcon = (type) => {
    const icons = {
      'inappropriate_content': AlertTriangle,
      'spam': Flag,
      'harassment': User,
      'other': MessageSquare
    };
    const Icon = icons[type] || icons.other;
    return <Icon className="h-4 w-4" />;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Reports Management</h3>
          <p className="text-sm text-gray-600">Review and handle community reports</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="destructive">{reports.filter(r => r.status === 'pending').length} Pending</Badge>
          <Badge variant="default">{reports.filter(r => r.status === 'investigating').length} Investigating</Badge>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search reports by content, user, or reason..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Reports</option>
          <option value="pending">Pending</option>
          <option value="investigating">Investigating</option>
          <option value="resolved">Resolved</option>
          <option value="dismissed">Dismissed</option>
        </select>
      </div>

      {/* Reports Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report</TableHead>
                <TableHead>Reported User</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(report.type)}
                        <h4 className="font-medium text-sm">{report.content_title}</h4>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1">{report.reason}</p>
                      <Badge variant="outline" className="text-xs">
                        {report.content_type.replace('_', ' ')}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                        <User className="h-3 w-3 text-red-600" />
                      </div>
                      <span className="text-sm">{report.reported_user}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-3 w-3 text-blue-600" />
                      </div>
                      <span className="text-sm">{report.reported_by}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getPriorityBadge(report.priority)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(report.status)}
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-gray-500">
                      <div>{formatDate(report.created_at)}</div>
                      {report.reviewed_at && (
                        <div>Reviewed: {formatDate(report.reviewed_at)}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex space-x-1 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(report)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {report.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleResolveReport(report.id, 'approve')}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleResolveReport(report.id, 'dismiss')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredReports.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Flag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No reports found</h3>
          <p className="text-sm">
            {searchTerm ? 'Try adjusting your search terms.' : 'No reports match the current filter.'}
          </p>
        </div>
      )}

      {/* Report Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
            <DialogDescription>
              Review the full details of this community report
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Report Type</label>
                  <p className="text-sm">{selectedReport.type.replace('_', ' ')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Priority</label>
                  <div className="mt-1">{getPriorityBadge(selectedReport.priority)}</div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Content Title</label>
                <p className="text-sm">{selectedReport.content_title}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Reported User</label>
                  <p className="text-sm">{selectedReport.reported_user}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Reported By</label>
                  <p className="text-sm">{selectedReport.reported_by}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Reason</label>
                <p className="text-sm">{selectedReport.reason}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-sm bg-gray-50 p-3 rounded">{selectedReport.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Reported</label>
                  <p className="text-sm">{formatDate(selectedReport.created_at)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedReport.status)}</div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>
              Close
            </Button>
            {selectedReport?.status === 'pending' && (
              <div className="flex space-x-2">
                <Button
                  onClick={() => {
                    handleResolveReport(selectedReport.id, 'dismiss');
                    setDetailDialogOpen(false);
                  }}
                  variant="outline"
                >
                  Dismiss
                </Button>
                <Button
                  onClick={() => {
                    handleResolveReport(selectedReport.id, 'approve');
                    setDetailDialogOpen(false);
                  }}
                >
                  Resolve
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportsManager;
