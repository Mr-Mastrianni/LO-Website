import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { publicResources, restrictedResources, resourceCategories } from '@/data/resourcesData';
import ResourceCard from '@/components/resources/ResourceCard';
import FeaturedResource from '@/components/resources/FeaturedResource';

const Resources = () => {
  return (
    <>
      <Helmet>
        <title>Essential Reading Resources - Living Oncology</title>
        <meta name="description" content="Access comprehensive educational resources, guides, and tools for brain tumor patients, caregivers, and healthcare professionals." />
      </Helmet>

      <section className="bg-gradient-to-br from-green-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Essential Reading Resources
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Comprehensive educational materials to empower your neuro-oncology journey.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Knowledge is Power
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our comprehensive resource library provides evidence-based information to help patients, caregivers, and healthcare professionals navigate the complex world of neuro-oncology. These resources are designed to empower you with the knowledge you need to make informed decisions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Resource Categories</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Organized by topic to help you find exactly what you need.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceCategories.map((category, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg card-hover text-center"
              >
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">
                  {category.count} {category.count === 1 ? 'resource' : 'resources'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Featured Resource</h2>
          </motion.div>
          <FeaturedResource />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Free Public Resources</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Downloadable guides and resources available to everyone.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publicResources.filter(resource => !resource.featured).map((resource, index) => (
              <ResourceCard key={resource.id} resource={resource} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Professional Resources</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Specialized resources for healthcare professionals and researchers.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restrictedResources.map((resource, index) => (
              <ResourceCard key={resource.id} resource={resource} index={index} isRestricted={true} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Need Additional Resources?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Can't find what you're looking for? Contact us for personalized resource recommendations or to request access to professional materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-green-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Contact Us
              </a>
              <a href="/services" className="btn-primary">
                Request Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Resources;