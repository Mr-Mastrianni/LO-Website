import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    story: '',
    consent: false
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConsentChange = (checked) => {
    setFormData(prev => ({ ...prev, consent: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.story) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    if (!formData.consent) {
      toast({ title: "Consent required", description: "Please agree to let us share your story.", variant: "destructive" });
      return;
    }

    setSubmitting(true);

    const { data: inserted, error } = await supabase
      .from('testimonials')
      .insert({
        name: formData.name,
        email: formData.email,
        role: formData.role || 'BrainStorm Attendee',
        content: formData.story,
        rating: 5,
        status: 'pending',
        featured: false
      })
      .select('id')
      .single();

    if (error || !inserted) {
      setSubmitting(false);
      console.error('Testimonial submission error:', error);
      toast({
        title: "Something went wrong",
        description: "We couldn't save your testimonial. Please try again or email us directly.",
        variant: "destructive"
      });
      return;
    }

    // Fire-and-forget: notify the president
    supabase.functions.invoke('notify-new-testimonial', {
      body: {
        id: inserted.id,
        name: formData.name,
        email: formData.email,
        role: formData.role || 'BrainStorm Attendee',
        content: formData.story
      }
    }).catch(err => console.warn('Notification email may not have sent:', err));

    setSubmitting(false);

    toast({
      title: "Thank you for sharing your story! 🙏",
      description: "Your testimonial has been submitted and will appear on the site after review.",
    });
    setFormData({ name: '', email: '', role: '', story: '', consent: false });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
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
          <Label htmlFor="role" className="text-primary font-semibold">Your Role</Label>
          <Input id="role" name="role" type="text" value={formData.role} onChange={handleInputChange} className="mt-2" placeholder="e.g., Patient, Caregiver, Physician, Researcher, Sponsor..." />
        </div>
        <div>
          <Label htmlFor="story" className="text-primary font-semibold">Your Story *</Label>
          <Textarea id="story" name="story" value={formData.story} onChange={handleInputChange} className="mt-2 min-h-[150px]" placeholder="Share your experience with Living Oncology..." required />
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox id="consent" checked={formData.consent} onCheckedChange={handleConsentChange} className="mt-1" />
          <Label htmlFor="consent" className="text-sm text-gray-700 leading-relaxed">
            I consent to Living Oncology using my testimonial for promotional and educational purposes.
          </Label>
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary inline-flex items-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 w-4 h-4" />
                Submit Your Story
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default TestimonialForm;
