import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import TestimonialForm from '@/components/testimonials/TestimonialForm';
import { testimonials } from '@/data/testimonialsData';

const TESTIMONIALS_PER_PAGE = 6;

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const featuredTestimonials = testimonials.filter(t => t.featured);
  const regularTestimonials = testimonials.filter(t => !t.featured);

  // Pagination for regular testimonials
  const totalPages = Math.ceil(regularTestimonials.length / TESTIMONIALS_PER_PAGE);
  const startIndex = (currentPage - 1) * TESTIMONIALS_PER_PAGE;
  const paginatedTestimonials = regularTestimonials.slice(startIndex, startIndex + TESTIMONIALS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to the testimonials section
    document.getElementById('community-voices')?.scrollIntoView({ behavior: 'smooth' });
  };

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
            <p className="text-lg text-gray-600 mt-4">
              {testimonials.length} testimonials from our community
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Testimonials Section */}
      {featuredTestimonials.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">Featured Stories</h2>
              <p className="text-xl text-gray-700">Highlighted testimonials from our community</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl p-6 md:p-8 shadow-xl"
                >
                  <div className="flex justify-start mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 leading-relaxed mb-6 line-clamp-6">
                    "{testimonial.story.length > 400 ? testimonial.story.substring(0, 400) + '...' : testimonial.story}"
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-primary">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      <p className="text-sm text-gray-500">{testimonial.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Community Voices Section with Pagination */}
      <section id="community-voices" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Community Voices</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">Read more inspiring stories from our community members</p>
          </motion.div>

          {regularTestimonials.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedTestimonials.map((testimonial, index) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center mt-12 space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border transition-colors ${currentPage === 1
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-primary'
                      }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-colors ${currentPage === page
                            ? 'bg-primary text-white'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-primary'
                          }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg border transition-colors ${currentPage === totalPages
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-primary'
                      }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              <p className="text-center text-gray-500 mt-4">
                Showing {startIndex + 1}-{Math.min(startIndex + TESTIMONIALS_PER_PAGE, regularTestimonials.length)} of {regularTestimonials.length} testimonials
              </p>
            </>
          ) : (
            <p className="text-center text-gray-600">All testimonials are featured above.</p>
          )}
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
