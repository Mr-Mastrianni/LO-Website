import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  BookOpen,
  Download,
  ExternalLink,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const ResourcesManager = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingResource, setEditingResource] = useState(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'guide',
    category: 'general',
    url: '',
    access: 'public',
    featured: false
  });

  // Mock data for now - replace with actual database calls
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setResources([
        {
          id: 1,
          title: 'Understanding Brain Cancer',
          description: 'Comprehensive guide to brain cancer types, symptoms, and treatment options.',
          type: 'guide',
          category: 'education',
          url: '/resources/brain-cancer-guide.pdf',
          access: 'public',
          featured: true,
          downloads: 245,
          created_at: '2024-01-10T10:00:00Z'
        },
        {
          id: 2,
          title: 'Nutrition During Treatment',
          description: 'Dietary guidelines and meal planning for cancer patients.',
          type: 'pdf',
          category: 'wellness',
          url: '/resources/nutrition-guide.pdf',
          access: 'public',
          featured: false,
          downloads: 156,
          created_at: '2024-01-15T14:30:00Z'
        },
        {
          id: 3,
          title: 'Clinical Trial Database',
          description: 'Access to current clinical trials for brain cancer patients.',
          type: 'link',
          category: 'research',
          url: 'https://clinicaltrials.gov',
          access: 'restricted',
          featured: true,
          downloads: 89,
          created_at: '2024-01-20T09:15:00Z'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingResource) {
        // Update existing resource
        setResources(resources.map(resource => 
          resource.id === editingResource.id ? { ...resource, ...formData } : resource
        ));

        toast({
          title: "Success",
          description: "Resource updated successfully.",
        });
      } else {
        // Create new resource
        const newResource = {
          id: Date.now(), // Temporary ID
          ...formData,
          downloads: 0,
          created_at: new Date().toISOString()
        };

        setResources([newResource, ...resources]);

        toast({
          title: "Success",
          description: "Resource created successfully.",
        });
      }

      resetForm();
    } catch (error) {
      console.error('Error saving resource:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save resource.",
      });
    }
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title,
      description: resource.description,
      type: resource.type,
      category: resource.category,
      url: resource.url,
      access: resource.access,
      featured: resource.featured
    });
    setFormDialogOpen(true);
  };

  const handleDelete = (resourceId) => {
    setResources(resources.filter(resource => resource.id !== resourceId));
    toast({
      title: "Success",
      description: "Resource deleted successfully.",
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'guide',
      category: 'general',
      url: '',
      access: 'public',
      featured: false
    });
    setEditingResource(null);
    setFormDialogOpen(false);
  };

  const filteredResources = resources.filter(resource =>
    resource.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getResourceTypeBadge = (type) => {
    const types = {
      'guide': { label: 'Guide', variant: 'default' },
      'pdf': { label: 'PDF', variant: 'secondary' },
      'video': { label: 'Video', variant: 'outline' },
      'link': { label: 'External Link', variant: 'destructive' }
    };
    const typeInfo = types[type] || types.guide;
    return <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>;
  };

  const getCategoryBadge = (category) => {
    const categories = {
      'education': { label: 'Education', color: 'bg-blue-100 text-blue-800' },
      'wellness': { label: 'Wellness', color: 'bg-green-100 text-green-800' },
      'research': { label: 'Research', color: 'bg-purple-100 text-purple-800' },
      'support': { label: 'Support', color: 'bg-orange-100 text-orange-800' },
      'general': { label: 'General', color: 'bg-gray-100 text-gray-800' }
    };
    const categoryInfo = categories[category] || categories.general;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
        {categoryInfo.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Resources</h3>
          <p className="text-sm text-gray-600">Manage educational resources and materials</p>
        </div>
        <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingResource ? 'Edit Resource' : 'Add New Resource'}
              </DialogTitle>
              <DialogDescription>
                {editingResource ? 'Update the resource details below.' : 'Create a new resource for the community.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Resource Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Resource title"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Resource description..."
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">URL or File Path</label>
                <Input
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  placeholder="https://example.com or /files/resource.pdf"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="guide">Guide</option>
                    <option value="pdf">PDF</option>
                    <option value="video">Video</option>
                    <option value="link">External Link</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="general">General</option>
                    <option value="education">Education</option>
                    <option value="wellness">Wellness</option>
                    <option value="research">Research</option>
                    <option value="support">Support</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Access Level</label>
                  <select
                    value={formData.access}
                    onChange={(e) => setFormData({...formData, access: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="public">Public</option>
                    <option value="restricted">Restricted</option>
                    <option value="members-only">Members Only</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="rounded"
                  />
                  <label htmlFor="featured" className="text-sm font-medium">Featured Resource</label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingResource ? 'Update' : 'Create'} Resource
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-sm">{resource.title}</h4>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(resource)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(resource.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {resource.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                {getCategoryBadge(resource.category)}
                {getResourceTypeBadge(resource.type)}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Download className="h-4 w-4 mr-1" />
                {resource.downloads} downloads
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {resource.access === 'restricted' && (
                  <Badge variant="outline">Restricted</Badge>
                )}
                {resource.featured && (
                  <Badge variant="secondary">Featured</Badge>
                )}
              </div>
              <span className="text-xs text-gray-500">
                {formatDate(resource.created_at)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No resources found</h3>
          <p className="text-sm">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first resource.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResourcesManager;
