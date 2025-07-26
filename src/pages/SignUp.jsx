import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Mail, Lock, User, ArrowRight, ArrowLeft, Heart, Shield, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const steps = [
  { id: 1, title: 'Create Account' },
  { id: 2, title: 'Your Role' },
  { id: 3, title: 'Your Goals' },
];

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    goal: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.password) {
        toast({ title: "Missing Fields", description: "Please fill out all account fields.", variant: "destructive" });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast({ title: "Passwords Mismatch", description: "Your passwords do not match.", variant: "destructive" });
        return;
      }
    }
    if (step === 2 && !formData.role) {
      toast({ title: "Selection Required", description: "Please select your role.", variant: "destructive" });
      return;
    }
    setStep(s => Math.min(s + 1, steps.length));
  };

  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.goal) {
      toast({ title: "Selection Required", description: "Please select your primary goal.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    
    setTimeout(() => {
      const user = signup(formData);
      if (user) {
        navigate('/profile');
      }
      setIsLoading(false);
    }, 1000);
  };

  const progress = (step / steps.length) * 100;

  return (
    <>
      <Helmet>
        <title>Sign Up - Living Oncology</title>
        <meta name="description" content="Create an account with Living Oncology to join our community, access personalized resources, and connect with others." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl"
        >
          <div>
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
              Join Our Community
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-accent hover:text-yellow-600">
                Log in
              </Link>
            </p>
          </div>

          <div className="my-4">
            <Progress value={progress} className="w-full" />
            <p className="text-center text-sm text-gray-600 mt-2">Step {step} of {steps.length}: {steps[step - 1].title}</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input id="name" name="name" type="text" required className="pl-10" placeholder="Your Name" value={formData.name} onChange={handleChange} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input id="email" name="email" type="email" required className="pl-10" placeholder="Email address" value={formData.email} onChange={handleChange} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input id="password" name="password" type="password" required className="pl-10" placeholder="Password" value={formData.password} onChange={handleChange} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input id="confirmPassword" name="confirmPassword" type="password" required className="pl-10" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <RadioGroup name="role" onValueChange={(v) => handleRadioChange('role', v)} value={formData.role} className="space-y-4">
                    <Label className="text-xl font-bold text-primary">What is your role in the cancer journey?</Label>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="Patient/Survivor" id="r1" />
                      <Label htmlFor="r1" className="flex items-center text-lg cursor-pointer"><Heart className="mr-2 h-5 w-5 text-pink-500" /> I am a patient or survivor.</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="Caregiver/Family" id="r2" />
                      <Label htmlFor="r2" className="flex items-center text-lg cursor-pointer"><Shield className="mr-2 h-5 w-5 text-blue-500" /> I am a caregiver, family member, or friend.</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="Healthcare Professional" id="r3" />
                      <Label htmlFor="r3" className="flex items-center text-lg cursor-pointer"><User className="mr-2 h-5 w-5 text-green-500" /> I am a healthcare professional.</Label>
                    </div>
                  </RadioGroup>
                )}

                {step === 3 && (
                  <RadioGroup name="goal" onValueChange={(v) => handleRadioChange('goal', v)} value={formData.goal} className="space-y-4">
                    <Label className="text-xl font-bold text-primary">What is your primary goal for joining?</Label>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="Find Information" id="g1" />
                      <Label htmlFor="g1" className="text-lg cursor-pointer">To find information and educational resources.</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="Connect with Others" id="g2" />
                      <Label htmlFor="g2" className="text-lg cursor-pointer">To connect with others who have similar experiences.</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="Get Support" id="g3" />
                      <Label htmlFor="g3" className="text-lg cursor-pointer">To get support for myself or a loved one.</Label>
                    </div>
                  </RadioGroup>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={handlePrev}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
              )}
              <div className="flex-grow"></div>
              {step < steps.length && (
                <Button type="button" className="btn-primary" onClick={handleNext}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              {step === steps.length && (
                <Button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Create Account'}
                </Button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default SignUp;