import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { publicResources, handleDownload } from '@/data/resourcesData';

const FeaturedResource = () => {
  const featured = publicResources.find(r => r.featured);
  if (!featured) return null;

  return (
    <motion.div 
      key={featured.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl p-8 md:p-12 shadow-xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-block bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Featured Resource
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {featured.title}
          </h3>
          <div className="flex items-center space-x-4 mb-4 text-gray-600">
            <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold">
              {featured.category}
            </span>
            <span className="text-sm">{featured.type}</span>
            <span className="text-sm">{featured.pages}</span>
          </div>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {featured.description}
          </p>
          <button 
            onClick={() => handleDownload(featured.title)}
            className="btn-primary inline-flex items-center"
          >
            <Download className="mr-2 w-4 h-4" />
            Download Free
          </button>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <img  
              className="w-full max-w-sm rounded-xl shadow-lg" 
              alt="Understanding Your Brain Tumor Diagnosis guide cover"
             src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedResource;