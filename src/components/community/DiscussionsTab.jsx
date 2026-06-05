import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, MessageCircle, Loader2, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import CreatePostModal from './CreatePostModal';
import PostDetailModal from './PostDetailModal';

const DiscussionsTab = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    fetchCategoryStats();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      // Fetch posts
      const { data: postsData, error: postsError } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (postsError) throw postsError;

      // Fetch user details for each post
      if (postsData && postsData.length > 0) {
        const userIds = [...new Set(postsData.map(post => post.user_id))];
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds);

        if (profilesError) {
          console.error('Error fetching profiles:', profilesError);
        }

        // Merge profile data with posts
        const postsWithProfiles = postsData.map(post => ({
          ...post,
          profile: profilesData?.find(p => p.id === post.user_id) || null
        }));

        setPosts(postsWithProfiles);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategoryStats = async () => {
    try {
      const categories = [
        { id: 'general', name: 'General Discussion', description: 'Open forum for general questions, introductions, and community conversations' },
        { id: 'treatment', name: 'Treatment Q&A', description: 'Questions and discussions about treatments, side effects, and medical care' },
        { id: 'research', name: 'Clinical Trials', description: 'Information and discussions about clinical trial opportunities and experiences' },
        { id: 'wellness', name: 'Wellness & Lifestyle', description: 'Tips and discussions about nutrition, exercise, and maintaining wellness during treatment' },
        { id: 'support', name: 'Support & Encouragement', description: 'Share your journey and find emotional support from the community' },
        { id: 'caregiver', name: 'Caregiver Support', description: 'Resources and discussions for caregivers of cancer patients' }
      ];

      const statsPromises = categories.map(async (category) => {
        const { count } = await supabase
          .from('community_posts')
          .select('*', { count: 'exact', head: true })
          .eq('category', category.id);

        // Get most recent post for this category
        const { data: recentPost } = await supabase
          .from('community_posts')
          .select('created_at')
          .eq('category', category.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle(); // Use maybeSingle() instead of single() to handle 0 results

        return {
          ...category,
          posts: count || 0,
          lastActivity: recentPost ? formatTimeAgo(recentPost.created_at) : 'No activity yet'
        };
      });

      const stats = await Promise.all(statsPromises);
      setCategoryStats(stats);
    } catch (error) {
      console.error('Error fetching category stats:', error);
    }
  };

  const handlePostCreated = (newPost) => {
    // Refresh posts and stats
    fetchPosts();
    fetchCategoryStats();
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setIsDetailOpen(true);
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-primary">Forum Discussions</h3>
          {user ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary inline-flex items-center"
            >
              <PlusCircle className="mr-2 w-4 h-4" />
              Create Post
            </button>
          ) : (
            <Link
              to="/login"
              className="btn-secondary inline-flex items-center"
            >
              <LogIn className="mr-2 w-4 h-4" />
              Log in to Post
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-bold text-primary mb-6">Forum Categories</h4>
            {categoryStats.length === 0 ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-4">
                {categoryStats.map((category) => (
                  <div key={category.id} className="bg-white rounded-lg p-6 shadow-lg card-hover">
                    <div className="flex items-start justify-between mb-3">
                      <h5 className="text-lg font-semibold text-primary">{category.name}</h5>
                      <MessageCircle className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-gray-700 text-sm mb-3">{category.description}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{category.posts} {category.posts === 1 ? 'post' : 'posts'}</span>
                      <span>Last activity: {category.lastActivity}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-6">Recent Posts</h4>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white rounded-lg p-12 shadow-lg text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">No posts yet. Be the first to start a discussion!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg p-6 shadow-lg card-hover">
                    <h5 className="text-lg font-semibold text-primary mb-2">{post.title}</h5>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span>by {post.profile?.full_name || 'Anonymous'}</span>
                      <span>in {post.category}</span>
                      <span>{formatTimeAgo(post.created_at)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.likes} likes</span>
                      <button
                        onClick={() => handleViewPost(post)}
                        className="text-primary hover:text-gray-800 text-sm font-semibold"
                      >
                        View Discussion
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={handlePostCreated}
      />

      {/* Post Detail Modal */}
      <PostDetailModal
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedPost(null);
        }}
        post={selectedPost}
      />
    </>
  );
};

export default DiscussionsTab;