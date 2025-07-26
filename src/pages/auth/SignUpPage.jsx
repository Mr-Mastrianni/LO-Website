import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import AccountStep from '@/components/auth/signup/AccountStep';
import ProfileStep from '@/components/auth/signup/ProfileStep';
import AssessmentStep from '@/components/auth/signup/AssessmentStep';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: '',
    otherRole: '',
    interests: [],
    diagnosis: '',
    supportNeeded: ''
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AccountStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
      case 2:
        return <ProfileStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <AssessmentStep formData={formData} updateFormData={updateFormData} prevStep={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Living Oncology</title>
        <meta name="description" content="Create an account with Living Oncology to join our community, access personalized resources, and connect with others." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/10 p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <Card className="shadow-2xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-foreground">Join Our Community</CardTitle>
              <CardDescription>Create your account in a few simple steps.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <Progress value={progress} className="w-full" />
                <p className="text-center text-sm text-gray-600 mt-2">Step {step} of {totalSteps}</p>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default SignUpPage;