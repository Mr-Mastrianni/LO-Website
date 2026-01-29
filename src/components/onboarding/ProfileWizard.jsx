import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    ArrowRight,
    ArrowLeft,
    Upload,
    User,
    Check,
    Bell,
    BellOff,
    Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { supabase } from '@/lib/customSupabaseClient';
import { interestOptions, profileWizardSteps } from '@/data/onboardingData';

const ProfileWizard = () => {
    const { user, profile } = useAuth();
    const { showProfileWizard, setShowProfileWizard, completeProfileWizard } = useOnboarding();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        avatar_url: profile?.avatar_url || '',
        bio: profile?.bio || '',
        interests: profile?.interests || [],
        notifications: {
            email: true,
            community: true,
            events: true,
            resources: false,
        },
    });

    const totalSteps = profileWizardSteps.length;
    const progress = ((currentStep + 1) / totalSteps) * 100;

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleClose = () => {
        setShowProfileWizard(false);
        setCurrentStep(0);
    };

    const handleInterestToggle = (value) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(value)
                ? prev.interests.filter(i => i !== value)
                : [...prev.interests, value],
        }));
    };

    const handleNotificationToggle = (key) => {
        setFormData(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: !prev.notifications[key],
            },
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Update profile in Supabase
            const { error } = await supabase
                .from('profiles')
                .update({
                    bio: formData.bio,
                    interests: formData.interests,
                    notification_preferences: formData.notifications,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', user.id);

            if (!error) {
                await completeProfileWizard();
            }
        } catch (err) {
            console.error('Error updating profile:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!showProfileWizard) return null;

    const renderStep = () => {
        switch (currentStep) {
            case 0: // Profile Photo
                return (
                    <div className="space-y-6 text-center">
                        <div className="relative inline-block">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-200 to-yellow-200 flex items-center justify-center mx-auto border-4 border-white shadow-lg overflow-hidden">
                                {formData.avatar_url ? (
                                    <img
                                        src={formData.avatar_url}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User className="w-16 h-16 text-primary" />
                                )}
                            </div>
                            <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                                <Camera className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-gray-500 text-sm">
                            A photo helps others recognize you in the community
                        </p>
                        <Button variant="outline" className="mx-auto">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Photo
                        </Button>
                        <p className="text-xs text-gray-400">
                            You can skip this step and add a photo later
                        </p>
                    </div>
                );

            case 1: // About You
                return (
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="bio">Tell us about yourself</Label>
                            <Textarea
                                id="bio"
                                placeholder="Share a bit about yourself, your journey, or what brings you here..."
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="mt-2 min-h-[120px]"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                This will be visible on your public profile
                            </p>
                        </div>
                    </div>
                );

            case 2: // Interests
                return (
                    <div className="space-y-4">
                        <p className="text-gray-600 text-sm">
                            Select topics you're interested in to personalize your experience
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            {interestOptions.map((interest) => (
                                <div
                                    key={interest.value}
                                    onClick={() => handleInterestToggle(interest.value)}
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.interests.includes(interest.value)
                                            ? 'border-primary bg-primary/5'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.interests.includes(interest.value)
                                                ? 'border-primary bg-primary text-white'
                                                : 'border-gray-300'
                                            }`}>
                                            {formData.interests.includes(interest.value) && (
                                                <Check className="w-4 h-4" />
                                            )}
                                        </div>
                                        <span className={`text-sm font-medium ${formData.interests.includes(interest.value)
                                                ? 'text-primary'
                                                : 'text-gray-700'
                                            }`}>
                                            {interest.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 3: // Notifications
                return (
                    <div className="space-y-4">
                        <p className="text-gray-600 text-sm mb-4">
                            Choose how you'd like to stay updated
                        </p>
                        {[
                            { key: 'email', label: 'Email Notifications', desc: 'Important updates and announcements' },
                            { key: 'community', label: 'Community Activity', desc: 'Replies to your posts and mentions' },
                            { key: 'events', label: 'Events & Webinars', desc: 'Upcoming events and programs' },
                            { key: 'resources', label: 'New Resources', desc: 'Articles and educational content' },
                        ].map((item) => (
                            <div
                                key={item.key}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    {formData.notifications[item.key] ? (
                                        <Bell className="w-5 h-5 text-primary" />
                                    ) : (
                                        <BellOff className="w-5 h-5 text-gray-400" />
                                    )}
                                    <div>
                                        <p className="font-medium text-gray-900">{item.label}</p>
                                        <p className="text-xs text-gray-500">{item.desc}</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={formData.notifications[item.key]}
                                    onCheckedChange={() => handleNotificationToggle(item.key)}
                                />
                            </div>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

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
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden"
            >
                {/* Header */}
                <div className="p-6 border-b">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>

                    <div className="pr-8">
                        <h2 className="text-2xl font-bold text-primary">
                            {profileWizardSteps[currentStep].title}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            {profileWizardSteps[currentStep].description}
                        </p>
                    </div>

                    <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Step {currentStep + 1} of {totalSteps}</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[50vh]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="p-6 border-t bg-gray-50 flex justify-between">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <Button
                        onClick={handleNext}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        ) : currentStep === totalSteps - 1 ? (
                            <>
                                Complete
                                <Check className="w-4 h-4 ml-2" />
                            </>
                        ) : (
                            <>
                                Next
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfileWizard;
