import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight, Clock } from 'lucide-react';

const BrainStormCancer = () => {
  const events = [
    {
      id: 1,
      title: "BrainStorm Cancer '25",
      date: "May 10, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Tempe, Arizona",
      summary: "Our flagship annual conference brought together patients, caregivers, and medical professionals for a comprehensive one-day event with expert-led sessions and community connections.",
      status: "past",
      featured: false
    },
    {
      id: 4,
      title: "BrainStorm Cancer Arizona 2024",
      date: "March 15, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Phoenix Convention Center, Phoenix, AZ",
      summary: "Our successful 2024 conference brought together over 500 participants for education, networking, and inspiration in the fight against brain cancer.",
      status: "past",
      featured: false
    },
    {
      id: 5,
      title: "Young Adult Brain Tumor Support Group Launch",
      date: "January 15, 2024",
      time: "6:00 PM - 7:30 PM",
      location: "Virtual Event",
      summary: "The inaugural meeting of our new support group specifically designed for young adults (ages 18-39) affected by brain tumors.",
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

      <section className="bg-gradient-to-br from-green-50 to-yellow-50 py-20">
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
                className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl p-8 md:p-12 shadow-xl"
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
                  <div className="flex justify-center">
                    <img 
                      className="w-full max-w-md rounded-xl shadow-lg" 
                      alt="BrainStorm Cancer 2025 conference venue in Tempe, Arizona"
                     src="https://images.unsplash.com/photo-1672396309399-353d95b114a1" />
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
                      <div className="bg-green-100 text-primary px-3 py-1 rounded-full text-sm font-semibold">
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
                    className="text-primary hover:text-green-800 font-semibold inline-flex items-center"
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

      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
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
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Don't miss our upcoming events! Join our community to receive updates about new events, educational opportunities, and ways to get involved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-green-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
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