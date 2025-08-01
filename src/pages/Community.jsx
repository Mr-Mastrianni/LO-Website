import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { communityStats } from '@/data/communityData';
import DiscussionsTab from '@/components/community/DiscussionsTab';
import GroupsTab from '@/components/community/GroupsTab';
import MediaTab from '@/components/community/MediaTab';
import FilesTab from '@/components/community/FilesTab';
import AboutTab from '@/components/community/AboutTab';

const Community = () => {
  return (
    <>
      <Helmet>
        <title>Community Forum & Groups - Living Oncology</title>
        <meta name="description" content="Join Living Oncology's supportive community. Connect with other patients, caregivers, and healthcare professionals through our forums and support groups." />
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
              Community Forum & Groups
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Connect, share, and support each other on the neuro-oncology journey.
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
            <h2 className="text-4xl font-bold text-primary mb-4">Our Growing Community</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Join thousands of patients, caregivers, and healthcare professionals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{stat.label}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="discussions" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-8">
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>

              <TabsContent value="discussions"><DiscussionsTab /></TabsContent>
              <TabsContent value="groups"><GroupsTab /></TabsContent>
              <TabsContent value="media"><MediaTab /></TabsContent>
              <TabsContent value="files"><FilesTab /></TabsContent>
              <TabsContent value="about"><AboutTab /></TabsContent>
            </Tabs>
          </motion.div>
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
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Connect with others who understand your journey. Share experiences, find support, and build meaningful relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/members-directory" className="bg-white text-green-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                View Members
              </Link>
              <Link to="/contact" className="btn-primary">
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Community;
