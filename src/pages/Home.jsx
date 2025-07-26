import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, BookOpen, Users, Lightbulb, Brain, Shield } from 'lucide-react';

const Home = () => {
  const impactItems = [
    {
      icon: BookOpen,
      title: "Educational Programs",
      description: "Providing cutting-edge cancer information and scientific resources to improve health literacy for patients and caregivers."
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Creating supportive networks and connections between patients, caregivers, and medical professionals to foster a strong community."
    },
    {
      icon: Brain,
      title: "Resource Transfer",
      description: "Acting as a neutral, trusted medium to share critical information that enables optimal patient outcomes and informed decisions."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Home - Living Oncology</title>
        <meta name="description" content="Living Oncology, a 501(c)(3) nonprofit, bridges the gap between cancer patients, caregivers, and scientific research through education and support. LIVING is larger than Life." />
      </Helmet>

      <section className="relative bg-gradient-to-br from-green-50 to-yellow-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-primary mb-6"
            >
              LIVING is larger than Life.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              A charitable neuro-oncology literacy organization bridging the gap between patients, physicians, and the science of medicine.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/about-us" className="btn-secondary inline-flex items-center">
                Learn More About Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link to="/contact" className="btn-primary inline-flex items-center">
                Partner with Us
                <Heart className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl p-8 md:p-12 shadow-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Meet Our Founder
                </h2>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Dr. Na Tosha Gatson, MD, PhD, FAAN
                </h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Dr. Gatson is a distinguished neuro-oncology specialist and the founding President & CEO of Living Oncology. As a 501(c)(3) nonprofit leader, she is dedicated to improving health literacy and connecting patients with cutting-edge scientific resources.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Her passion for "standing in the gaps" between complex medical science and patient understanding drives our mission to make oncology knowledge accessible to all.
                </p>
                <Link 
                  to="/about-dr-gatson" 
                  className="btn-secondary inline-flex items-center"
                >
                  Learn More About Dr. Gatson
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
              <div className="flex justify-center">
                <div className="w-80 h-80 bg-gradient-to-br from-green-200 to-yellow-200 rounded-full flex items-center justify-center shadow-xl">
                  <img   
                    className="w-72 h-72 rounded-full object-cover shadow-lg" 
                    alt="Dr. Na Tosha Gatson, MD, PhD, FAAN - Founder and CEO of Living Oncology"
                   src="https://storage.googleapis.com/hostinger-horizons-assets-prod/852aedb6-5a53-4567-88c5-7e3cc5ed6cb7/4ffd3399a8a056778c8328f55c4eae31.png" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg card-hover"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-primary">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To improve health literacy by reconnecting patients and their caregivers to the scientific resources that allow for optimal LIVING through their cancer journey.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg card-hover"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-primary">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We envision a world where every person affected by cancer has access to comprehensive, understandable, and actionable information about their condition.
              </p>
              <p className="text-xl font-semibold text-accent">
                "LIVING is larger than Life" — reflecting our philosophy that quality of life and empowerment are as vital as medical treatment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">What We Do</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We focus on three core services to support the neuro-oncology community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactItems.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl p-8 text-center shadow-lg card-hover"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
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
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Join us in our mission to improve cancer health literacy and support those affected by neuro-oncology conditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-green-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center">
                Get in Touch
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link to="/donate" className="btn-primary inline-flex items-center justify-center">
                Support Our Mission
                <Heart className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;