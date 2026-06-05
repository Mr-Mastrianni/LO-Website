import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar, User, ArrowRight, Heart, Video, Play } from 'lucide-react';
import ReactPlayer from 'react-player';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { conversations } from '@/data/conversationsData';
import { Link } from 'react-router-dom';

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^\n&?#]+)/);
  return match ? match[1] : null;
};

// Helper function to get YouTube thumbnail URL
const getYouTubeThumbnail = (url) => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
};

// Helper function to get thumbnail for a conversation
const getThumbnail = (conversation) => {
  if (conversation.thumbnail) {
    return conversation.thumbnail;
  }
  if (conversation.videoType === 'youtube' || (!conversation.videoType && conversation.url?.includes('youtu'))) {
    return getYouTubeThumbnail(conversation.url);
  }
  return '/images/event-placeholder.jpg';
};

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
      <section className="bg-gradient-to-br from-gray-50 to-yellow-50 py-20">
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
                className="relative rounded-xl shadow-lg overflow-hidden group cursor-pointer"
                onClick={() => setSelectedVideo(conversation)}
              >
                {/* Video Thumbnail */}
                {conversation.type === 'video' && conversation.url && (
                  <>
                    <img
                      src={getThumbnail(conversation)}
                      alt={conversation.title}
                      className="w-full h-64 object-cover object-center"
                    />
                    
                    {/* Default overlay with just play button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-0" />
                    <div className="absolute bottom-4 right-4 z-10">
                      <div className="w-14 h-14 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                        <Play className="w-6 h-6 text-white ml-1" fill="white" />
                      </div>
                    </div>
                    
                    {/* Hover overlay with info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/80 to-primary/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center backdrop-blur-sm">
                            {conversation.type === 'video' && <Video className="w-3 h-3 mr-1" />}
                            {conversation.category}
                          </span>
                          <span className="text-white/80 text-xs">{conversation.duration}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                          {conversation.title}
                        </h3>
                        
                        <div className="flex items-center space-x-4 mb-3 text-xs text-white/90">
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{conversation.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{conversation.date}</span>
                          </div>
                        </div>
                        
                        <p className="text-white/90 text-sm leading-relaxed line-clamp-2 mb-3">
                          {conversation.summary}
                        </p>
                        
                        <span className="text-white font-semibold inline-flex items-center text-sm">
                          Watch Video
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-gray-600 to-gray-700">
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
            <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
              Have a story to share or a topic you'd like us to explore? We'd love to hear from you and include your voice in our ongoing conversations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-gray-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center">
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
