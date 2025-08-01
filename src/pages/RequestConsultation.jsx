import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const RequestConsultation = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Consultation Request Sent!",
        description: "Thank you for your request. We will get back to you within 2 business days."
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Request a Consultation - Living Oncology</title>
        <meta name="description" content="Request a personalized neuro-oncology consultation with Dr. Na Tosha Gatson. Fill out the form to get started." />
      </Helmet>

      <div className="bg-gradient-to-br from-green-50 to-yellow-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
          >
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Request a Consultation
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Take the first step towards getting personalized expert guidance. Please fill out the form below, and our team will contact you to schedule your consultation with Dr. Gatson.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-lg">Full Name</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input 
                      id="name" 
                      name="name" 
                      type="text" 
                      required 
                      className="pl-10 text-lg" 
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-lg">Email Address</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                      className="pl-10 text-lg" 
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="phone" className="text-lg">Phone Number (Optional)</Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input 
                    id="phone" 
                    name="phone" 
                    type="tel" 
                    className="pl-10 text-lg" 
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="message" className="text-lg">
                  Briefly describe your reason for consultation
                </Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows={6}
                  className="mt-2 text-lg" 
                  placeholder="For example: I'm newly diagnosed and would like a second opinion."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <div className="text-center pt-4">
                <Button 
                  type="submit" 
                  className="btn-primary text-lg px-10 py-6" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    <>
                      Submit Request
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RequestConsultation;
