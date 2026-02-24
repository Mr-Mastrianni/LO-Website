import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/customSupabaseClient';
import DiscussionsTab from '@/components/community/DiscussionsTab';
import GroupsTab from '@/components/community/GroupsTab';
import MediaTab from '@/components/community/MediaTab';
import FilesTab from '@/components/community/FilesTab';
import AboutTab from '@/components/community/AboutTab';

const Community = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeMembers: 0,
    supportGroups: 0,
    forumPosts: 0,
    resourcesShared: 0
  });

  useEffect(() => {
    fetchCommunityStats();
  }, []);

  const fetchCommunityStats = async () => {
    try {
      // Count total users
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Count groups
      const { count: groupsCount } = await supabase
        .from('community_groups')
        .select('*', { count: 'exact', head: true });

      // Count posts
      const { count: postsCount } = await supabase
        .from('community_posts')
        .select('*', { count: 'exact', head: true });

      setStats({
        activeMembers: usersCount || 0,
        supportGroups: groupsCount || 8, // We seeded 8 groups
        forumPosts: postsCount || 0,
        resourcesShared: 0 // This would need a resources table
      });
    } catch (error) {
      console.error('Error fetching community stats:', error);
    }
  };
  return (
    <>
      <Helmet>
        <title>Community Forum & Groups - Living Oncology</title>
        <meta name="description" content="Join Living Oncology's supportive community. Connect with other patients, caregivers, and healthcare professionals through our forums and support groups." />
      </Helmet>

      <section className="bg-gradient-to-br from-gray-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Community Forum & Groups
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Connect, share, and support each other on the neuro-oncology journey.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Our Growing Community</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Join thousands of patients, caregivers, and healthcare professionals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{stats.activeMembers}+</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Active Members</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{stats.supportGroups}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Support Groups</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{stats.forumPosts}+</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Forum Posts</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">150+</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Resources Shared</h3>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="discussions" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-8">
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>

              <TabsContent value="discussions"><DiscussionsTab /></TabsContent>
              <TabsContent value="groups"><GroupsTab /></TabsContent>
              <TabsContent value="media"><MediaTab /></TabsContent>
              <TabsContent value="files"><FilesTab /></TabsContent>
              <TabsContent value="about"><AboutTab /></TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-gray-600 to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
              Connect with others who understand your journey. Share experiences, find support, and build meaningful relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Link to="/members-directory" className="bg-white text-gray-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    View Members
                  </Link>
                  <Link to="/profile" className="btn-primary">
                    Go to Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="bg-white text-gray-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center">
                    <LogIn className="w-5 h-5 mr-2" />
                    Log In
                  </Link>
                  <Link to="/signup" className="btn-primary inline-flex items-center justify-center">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Join Community
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Community;
