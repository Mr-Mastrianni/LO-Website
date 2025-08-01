import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Calendar, 
  BookOpen, 
  Image,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import TestimonialsManager from './content/TestimonialsManager';
import EventsManager from './content/EventsManager';
import ResourcesManager from './content/ResourcesManager';
import PhotoGalleryManager from './content/PhotoGalleryManager';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('testimonials');

  const contentTypes = [
    {
      id: 'testimonials',
      name: 'Testimonials',
      icon: FileText,
      description: 'Manage community testimonials and stories',
      color: 'text-blue-600'
    },
    {
      id: 'events',
      name: 'Events',
      icon: Calendar,
      description: 'Create and manage BrainStorm Cancer events',
      color: 'text-green-600'
    },
    {
      id: 'resources',
      name: 'Resources',
      icon: BookOpen,
      description: 'Educational resources and materials',
      color: 'text-purple-600'
    },
    {
      id: 'gallery',
      name: 'Photo Gallery',
      icon: Image,
      description: 'Manage photos and media content',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Content Management
          </CardTitle>
          <CardDescription>
            Manage all website content including testimonials, events, resources, and media
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Content Type Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {contentTypes.map((type) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  activeTab === type.id ? 'border-primary bg-primary/5' : 'hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(type.id)}
              >
                <type.icon className={`h-6 w-6 ${type.color} mb-2`} />
                <h3 className="font-medium text-sm">{type.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{type.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Content Management Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="testimonials" className="space-y-4">
              <TestimonialsManager />
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <EventsManager />
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <ResourcesManager />
            </TabsContent>

            <TabsContent value="gallery" className="space-y-4">
              <PhotoGalleryManager />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
