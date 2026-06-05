import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight, Clock, Heart } from 'lucide-react';

const BrainStormCancer = () => {
  const events = [
    {
      id: 2026,
      title: "BrainStorm Cancer - Arizona Symposium",
      date: "May 9, 2026",
      time: "8:00 AM - 1:00 PM",
      location: "Marriott Resort Tempe at The Buttes, Tempe, AZ",
      summary: "A transformative half day dedicated to advancing brain tumor care through education, networking, and shared insights from experts and survivors alike. This comprehensive educational and networking symposium aims to unite patients, physicians, nurses, caregivers, scientists, and vendors.",
      image: "/images/01 (151).jpg",
      status: "past",
      featured: false
    },
    {
      id: 20260905,
      title: "BrainStorm Cancer - Arizona Symposium",
      date: "September 5, 2026",
      time: "8:00 AM - 12:00 PM",
      location: "Sheraton Indianapolis Hotel at Keystone Crossing, 8787 Keystone Crossing, Indianapolis, IN 46240",
      summary: "Our second BrainStorm Cancer symposium of 2026 heads to Indianapolis. Join patients, physicians, nurses, caregivers, scientists, and vendors for a transformative half day of education, networking, and shared insights. Together we advance brain tumor care through community, science, and hope.",
      image: "/images/2026/brainstorm-2026-254.jpg",
      status: "upcoming",
      featured: true,
      registrationOpens: "June 15, 2026"
    },
    {
      id: 1,
      title: "BrainStorm Cancer '25",
      date: "May 10, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Marriott Resort Tempe at The Buttes, Tempe, AZ",
      summary: "Our flagship annual conference brought together patients, caregivers, and medical professionals for a comprehensive one-day event with expert-led sessions and community connections.",
      image: "/images/01 (1).jpg",
      status: "past",
      featured: false
    },
    {
      id: 4,
      title: "BrainStorm Cancer 2024",
      date: "May 11, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Marriott Resort Tempe at The Buttes, Tempe, AZ",
      summary: "Our successful 2024 conference brought together over 500 participants for education, networking, and inspiration in the fight against brain cancer.",
      image: "/images/01 (62).jpg",
      status: "past",
      featured: false
    }
  ];

  const upcomingEvents = events.filter(event => event.status === 'upcoming');
  const pastEvents = events.filter(event => event.status === 'past');

  return (
    <>
      <Helmet>
        <title>BrainStorm Cancer Events - Living Oncology</title>
        <meta name="description" content="Join Living Oncology's BrainStorm Cancer events including our annual conference, workshops, and educational sessions for the neuro-oncology community." />
      </Helmet>

      <section className="bg-gradient-to-br from-gray-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              BrainStorm Cancer Events
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Connecting the neuro-oncology community through education, research, and support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Event Flyer — animated floating card */}
      <section className="py-4 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Glow ring */}
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 40px rgba(249,115,22,0.3), 0 0 80px rgba(249,115,22,0.1)",
                  "0 0 60px rgba(249,115,22,0.5), 0 0 100px rgba(249,115,22,0.2)",
                  "0 0 40px rgba(249,115,22,0.3), 0 0 80px rgba(249,115,22,0.1)",
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src={`${import.meta.env.BASE_URL}images/flyer-sep9th.jpeg`}
                alt="BrainStorm Cancer — September 5, 2026 at Sheraton Indianapolis"
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -top-4 -right-4 sm:-right-6"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="bg-accent text-white px-4 py-2 rounded-full font-bold text-sm sm:text-base shadow-lg"
              >
                September 5, 2026
              </motion.div>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex justify-center mt-6"
            >
              <Link
                to="/brainstorm-cancer/20260905"
                className="btn-primary inline-flex items-center text-lg px-8 py-3"
              >
                View Event Details
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {upcomingEvents.find(event => event.featured) && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-primary mb-4">Featured Event</h2>
            </motion.div>

            {upcomingEvents.filter(event => event.featured).map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-gray-50 to-yellow-50 rounded-2xl p-8 md:p-12 shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-block bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      Featured Event
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                      {event.title}
                    </h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="font-semibold">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Clock className="w-5 h-5 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {event.summary}
                    </p>
                    <Link
                      to={`/brainstorm-cancer/${event.id}`}
                      className="btn-primary inline-flex items-center"
                    >
                      View Event Details
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      className="w-full max-w-md rounded-xl shadow-lg mb-6"
                      alt={event.title}
                      src={event.image} />
                    {/* Glowing Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/donate"
                        className="relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-300 bg-accent rounded-lg hover:bg-accent/90 hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:shadow-[0_0_30px_rgba(249,115,22,0.8)]"
                      >
                        <Heart className="w-5 h-5 mr-2" />
                        Donate
                      </Link>
                      {event.registrationOpens ? (
                        <div className="relative inline-flex flex-col items-center justify-center px-8 py-3 font-bold text-amber-800 bg-amber-50 rounded-lg border-2 border-amber-200">
                          <span>Registration Opens Soon</span>
                          <span className="text-sm font-normal text-amber-600 mt-1">Opens {event.registrationOpens} — Stay Tuned</span>
                        </div>
                      ) : (
                        <div className="relative inline-flex items-center justify-center px-8 py-3 font-bold text-amber-800 bg-amber-50 rounded-lg border-2 border-amber-200">
                          Register at Door on Event Day
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {upcomingEvents.length > 0 ? (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-primary mb-4">Upcoming Events</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Join us for these educational and supportive events designed for the neuro-oncology community.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.filter(event => !event.featured).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg card-hover overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-gray-100 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                        Upcoming
                      </div>
                      <Users className="w-5 h-5 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-6 line-clamp-3">
                      {event.summary}
                    </p>
                    <Link
                      to={`/brainstorm-cancer/${event.id}`}
                      className="btn-secondary w-full text-center inline-flex items-center justify-center"
                    >
                      View Details
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold text-primary mb-4">Upcoming Events</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                We're currently planning our next events. Stay tuned for announcements about upcoming educational and supportive events for the neuro-oncology community.
              </p>
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-primary mb-4">Stay Informed</h3>
                <p className="text-gray-700 mb-6">
                  Be the first to know about our upcoming events, workshops, and educational opportunities.
                </p>
                <Link
                  to="/contact"
                  className="btn-primary inline-flex items-center"
                >
                  Get Event Updates
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Past Events</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore our previous events and their impact on the neuro-oncology community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl shadow-lg card-hover overflow-hidden"
              >
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Past Event
                    </div>
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {event.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-6">
                    {event.summary}
                  </p>
                  <Link
                    to={`/brainstorm-cancer/${event.id}`}
                    className="text-primary hover:text-gray-800 font-semibold inline-flex items-center"
                  >
                    View Event Summary
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-gray-600 to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Stay Connected
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
              Don't miss our upcoming events! Join our community to receive updates about new events, educational opportunities, and ways to get involved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-gray-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Event Updates
              </Link>
              <Link to="/community" className="btn-primary">
                Join Our Community
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BrainStormCancer;