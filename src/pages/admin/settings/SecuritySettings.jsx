import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Shield, Lock, Key, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const SecuritySettings = () => {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
    allowPasswordReset: true,
    requireEmailVerification: true,
    enableCaptcha: true,
    allowRememberMe: true,
    forcePasswordChange: 90,
    apiKeyRotation: 30,
    enableAuditLog: true,
    ipWhitelist: '',
    corsOrigins: 'https://livingoncology.org',
    rateLimitRequests: 100,
    rateLimitWindow: 15
  });

  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Main API Key', key: 'sk_live_abc123...xyz789', created: '2024-01-15', lastUsed: '2024-01-21', status: 'active' },
    { id: 2, name: 'Analytics API', key: 'sk_live_def456...uvw012', created: '2024-01-10', lastUsed: '2024-01-20', status: 'active' },
    { id: 3, name: 'Backup Service', key: 'sk_live_ghi789...rst345', created: '2024-01-05', lastUsed: 'Never', status: 'inactive' }
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
      title: "Security Settings Saved",
      description: "Security configuration has been updated successfully.",
    });
  };

  const handleGenerateApiKey = () => {
    const newKey = {
      id: Date.now(),
      name: 'New API Key',
      key: 'sk_live_' + Math.random().toString(36).substring(2, 15) + '...' + Math.random().toString(36).substring(2, 8),
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'active'
    };
    setApiKeys([...apiKeys, newKey]);
    toast({
      title: "API Key Generated",
      description: "New API key has been created successfully.",
    });
  };

  const handleRevokeApiKey = (keyId) => {
    setApiKeys(apiKeys.map(key => 
      key.id === keyId ? { ...key, status: 'revoked' } : key
    ));
    toast({
      title: "API Key Revoked",
      description: "API key has been revoked successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Authentication Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Authentication Settings
          </CardTitle>
          <CardDescription>Configure user authentication and access control</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Two-Factor Authentication</label>
              <p className="text-xs text-gray-500">Require 2FA for admin accounts</p>
            </div>
            <Switch
              checked={settings.twoFactorAuth}
              onCheckedChange={() => handleToggle('twoFactorAuth')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Email Verification Required</label>
              <p className="text-xs text-gray-500">Users must verify email before access</p>
            </div>
            <Switch
              checked={settings.requireEmailVerification}
              onCheckedChange={() => handleToggle('requireEmailVerification')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Enable CAPTCHA</label>
              <p className="text-xs text-gray-500">Protect forms from automated attacks</p>
            </div>
            <Switch
              checked={settings.enableCaptcha}
              onCheckedChange={() => handleToggle('enableCaptcha')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Allow "Remember Me"</label>
              <p className="text-xs text-gray-500">Users can stay logged in longer</p>
            </div>
            <Switch
              checked={settings.allowRememberMe}
              onCheckedChange={() => handleToggle('allowRememberMe')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Password Policy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Password Policy
          </CardTitle>
          <CardDescription>Set password requirements and security rules</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Minimum Password Length</label>
              <Input
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => handleInputChange('passwordMinLength', parseInt(e.target.value))}
                min="6"
                max="32"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Force Password Change (days)</label>
              <Input
                type="number"
                value={settings.forcePasswordChange}
                onChange={(e) => handleInputChange('forcePasswordChange', parseInt(e.target.value))}
                min="30"
                max="365"
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Require Special Characters</label>
              <Switch
                checked={settings.requireSpecialChars}
                onCheckedChange={() => handleToggle('requireSpecialChars')}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Require Numbers</label>
              <Switch
                checked={settings.requireNumbers}
                onCheckedChange={() => handleToggle('requireNumbers')}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Require Uppercase Letters</label>
              <Switch
                checked={settings.requireUppercase}
                onCheckedChange={() => handleToggle('requireUppercase')}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Allow Password Reset</label>
              <Switch
                checked={settings.allowPasswordReset}
                onCheckedChange={() => handleToggle('allowPasswordReset')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session & Login Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Session & Login Security
          </CardTitle>
          <CardDescription>Configure session timeouts and login protection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Session Timeout (minutes)</label>
              <Input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                min="5"
                max="480"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Max Login Attempts</label>
              <Input
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => handleInputChange('maxLoginAttempts', parseInt(e.target.value))}
                min="3"
                max="10"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Lockout Duration (minutes)</label>
              <Input
                type="number"
                value={settings.lockoutDuration}
                onChange={(e) => handleInputChange('lockoutDuration', parseInt(e.target.value))}
                min="5"
                max="60"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            API Security
          </CardTitle>
          <CardDescription>Manage API keys and access controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Rate Limit (requests per window)</label>
              <Input
                type="number"
                value={settings.rateLimitRequests}
                onChange={(e) => handleInputChange('rateLimitRequests', parseInt(e.target.value))}
                min="10"
                max="1000"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Rate Limit Window (minutes)</label>
              <Input
                type="number"
                value={settings.rateLimitWindow}
                onChange={(e) => handleInputChange('rateLimitWindow', parseInt(e.target.value))}
                min="1"
                max="60"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">CORS Origins</label>
            <Input
              value={settings.corsOrigins}
              onChange={(e) => handleInputChange('corsOrigins', e.target.value)}
              placeholder="https://yourdomain.com, https://api.yourdomain.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">IP Whitelist (optional)</label>
            <Input
              value={settings.ipWhitelist}
              onChange={(e) => handleInputChange('ipWhitelist', e.target.value)}
              placeholder="192.168.1.1, 10.0.0.1"
            />
          </div>
        </CardContent>
      </Card>

      {/* API Keys Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys and access tokens</CardDescription>
            </div>
            <Button onClick={handleGenerateApiKey}>
              <Key className="h-4 w-4 mr-2" />
              Generate New Key
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{apiKey.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {showApiKey ? apiKey.key : apiKey.key.replace(/(?<=.{8}).*(?=.{8})/, '•'.repeat(20))}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Created: {apiKey.created} • Last used: {apiKey.lastUsed}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'}>
                    {apiKey.status}
                  </Badge>
                  {apiKey.status === 'active' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRevokeApiKey(apiKey.id)}
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audit & Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle>Audit & Monitoring</CardTitle>
          <CardDescription>Security monitoring and logging</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Enable Audit Logging</label>
              <p className="text-xs text-gray-500">Log all admin actions and security events</p>
            </div>
            <Switch
              checked={settings.enableAuditLog}
              onCheckedChange={() => handleToggle('enableAuditLog')}
            />
          </div>
          <div>
            <label className="text-sm font-medium">API Key Rotation (days)</label>
            <Input
              type="number"
              value={settings.apiKeyRotation}
              onChange={(e) => handleInputChange('apiKeyRotation', parseInt(e.target.value))}
              min="7"
              max="365"
            />
            <p className="text-xs text-gray-500 mt-1">Automatically rotate API keys after this period</p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Save Security Settings
        </Button>
      </div>
    </div>
  );
};

export default SecuritySettings;
