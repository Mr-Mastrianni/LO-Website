import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Star, ChevronLeft, ChevronRight, Loader2, X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import TestimonialForm from '@/components/testimonials/TestimonialForm';
import { testimonials as staticTestimonials } from '@/data/testimonialsData';
import { supabase } from '@/lib/customSupabaseClient';

const TESTIMONIALS_PER_PAGE = 6;

// Banner shown when redirected from the testimonial approval Edge Function
const StatusBanner = ({ status, name, already, error }) => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  let icon, bg, text, heading;

  if (error) {
    icon = <AlertCircle className="w-6 h-6 text-red-600" />;
    bg = "bg-red-50 border-red-300";
    const messages = {
      missing_params: "The approval link was missing required information.",
      invalid_action: "The approval link contained an invalid action.",
      invalid_token: "This approval link is invalid or has expired. It may have already been used.",
      not_found: "This testimonial could not be found. It may have been deleted.",
      db_error: "A database error occurred. Please try again.",
      server_error: "An unexpected error occurred. Please try again later.",
    };
    heading = "Something went wrong";
    text = messages[error] || "An unknown error occurred.";
  } else {
    const isApproved = status === "approved";
    const verb = isApproved ? "approved" : "rejected";
    icon = isApproved
      ? <CheckCircle className="w-6 h-6 text-green-600" />
      : <XCircle className="w-6 h-6 text-red-600" />;
    bg = isApproved ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300";
    heading = `Testimonial ${verb}`;
    text = already
      ? `${name}'s testimonial was already ${verb}. No changes were made.`
      : `${name}'s testimonial has been ${verb}. ${isApproved ? "It's now visible below." : "It will not appear on the site."}`;
  }

  return (
    <div className={`${bg} border rounded-lg p-4 mb-6 flex items-start gap-3 shadow-sm`}>
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{heading}</p>
        <p className="text-gray-700 text-sm mt-0.5">{text}</p>
      </div>
      <button onClick={() => setDismissed(true)} className="flex-shrink-0 text-gray-400 hover:text-gray-600">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [supabaseTestimonials, setSupabaseTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redirectParams, setRedirectParams] = useState({});

  // Parse query params from Edge Function redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    const name = params.get("name");
    const already = params.get("already");
    const error = params.get("error");

    if (status || error) {
      setRedirectParams({ status, name, already: already === "1", error });
      // Clean the URL without reloading
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
    }
  }, []);

  // Fetch approved testimonials from Supabase
  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (!error && data) {
        // Map Supabase columns to match the static data shape
        const mapped = data.map(t => ({
          id: `sb-${t.id}`,
          name: t.name,
          role: t.role || 'Community Member',
          story: t.content,
          date: new Date(t.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          featured: t.featured || false,
          fromSupabase: true
        }));
        setSupabaseTestimonials(mapped);
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  // Merge static + Supabase, deduplicate by name
  const staticNames = new Set(staticTestimonials.map(t => t.name.toLowerCase()));
  const newSupabaseTestimonials = supabaseTestimonials.filter(
    t => !staticNames.has(t.name.toLowerCase())
  );
  const allTestimonials = [...staticTestimonials, ...newSupabaseTestimonials];

  const featuredTestimonials = allTestimonials.filter(t => t.featured);
  const regularTestimonials = allTestimonials.filter(t => !t.featured);

  // Pagination for regular testimonials
  const totalPages = Math.ceil(regularTestimonials.length / TESTIMONIALS_PER_PAGE);
  const startIndex = (currentPage - 1) * TESTIMONIALS_PER_PAGE;
  const paginatedTestimonials = regularTestimonials.slice(startIndex, startIndex + TESTIMONIALS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById('community-voices')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Testimonials - Living Oncology</title>
        <meta name="description" content="Read inspiring stories from patients, families, and healthcare professionals who have been impacted by Living Oncology's mission and services." />
      </Helmet>

      <section className="bg-gradient-to-br from-gray-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Stories of Hope & Healing</h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Hear from patients, families, and healthcare professionals whose lives have been touched by our mission
            </p>
          </motion.div>
        </div>
      </section>

      {/* Status banner from Edge Function redirect */}
      {redirectParams.status || redirectParams.error ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <StatusBanner {...redirectParams} />
        </div>
      ) : null}

      {/* Share Your Story — front and center */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 sm:p-10 shadow-lg border border-amber-200"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-2">Share Your Story</h2>
              <p className="text-lg text-gray-600">We'd love to hear about your experience with Living Oncology.</p>
            </div>
            <TestimonialForm />
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
                  className="bg-gradient-to-r from-gray-50 to-yellow-50 rounded-2xl p-6 md:p-8 shadow-xl relative"
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

          {loading && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          )}

          {!loading && regularTestimonials.length > 0 ? (
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
            !loading && <p className="text-center text-gray-600">All testimonials are featured above.</p>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-gray-600 to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-white mb-6">Your Voice Matters</h2>
            <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
              Every story provides hope and guidance to others facing similar challenges.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
