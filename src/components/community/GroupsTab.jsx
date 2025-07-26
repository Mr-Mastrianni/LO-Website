import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Users } from 'lucide-react';
import { supportGroups, handleJoinGroup } from '@/data/communityData';

const GroupsTab = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="space-y-8"
  >
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-primary mb-4">Support Groups</h3>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto">
        Join specialized support groups tailored to your specific needs and circumstances.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {supportGroups.map((group, index) => (
        <motion.div 
          key={group.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-xl p-8 shadow-lg card-hover"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-primary">{group.name}</h4>
                <span className="text-sm text-gray-600">{group.category}</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4 leading-relaxed">{group.description}</p>
          
          <div className="space-y-2 mb-6 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Members:</span>
              <span className="font-semibold">{group.members}</span>
            </div>
            <div className="flex justify-between">
              <span>Meetings:</span>
              <span className="font-semibold">{group.meetingType}</span>
            </div>
          </div>
          
          <button 
            onClick={() => handleJoinGroup(group.name)}
            className="btn-secondary w-full inline-flex items-center justify-center"
          >
            <UserPlus className="mr-2 w-4 h-4" />
            Join Group
          </button>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default GroupsTab;