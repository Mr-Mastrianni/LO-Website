import React from 'react';
import { X, User, MessageCircle, Heart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

const PostDetailModal = ({ isOpen, onClose, post }) => {
    if (!isOpen || !post) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 border-b bg-gray-50 flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 line-clamp-2">{post.title}</h2>
                                <div className="flex items-center text-sm text-gray-500 mt-1 space-x-3">
                                    <span>by {post.profile?.full_name || 'Anonymous'}</span>
                                    <span>•</span>
                                    <span>{formatDate(post.created_at)}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 -mr-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto flex-1">
                        <Badge variant="secondary" className="mb-4">
                            {post.category}
                        </Badge>
                        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                            {post.content}
                        </div>
                    </div>

                    {/* Footer / Stats */}
                    <div className="p-4 border-t bg-gray-50 flex items-center justify-between text-gray-500 text-sm">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                                <Heart className="w-4 h-4" />
                                <span>{post.likes || 0} likes</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MessageCircle className="w-4 h-4" />
                                <span>0 comments</span>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PostDetailModal;
