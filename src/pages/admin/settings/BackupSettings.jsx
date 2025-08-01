import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Backup, Download, Upload, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const BackupSettings = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    retentionDays: 30,
    includeUploads: true,
    includeDatabase: true,
    compressBackups: true,
    encryptBackups: true
  });

  const [backups, setBackups] = useState([
    { id: 1, name: 'backup_2024-01-21_daily.zip', size: '245.7 MB', date: '2024-01-21', type: 'automatic', status: 'completed' },
    { id: 2, name: 'backup_2024-01-20_daily.zip', size: '243.2 MB', date: '2024-01-20', type: 'automatic', status: 'completed' },
    { id: 3, name: 'backup_2024-01-19_manual.zip', size: '241.8 MB', date: '2024-01-19', type: 'manual', status: 'completed' },
    { id: 4, name: 'backup_2024-01-18_daily.zip', size: '240.1 MB', date: '2024-01-18', type: 'automatic', status: 'completed' }
  ]);

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleInputChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Backup Settings Saved",
      description: "Backup configuration has been updated successfully.",
    });
  };

  const handleCreateBackup = () => {
    toast({
      title: "Backup Started",
      description: "Manual backup is being created. You'll be notified when it's ready.",
    });
  };

  const handleDownloadBackup = (backupId) => {
    toast({
      title: "Download Started",
      description: "Backup download has started.",
    });
  };

  const handleRestoreBackup = (backupId) => {
    toast({
      title: "Restore Initiated",
      description: "Backup restore process has been started.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Backup Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Backup className="h-5 w-5" />
            Backup Configuration
          </CardTitle>
          <CardDescription>Configure automatic backup settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Enable Automatic Backups</label>
              <p className="text-xs text-gray-500">Automatically create backups on schedule</p>
            </div>
            <Switch
              checked={settings.autoBackup}
              onCheckedChange={() => handleToggle('autoBackup')}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Backup Frequency</label>
              <select
                value={settings.backupFrequency}
                onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={!settings.autoBackup}
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Retention Period (days)</label>
              <select
                value={settings.retentionDays}
                onChange={(e) => handleInputChange('retentionDays', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
                <option value={30}>30 days</option>
                <option value={60}>60 days</option>
                <option value={90}>90 days</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Include Database</label>
              <Switch
                checked={settings.includeDatabase}
                onCheckedChange={() => handleToggle('includeDatabase')}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Include Uploaded Files</label>
              <Switch
                checked={settings.includeUploads}
                onCheckedChange={() => handleToggle('includeUploads')}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Compress Backups</label>
              <Switch
                checked={settings.compressBackups}
                onCheckedChange={() => handleToggle('compressBackups')}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Encrypt Backups</label>
              <Switch
                checked={settings.encryptBackups}
                onCheckedChange={() => handleToggle('encryptBackups')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manual Backup */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Backup</CardTitle>
          <CardDescription>Create an immediate backup of your data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Create Backup Now</h4>
              <p className="text-sm text-gray-600">Generate a complete backup of your current data</p>
            </div>
            <Button onClick={handleCreateBackup}>
              <Backup className="h-4 w-4 mr-2" />
              Create Backup
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <CardTitle>Backup History</CardTitle>
          <CardDescription>View and manage your backup files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backups.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium">{backup.name}</h4>
                    <Badge variant={backup.type === 'automatic' ? 'default' : 'secondary'}>
                      {backup.type}
                    </Badge>
                    <Badge variant={backup.status === 'completed' ? 'default' : 'destructive'}>
                      {backup.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {backup.date}
                    </span>
                    <span>{backup.size}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadBackup(backup.id)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRestoreBackup(backup.id)}
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Restore
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Backup Storage Info */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Information</CardTitle>
          <CardDescription>Backup storage usage and limits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">4</div>
              <div className="text-sm text-gray-600">Total Backups</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">970.8 MB</div>
              <div className="text-sm text-gray-600">Storage Used</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">9.03 GB</div>
              <div className="text-sm text-gray-600">Available Space</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Storage Usage</span>
              <span>9.7%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '9.7%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Backup className="h-4 w-4" />
          Save Backup Settings
        </Button>
      </div>
    </div>
  );
};

export default BackupSettings;
