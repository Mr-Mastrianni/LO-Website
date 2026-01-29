import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from 'sonner';

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'general'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = [
        { value: 'general', label: 'General Discussion' },
        { value: 'support', label: 'Support & Encouragement' },
        { value: 'treatment', label: 'Treatment Discussion' },
        { value: 'research', label: 'Research & News' },
        { value: 'caregiver', label: 'Caregiver Support' },
        { value: 'wellness', label: 'Wellness & Lifestyle' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('You must be logged in to create a post');
            return;
        }

        if (!formData.title.trim() || !formData.content.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);

        try {
            const { data, error } = await supabase
                .from('community_posts')
                .insert([{
                    user_id: user.id,
                    title: formData.title.trim(),
                    content: formData.content.trim(),
                    category: formData.category
                }])
                .select()
                .single();

            if (error) throw error;

            toast.success('Post created successfully!');
            setFormData({ title: '', content: '', category: 'general' });
            onClose();
            if (onPostCreated) onPostCreated(data);
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('Failed to create post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b bg-gradient-to-r from-primary to-gray-600 text-white">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                        disabled={isSubmitting}
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <h2 className="text-2xl font-bold">Create a Post</h2>
                    <p className="text-white/80 mt-1">Share your thoughts with the community</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            disabled={isSubmitting}
                        >
                            {categories.map(cat => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Post Title
                        </label>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="What's on your mind?"
                            maxLength={200}
                            disabled={isSubmitting}
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">{formData.title.length}/200</p>
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Post Content
                        </label>
                        <Textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Share your story, ask a question, or start a discussion..."
                            rows={8}
                            maxLength={5000}
                            disabled={isSubmitting}
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">{formData.content.length}/5000</p>
                    </div>
                </form>

                {/* Footer */}
                <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary/90"
                    >
                        {isSubmitting ? (
                            'Posting...'
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                Post
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;
