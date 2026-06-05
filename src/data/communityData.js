import { supabase } from '@/lib/customSupabaseClient';
import { toast } from 'sonner';

export const handleJoinGroup = async (groupId, userId) => {
  try {
    const { data, error } = await supabase
      .from('group_memberships')
      .insert([{ group_id: groupId, user_id: userId }])
      .select()
      .single();

    if (error) throw error;
    toast.success('Successfully joined the group!');
    return { success: true, data };
  } catch (error) {
    if (error.code === '23505') {
      toast.error('You are already a member of this group');
    } else {
      console.error('Error joining group:', error);
      toast.error('Failed to join group. Please try again.');
    }
    return { success: false, error };
  }
};

export const handleLeaveGroup = async (groupId, userId) => {
  try {
    const { error } = await supabase
      .from('group_memberships')
      .delete()
      .eq('group_id', groupId)
      .eq('user_id', userId);

    if (error) throw error;
    toast.success('Successfully left the group');
    return { success: true };
  } catch (error) {
    console.error('Error leaving group:', error);
    toast.error('Failed to leave group. Please try again.');
    return { success: false, error };
  }
};

// This will be handled by CreatePostModal component
export const handleCreatePost = () => {
  // This function is now just a placeholder
  // The actual implementation is in CreatePostModal.jsx
  return { openModal: true };
};

// Mock data arrays have been removed as we are now using Supabase for all community features