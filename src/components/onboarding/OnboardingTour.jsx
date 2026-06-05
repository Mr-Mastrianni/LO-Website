import React, { useState, useCallback } from 'react';
import Joyride, { STATUS, EVENTS, ACTIONS } from 'react-joyride';
import { useOnboarding } from '@/contexts/OnboardingContext';

const OnboardingTour = () => {
    const { showTour, setShowTour, completeTour } = useOnboarding();
    const [stepIndex, setStepIndex] = useState(0);

    const steps = [
        {
            target: 'body',
            content: (
                <div className="text-center">
                    <h3 className="text-xl font-bold text-primary mb-2">Welcome to Living Oncology! 🎉</h3>
                    <p className="text-gray-600">
                        Let us show you around. This quick tour will help you discover
                        the key features of our community.
                    </p>
                </div>
            ),
            placement: 'center',
            disableBeacon: true,
        },
        {
            target: '[data-tour="nav-resources"]',
            content: (
                <div>
                    <h4 className="font-bold text-primary mb-2">📚 Educational Resources</h4>
                    <p className="text-gray-600">
                        Explore our library of articles, guides, and educational materials
                        tailored to your cancer journey.
                    </p>
                </div>
            ),
            placement: 'bottom',
            spotlightClicks: true,
        },
        {
            target: '[data-tour="nav-community"]',
            content: (
                <div>
                    <h4 className="font-bold text-primary mb-2">👥 Community Hub</h4>
                    <p className="text-gray-600">
                        Connect with others who understand your experience. Join discussions,
                        share your story, and find support groups.
                    </p>
                </div>
            ),
            placement: 'bottom',
            spotlightClicks: true,
        },
        {
            target: '[data-tour="nav-events"]',
            content: (
                <div>
                    <h4 className="font-bold text-primary mb-2">📅 Events & Programs</h4>
                    <p className="text-gray-600">
                        Discover upcoming webinars, BrainStorm Cancer sessions,
                        and community events.
                    </p>
                </div>
            ),
            placement: 'bottom',
            spotlightClicks: true,
        },
        {
            target: '[data-tour="nav-profile"]',
            content: (
                <div>
                    <h4 className="font-bold text-primary mb-2">👤 Your Profile</h4>
                    <p className="text-gray-600">
                        Access your profile, manage your settings, and track your
                        achievements and progress.
                    </p>
                </div>
            ),
            placement: 'bottom',
            spotlightClicks: true,
        },
        {
            target: 'body',
            content: (
                <div className="text-center">
                    <h3 className="text-xl font-bold text-primary mb-2">You're All Set! 🌟</h3>
                    <p className="text-gray-600 mb-4">
                        You've completed the tour. Remember, our community is here to support
                        you every step of the way.
                    </p>
                    <p className="text-sm text-gray-500">
                        🏆 Achievement Unlocked: Explorer
                    </p>
                </div>
            ),
            placement: 'center',
        },
    ];

    const handleJoyrideCallback = useCallback((data) => {
        const { status, type, action, index } = data;

        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            completeTour();
            setStepIndex(0);
        } else if (type === EVENTS.STEP_AFTER && action === ACTIONS.NEXT) {
            setStepIndex(index + 1);
        } else if (type === EVENTS.STEP_AFTER && action === ACTIONS.PREV) {
            setStepIndex(index - 1);
        } else if (action === ACTIONS.CLOSE) {
            setShowTour(false);
            setStepIndex(0);
        }
    }, [completeTour, setShowTour]);

    if (!showTour) return null;

    return (
        <Joyride
            steps={steps}
            stepIndex={stepIndex}
            run={showTour}
            continuous
            showProgress
            showSkipButton
            scrollToFirstStep
            spotlightPadding={8}
            callback={handleJoyrideCallback}
            styles={{
                options: {
                    primaryColor: '#6B7280', // Gray
                    textColor: '#374151',
                    backgroundColor: '#fff',
                    overlayColor: 'rgba(0, 0, 0, 0.5)',
                    spotlightShadow: '0 0 20px rgba(107, 114, 128, 0.5)',
                    zIndex: 10000,
                },
                tooltip: {
                    borderRadius: 12,
                    padding: 20,
                },
                tooltipContainer: {
                    textAlign: 'left',
                },
                buttonNext: {
                    backgroundColor: '#6B7280',
                    borderRadius: 8,
                    padding: '10px 20px',
                    fontSize: 14,
                    fontWeight: 600,
                },
                buttonBack: {
                    color: '#6B7280',
                    marginRight: 10,
                },
                buttonSkip: {
                    color: '#6B7280',
                },
                spotlight: {
                    borderRadius: 8,
                },
            }}
            locale={{
                back: 'Previous',
                close: 'Close',
                last: 'Finish Tour',
                next: 'Next',
                skip: 'Skip Tour',
            }}
        />
    );
};

export default OnboardingTour;
