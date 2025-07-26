import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Users, BookOpen, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';
import ZeffyEmbed from '@/components/donations/ZeffyEmbed';

const Donate = () => {
  const impactAreas = [
    {
      icon: BookOpen,
      title: "Patient Education",
      description: "Fund the development of comprehensive educational resources and materials for patients and families.",
      impact: "$50 can provide educational materials to 10 families"
    },
    {
      icon: Users,
      title: "Support Groups",
      description: "Support the operation of support groups and community programs for patients and caregivers.",
      impact: "$100 can fund a monthly support group session"
    },
    {
      icon: Calendar,
      title: "Events & Conferences",
      description: "Enable us to host educational events, conferences, and workshops for the neuro-oncology community.",
      impact: "$250 can sponsor one conference attendee"
    },
    {
      icon: Heart,
      title: "Direct Patient Support",
      description: "Provide direct assistance and resources to patients and families in need.",
      impact: "$500 can provide consultation services to families in need"
    }
  ];

  const donationBenefits = [
    "100% of your donation reaches us through Zeffy",
    "Tax-deductible contribution (Living Oncology is a 501(c)(3) organization)",
    "Quarterly impact reports showing how your donation is making a difference",
    "Invitation to exclusive donor events and educational sessions",
    "Recognition in our annual report (optional)",
    "Direct impact on improving neuro-oncology health literacy",
    "Supporting a community of patients, caregivers, and healthcare professionals"
  ];
  
  const zeffyDonationUrl = 'https://www.zeffy.com/en-US/embed/donation-form/0750dbd9-2db9-41ea-890e-998e0da32bb6';

  return (
    <>
      <Helmet>
        <title>Donate to Living Oncology - Support Cancer Health Literacy</title>
        <meta name="description" content="Support Living Oncology's mission to improve cancer health literacy. Your donation helps provide education, support, and resources to the neuro-oncology community." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/20 to-accent/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Support Our Mission
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed mb-8">
              Help us improve neuro-oncology health literacy and support patients and families on their cancer journey.
            </p>
            <p className="text-2xl font-bold text-accent">
              "LIVING is larger than Life."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Form */}
      <section id="donate-form" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Make a Donation</h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Every contribution, no matter the size, makes a meaningful difference.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-primary/10 rounded-2xl p-4 md:p-8 shadow-xl"
          >
             {zeffyDonationUrl ? (
                <ZeffyEmbed src={zeffyDonationUrl} />
              ) : (
                <div className="text-center p-8 bg-yellow-50 border-2 border-dashed border-yellow-400 rounded-lg">
                  <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-yellow-800 mb-2">Donation Form Setup Needed</h3>
                  <p className="text-yellow-700">
                    Please provide your Zeffy donation form URL to activate this section. Once provided, your live donation form will appear here.
                  </p>
                </div>
              )}
          </motion.div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Your Impact</h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              See how your donation directly supports our mission and makes a difference.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactAreas.map((area, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg card-hover"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <area.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{area.title}</h3>
                    <p className="text-foreground/80 leading-relaxed mb-4">{area.description}</p>
                    <div className="bg-primary/20 rounded-lg p-3">
                      <p className="text-sm font-semibold text-foreground">{area.impact}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Donate to Living Oncology?
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                When you donate, you're joining a movement to transform how patients and families navigate neuro-oncology. Your support enables our vital work in education, advocacy, and community building.
              </p>
              
              <div className="space-y-4">
                {donationBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <p className="text-foreground/80">{benefit}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                <img  class="w-full max-w-md rounded-xl shadow-xl" alt="Patients and families benefiting from Living Oncology programs" src="https://images.unsplash.com/photo-1594813967918-3d04c5af997d" />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-12 h-12 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-accent/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Together, We Can Make a Difference
            </h2>
            <p className="text-xl text-primary/80 mb-8 max-w-3xl mx-auto">
              Your generosity helps us continue our mission. Every donation brings us closer to a world where no one faces cancer alone or uninformed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#donate-form"
                className="bg-white text-accent hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
              >
                <Heart className="mr-2 w-4 h-4" />
                Donate Now
              </a>
              <a href="/contact" className="btn-secondary inline-flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-accent">
                <Users className="mr-2 w-4 h-4" />
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Donate;