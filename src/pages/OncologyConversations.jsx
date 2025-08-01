import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar, User, ArrowRight, BookOpen, Heart, Video, X } from 'lucide-react';
import ReactPlayer from 'react-player/youtube';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { conversations, categories } from '@/data/conversationsData';
import { Link } from 'react-router-dom';

const OncologyConversations = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <>
      <Helmet>
        <title>Oncology Conversations - Living Oncology</title>
        <meta name="description" content="Explore thoughtful conversations about neuro-oncology topics, featuring insights from patients, caregivers, and healthcare professionals." />
      </Helmet>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-3xl p-0 border-0">
          <div className="aspect-video">
            {selectedVideo && (
              <ReactPlayer
                url={selectedVideo.url}
                width="100%"
                height="100%"
                playing
                controls
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Oncology Conversations
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Meaningful discussions that bridge the gap between medical expertise and lived experience in the neuro-oncology community
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
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
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Where Knowledge Meets Understanding
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Our Oncology Conversations series brings together the voices of patients, caregivers, healthcare professionals, and researchers to explore the complex landscape of neuro-oncology care. These thoughtful discussions aim to provide practical insights, emotional support, and evidence-based information to help navigate the cancer journey.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Each conversation is designed to be accessible, informative, and empowering—reflecting our belief that informed patients and families are better equipped to make decisions that align with their values and goals.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Conversation Topics</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore conversations organized by key areas of interest and need
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg card-hover text-center"
              >
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  {category === "Community Voices" ? <Video className="w-6 h-6 text-white"/> : <BookOpen className="w-6 h-6 text-white" /> }
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{category}</h3>
                <p className="text-gray-600 text-sm">
                  {conversations.filter(conv => conv.category === category).length} conversations
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversations Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Recent Conversations</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Discover insights, experiences, and expert perspectives from our community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {conversations.map((conversation, index) => (
              <motion.article 
                key={conversation.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl p-8 shadow-lg card-hover"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    {conversation.type === 'video' && <Video className="w-4 h-4 mr-2" />}
                    {conversation.category}
                  </span>
                  <span className="text-gray-500 text-sm">{conversation.duration}</span>
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-3 leading-tight">
                  {conversation.title}
                </h3>
                
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{conversation.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{conversation.date}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  {conversation.summary}
                </p>
                
                {conversation.type === 'video' ? (
                  <button 
                    onClick={() => setSelectedVideo(conversation)}
                    className="text-primary hover:text-green-800 font-semibold inline-flex items-center transition-colors"
                  >
                    Watch Video
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    to={`/oncology-conversations/${conversation.id}`}
                    className="text-primary hover:text-green-800 font-semibold inline-flex items-center transition-colors"
                  >
                    Read Conversation
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Join the Conversation
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Have a story to share or a topic you'd like us to explore? We'd love to hear from you and include your voice in our ongoing conversations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-green-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center">
                <Heart className="mr-2 w-4 h-4" />
                Share Your Story
              </a>
              <a href="/community" className="btn-primary inline-flex items-center justify-center">
                <MessageCircle className="mr-2 w-4 h-4" />
                Join Our Community
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default OncologyConversations;
