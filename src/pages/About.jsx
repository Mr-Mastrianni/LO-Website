import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageAnimator from '@/components/PageAnimator';

const teamMembers = [
  {
    name: 'Dr. Na Tosha Gatson',
    title: 'Founding President/CEO',
    value: 'Placeholder for a powerful value statement from Dr. Gatson about her vision and commitment.',
    image: 'A professional headshot of Dr. Gatson',
  },
  {
    name: 'Placeholder Name',
    title: 'Chief Operating Officer (COO)',
    value: 'Placeholder for a value statement from the COO about operational excellence and community impact.',
    image: 'A professional headshot of a team member',
  },
  {
    name: 'Placeholder Name',
    title: 'Team Member',
    value: 'Placeholder for a value statement from another team member about their role and dedication.',
    image: 'A professional headshot of another team member',
  },
];

const About = () => {
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <PageAnimator>
      <Helmet>
        <title>About Us | Living Oncology</title>
        <meta name="description" content="Learn about Living Oncology's mission, vision, and the dedicated team working to improve neuro-oncology health literacy." />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-green">About Living Oncology</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Empowering patients and families through knowledge and community.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700">
          <p>
            Placeholder for an overview paragraph about Living Oncology. This section should detail the organization's history, its core purpose, and the problems it aims to solve within the neuro-oncology community. It should convey a tone of professionalism, empathy, and empowerment.
          </p>
          <p>
            Another placeholder paragraph to further elaborate on the organization's approach. This could cover the types of resources provided, the importance of health literacy, and how Living Oncology fosters a supportive environment for patients, caregivers, and healthcare professionals alike.
          </p>
        </div>

        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-green text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-primary-green/20">
                      <img  className="w-full h-full object-cover" alt={member.name} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    </div>
                    <CardTitle className="text-center text-primary-green">{member.name}</CardTitle>
                    <p className="text-center text-gray-500">{member.title}</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 italic text-center">"{member.value}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageAnimator>
  );
};

export default About;