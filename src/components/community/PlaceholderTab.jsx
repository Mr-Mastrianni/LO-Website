import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const PlaceholderTab = ({ title, description, showButton = false }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="text-center"
  >
    <h3 className="text-2xl font-bold text-primary mb-4">{title}</h3>
    <p className="text-lg text-gray-700 mb-8">{description}</p>
    <div className="bg-white rounded-xl p-12 shadow-lg">
      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-600 mb-4">{title} features are coming soon!</p>
      {showButton && (
        <Link to="/resources" className="btn-primary inline-flex items-center">
          <FileText className="mr-2 w-4 h-4" />
          View Official Resources
        </Link>
      )}
    </div>
  </motion.div>
);

export default PlaceholderTab;