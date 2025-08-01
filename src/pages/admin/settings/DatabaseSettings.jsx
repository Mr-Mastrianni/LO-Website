import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Database, RefreshCw, Trash2, Download, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DatabaseSettings = () => {
  const { toast } = useToast();
  
  const [dbStats, setDbStats] = useState({
    totalSize: '245.7 MB',
    totalTables: 12,
    totalRecords: 15847,
    lastOptimized: '2024-01-20',
    connectionStatus: 'healthy'
  });

  const [tables, setTables] = useState([
    { name: 'profiles', records: 1247, size: '45.2 MB', lastUpdated: '2024-01-21' },
    { name: 'testimonials', records: 89, size: '12.3 MB', lastUpdated: '2024-01-21' },
    { name: 'events', records: 23, size: '5.1 MB', lastUpdated: '2024-01-20' },
    { name: 'resources', records: 156, size: '78.9 MB', lastUpdated: '2024-01-21' },
    { name: 'discussions', records: 234, size: '34.5 MB', lastUpdated: '2024-01-21' },
    { name: 'comments', records: 1456, size: '23.7 MB', lastUpdated: '2024-01-21' }
  ]);

  const handleOptimizeDatabase = () => {
    toast({
      title: "Database Optimization Started",
      description: "Database optimization is running in the background.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data export will be ready for download shortly.",
    });
  };

  const handleClearCache = () => {
    toast({
      title: "Cache Cleared",
      description: "Database cache has been cleared successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Database Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Overview
          </CardTitle>
          <CardDescription>Current database status and statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{dbStats.totalSize}</div>
              <div className="text-sm text-gray-600">Total Size</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{dbStats.totalTables}</div>
              <div className="text-sm text-gray-600">Tables</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{dbStats.totalRecords.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Records</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Badge variant={dbStats.connectionStatus === 'healthy' ? 'default' : 'destructive'}>
                {dbStats.connectionStatus}
              </Badge>
              <div className="text-sm text-gray-600 mt-1">Connection</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Tables */}
      <Card>
        <CardHeader>
          <CardTitle>Database Tables</CardTitle>
          <CardDescription>Overview of all database tables and their sizes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tables.map((table, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <h4 className="text-sm font-medium">{table.name}</h4>
                  <p className="text-xs text-gray-500">
                    {table.records.toLocaleString()} records • Last updated: {table.lastUpdated}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{table.size}</div>
                  <div className="text-xs text-gray-500">size</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Database Operations */}
      <Card>
        <CardHeader>
          <CardTitle>Database Operations</CardTitle>
          <CardDescription>Maintenance and optimization tools</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={handleOptimizeDatabase} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Optimize Database
            </Button>
            <Button onClick={handleExportData} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Button onClick={handleClearCache} variant="outline" className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Clear Cache
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            <p><strong>Last Optimization:</strong> {dbStats.lastOptimized}</p>
            <p className="mt-1">Regular optimization helps maintain database performance and reduces storage usage.</p>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">Reset Database</h4>
            <p className="text-sm text-red-700 mb-3">
              This will permanently delete all data and reset the database to its initial state. 
              This action cannot be undone.
            </p>
            <Button variant="destructive" disabled>
              <Trash2 className="h-4 w-4 mr-2" />
              Reset Database (Disabled)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseSettings;
