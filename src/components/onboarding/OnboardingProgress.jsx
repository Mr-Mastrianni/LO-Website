import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle } from 'lucide-react';

const OnboardingProgress = ({
    steps,
    currentStep,
    showLabels = true,
    compact = false
}) => {
    const completedSteps = steps.filter(s => s.completed).length;
    const percentage = Math.round((completedSteps / steps.length) * 100);

    if (compact) {
        return (
            <div className="flex items-center gap-2">
                <Progress value={percentage} className="flex-1 h-2" />
                <span className="text-sm text-gray-500 whitespace-nowrap">
                    {completedSteps}/{steps.length}
                </span>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Setup Progress</span>
                <span className="text-sm text-gray-500">{percentage}% complete</span>
            </div>

            <Progress value={percentage} className="h-2" />

            {showLabels && (
                <div className="flex justify-between">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="flex flex-col items-center gap-1"
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed
                                ? 'bg-gray-500 text-white'
                                : 'bg-gray-200 text-gray-400'
                                }`}>
                                {step.completed ? (
                                    <CheckCircle className="w-5 h-5" />
                                ) : (
                                    <span className="text-sm font-medium">{index + 1}</span>
                                )}
                            </div>
                            <span className={`text-xs ${step.completed ? 'text-gray-600 font-medium' : 'text-gray-500'
                                }`}>
                                {step.title}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OnboardingProgress;
