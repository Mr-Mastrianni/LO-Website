import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import TestimonialForm from '@/components/testimonials/TestimonialForm';
import { testimonials } from '@/data/testimonialsData';

const Testimonials = () => {
  const featuredTestimonial = testimonials.find(t => t.featured);
  const regularTestimonials = testimonials.filter(t => !t.featured);

  return (
    <>
      <Helmet>
        <title>Testimonials - Living Oncology</title>
        <meta name="description" content="Read inspiring stories from patients, families, and healthcare professionals who have been impacted by Living Oncology's mission and services." />
      </Helmet>

      <section className="bg-gradient-to-br from-green-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Stories of Hope & Healing</h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Hear from patients, families, and healthcare professionals whose lives have been touched by our mission
            </p>
          </motion.div>
        </div>
      </section>

      {featuredTestimonial && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">Featured Story</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-accent fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed italic mb-6">"{featuredTestimonial.story}"</blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{featuredTestimonial.name.charAt(0)}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-primary">{featuredTestimonial.name}</p>
                    <p className="text-gray-600">{featuredTestimonial.role}</p>
                    <p className="text-sm text-gray-500">{featuredTestimonial.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Community Voices</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">Read more inspiring stories from our community members</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularTestimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Share Your Story</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">We'd love to hear about your experience with Living Oncology.</p>
          </motion.div>
          <TestimonialForm />
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-white mb-6">Your Voice Matters</h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Every story provides hope and guidance to others facing similar challenges.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
