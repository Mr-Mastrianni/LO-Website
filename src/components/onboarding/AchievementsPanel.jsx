import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    CheckCircle,
    Compass,
    UserCheck,
    MessageSquare,
    Hand,
    Users,
    BookOpen,
    Calendar,
    Lock
} from 'lucide-react';

const iconMap = {
    CheckCircle,
    Compass,
    UserCheck,
    MessageSquare,
    Hand,
    Users,
    BookOpen,
    Calendar,
};

const AchievementsPanel = ({ achievements, compact = false }) => {
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;

    if (compact) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Achievements:</span>
                <span className="font-semibold text-primary">{unlockedCount}/{totalCount}</span>
                <div className="flex -space-x-2">
                    {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => {
                        const IconComponent = iconMap[achievement.icon] || CheckCircle;
                        return (
                            <div
                                key={achievement.key}
                                className={`w-8 h-8 rounded-full bg-white border-2 border-white shadow flex items-center justify-center ${achievement.color}`}
                                title={achievement.title}
                            >
                                <IconComponent className="w-4 h-4" />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <Card className="h-full bg-white/80 backdrop-blur shadow-xl border-0">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Achievements</span>
                    <span className="text-sm font-normal text-gray-500">
                        {unlockedCount}/{totalCount} unlocked
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-3">
                    {achievements.map((achievement) => {
                        const IconComponent = iconMap[achievement.icon] || CheckCircle;
                        return (
                            <motion.div
                                key={achievement.key}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`relative p-3 rounded-lg border-2 transition-all ${achievement.unlocked
                                        ? 'bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-sm'
                                        : 'bg-gray-100 border-gray-200 opacity-50'
                                    }`}
                            >
                                {!achievement.unlocked && (
                                    <div className="absolute top-1 right-1">
                                        <Lock className="w-3 h-3 text-gray-400" />
                                    </div>
                                )}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${achievement.unlocked ? achievement.color : 'text-gray-400'
                                    } bg-white shadow-sm`}>
                                    <IconComponent className="w-5 h-5" />
                                </div>
                                <h4 className={`text-xs font-semibold ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                                    }`}>
                                    {achievement.title}
                                </h4>
                                <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">
                                    {achievement.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default AchievementsPanel;
