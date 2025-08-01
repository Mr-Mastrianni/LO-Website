import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Image,
  Upload,
  Eye,
  Calendar
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

const PhotoGalleryManager = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'events',
    alt_text: '',
    featured: false
  });

  // Mock data for now - replace with actual database calls
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPhotos([
        {
          id: 1,
          title: 'BrainStorm Cancer Workshop 2024',
          description: 'Community members participating in our annual workshop.',
          url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
          category: 'events',
          alt_text: 'Group of people in a workshop setting',
          featured: true,
          views: 245,
          created_at: '2024-01-15T10:00:00Z'
        },
        {
          id: 2,
          title: 'Support Group Meeting',
          description: 'Monthly support group gathering.',
          url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
          category: 'community',
          alt_text: 'People sitting in a circle during support group',
          featured: false,
          views: 156,
          created_at: '2024-01-20T14:30:00Z'
        },
        {
          id: 3,
          title: 'Medical Team Collaboration',
          description: 'Healthcare professionals working together.',
          url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
          category: 'medical',
          alt_text: 'Medical professionals in discussion',
          featured: true,
          views: 189,
          created_at: '2024-01-25T09:15:00Z'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingPhoto) {
        // Update existing photo
        setPhotos(photos.map(photo => 
          photo.id === editingPhoto.id ? { ...photo, ...formData } : photo
        ));

        toast({
          title: "Success",
          description: "Photo updated successfully.",
        });
      } else {
        // Create new photo entry
        const newPhoto = {
          id: Date.now(), // Temporary ID
          ...formData,
          url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400', // Placeholder
          views: 0,
          created_at: new Date().toISOString()
        };

        setPhotos([newPhoto, ...photos]);

        toast({
          title: "Success",
          description: "Photo added successfully.",
        });
      }

      resetForm();
    } catch (error) {
      console.error('Error saving photo:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save photo.",
      });
    }
  };

  const handleEdit = (photo) => {
    setEditingPhoto(photo);
    setFormData({
      title: photo.title,
      description: photo.description,
      category: photo.category,
      alt_text: photo.alt_text,
      featured: photo.featured
    });
    setFormDialogOpen(true);
  };

  const handleDelete = (photoId) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
    toast({
      title: "Success",
      description: "Photo deleted successfully.",
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'events',
      alt_text: '',
      featured: false
    });
    setEditingPhoto(null);
    setFormDialogOpen(false);
  };

  const filteredPhotos = photos.filter(photo =>
    photo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    photo.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryBadge = (category) => {
    const categories = {
      'events': { label: 'Events', color: 'bg-blue-100 text-blue-800' },
      'community': { label: 'Community', color: 'bg-green-100 text-green-800' },
      'medical': { label: 'Medical', color: 'bg-purple-100 text-purple-800' },
      'facilities': { label: 'Facilities', color: 'bg-orange-100 text-orange-800' },
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
          <h3 className="text-lg font-semibold">Photo Gallery</h3>
          <p className="text-sm text-gray-600">Manage photos and media content</p>
        </div>
        <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Photo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingPhoto ? 'Edit Photo' : 'Add New Photo'}
              </DialogTitle>
              <DialogDescription>
                {editingPhoto ? 'Update the photo details below.' : 'Add a new photo to the gallery.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Photo Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Photo title"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Photo description..."
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Alt Text (for accessibility)</label>
                <Input
                  value={formData.alt_text}
                  onChange={(e) => setFormData({...formData, alt_text: e.target.value})}
                  placeholder="Describe what's in the photo"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="events">Events</option>
                    <option value="community">Community</option>
                    <option value="medical">Medical</option>
                    <option value="facilities">Facilities</option>
                    <option value="general">General</option>
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
                  <label htmlFor="featured" className="text-sm font-medium">Featured Photo</label>
                </div>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Photo upload functionality would be implemented here
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Drag and drop or click to select files
                </p>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPhoto ? 'Update' : 'Add'} Photo
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
          placeholder="Search photos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhotos.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img
                src={photo.url}
                alt={photo.alt_text}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEdit(photo)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDelete(photo.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>

            <div className="p-4">
              <h4 className="font-semibold text-sm mb-2 line-clamp-1">{photo.title}</h4>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{photo.description}</p>

              <div className="flex justify-between items-center mb-2">
                {getCategoryBadge(photo.category)}
                {photo.featured && (
                  <Badge variant="secondary">Featured</Badge>
                )}
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {photo.views} views
                </div>
                <span>{formatDate(photo.created_at)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Image className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No photos found</h3>
          <p className="text-sm">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first photo.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PhotoGalleryManager;
