import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Settings, 
  Shield, 
  Bell, 
  Users,
  MessageSquare,
  Eye,
  Lock,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const CommunitySettings = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    general: {
      communityName: 'Living Oncology Community',
      description: 'A supportive community for brain cancer patients, survivors, and their families.',
      welcomeMessage: 'Welcome to our supportive community! Please read our guidelines before posting.',
      maxMembersPerGroup: 100,
      allowGuestViewing: true
    },
    moderation: {
      requireApprovalForPosts: false,
      requireApprovalForComments: false,
      autoModerateSpam: true,
      allowReporting: true,
      maxReportsBeforeHide: 3,
      profanityFilter: true
    },
    notifications: {
      emailNotifications: true,
      newMemberNotifications: true,
      reportNotifications: true,
      weeklyDigest: true,
      adminAlerts: true
    },
    privacy: {
      publicDirectory: true,
      allowSearchEngines: false,
      requireEmailVerification: true,
      allowAnonymousPosts: false,
      dataRetentionDays: 365
    }
  });

  const handleSaveSettings = (category) => {
    toast({
      title: "Settings Saved",
      description: `${category} settings have been updated successfully.`,
    });
  };

  const handleToggle = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleInputChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Community Settings</h3>
        <p className="text-sm text-gray-600">Configure community rules, moderation, and features</p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            General Settings
          </CardTitle>
          <CardDescription>Basic community configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Community Name</label>
            <Input
              value={settings.general.communityName}
              onChange={(e) => handleInputChange('general', 'communityName', e.target.value)}
              placeholder="Community name"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={settings.general.description}
              onChange={(e) => handleInputChange('general', 'description', e.target.value)}
              placeholder="Community description"
              rows={3}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Welcome Message</label>
            <Textarea
              value={settings.general.welcomeMessage}
              onChange={(e) => handleInputChange('general', 'welcomeMessage', e.target.value)}
              placeholder="Message shown to new members"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Max Members per Group</label>
              <Input
                type="number"
                value={settings.general.maxMembersPerGroup}
                onChange={(e) => handleInputChange('general', 'maxMembersPerGroup', parseInt(e.target.value))}
                min="1"
              />
            </div>
            <div className="flex items-center justify-between pt-6">
              <label className="text-sm font-medium">Allow Guest Viewing</label>
              <Switch
                checked={settings.general.allowGuestViewing}
                onCheckedChange={() => handleToggle('general', 'allowGuestViewing')}
              />
            </div>
          </div>
          <Button onClick={() => handleSaveSettings('General')}>
            Save General Settings
          </Button>
        </CardContent>
      </Card>

      {/* Moderation Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Moderation Settings
          </CardTitle>
          <CardDescription>Content moderation and safety features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Require Approval for Posts</label>
                <p className="text-xs text-gray-500">New posts must be approved by moderators</p>
              </div>
              <Switch
                checked={settings.moderation.requireApprovalForPosts}
                onCheckedChange={() => handleToggle('moderation', 'requireApprovalForPosts')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Require Approval for Comments</label>
                <p className="text-xs text-gray-500">New comments must be approved by moderators</p>
              </div>
              <Switch
                checked={settings.moderation.requireApprovalForComments}
                onCheckedChange={() => handleToggle('moderation', 'requireApprovalForComments')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Auto-Moderate Spam</label>
                <p className="text-xs text-gray-500">Automatically detect and hide spam content</p>
              </div>
              <Switch
                checked={settings.moderation.autoModerateSpam}
                onCheckedChange={() => handleToggle('moderation', 'autoModerateSpam')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Allow Reporting</label>
                <p className="text-xs text-gray-500">Users can report inappropriate content</p>
              </div>
              <Switch
                checked={settings.moderation.allowReporting}
                onCheckedChange={() => handleToggle('moderation', 'allowReporting')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Profanity Filter</label>
                <p className="text-xs text-gray-500">Automatically filter inappropriate language</p>
              </div>
              <Switch
                checked={settings.moderation.profanityFilter}
                onCheckedChange={() => handleToggle('moderation', 'profanityFilter')}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Reports Before Auto-Hide</label>
            <Input
              type="number"
              value={settings.moderation.maxReportsBeforeHide}
              onChange={(e) => handleInputChange('moderation', 'maxReportsBeforeHide', parseInt(e.target.value))}
              min="1"
              max="10"
              className="w-32"
            />
            <p className="text-xs text-gray-500 mt-1">Number of reports needed to automatically hide content</p>
          </div>
          <Button onClick={() => handleSaveSettings('Moderation')}>
            Save Moderation Settings
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>Configure admin and community notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Email Notifications</label>
                <p className="text-xs text-gray-500">Send email notifications to admins</p>
              </div>
              <Switch
                checked={settings.notifications.emailNotifications}
                onCheckedChange={() => handleToggle('notifications', 'emailNotifications')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">New Member Notifications</label>
                <p className="text-xs text-gray-500">Notify when new members join</p>
              </div>
              <Switch
                checked={settings.notifications.newMemberNotifications}
                onCheckedChange={() => handleToggle('notifications', 'newMemberNotifications')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Report Notifications</label>
                <p className="text-xs text-gray-500">Notify when content is reported</p>
              </div>
              <Switch
                checked={settings.notifications.reportNotifications}
                onCheckedChange={() => handleToggle('notifications', 'reportNotifications')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Weekly Digest</label>
                <p className="text-xs text-gray-500">Send weekly community activity summary</p>
              </div>
              <Switch
                checked={settings.notifications.weeklyDigest}
                onCheckedChange={() => handleToggle('notifications', 'weeklyDigest')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Admin Alerts</label>
                <p className="text-xs text-gray-500">Critical alerts for admin attention</p>
              </div>
              <Switch
                checked={settings.notifications.adminAlerts}
                onCheckedChange={() => handleToggle('notifications', 'adminAlerts')}
              />
            </div>
          </div>
          <Button onClick={() => handleSaveSettings('Notification')}>
            Save Notification Settings
          </Button>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>Privacy and data protection settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Public Member Directory</label>
                <p className="text-xs text-gray-500">Allow public viewing of member list</p>
              </div>
              <Switch
                checked={settings.privacy.publicDirectory}
                onCheckedChange={() => handleToggle('privacy', 'publicDirectory')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Allow Search Engines</label>
                <p className="text-xs text-gray-500">Allow search engines to index community content</p>
              </div>
              <Switch
                checked={settings.privacy.allowSearchEngines}
                onCheckedChange={() => handleToggle('privacy', 'allowSearchEngines')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Require Email Verification</label>
                <p className="text-xs text-gray-500">New members must verify their email</p>
              </div>
              <Switch
                checked={settings.privacy.requireEmailVerification}
                onCheckedChange={() => handleToggle('privacy', 'requireEmailVerification')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Allow Anonymous Posts</label>
                <p className="text-xs text-gray-500">Users can post without showing their name</p>
              </div>
              <Switch
                checked={settings.privacy.allowAnonymousPosts}
                onCheckedChange={() => handleToggle('privacy', 'allowAnonymousPosts')}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Data Retention (Days)</label>
            <Input
              type="number"
              value={settings.privacy.dataRetentionDays}
              onChange={(e) => handleInputChange('privacy', 'dataRetentionDays', parseInt(e.target.value))}
              min="30"
              max="3650"
              className="w-32"
            />
            <p className="text-xs text-gray-500 mt-1">How long to keep user data after account deletion</p>
          </div>
          <Button onClick={() => handleSaveSettings('Privacy')}>
            Save Privacy Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunitySettings;
