import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  UserPlus,
  UserMinus,
  Crown,
  Settings
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const GroupsManager = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingGroup, setEditingGroup] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'support',
    privacy: 'public',
    max_members: ''
  });

  // Mock data for groups
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setGroups([
        {
          id: 1,
          name: 'Brain Cancer Support',
          description: 'A supportive community for brain cancer patients and their families.',
          type: 'support',
          privacy: 'public',
          members: 45,
          max_members: 100,
          moderators: ['Dr. Sarah Johnson', 'Michael R.'],
          created_at: '2024-01-10T10:00:00Z',
          last_activity: '2024-01-21T15:30:00Z'
        },
        {
          id: 2,
          name: 'Caregivers Circle',
          description: 'Dedicated space for caregivers to share experiences and advice.',
          type: 'support',
          privacy: 'public',
          members: 32,
          max_members: 50,
          moderators: ['Lisa M.'],
          created_at: '2024-01-15T14:20:00Z',
          last_activity: '2024-01-21T12:45:00Z'
        },
        {
          id: 3,
          name: 'Treatment Research Updates',
          description: 'Latest research and treatment developments discussion.',
          type: 'educational',
          privacy: 'restricted',
          members: 18,
          max_members: 25,
          moderators: ['Dr. Emily Chen'],
          created_at: '2024-01-18T09:15:00Z',
          last_activity: '2024-01-21T10:20:00Z'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingGroup) {
        // Update existing group
        setGroups(groups.map(group => 
          group.id === editingGroup.id ? { ...group, ...formData } : group
        ));

        toast({
          title: "Success",
          description: "Group updated successfully.",
        });
      } else {
        // Create new group
        const newGroup = {
          id: Date.now(), // Temporary ID
          ...formData,
          members: 0,
          moderators: [],
          created_at: new Date().toISOString(),
          last_activity: new Date().toISOString()
        };

        setGroups([newGroup, ...groups]);

        toast({
          title: "Success",
          description: "Group created successfully.",
        });
      }

      resetForm();
    } catch (error) {
      console.error('Error saving group:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save group.",
      });
    }
  };

  const handleEdit = (group) => {
    setEditingGroup(group);
    setFormData({
      name: group.name,
      description: group.description,
      type: group.type,
      privacy: group.privacy,
      max_members: group.max_members.toString()
    });
    setFormDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!groupToDelete) return;

    setGroups(groups.filter(group => group.id !== groupToDelete.id));
    setDeleteDialogOpen(false);
    setGroupToDelete(null);

    toast({
      title: "Success",
      description: "Group deleted successfully.",
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      type: 'support',
      privacy: 'public',
      max_members: ''
    });
    setEditingGroup(null);
    setFormDialogOpen(false);
  };

  const filteredGroups = groups.filter(group =>
    group.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeBadge = (type) => {
    const types = {
      'support': { label: 'Support', variant: 'default' },
      'educational': { label: 'Educational', variant: 'secondary' },
      'social': { label: 'Social', variant: 'outline' },
      'professional': { label: 'Professional', variant: 'destructive' }
    };
    const typeInfo = types[type] || types.support;
    return <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>;
  };

  const getPrivacyBadge = (privacy) => {
    const privacyColors = {
      'public': 'bg-green-100 text-green-800',
      'restricted': 'bg-yellow-100 text-yellow-800',
      'private': 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${privacyColors[privacy]}`}>
        {privacy.charAt(0).toUpperCase() + privacy.slice(1)}
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
          <h3 className="text-lg font-semibold">Groups Management</h3>
          <p className="text-sm text-gray-600">Create and manage community groups</p>
        </div>
        <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingGroup ? 'Edit Group' : 'Create New Group'}
              </DialogTitle>
              <DialogDescription>
                {editingGroup ? 'Update the group details below.' : 'Create a new community group.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Group Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Group name"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Group description..."
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Group Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="support">Support</option>
                    <option value="educational">Educational</option>
                    <option value="social">Social</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Privacy</label>
                  <select
                    value={formData.privacy}
                    onChange={(e) => setFormData({...formData, privacy: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="public">Public</option>
                    <option value="restricted">Restricted</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Maximum Members</label>
                <Input
                  type="number"
                  value={formData.max_members}
                  onChange={(e) => setFormData({...formData, max_members: e.target.value})}
                  placeholder="Leave empty for unlimited"
                  min="1"
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingGroup ? 'Update' : 'Create'} Group
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
          placeholder="Search groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">{group.name}</h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{group.description}</p>
              </div>
              <div className="flex space-x-1 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(group)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setGroupToDelete(group);
                    setDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                {getTypeBadge(group.type)}
                {getPrivacyBadge(group.privacy)}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {group.members}/{group.max_members || '∞'} members
                </span>
                <span className="flex items-center">
                  <Crown className="h-4 w-4 mr-1" />
                  {group.moderators.length} mods
                </span>
              </div>

              <div className="text-xs text-gray-500">
                <div>Created: {formatDate(group.created_at)}</div>
                <div>Last activity: {formatDate(group.last_activity)}</div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <UserPlus className="h-3 w-3 mr-1" />
                Manage Members
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No groups found</h3>
          <p className="text-sm">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first group.'}
          </p>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the group "{groupToDelete?.name}" and remove all {groupToDelete?.members} members. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete Group
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default GroupsManager;
