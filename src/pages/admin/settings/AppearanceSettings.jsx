import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Palette, Upload, Eye, Monitor } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

const AppearanceSettings = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    accentColor: '#F59E0B',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    darkMode: false,
    customLogo: '',
    favicon: '',
    fontFamily: 'Inter',
    fontSize: 'medium',
    borderRadius: 'medium',
    showBranding: true
  });

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
      title: "Appearance Settings Saved",
      description: "Theme and visual settings have been updated successfully.",
    });
  };

  const fontOptions = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Poppins', label: 'Poppins' }
  ];

  const sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  return (
    <div className="space-y-6">
      {/* Color Scheme */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Scheme
          </CardTitle>
          <CardDescription>Customize your site's color palette</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Primary Color</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={settings.primaryColor}
                  onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Secondary Color</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={settings.secondaryColor}
                  onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Accent Color</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={settings.accentColor}
                  onChange={(e) => handleInputChange('accentColor', e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={settings.accentColor}
                  onChange={(e) => handleInputChange('accentColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Background Color</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={settings.backgroundColor}
                  onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Dark Mode</label>
              <p className="text-xs text-gray-500">Enable dark theme for the website</p>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={() => handleToggle('darkMode')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Branding */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Branding
          </CardTitle>
          <CardDescription>Upload your logo and branding assets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Logo Upload</label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">
                Drag and drop your logo here, or click to select
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Recommended: PNG or SVG, max 2MB
              </p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Favicon Upload</label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">
                Upload your favicon (16x16 or 32x32 pixels)
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Recommended: ICO or PNG format
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Show Branding</label>
              <p className="text-xs text-gray-500">Display "Powered by" branding</p>
            </div>
            <Switch
              checked={settings.showBranding}
              onCheckedChange={() => handleToggle('showBranding')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
          <CardDescription>Configure fonts and text styling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Font Family</label>
              <select
                value={settings.fontFamily}
                onChange={(e) => handleInputChange('fontFamily', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {fontOptions.map(font => (
                  <option key={font.value} value={font.value}>{font.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Font Size</label>
              <select
                value={settings.fontSize}
                onChange={(e) => handleInputChange('fontSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {sizeOptions.map(size => (
                  <option key={size.value} value={size.value}>{size.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Border Radius</label>
              <select
                value={settings.borderRadius}
                onChange={(e) => handleInputChange('borderRadius', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="none">None</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Preview
          </CardTitle>
          <CardDescription>Preview your appearance changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-6" style={{ 
            backgroundColor: settings.backgroundColor,
            color: settings.textColor,
            fontFamily: settings.fontFamily
          }}>
            <div className="flex items-center space-x-4 mb-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: settings.primaryColor }}
              >
                LO
              </div>
              <div>
                <h3 className="font-bold text-lg">Living Oncology</h3>
                <p className="text-sm opacity-70">Supporting brain cancer patients and families</p>
              </div>
            </div>
            <div className="space-y-3">
              <button 
                className="px-4 py-2 rounded text-white font-medium"
                style={{ backgroundColor: settings.primaryColor }}
              >
                Primary Button
              </button>
              <button 
                className="px-4 py-2 rounded text-white font-medium ml-2"
                style={{ backgroundColor: settings.secondaryColor }}
              >
                Secondary Button
              </button>
              <div 
                className="p-3 rounded border-l-4"
                style={{ 
                  borderLeftColor: settings.accentColor,
                  backgroundColor: settings.accentColor + '10'
                }}
              >
                <p className="text-sm">This is a sample notification or highlight box.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Save Appearance Settings
        </Button>
      </div>
    </div>
  );
};

export default AppearanceSettings;
