import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Users, Microscope, Heart } from 'lucide-react';

const AboutDrGatson = () => {
  const credentials = [
    "MD - Doctor of Medicine",
    "PhD - Neuroscience Research",
    "Board Certified Neuro-Oncologist",
    "Fellow of the American Academy of Neurology (FAAN)",
    "Member, Society for Neuro-Oncology"
  ];

  const researchInterests = [
    {
      icon: Microscope,
      title: "Sex/Gender Disparities in Neuro-Oncology",
      description: "Investigating how biological sex and gender identity impact brain tumor incidence, treatment response, and outcomes."
    },
    {
      icon: BookOpen,
      title: "Neuroimmunology",
      description: "Exploring the complex interactions between the immune system and brain tumors to develop novel therapeutic approaches."
    },
    {
      icon: Award,
      title: "Brain Tumor Imaging",
      description: "Advancing neuroimaging techniques to improve early detection, treatment planning, and monitoring of brain tumors."
    },
    {
      icon: Users,
      title: "Health Literacy & Patient Education",
      description: "Developing innovative methods to communicate complex medical information effectively to patients and families."
    }
  ];

  const achievements = [
    "Published over 50 peer-reviewed articles in leading medical journals",
    "Principal Investigator on multiple NIH-funded research grants",
    "Recipient of the Young Investigator Award from the Society for Neuro-Oncology",
    "Featured speaker at international neuro-oncology conferences",
    "Mentor to numerous medical students and residents",
    "Advocate for diversity and inclusion in medical research"
  ];

  return (
    <>
      <Helmet>
        <title>About Dr. Na Tosha Gatson, MD, PhD, FAAN - Living Oncology</title>
        <meta name="description" content="Learn about Dr. Na Tosha Gatson, MD, PhD, FAAN, founder of Living Oncology. Discover her credentials, research interests, and dedication to neuro-oncology patient care." />
      </Helmet>

      <section className="bg-gradient-to-br from-green-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Dr. Na Tosha N. Gatson
              </h1>
              <p className="text-2xl font-semibold text-gray-800 mb-4">
                MD, PhD, FAAN - Founder, President & CEO
              </p>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Pioneering neuro-oncologist, researcher, and advocate dedicated to bridging the gap between cutting-edge science and compassionate patient care.
              </p>
              <div className="flex items-center space-x-2 text-accent text-lg font-semibold">
                <Heart className="w-5 h-5" />
                <span>"LIVING is larger than Life."</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-green-200 to-yellow-200 rounded-full flex items-center justify-center shadow-xl">
                  <img   
                    className="w-72 h-72 rounded-full object-cover shadow-lg" 
                    alt="Dr. Na Tosha Gatson, MD, PhD, FAAN - Professional portrait"
                   src="https://storage.googleapis.com/hostinger-horizons-assets-prod/852aedb6-5a53-4567-88c5-7e3cc5ed6cb7/4ffd3399a8a056778c8328f55c4eae31.png" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
              </div>
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
            <h2 className="text-4xl font-bold text-primary mb-4">Credentials & Qualifications</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Dr. Gatson brings exceptional expertise and credentials to her role as a leader in neuro-oncology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.map((credential, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl p-6 text-center shadow-lg card-hover"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <p className="text-lg font-semibold text-gray-800">{credential}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Research Interests</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Dr. Gatson's research focuses on advancing our understanding of brain tumors and improving patient outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchInterests.map((interest, index) => (
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
                    <interest.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-3">{interest.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{interest.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Professional Journey
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Dr. Na Tosha Gatson's journey in medicine began with a profound desire to make a meaningful difference in the lives of patients facing the most challenging diagnoses. Her path led her to specialize in neuro-oncology, where she discovered her passion for both cutting-edge research and compassionate patient care.
                </p>
                <p>
                  Throughout her career, Dr. Gatson has been at the forefront of neuro-oncology research, with particular expertise in understanding how sex and gender disparities affect brain tumor outcomes. Her groundbreaking work in neuroimmunology has contributed to new therapeutic approaches that are improving patient survival and quality of life.
                </p>
                <p>
                  As a clinician, Dr. Gatson recognized that even the most advanced treatments could fall short if patients and families didn't have access to clear, understandable information about their condition. This realization sparked her vision for Living Oncology—an organization that would bridge the gap between complex medical science and the people who need to understand it most.
                </p>
                <p>
                  Her commitment to health literacy extends beyond her clinical practice. Dr. Gatson is a passionate educator and mentor, working tirelessly to train the next generation of healthcare providers while advocating for more inclusive and accessible medical communication.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-primary mb-6">Notable Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl">
                <h4 className="text-xl font-bold text-primary mb-3">Philosophy</h4>
                <p className="text-gray-700 leading-relaxed italic">
                  "Every patient deserves to understand their diagnosis, their treatment options, and their prognosis in terms that empower rather than overwhelm. When we bridge the gap between medical complexity and human understanding, we don't just treat disease—we restore hope and dignity to the healing process."
                </p>
              </div>
            </motion.div>
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
              Join Dr. Gatson's Mission
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Be part of the movement to improve neuro-oncology health literacy and support patients and families on their journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-green-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Involved
              </a>
              <a href="/donate" className="btn-primary">
                Support Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutDrGatson;