import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Globe, Save, Upload, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const GeneralSettings = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    siteName: 'Living Oncology',
    siteDescription: 'A supportive community for brain cancer patients, survivors, and their families.',
    siteUrl: 'https://livingoncology.org',
    contactEmail: 'info@livingoncology.org',
    supportEmail: 'support@livingoncology.org',
    phoneNumber: '+1 (555) 123-4567',
    address: '123 Medical Center Drive, Healthcare City, HC 12345',
    timezone: 'America/New_York',
    language: 'en',
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    googleAnalyticsId: '',
    facebookPixelId: '',
    metaKeywords: 'brain cancer, oncology, support, community, survivors',
    metaDescription: 'Join our supportive community for brain cancer patients, survivors, and families. Find resources, connect with others, and access expert guidance.',
    socialMediaLinks: {
      facebook: 'https://facebook.com/livingoncology',
      twitter: 'https://twitter.com/livingoncology',
      instagram: 'https://instagram.com/livingoncology',
      linkedin: 'https://linkedin.com/company/livingoncology'
    }
  });

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully.",
    });
  };

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' }
  ];

  return (
    <div className="space-y-6">
      {/* Site Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Site Information
          </CardTitle>
          <CardDescription>Basic information about your website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Site Name</label>
              <Input
                value={settings.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
                placeholder="Your site name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Site URL</label>
              <Input
                value={settings.siteUrl}
                onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                placeholder="https://yoursite.com"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Site Description</label>
            <Textarea
              value={settings.siteDescription}
              onChange={(e) => handleInputChange('siteDescription', e.target.value)}
              placeholder="Brief description of your website"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Contact Email</label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                placeholder="contact@yoursite.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Support Email</label>
              <Input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                placeholder="support@yoursite.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Contact Information
          </CardTitle>
          <CardDescription>Physical contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <Input
              value={settings.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Address</label>
            <Textarea
              value={settings.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Your organization's address"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Localization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Localization
          </CardTitle>
          <CardDescription>Language and timezone settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {timezones.map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Default Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Site Features */}
      <Card>
        <CardHeader>
          <CardTitle>Site Features</CardTitle>
          <CardDescription>Control site functionality and access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Maintenance Mode</label>
              <p className="text-xs text-gray-500">Temporarily disable site access for maintenance</p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Allow User Registration</label>
              <p className="text-xs text-gray-500">Allow new users to create accounts</p>
            </div>
            <Switch
              checked={settings.allowRegistration}
              onCheckedChange={(checked) => handleInputChange('allowRegistration', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Require Email Verification</label>
              <p className="text-xs text-gray-500">New users must verify their email address</p>
            </div>
            <Switch
              checked={settings.requireEmailVerification}
              onCheckedChange={(checked) => handleInputChange('requireEmailVerification', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle>SEO & Analytics</CardTitle>
          <CardDescription>Search engine optimization and tracking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Meta Description</label>
            <Textarea
              value={settings.metaDescription}
              onChange={(e) => handleInputChange('metaDescription', e.target.value)}
              placeholder="Description for search engines"
              rows={2}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Meta Keywords</label>
            <Input
              value={settings.metaKeywords}
              onChange={(e) => handleInputChange('metaKeywords', e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Google Analytics ID</label>
              <Input
                value={settings.googleAnalyticsId}
                onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                placeholder="GA-XXXXXXXXX-X"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Facebook Pixel ID</label>
              <Input
                value={settings.facebookPixelId}
                onChange={(e) => handleInputChange('facebookPixelId', e.target.value)}
                placeholder="123456789012345"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>Links to your social media profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Facebook</label>
              <Input
                value={settings.socialMediaLinks.facebook}
                onChange={(e) => handleInputChange('socialMediaLinks.facebook', e.target.value)}
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Twitter</label>
              <Input
                value={settings.socialMediaLinks.twitter}
                onChange={(e) => handleInputChange('socialMediaLinks.twitter', e.target.value)}
                placeholder="https://twitter.com/youraccount"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Instagram</label>
              <Input
                value={settings.socialMediaLinks.instagram}
                onChange={(e) => handleInputChange('socialMediaLinks.instagram', e.target.value)}
                placeholder="https://instagram.com/youraccount"
              />
            </div>
            <div>
              <label className="text-sm font-medium">LinkedIn</label>
              <Input
                value={settings.socialMediaLinks.linkedin}
                onChange={(e) => handleInputChange('socialMediaLinks.linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save General Settings
        </Button>
      </div>
    </div>
  );
};

export default GeneralSettings;
