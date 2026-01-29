import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
    Sparkles,
    BookOpen,
    Users,
    Calendar,
    MessageSquare,
    ArrowRight,
    CheckCircle,
    Trophy,
    Map
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { roleContent, goalActions } from '@/data/onboardingData';
import OnboardingProgress from '@/components/onboarding/OnboardingProgress';
import AchievementsPanel from '@/components/onboarding/AchievementsPanel';

const iconMap = {
    FileText: BookOpen,
    Heart: () => <span className="text-xl">❤️</span>,
    Users: Users,
    Shield: () => <span className="text-xl">🛡️</span>,
    Briefcase: () => <span className="text-xl">💼</span>,
    Search: () => <span className="text-xl">🔍</span>,
    BookOpen: BookOpen,
    MessageCircle: MessageSquare,
    UserPlus: Users,
    Calendar: Calendar,
    Phone: () => <span className="text-xl">📞</span>,
};

const WelcomeDashboard = () => {
    const navigate = useNavigate();
    const { user, profile, isNewUser, clearNewUserFlag } = useAuth();
    const {
        onboardingState,
        progressPercentage,
        setShowTour,
        setShowProfileWizard,
        setShowIntroductionPrompt,
        allAchievements,
        markWelcomeSeen,
        skipOnboarding,
        needsOnboarding
    } = useOnboarding();

    // Redirect existing users away from onboarding
    React.useEffect(() => {
        // Wait for loading to complete
        if (!user) return;

        // If not a new user and onboarding is already complete, redirect to home
        if (!isNewUser && onboardingState?.onboarding_completed) {
            navigate('/', { replace: true });
        }
    }, [user, isNewUser, onboardingState, navigate]);

    // Mark welcome as seen on first render
    React.useEffect(() => {
        if (onboardingState && !onboardingState.welcome_seen) {
            markWelcomeSeen();
        }
    }, [onboardingState, markWelcomeSeen]);

    // Handle skip - clears new user flag too
    const handleSkip = () => {
        skipOnboarding();
        clearNewUserFlag();
        navigate('/');
    };

    const userRole = profile?.role || user?.user_metadata?.role || 'Patient/Survivor';
    const userGoal = profile?.goal || user?.user_metadata?.goal || 'Find Information';
    const userName = profile?.full_name || user?.user_metadata?.full_name || 'Friend';
    const firstName = userName.split(' ')[0];

    const roleData = roleContent[userRole] || roleContent['Patient/Survivor'];
    const goalData = goalActions[userGoal] || goalActions['Find Information'];

    const onboardingSteps = [
        {
            id: 'tour',
            title: 'Take a Tour',
            description: 'Discover key features',
            completed: onboardingState?.tour_completed,
            action: () => setShowTour(true),
            icon: Map,
        },
        {
            id: 'profile',
            title: 'Complete Profile',
            description: 'Add more about yourself',
            completed: onboardingState?.profile_wizard_completed,
            action: () => setShowProfileWizard(true),
            icon: CheckCircle,
        },
        {
            id: 'introduction',
            title: 'Introduce Yourself',
            description: 'Say hello to the community',
            completed: onboardingState?.introduction_posted,
            action: () => setShowIntroductionPrompt(true),
            icon: MessageSquare,
        },
    ];

    return (
        <>
            <Helmet>
                <title>Welcome - Living Oncology</title>
                <meta name="description" content="Welcome to Living Oncology. Get started with your personalized journey." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Hero Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-yellow-400 rounded-full mb-6 shadow-lg">
                            <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                            Welcome, {firstName}! 🎉
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We're so glad you're here. Let's get you set up and connected with our community.
                        </p>
                    </motion.div>

                    {/* Onboarding Progress */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-12"
                    >
                        <Card className="bg-white/80 backdrop-blur shadow-xl border-0">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <Trophy className="w-5 h-5 text-yellow-500" />
                                            Getting Started
                                        </CardTitle>
                                        <CardDescription>Complete these steps to make the most of your experience</CardDescription>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={handleSkip}>
                                        Skip for now
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600">Your progress</span>
                                        <span className="font-medium text-primary">{progressPercentage}%</span>
                                    </div>
                                    <Progress value={progressPercentage} className="h-3" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                    {onboardingSteps.map((step, index) => (
                                        <motion.div
                                            key={step.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + index * 0.1 }}
                                        >
                                            <Card
                                                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${step.completed
                                                    ? 'bg-green-50 border-green-200'
                                                    : 'bg-white hover:bg-gray-50'
                                                    }`}
                                                onClick={step.action}
                                            >
                                                <CardContent className="p-4 flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.completed
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-gray-100 text-gray-500'
                                                        }`}>
                                                        {step.completed ? (
                                                            <CheckCircle className="w-6 h-6" />
                                                        ) : (
                                                            <step.icon className="w-6 h-6" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className={`font-semibold ${step.completed ? 'text-green-700' : 'text-gray-900'}`}>
                                                            {step.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">{step.description}</p>
                                                    </div>
                                                    {!step.completed && (
                                                        <ArrowRight className="w-5 h-5 text-gray-400" />
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Role-Based Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="lg:col-span-2"
                        >
                            <Card className="h-full bg-white/80 backdrop-blur shadow-xl border-0">
                                <CardHeader>
                                    <CardTitle>{roleData.title}</CardTitle>
                                    <CardDescription>{roleData.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                        {roleData.quickActions.map((action, index) => {
                                            const IconComponent = iconMap[action.icon] || BookOpen;
                                            return (
                                                <Button
                                                    key={index}
                                                    variant="outline"
                                                    className="h-auto py-4 px-6 flex items-center justify-start gap-4 hover:bg-primary hover:text-white transition-all"
                                                    onClick={() => navigate(action.path)}
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                        {typeof IconComponent === 'function' && IconComponent.prototype?.render ? (
                                                            <IconComponent className="w-5 h-5 text-primary" />
                                                        ) : (
                                                            <IconComponent />
                                                        )}
                                                    </div>
                                                    <span className="font-medium">{action.label}</span>
                                                </Button>
                                            );
                                        })}
                                    </div>

                                    <div className="border-t pt-6">
                                        <h4 className="font-semibold text-gray-900 mb-3">Recommended for you</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {roleData.recommendedResources.map((resource, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm cursor-pointer hover:bg-primary hover:text-white transition-colors"
                                                    onClick={() => navigate('/resources')}
                                                >
                                                    {resource}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Achievements Preview */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <AchievementsPanel achievements={allAchievements} />
                        </motion.div>
                    </div>

                    {/* Goal-Based Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <Card className="bg-gradient-to-r from-primary to-green-600 text-white shadow-xl border-0">
                            <CardContent className="py-8">
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold mb-2">Ready to {userGoal}?</h3>
                                    <p className="text-white/80">Here are your next steps</p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {goalData.map((action, index) => (
                                        <Button
                                            key={index}
                                            variant={action.primary ? "secondary" : "outline"}
                                            size="lg"
                                            className={action.primary
                                                ? "bg-white text-primary hover:bg-gray-100"
                                                : "border-white text-white hover:bg-white/20"
                                            }
                                            onClick={() => navigate(action.path)}
                                        >
                                            {action.label}
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default WelcomeDashboard;
