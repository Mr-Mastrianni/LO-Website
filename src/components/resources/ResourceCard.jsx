import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Lock, ExternalLink } from 'lucide-react';
import { handleDownload, handleAccessRequest } from '@/data/resourcesData';

const ResourceCard = ({ resource, index, isRestricted = false }) => (
  <motion.div 
    key={resource.id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    viewport={{ once: true }}
    className={`rounded-xl shadow-lg card-hover overflow-hidden ${isRestricted ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200' : 'bg-white'}`}
  >
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${isRestricted ? 'bg-gray-200 text-gray-700' : 'bg-green-100 text-primary'}`}>
          {resource.category}
        </span>
        {isRestricted ? <Lock className="w-5 h-5 text-gray-500" /> : <FileText className="w-5 h-5 text-gray-400" />}
      </div>
      <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2">
        {resource.title}
      </h3>
      {isRestricted ? (
        <div className="mb-4">
          <span className="text-sm text-gray-600 bg-yellow-100 px-2 py-1 rounded">
            {resource.access}
          </span>
        </div>
      ) : (
        <div className="flex items-center space-x-3 mb-4 text-sm text-gray-600">
          <span>{resource.type}</span>
          <span>•</span>
          <span>{resource.pages}</span>
        </div>
      )}
      <p className="text-gray-700 text-sm mb-6 line-clamp-3">
        {resource.description}
      </p>
      {isRestricted ? (
        <button 
          onClick={handleAccessRequest}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors inline-flex items-center justify-center"
        >
          <ExternalLink className="mr-2 w-4 h-4" />
          Request Access
        </button>
      ) : (
        <button 
          onClick={() => handleDownload(resource.title)}
          className="btn-secondary w-full inline-flex items-center justify-center"
        >
          <Download className="mr-2 w-4 h-4" />
          Download
        </button>
      )}
    </div>
  </motion.div>
);

export default ResourceCard;