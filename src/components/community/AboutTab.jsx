import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const AboutTab = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl p-8 shadow-lg"
  >
    <div className="flex items-center mb-6">
      <Info className="w-8 h-8 text-primary mr-3" />
      <h3 className="text-2xl font-bold text-primary">About Our Community</h3>
    </div>
    
    <div className="space-y-6 text-gray-700 leading-relaxed">
      <p>
        Our community platform is designed to provide a safe, supportive environment where patients, caregivers, and healthcare professionals can connect, share experiences, and support each other throughout the neuro-oncology journey.
      </p>
      
      <div>
        <h4 className="text-lg font-semibold text-primary mb-3">Community Guidelines</h4>
        <ul className="space-y-2 list-disc list-inside">
          <li>Treat all members with respect and kindness</li>
          <li>Share experiences and support, not medical advice</li>
          <li>Protect privacy - no sharing of personal medical information</li>
          <li>Keep discussions relevant to neuro-oncology topics</li>
          <li>Report any inappropriate content to moderators</li>
        </ul>
      </div>
      
      <div>
        <h4 className="text-lg font-semibold text-primary mb-3">Getting Started</h4>
        <ol className="space-y-2 list-decimal list-inside">
          <li>Join relevant support groups based on your role and needs</li>
          <li>Introduce yourself in the General Discussion forum</li>
          <li>Explore forum categories to find topics of interest</li>
          <li>Participate in discussions and share your experiences</li>
          <li>Attend virtual or in-person group meetings</li>
        </ol>
      </div>
    </div>
  </motion.div>
);

export default AboutTab;