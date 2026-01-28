import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const interestsList = [
  'Treatment Options',
  'Clinical Trials',
  'Caregiver Support',
  'Managing Side Effects',
  'Wellness & Nutrition',
  'Research Updates',
];

const AssessmentStep = ({ formData, updateFormData, prevStep }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [localData, setLocalData] = useState({
    interests: formData.interests,
    diagnosis: formData.diagnosis,
    supportNeeded: formData.supportNeeded
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInterestChange = (interest) => {
    setLocalData(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLocalData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    updateFormData(localData);

    const finalUserData = { ...formData, ...localData };
    
    // Use the custom role if "Other" was selected
    if (finalUserData.role === 'Other') {
      finalUserData.role = finalUserData.otherRole;
    }
    
    try {
      const { error } = await signUp(finalUserData.email, finalUserData.password, {
        data: {
          full_name: finalUserData.name,
          role: finalUserData.role,
          interests: finalUserData.interests,
          diagnosis: finalUserData.diagnosis,
          supportNeeded: finalUserData.supportNeeded,
        }
      });
      
      if (!error) {
        // Note: User will need to verify email before being fully logged in
        navigate('/login');
      } else {
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Signup error:', err);
      toast({
        title: "Signup Failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label>What topics are you most interested in?</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {interestsList.map(interest => (
            <div key={interest} className="flex items-center space-x-2">
              <Checkbox
                id={interest}
                checked={localData.interests.includes(interest)}
                onCheckedChange={() => handleInterestChange(interest)}
              />
              <Label htmlFor={interest}>{interest}</Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="diagnosis">Primary Diagnosis (optional)</Label>
        <Input id="diagnosis" type="text" value={localData.diagnosis} onChange={handleChange} placeholder="e.g., Glioblastoma, Meningioma" />
      </div>
      <div>
        <Label htmlFor="supportNeeded">What are you hoping to find here? (optional)</Label>
        <Textarea id="supportNeeded" value={localData.supportNeeded} onChange={handleChange} placeholder="e.g., Emotional support, medical information, connection with others" />
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account...' : 'Complete Signup'}
        </Button>
      </div>
    </form>
  );
};

export default AssessmentStep;