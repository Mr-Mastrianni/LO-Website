import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, MessageSquare, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { supabase } from '@/lib/customSupabaseClient';
import { introductionTemplate } from '@/data/onboardingData';

const IntroductionPrompt = () => {
    const { user, profile } = useAuth();
    const { showIntroductionPrompt, setShowIntroductionPrompt, completeIntroduction } = useOnboarding();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [customMessage, setCustomMessage] = useState('');

    const userName = profile?.full_name || user?.user_metadata?.full_name || 'there';
    const userRole = profile?.role || user?.user_metadata?.role || 'community member';

    const getPreviewContent = () => {
        return introductionTemplate
            .replace('{name}', userName)
            .replace('{role}', userRole.toLowerCase())
            .replace('{customMessage}', customMessage || 'I\'m excited to be part of this community and looking forward to learning and sharing.');
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Create a discussion post as the introduction
            const { error } = await supabase
                .from('discussions')
                .insert({
                    title: `👋 Hello from ${userName}!`,
                    content: getPreviewContent(),
                    author_id: user.id,
                    category: 'introductions',
                    status: 'active',
                });

            if (!error) {
                await completeIntroduction();
            }
        } catch (err) {
            console.error('Error posting introduction:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setShowIntroductionPrompt(false);
    };

    const handleSkip = () => {
        setShowIntroductionPrompt(false);
    };

    if (!showIntroductionPrompt) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
                {/* Header */}
                <div className="p-6 border-b bg-gradient-to-r from-primary to-green-600 text-white">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Introduce Yourself</h2>
                            <p className="text-white/80 text-sm">Say hello to the community</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Add a personal message (optional)
                        </label>
                        <Textarea
                            placeholder="Share why you're here, what you hope to find, or a bit about your story..."
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>

                    {/* Preview */}
                    <div className="bg-gray-50 rounded-lg p-4 border">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <Sparkles className="w-4 h-4" />
                            Preview
                        </div>
                        <div className="prose prose-sm max-w-none">
                            <p className="whitespace-pre-line text-gray-700">
                                {getPreviewContent()}
                            </p>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 text-center">
                        Your introduction will be posted in the Community Introductions section
                    </p>
                </div>

                {/* Footer */}
                <div className="p-6 border-t bg-gray-50 flex justify-between">
                    <Button variant="ghost" onClick={handleSkip}>
                        Skip for now
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                Post Introduction
                            </>
                        )}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default IntroductionPrompt;
