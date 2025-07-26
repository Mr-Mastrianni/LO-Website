import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: 'General Inquiry',
    subscribe: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleCheckboxChange = (checked) => {
    setFormData(prev => ({ ...prev, subscribe: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and message are required.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. We'll get back to you shortly."
      });

      setFormData({ name: '', email: '', message: '', category: 'General Inquiry', subscribe: false });
      setIsSubmitting(false);
    }, 1000);
  };



  return (
    <>
      <Helmet>
        <title>Contact Us - Living Oncology</title>
        <meta name="description" content="Get in touch with Living Oncology for partnerships, speaking engagements, patient support, or general inquiries. Subscribe to our newsletter." />
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
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We're here to help and would love to hear from you. Reach out with questions, partnership opportunities, or to learn more about our mission.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-primary mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="category" className="text-primary font-semibold">Inquiry Type *</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option>General Inquiry</option>
                    <option>Patient/Caregiver Support</option>
                    <option>Events</option>
                    <option>Partnerships</option>
                    <option>Speaking Engagement Request</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-primary font-semibold">Your Name *</Label>
                    <Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} className="mt-2" placeholder="Enter your full name" required />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-primary font-semibold">Email Address *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="mt-2" placeholder="Enter your email" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-primary font-semibold">Your Message *</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} className="mt-2 min-h-[150px]" placeholder="Tell us how we can help..." required />
                </div>
                
                <div className="flex items-start space-x-3">
                    <Checkbox id="subscribe" checked={formData.subscribe} onCheckedChange={handleCheckboxChange} className="mt-1" />
                    <Label htmlFor="subscribe" className="text-sm text-gray-700 leading-relaxed">Subscribe to our newsletter for updates on events, resources, and community news.</Label>
                </div>

                <div className="text-center">
                  <button type="submit" disabled={isSubmitting} className="btn-primary inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? (<><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Sending...</>) : (<><Send className="mr-2 w-4 h-4" />Send Message</>)}
                  </button>
                </div>
              </form>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">Contact Information</h3>
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                            <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h4 className="font-bold text-primary">Email</h4>
                            <p className="text-gray-700 hover:text-accent transition-colors">
                                <a href="mailto:thepresident@livingoncology.org">thepresident@livingoncology.org</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">Mailing Address</h3>
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">Na Tosha Gatson</p>
                            <p className="text-gray-700">c/o Living Oncology</p>
                            <p className="text-gray-700">PO Box 12863</p>
                            <p className="text-gray-700">Chandler, AZ 85248-9998</p>
                        </div>
                    </div>
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
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              We're Here to Help
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Whether you're a patient, caregiver, healthcare professional, or supporter, we're committed to providing you with the resources and support you need. Thank you for being part of our mission.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;