import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Send, TestTube, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const EmailSettings = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: 'noreply@livingoncology.org',
    smtpPassword: '',
    smtpEncryption: 'tls',
    fromName: 'Living Oncology',
    fromEmail: 'noreply@livingoncology.org',
    replyToEmail: 'support@livingoncology.org',
    enableEmailNotifications: true,
    enableWelcomeEmail: true,
    enablePasswordResetEmail: true,
    enableEventReminders: true,
    enableWeeklyDigest: true
  });

  const [templates, setTemplates] = useState([
    { id: 'welcome', name: 'Welcome Email', subject: 'Welcome to Living Oncology!', enabled: true },
    { id: 'password_reset', name: 'Password Reset', subject: 'Reset Your Password', enabled: true },
    { id: 'event_reminder', name: 'Event Reminder', subject: 'Upcoming Event Reminder', enabled: true },
    { id: 'weekly_digest', name: 'Weekly Digest', subject: 'Your Weekly Community Update', enabled: true }
  ]);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleToggle = (field) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Email Settings Saved",
      description: "Email configuration has been updated successfully.",
    });
  };

  const handleTestEmail = () => {
    toast({
      title: "Test Email Sent",
      description: "A test email has been sent to verify your configuration.",
    });
  };

  return (
    <div className="space-y-6">
      {/* SMTP Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            SMTP Configuration
          </CardTitle>
          <CardDescription>Configure your email server settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">SMTP Host</label>
              <Input
                value={settings.smtpHost}
                onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                placeholder="smtp.gmail.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">SMTP Port</label>
              <Input
                type="number"
                value={settings.smtpPort}
                onChange={(e) => handleInputChange('smtpPort', parseInt(e.target.value))}
                placeholder="587"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Username</label>
              <Input
                value={settings.smtpUsername}
                onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
                placeholder="your-email@domain.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                value={settings.smtpPassword}
                onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                placeholder="Your SMTP password"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Encryption</label>
            <select
              value={settings.smtpEncryption}
              onChange={(e) => handleInputChange('smtpEncryption', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="none">None</option>
              <option value="tls">TLS</option>
              <option value="ssl">SSL</option>
            </select>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleTestEmail} variant="outline">
              <TestTube className="h-4 w-4 mr-2" />
              Test Connection
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Defaults */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Defaults
          </CardTitle>
          <CardDescription>Default sender information for outgoing emails</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">From Name</label>
              <Input
                value={settings.fromName}
                onChange={(e) => handleInputChange('fromName', e.target.value)}
                placeholder="Your Organization Name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">From Email</label>
              <Input
                type="email"
                value={settings.fromEmail}
                onChange={(e) => handleInputChange('fromEmail', e.target.value)}
                placeholder="noreply@yourdomain.com"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Reply-To Email</label>
            <Input
              type="email"
              value={settings.replyToEmail}
              onChange={(e) => handleInputChange('replyToEmail', e.target.value)}
              placeholder="support@yourdomain.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>Control which emails are sent automatically</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Enable Email Notifications</label>
              <p className="text-xs text-gray-500">Master switch for all email notifications</p>
            </div>
            <Switch
              checked={settings.enableEmailNotifications}
              onCheckedChange={() => handleToggle('enableEmailNotifications')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Welcome Email</label>
              <p className="text-xs text-gray-500">Send welcome email to new users</p>
            </div>
            <Switch
              checked={settings.enableWelcomeEmail}
              onCheckedChange={() => handleToggle('enableWelcomeEmail')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Password Reset Email</label>
              <p className="text-xs text-gray-500">Send password reset instructions</p>
            </div>
            <Switch
              checked={settings.enablePasswordResetEmail}
              onCheckedChange={() => handleToggle('enablePasswordResetEmail')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Event Reminders</label>
              <p className="text-xs text-gray-500">Send reminders for upcoming events</p>
            </div>
            <Switch
              checked={settings.enableEventReminders}
              onCheckedChange={() => handleToggle('enableEventReminders')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Weekly Digest</label>
              <p className="text-xs text-gray-500">Send weekly community updates</p>
            </div>
            <Switch
              checked={settings.enableWeeklyDigest}
              onCheckedChange={() => handleToggle('enableWeeklyDigest')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Email Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>Manage email templates and content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {templates.map((template) => (
              <div key={template.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <h4 className="text-sm font-medium">{template.name}</h4>
                  <p className="text-xs text-gray-500">Subject: {template.subject}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={template.enabled} />
                  <Button variant="outline" size="sm">
                    Edit Template
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Save Email Settings
        </Button>
      </div>
    </div>
  );
};

export default EmailSettings;
