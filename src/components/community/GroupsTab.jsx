import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, UserMinus, Users, Loader2, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { handleJoinGroup, handleLeaveGroup } from '@/data/communityData';

const GroupsTab = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [userMemberships, setUserMemberships] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
    if (user) {
      fetchUserMemberships(user.id);
    }
  }, [user]);

  const fetchGroups = async () => {
    try {
      const { data, error } = await supabase
        .from('community_groups')
        .select('*')
        .order('name');

      if (error) throw error;
      setGroups(data || []);
    } catch (error) {
      console.error('Error fetching groups:', error);
      toast.error('Failed to load support groups');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserMemberships = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('group_memberships')
        .select('group_id')
        .eq('user_id', userId);

      if (error) throw error;
      const membershipSet = new Set(data.map(m => m.group_id));
      setUserMemberships(membershipSet);
    } catch (error) {
      console.error('Error fetching memberships:', error);
    }
  };

  const onJoinGroup = async (groupId) => {
    if (!user) {
      toast.error('Please log in to join a group');
      return;
    }

    const result = await handleJoinGroup(groupId, user.id);
    if (result.success) {
      setUserMemberships(prev => new Set([...prev, groupId]));
      // Update local member count
      setGroups(groups.map(g =>
        g.id === groupId ? { ...g, members_count: (g.members_count || 0) + 1 } : g
      ));
    }
  };

  const onLeaveGroup = async (groupId) => {
    if (!user) return;

    const result = await handleLeaveGroup(groupId, user.id);
    if (result.success) {
      setUserMemberships(prev => {
        const newSet = new Set(prev);
        newSet.delete(groupId);
        return newSet;
      });
      // Update local member count
      setGroups(groups.map(g =>
        g.id === groupId ? { ...g, members_count: Math.max(0, (g.members_count || 0) - 1) } : g
      ));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-primary mb-4">Support Groups</h3>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Join specialized support groups tailored to your specific needs and circumstances.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {groups.map((group, index) => {
          const isMember = userMemberships.has(group.id);

          return (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary">{group.name}</h4>
                    <span className="text-sm text-gray-600">{group.category}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{group.description}</p>

              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Members:</span>
                  <span className="font-semibold">{group.members_count || 0}</span>
                </div>
                {group.meeting_type && (
                  <div className="flex justify-between">
                    <span>Meetings:</span>
                    <span className="font-semibold">{group.meeting_type}</span>
                  </div>
                )}
              </div>

              {user ? (
                isMember ? (
                  <button
                    onClick={() => onLeaveGroup(group.id)}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <UserMinus className="mr-2 w-4 h-4" />
                    Leave Group
                  </button>
                ) : (
                  <button
                    onClick={() => onJoinGroup(group.id)}
                    className="btn-secondary w-full inline-flex items-center justify-center"
                  >
                    <UserPlus className="mr-2 w-4 h-4" />
                    Join Group
                  </button>
                )
              ) : (
                <Link
                  to="/login"
                  className="btn-secondary w-full inline-flex items-center justify-center"
                >
                  <LogIn className="mr-2 w-4 h-4" />
                  Log in to Join
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default GroupsTab;