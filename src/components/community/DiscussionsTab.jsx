import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, MessageCircle } from 'lucide-react';
import { forumCategories, recentPosts, handleCreatePost } from '@/data/communityData';

const DiscussionsTab = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="space-y-8"
  >
    <div className="flex justify-between items-center">
      <h3 className="text-2xl font-bold text-primary">Forum Discussions</h3>
      <button 
        onClick={handleCreatePost}
        className="btn-primary inline-flex items-center"
      >
        <PlusCircle className="mr-2 w-4 h-4" />
        Create Post
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-xl font-bold text-primary mb-6">Forum Categories</h4>
        <div className="space-y-4">
          {forumCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg p-6 shadow-lg card-hover">
              <div className="flex items-start justify-between mb-3">
                <h5 className="text-lg font-semibold text-primary">{category.name}</h5>
                <MessageCircle className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-700 text-sm mb-3">{category.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{category.posts} posts</span>
                <span>Last activity: {category.lastActivity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xl font-bold text-primary mb-6">Recent Posts</h4>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg p-6 shadow-lg card-hover">
              <h5 className="text-lg font-semibold text-primary mb-2">{post.title}</h5>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <span>by {post.author}</span>
                <span>in {post.category}</span>
                <span>{post.timeAgo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{post.replies} replies</span>
                <button className="text-primary hover:text-green-800 text-sm font-semibold">
                  View Discussion
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

export default DiscussionsTab;