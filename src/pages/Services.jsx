import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Stethoscope, Users, BookOpen, Heart, CheckCircle, ArrowRight } from 'lucide-react';

const Services = () => {
  const consultationBenefits = [
    "Personalized review of your medical records and treatment history",
    "Clear explanation of your diagnosis in understandable terms",
    "Discussion of all available treatment options and clinical trials",
    "Guidance on questions to ask your healthcare team",
    "Resources for second opinions and specialist referrals",
    "Support for treatment decision-making process",
    "Connection to relevant support groups and resources",
    "Follow-up support throughout your treatment journey"
  ];

  const serviceFeatures = [
    {
      icon: Stethoscope,
      title: "Expert Medical Guidance",
      description: "Receive personalized consultation from Dr. Na Tosha Gatson, a board-certified neuro-oncologist with extensive experience in brain tumor care."
    },
    {
      icon: BookOpen,
      title: "Educational Resources",
      description: "Access comprehensive, evidence-based educational materials tailored to your specific diagnosis and treatment plan."
    },
    {
      icon: Users,
      title: "Care Team Coordination",
      description: "Get assistance in building and coordinating with your healthcare team to ensure comprehensive, patient-centered care."
    },
    {
      icon: Heart,
      title: "Emotional Support",
      description: "Receive compassionate support and guidance to help you and your family navigate the emotional aspects of your cancer journey."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Personalized Neuro-Oncology Consultation - Living Oncology</title>
        <meta name="description" content="Get personalized neuro-oncology consultation services from Dr. Na Tosha Gatson. Expert guidance, treatment planning, and support for brain tumor patients." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Personalized Neuro-Oncology Consultation
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
              Expert guidance and support tailored to your unique cancer journey
            </p>
            <Link 
              to="/request-consultation"
              className="btn-primary inline-flex items-center text-lg px-8 py-4"
            >
              Request Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Expert Care When You Need It Most
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Facing a brain tumor diagnosis can be overwhelming, with complex medical information and difficult decisions to navigate. Our personalized neuro-oncology consultation service provides you with expert guidance from Dr. Na Tosha Gatson, helping you understand your diagnosis and explore all available treatment options.
                </p>
                <p>
                  This comprehensive consultation is designed to empower you with knowledge, clarify your treatment path, and ensure you feel confident in your healthcare decisions. We take the time to explain complex medical concepts in understandable terms and provide you with the resources you need to advocate for your care.
                </p>
                <p>
                  Whether you're newly diagnosed, seeking a second opinion, or exploring treatment options, our consultation service provides the personalized attention and expert guidance you deserve.
                </p>
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
                <img  
                  className="w-full max-w-md rounded-xl shadow-xl" 
                  alt="Dr. Gatson consulting with a patient in a comfortable medical office setting"
                 src="/images/consultation.jpg" />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <Stethoscope className="w-12 h-12 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">What Our Consultation Includes</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive support designed around your individual needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg card-hover"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Consultation Benefits</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive support to help you make informed decisions about your care
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {consultationBenefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-3 bg-gradient-to-br from-green-50 to-yellow-50 rounded-lg p-4"
              >
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-gray-700 leading-relaxed">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">How It Works</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A simple, straightforward process designed with your comfort in mind
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Request Consultation",
                description: "Contact us to schedule your personalized consultation. We'll gather basic information about your situation and medical history."
              },
              {
                step: "2",
                title: "Preparation & Review",
                description: "Dr. Gatson reviews your medical records, imaging, and pathology reports to prepare for your comprehensive consultation."
              },
              {
                step: "3",
                title: "Consultation & Follow-up",
                description: "Meet with Dr. Gatson for your detailed consultation, receive your personalized recommendations, and ongoing support as needed."
              }
            ].map((process, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">{process.step}</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{process.title}</h3>
                <p className="text-gray-700 leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Take the Next Step?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Don't navigate your cancer journey alone. Get the expert guidance and support you need to make informed decisions about your care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/request-consultation"
                className="bg-white text-green-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
              >
                <Stethoscope className="mr-2 w-4 h-4" />
                Request Consultation
              </Link>
              <Link to="/contact" className="btn-primary inline-flex items-center justify-center">
                <Heart className="mr-2 w-4 h-4" />
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
