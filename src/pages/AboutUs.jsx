import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Mike Vanderslice",
      role: "Chief Operating Officer",
      imageDescription: "Portrait of Mike Vanderslice, Chief Operating Officer",
      imageUrl: `${import.meta.env.BASE_URL}images/team/mike-vanderslice.png`
    },
    {
      name: "Y'Marii CLMastrianni",
      role: "Chief Financial Officer",
      imageDescription: "Portrait of Y'Marii CLMastrianni, Chief Financial Officer",
      imageUrl: `${import.meta.env.BASE_URL}images/team/ymarii-clmastrianni.png`
    },
    {
      name: "Saseshmu Ra Herut",
      role: "AI Tech/Product Manager",
      imageDescription: "Portrait of Saseshmu Ra Herut, AI Tech/Product Manager",
      imageUrl: `${import.meta.env.BASE_URL}images/team/saseshmu-ra-herut.png`
    },
    {
      name: "Sara Ornelas",
      role: "Product Designer",
      imageDescription: "Portrait of Sara Ornelas, Product Designer",
      imageUrl: `${import.meta.env.BASE_URL}images/team/sara-ornelas.png`
    },
    {
      name: "Aristide Norman",
      role: "Gen AI Communications and Engineering Architect",
      imageDescription: "Portrait of Aristide Norman, Gen AI Communications and Engineering Architect",
      imageUrl: `${import.meta.env.BASE_URL}images/team/aristide-norman.png`
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Living Oncology</title>
        <meta name="description" content="Learn about Living Oncology, our mission to reconnect patients and caregivers with innovative cancer care options, and meet our dedicated team." />
      </Helmet>

      <div className="bg-white">
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                About Us
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Life is long, <em className="font-serif">living</em> is short.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We are working to reconnect patients & their caregivers with innovative options in cancer care that allows patients and their caregivers to focus on LIVING. Our platform affords ample patient-facing learning spaces where physicians and health product experts can intersect for the good of the patient.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                className="w-full rounded-lg shadow-2xl"
                alt="Two diverse hands holding each other in front of a large brass bell, symbolizing support, community, and hope."
                src={`${import.meta.env.BASE_URL}images/about-us-hero.png`} />
            </motion.div>
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
                Meet The Team
              </h2>
              <div className="inline-block">
                <img
                  className="w-64 h-64 md:w-80 md:h-80 rounded-lg object-cover shadow-2xl"
                  src={`${import.meta.env.BASE_URL}images/dr-gatson-about.png`}
                  alt="Dr. Na Tosha N. Gatson, MD, PhD, FAAN"
                />
                <div className="mt-6">
                  <p className="text-xl font-bold text-gray-900">Na Tosha N. Gatson, MD, PhD, FAAN</p>
                  <p className="text-lg text-gray-700">Founding President & Chief Executive Officer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The Team: Building with Living Oncology
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto mb-16">
                Trusting the Process, Remaining Present, Dedicated to Excellence, Fortitude, Peace, and a deep Understanding of the Vision as it pertains to patient care. Start-ups must start with these core principles in place. I aim to face the patients with like-hearted people at my side. I have found extraordinary qualities in these team members. I promise to shape and develop this team for the good of Living Oncology as well as for those served by our Mission and Vision.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="w-full h-64 bg-gray-300 rounded-lg mb-4 overflow-hidden">
                    <img 
                      className="w-full h-full object-cover"
                      alt={member.imageDescription}
                     src={member.imageUrl} />
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md w-full -mt-10 relative z-10">
                    <p className="font-bold text-gray-900">{member.name}</p>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
