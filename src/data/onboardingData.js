// Onboarding configuration and data
// This file contains all the data needed for the onboarding system

// Tour steps for react-joyride
export const tourSteps = [
    {
        target: '[data-tour="nav-resources"]',
        content: 'Explore our educational resources, articles, and guides tailored to your journey.',
        title: 'Educational Resources',
        disableBeacon: true,
    },
    {
        target: '[data-tour="nav-community"]',
        content: 'Connect with others who understand your experience. Join discussions and support groups.',
        title: 'Community Hub',
    },
    {
        target: '[data-tour="nav-events"]',
        content: 'Discover upcoming events, webinars, and BrainStorm Cancer sessions.',
        title: 'Events & Programs',
    },
    {
        target: '[data-tour="nav-profile"]',
        content: 'Manage your profile, track your progress, and customize your experience.',
        title: 'Your Profile',
    },
];

// Achievement definitions
export const achievements = {
    EMAIL_VERIFIED: {
        key: 'EMAIL_VERIFIED',
        title: 'Verified Member',
        description: 'Verified your email address',
        icon: 'CheckCircle',
        color: 'text-green-500',
    },
    TOUR_COMPLETED: {
        key: 'TOUR_COMPLETED',
        title: 'Explorer',
        description: 'Completed the guided tour',
        icon: 'Compass',
        color: 'text-blue-500',
    },
    PROFILE_COMPLETED: {
        key: 'PROFILE_COMPLETED',
        title: 'Identity Established',
        description: 'Completed your profile setup',
        icon: 'UserCheck',
        color: 'text-purple-500',
    },
    FIRST_POST: {
        key: 'FIRST_POST',
        title: 'Voice Found',
        description: 'Made your first community post',
        icon: 'MessageSquare',
        color: 'text-yellow-500',
    },
    INTRODUCTION_POSTED: {
        key: 'INTRODUCTION_POSTED',
        title: 'Hello World',
        description: 'Introduced yourself to the community',
        icon: 'Hand',
        color: 'text-pink-500',
    },
    FIRST_GROUP_JOINED: {
        key: 'FIRST_GROUP_JOINED',
        title: 'Team Player',
        description: 'Joined your first support group',
        icon: 'Users',
        color: 'text-indigo-500',
    },
    RESOURCE_READER: {
        key: 'RESOURCE_READER',
        title: 'Knowledge Seeker',
        description: 'Read 5 educational resources',
        icon: 'BookOpen',
        color: 'text-orange-500',
    },
    WEEK_ACTIVE: {
        key: 'WEEK_ACTIVE',
        title: 'Committed',
        description: 'Active for 7 consecutive days',
        icon: 'Calendar',
        color: 'text-teal-500',
    },
};

// Role-specific content recommendations
export const roleContent = {
    'Patient/Survivor': {
        title: 'Your Patient Journey',
        description: 'Resources and support tailored for patients and survivors',
        quickActions: [
            { label: 'Treatment Resources', path: '/resources', icon: 'FileText' },
            { label: 'Survivor Stories', path: '/testimonials', icon: 'Heart' },
            { label: 'Support Groups', path: '/community', icon: 'Users' },
        ],
        recommendedResources: [
            'Understanding Your Diagnosis',
            'Managing Treatment Side Effects',
            'Nutrition During Treatment',
            'Emotional Wellness Guide',
        ],
        featuredGroups: ['Patient Support Circle', 'Survivor Stories', 'Treatment Tips'],
    },
    'Caregiver/Family': {
        title: 'Caregiver Support',
        description: 'Resources to help you support your loved one while caring for yourself',
        quickActions: [
            { label: 'Caregiver Guide', path: '/resources', icon: 'Shield' },
            { label: 'Self-Care Tips', path: '/services', icon: 'Heart' },
            { label: 'Connect with Others', path: '/community', icon: 'Users' },
        ],
        recommendedResources: [
            'Caregiver Self-Care Guide',
            'Supporting Your Loved One',
            'Navigating Healthcare Systems',
            'Family Communication Tips',
        ],
        featuredGroups: ['Caregiver Circle', 'Family Support', 'Respite & Self-Care'],
    },
    'Healthcare Professional': {
        title: 'Professional Resources',
        description: 'Clinical resources and professional networking opportunities',
        quickActions: [
            { label: 'Clinical Resources', path: '/resources', icon: 'Briefcase' },
            { label: 'Research Updates', path: '/educational-hub', icon: 'FileText' },
            { label: 'Professional Network', path: '/community', icon: 'Users' },
        ],
        recommendedResources: [
            'Latest Research Summaries',
            'Patient Communication Best Practices',
            'Treatment Protocol Updates',
            'Professional Development',
        ],
        featuredGroups: ['Healthcare Professionals', 'Research Discussion', 'Case Studies'],
    },
};

// Goal-specific quick actions
export const goalActions = {
    'Find Information': [
        { label: 'Browse Resources', path: '/resources', icon: 'Search', primary: true },
        { label: 'Educational Hub', path: '/educational-hub', icon: 'BookOpen' },
        { label: 'Ask the Community', path: '/community', icon: 'MessageCircle' },
    ],
    'Connect with Others': [
        { label: 'Join Community', path: '/community', icon: 'Users', primary: true },
        { label: 'Find a Group', path: '/community', icon: 'UserPlus' },
        { label: 'Upcoming Events', path: '/brainstorm-cancer', icon: 'Calendar' },
    ],
    'Get Support': [
        { label: 'Support Groups', path: '/community', icon: 'Heart', primary: true },
        { label: 'Request Consultation', path: '/contact', icon: 'Phone' },
        { label: 'Resources', path: '/resources', icon: 'FileText' },
    ],
};

// Profile wizard steps
export const profileWizardSteps = [
    {
        id: 'photo',
        title: 'Profile Photo',
        description: 'Add a photo to help others recognize you (optional)',
    },
    {
        id: 'about',
        title: 'About You',
        description: 'Tell us a bit more about yourself',
    },
    {
        id: 'interests',
        title: 'Your Interests',
        description: 'Select topics you\'re interested in',
    },
    {
        id: 'notifications',
        title: 'Notifications',
        description: 'Choose how you want to stay updated',
    },
];

// Interest options for profile wizard
export const interestOptions = [
    { value: 'treatment_options', label: 'Treatment Options', icon: 'Pill' },
    { value: 'clinical_trials', label: 'Clinical Trials', icon: 'Flask' },
    { value: 'nutrition', label: 'Nutrition & Wellness', icon: 'Apple' },
    { value: 'mental_health', label: 'Mental Health', icon: 'Brain' },
    { value: 'caregiver_support', label: 'Caregiver Support', icon: 'Shield' },
    { value: 'survivors', label: 'Survivor Stories', icon: 'Star' },
    { value: 'research', label: 'Research Updates', icon: 'Microscope' },
    { value: 'events', label: 'Events & Webinars', icon: 'Calendar' },
];

// Introduction template
export const introductionTemplate = `Hi everyone! 👋

My name is {name} and I'm here as a {role}.

{customMessage}

I'm looking forward to connecting with this community!`;
