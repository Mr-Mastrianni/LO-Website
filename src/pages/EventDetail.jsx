import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { events } from '@/data/eventsData';

const EventDetail = () => {
  const { eventId } = useParams();
  const event = events[eventId];

  const handleRegister = () => {
    toast({
      title: "🚧 Registration Coming Soon!",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Event Not Found</h1>
          <Link to="/brainstorm-cancer" className="btn-primary">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{event.title} - Living Oncology</title>
        <meta name="description" content={event.description} />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              to="/brainstorm-cancer"
              className="inline-flex items-center text-primary hover:text-green-800 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                  event.status === 'upcoming' 
                    ? 'bg-green-100 text-primary' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {event.status === 'upcoming' ? 'Upcoming Event' : 'Past Event'}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                  {event.title}
                </h1>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3 text-lg text-gray-700">
                    <Calendar className="w-6 h-6 text-primary" />
                    <span className="font-semibold">{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-lg text-gray-700">
                    <Clock className="w-6 h-6 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-lg text-gray-700">
                    <MapPin className="w-6 h-6 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {event.status === 'upcoming' && (
                  <button 
                    onClick={handleRegister}
                    className="btn-primary inline-flex items-center"
                  >
                    Register Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="flex justify-center">
                <img
                  className="w-full max-w-md rounded-xl shadow-xl"
                  alt={`${event.title} event image`}
                  src={`${import.meta.env.BASE_URL}images/event-placeholder.jpg`} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Description */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-primary mb-6">Event Overview</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {event.description}
                </p>

                {event.agenda && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-primary mb-6">Event Agenda</h3>
                    <div className="space-y-4">
                      {event.agenda.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center bg-gray-50 rounded-lg p-4">
                          <div className="text-primary font-semibold mb-2 sm:mb-0 sm:w-40 flex-shrink-0">
                            {item.time}
                          </div>
                          <div className="text-gray-700">
                            {item.activity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {event.speakers && (
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-6">Featured Speakers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {event.speakers.map((speaker, index) => (
                        <div key={index} className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-gray-700 font-medium">{speaker}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl p-8 sticky top-8"
              >
                <h3 className="text-2xl font-bold text-primary mb-6">Event Details</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Date & Time</h4>
                    <p className="text-gray-700">{event.date}</p>
                    <p className="text-gray-700">{event.time}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Location</h4>
                    <p className="text-gray-700">{event.location}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Cost</h4>
                    <p className="text-gray-700">Free for all attendees</p>
                  </div>
                  
                  {event.status === 'upcoming' && (
                    <div className="pt-4 border-t border-gray-200">
                      <button 
                        onClick={handleRegister}
                        className="btn-primary w-full"
                      >
                        Register Now
                      </button>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Registration is required for all events
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-primary mb-6">
              Explore More Events
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Discover other educational opportunities and community events
            </p>
            <Link 
              to="/brainstorm-cancer"
              className="btn-secondary inline-flex items-center"
            >
              See All Events
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default EventDetail;
