import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Globe, 
  Mail, 
  Shield,
  Database,
  Palette,
  Bell,
  Users,
  FileText,
  Backup
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettings from './settings/GeneralSettings';
import SecuritySettings from './settings/SecuritySettings';
import EmailSettings from './settings/EmailSettings';
import AppearanceSettings from './settings/AppearanceSettings';
import DatabaseSettings from './settings/DatabaseSettings';
import BackupSettings from './settings/BackupSettings';

const SettingsPanel = () => {
  const [activeTab, setActiveTab] = useState('general');

  const settingsAreas = [
    {
      id: 'general',
      name: 'General',
      icon: Globe,
      description: 'Site information and basic configuration',
      color: 'text-blue-600'
    },
    {
      id: 'security',
      name: 'Security',
      icon: Shield,
      description: 'Authentication and access control',
      color: 'text-red-600'
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      description: 'Email configuration and templates',
      color: 'text-green-600'
    },
    {
      id: 'appearance',
      name: 'Appearance',
      icon: Palette,
      description: 'Theme and visual customization',
      color: 'text-purple-600'
    },
    {
      id: 'database',
      name: 'Database',
      icon: Database,
      description: 'Database management and optimization',
      color: 'text-orange-600'
    },
    {
      id: 'backup',
      name: 'Backup',
      icon: Backup,
      description: 'Data backup and recovery options',
      color: 'text-gray-600'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Settings
          </CardTitle>
          <CardDescription>
            Configure site settings, security, and system preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Settings Areas Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {settingsAreas.map((area) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  activeTab === area.id ? 'border-primary bg-primary/5' : 'hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(area.id)}
              >
                <area.icon className={`h-5 w-5 ${area.color} mb-2`} />
                <h3 className="font-medium text-sm">{area.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{area.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Settings Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
              <TabsTrigger value="backup">Backup</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <GeneralSettings />
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <SecuritySettings />
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              <EmailSettings />
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
              <AppearanceSettings />
            </TabsContent>

            <TabsContent value="database" className="space-y-4">
              <DatabaseSettings />
            </TabsContent>

            <TabsContent value="backup" className="space-y-4">
              <BackupSettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPanel;
