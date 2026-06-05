import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { achievements } from '@/data/onboardingData';

const OnboardingContext = createContext(undefined);

export const OnboardingProvider = ({ children }) => {
    const { user, profile } = useAuth();
    const [onboardingState, setOnboardingState] = useState(null);
    const [userAchievements, setUserAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTour, setShowTour] = useState(false);
    const [showProfileWizard, setShowProfileWizard] = useState(false);
    const [showIntroductionPrompt, setShowIntroductionPrompt] = useState(false);

    // Fetch onboarding state from Supabase
    const fetchOnboardingState = useCallback(async () => {
        if (!user?.id) {
            setOnboardingState(null);
            setUserAchievements([]);
            setLoading(false);
            return;
        }

        try {
            // Fetch onboarding progress
            const { data: onboarding, error: onboardingError } = await supabase
                .from('user_onboarding')
                .select('*')
                .eq('user_id', user.id)
                .maybeSingle();

            if (onboardingError) {
                console.error('Error fetching onboarding:', onboardingError);
            } else if (!onboarding) {
                // Create onboarding record if it doesn't exist
                const { data: newOnboarding, error: createError } = await supabase
                    .from('user_onboarding')
                    .insert({ user_id: user.id })
                    .select()
                    .single();

                if (!createError) {
                    setOnboardingState(newOnboarding);
                }
            } else {
                setOnboardingState(onboarding);
            }

            // Fetch achievements
            const { data: achievementsData, error: achievementsError } = await supabase
                .from('user_achievements')
                .select('*')
                .eq('user_id', user.id);

            if (!achievementsError && achievementsData) {
                setUserAchievements(achievementsData.map(a => a.achievement_key));
            }
        } catch (err) {
            console.error('Error in fetchOnboardingState:', err);
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        fetchOnboardingState();
    }, [fetchOnboardingState]);

    // Update onboarding progress
    const updateOnboarding = useCallback(async (updates) => {
        if (!user?.id || !onboardingState) return;

        try {
            const { data, error } = await supabase
                .from('user_onboarding')
                .update(updates)
                .eq('user_id', user.id)
                .select()
                .single();

            if (!error && data) {
                setOnboardingState(data);
            }
        } catch (err) {
            console.error('Error updating onboarding:', err);
        }
    }, [user?.id, onboardingState]);

    // Unlock an achievement
    const unlockAchievement = useCallback(async (achievementKey) => {
        if (!user?.id || userAchievements.includes(achievementKey)) return;

        try {
            const { error } = await supabase
                .from('user_achievements')
                .insert({ user_id: user.id, achievement_key: achievementKey });

            if (!error) {
                setUserAchievements(prev => [...prev, achievementKey]);
                return true;
            }
        } catch (err) {
            console.error('Error unlocking achievement:', err);
        }
        return false;
    }, [user?.id, userAchievements]);

    // Mark welcome as seen
    const markWelcomeSeen = useCallback(() => {
        updateOnboarding({ welcome_seen: true });
    }, [updateOnboarding]);

    // Complete the tour
    const completeTour = useCallback(async () => {
        await updateOnboarding({ tour_completed: true });
        await unlockAchievement('TOUR_COMPLETED');
        setShowTour(false);
    }, [updateOnboarding, unlockAchievement]);

    // Complete profile wizard
    const completeProfileWizard = useCallback(async () => {
        await updateOnboarding({ profile_wizard_completed: true });
        await unlockAchievement('PROFILE_COMPLETED');
        setShowProfileWizard(false);
    }, [updateOnboarding, unlockAchievement]);

    // Post introduction
    const completeIntroduction = useCallback(async () => {
        await updateOnboarding({ introduction_posted: true });
        await unlockAchievement('INTRODUCTION_POSTED');
        setShowIntroductionPrompt(false);
    }, [updateOnboarding, unlockAchievement]);

    // Skip onboarding
    const skipOnboarding = useCallback(async () => {
        await updateOnboarding({
            onboarding_completed: true,
            skipped_at: new Date().toISOString()
        });
    }, [updateOnboarding]);

    // Complete all onboarding
    const completeOnboarding = useCallback(async () => {
        await updateOnboarding({
            onboarding_completed: true,
            completed_at: new Date().toISOString()
        });
    }, [updateOnboarding]);

    // Check if a specific achievement is unlocked
    const hasAchievement = useCallback((key) => {
        return userAchievements.includes(key);
    }, [userAchievements]);

    // Get achievement details with unlock status
    const getAchievementDetails = useCallback((key) => {
        const achievement = achievements[key];
        if (!achievement) return null;
        return {
            ...achievement,
            unlocked: userAchievements.includes(key),
        };
    }, [userAchievements]);

    // Get all achievements with unlock status
    const allAchievements = useMemo(() => {
        return Object.values(achievements).map(achievement => ({
            ...achievement,
            unlocked: userAchievements.includes(achievement.key),
        }));
    }, [userAchievements]);

    // Check if onboarding is needed
    const needsOnboarding = useMemo(() => {
        if (!onboardingState) return false;
        return !onboardingState.onboarding_completed && !onboardingState.skipped_at;
    }, [onboardingState]);

    // Get onboarding progress percentage
    const progressPercentage = useMemo(() => {
        if (!onboardingState) return 0;
        const steps = [
            onboardingState.welcome_seen,
            onboardingState.tour_completed,
            onboardingState.profile_wizard_completed,
            onboardingState.introduction_posted,
        ];
        const completed = steps.filter(Boolean).length;
        return Math.round((completed / steps.length) * 100);
    }, [onboardingState]);

    const value = useMemo(() => ({
        // State
        onboardingState,
        userAchievements,
        allAchievements,
        loading,
        needsOnboarding,
        progressPercentage,

        // UI State
        showTour,
        setShowTour,
        showProfileWizard,
        setShowProfileWizard,
        showIntroductionPrompt,
        setShowIntroductionPrompt,

        // Actions
        markWelcomeSeen,
        completeTour,
        completeProfileWizard,
        completeIntroduction,
        skipOnboarding,
        completeOnboarding,
        unlockAchievement,
        hasAchievement,
        getAchievementDetails,
        fetchOnboardingState,
    }), [
        onboardingState,
        userAchievements,
        allAchievements,
        loading,
        needsOnboarding,
        progressPercentage,
        showTour,
        showProfileWizard,
        showIntroductionPrompt,
        markWelcomeSeen,
        completeTour,
        completeProfileWizard,
        completeIntroduction,
        skipOnboarding,
        completeOnboarding,
        unlockAchievement,
        hasAchievement,
        getAchievementDetails,
        fetchOnboardingState,
    ]);

    return (
        <OnboardingContext.Provider value={value}>
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (context === undefined) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
};
