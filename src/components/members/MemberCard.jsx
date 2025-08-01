import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Shield, Stethoscope } from 'lucide-react';

const MemberCard = ({ member }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Patient/Survivor':
        return <User className="w-5 h-5 text-accent" />;
      case 'Caregiver/Family':
        return <Shield className="w-5 h-5 text-accent" />;
      case 'Healthcare Professional':
        return <Stethoscope className="w-5 h-5 text-accent" />;
      default:
        return <User className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-card/50 border border-border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {member.full_name ? member.full_name.charAt(0) : '?'}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground truncate">
              {member.full_name || 'Anonymous'}
            </h3>
            <div className="flex items-center text-sm text-foreground/80 mt-1">
              {getRoleIcon(member.role)}
              <span className="ml-2">{member.role || 'Member'}</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-foreground/70 h-10 overflow-hidden">
            {member.bio || 'No description provided.'}
          </p>
        </div>
        <div className="mt-4">
          <Link
            to={`/profile/${member.id}`}
            className="text-sm font-semibold text-accent hover:underline"
          >
            View Profile
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default MemberCard;
