import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  MessageSquare,
  Search,
  Filter,
  Eye,
  EyeOff,
  Trash2,
  Flag,
  User,
  Clock,
  MessageCircle,
  Pin,
  PinOff,
  Loader2
} from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

const DiscussionModerator = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [discussionToDelete, setDiscussionToDelete] = useState(null);

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    setLoading(true);
    try {
      // Fetch all posts
      const { data: postsData, error: postsError } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // Fetch user details for each post
      if (postsData && postsData.length > 0) {
        const userIds = [...new Set(postsData.map(post => post.user_id))];
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds);

        // Merge profile data with posts
        const postsWithProfiles = postsData.map(post => ({
          id: post.id,
          title: post.title,
          content: post.content,
          author: profilesData?.find(p => p.id === post.user_id)?.full_name || 'Anonymous',
          author_id: post.user_id,
          category: post.category,
          likes: post.likes || 0,
          replies: 0, // Would need a replies table
          views: 0, // Would need view tracking
          status: 'active', // All posts are active by default
          pinned: false,
          reported: false,
          created_at: post.created_at,
          last_activity: post.updated_at || post.created_at
        }));

        setDiscussions(postsWithProfiles);
      } else {
        setDiscussions([]);
      }
    } catch (error) {
      console.error('Error fetching discussions:', error);
      toast.error('Failed to load discussions');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDiscussion = async () => {
    if (!discussionToDelete) return;

    try {
      const { error } = await supabase
        .from('community_posts')
        .delete()
        .eq('id', discussionToDelete.id);

      if (error) throw error;

      setDiscussions(discussions.filter(discussion => discussion.id !== discussionToDelete.id));
      toast.success('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    } finally {
      setDeleteDialogOpen(false);
      setDiscussionToDelete(null);
    }
  };

  const handleToggleVisibility = (discussionId, currentStatus) => {
    // This would require adding a status column to community_posts
    toast.info('Hide/Show feature requires database schema update');
  };

  const handleTogglePin = (discussionId, currentPinned) => {
    // This would require adding a pinned column to community_posts
    toast.info('Pin feature requires database schema update');
  };

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' ||
      discussion.status === filterStatus ||
      (filterStatus === 'reported' && discussion.reported) ||
      (filterStatus === 'pinned' && discussion.pinned);
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (discussion) => {
    if (discussion.reported) {
      return <Badge variant="destructive">Reported</Badge>;
    }
    if (discussion.status === 'hidden') {
      return <Badge variant="secondary">Hidden</Badge>;
    }
    if (discussion.pinned) {
      return <Badge variant="default">Pinned</Badge>;
    }
    return <Badge variant="outline">Active</Badge>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Discussion Moderation</h3>
          <p className="text-sm text-gray-600">Monitor and moderate community discussions</p>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search discussions by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Discussions</option>
          <option value="active">Active</option>
          <option value="hidden">Hidden</option>
          <option value="reported">Reported</option>
          <option value="pinned">Pinned</option>
        </select>
      </div>

      {/* Discussions Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Discussion</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDiscussions.map((discussion) => (
                <TableRow key={discussion.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-sm">{discussion.title}</h4>
                        {discussion.pinned && <Pin className="h-3 w-3 text-primary" />}
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1">{discussion.content}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {discussion.replies} replies
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {discussion.likes} likes
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <User className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm">{discussion.author}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{discussion.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-gray-500">
                      <div>Created: {formatDate(discussion.created_at)}</div>
                      <div>Last: {formatDate(discussion.last_activity)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(discussion)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Moderation Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleToggleVisibility(discussion.id, discussion.status)}
                        >
                          {discussion.status === 'active' ? (
                            <>
                              <EyeOff className="mr-2 h-4 w-4" />
                              Hide Discussion
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 h-4 w-4" />
                              Show Discussion
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleTogglePin(discussion.id, discussion.pinned)}
                        >
                          {discussion.pinned ? (
                            <>
                              <PinOff className="mr-2 h-4 w-4" />
                              Unpin Discussion
                            </>
                          ) : (
                            <>
                              <Pin className="mr-2 h-4 w-4" />
                              Pin Discussion
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setDiscussionToDelete(discussion);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Discussion
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredDiscussions.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No discussions found</h3>
          <p className="text-sm">
            {searchTerm ? 'Try adjusting your search terms.' : 'No discussions match the current filter.'}
          </p>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the discussion "{discussionToDelete?.title}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDiscussion} className="bg-red-600 hover:bg-red-700">
              Delete Discussion
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DiscussionModerator;
