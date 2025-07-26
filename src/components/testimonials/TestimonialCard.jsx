import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      key={testimonial.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl p-6 shadow-lg card-hover"
    >
      <div className="flex justify-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-accent fill-current" />
        ))}
      </div>
      
      <blockquote className="text-gray-700 leading-relaxed italic mb-6">
        "{testimonial.story}"
      </blockquote>
      
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <span className="text-white font-bold">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-bold text-primary text-sm">{testimonial.name}</p>
          <p className="text-gray-600 text-sm">{testimonial.role}</p>
          <p className="text-gray-500 text-xs">{testimonial.date}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;