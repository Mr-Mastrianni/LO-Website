import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { conversations } from '@/data/conversationsData';

const ConversationDetail = () => {
  const { conversationId } = useParams();
  const conversation = conversations.find(c => c.id === parseInt(conversationId));

  if (!conversation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Conversation Not Found</h1>
          <Link to="/oncology-conversations" className="btn-primary">
            Back to Conversations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{conversation.title} - Living Oncology</title>
        <meta name="description" content={conversation.summary} />
      </Helmet>

      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              to="/oncology-conversations"
              className="inline-flex items-center text-primary hover:text-green-800 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Conversations
            </Link>

            <article>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                {conversation.title}
              </h1>

              <div className="flex items-center space-x-4 mb-8 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{conversation.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{conversation.date}</span>
                </div>
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {conversation.category}
                </span>
              </div>

              <div className="prose lg:prose-xl max-w-none text-gray-700 leading-relaxed">
                <p className="lead">{conversation.summary}</p>
                {/* Add full conversation content here */}
                <p>This is where the full content of the conversation would go. For now, we're just displaying the summary.</p>
              </div>
            </article>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ConversationDetail;
