import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCircle } from 'lucide-react';

const MemberCard = ({ member }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getRole = (member) => {
    if (member.role === 'Other' && member.other_role_description) {
      return member.other_role_description;
    }
    return member.role || 'Member';
  }

  return (
    <motion.div variants={cardVariants}>
      <Card className="h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-accent">
        <CardHeader className="flex flex-col items-center text-center">
          <div className="p-4 bg-primary/20 rounded-full mb-4">
            <UserCircle className="w-16 h-16 text-accent" />
          </div>
          <CardTitle className="text-xl font-bold text-foreground">{member.full_name}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-accent font-semibold">{getRole(member)}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MemberCard;