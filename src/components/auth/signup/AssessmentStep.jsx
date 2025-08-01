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
  const { signup } = useAuth();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    updateFormData(localData);

    const finalUserData = { ...formData, ...localData };
    
    // Use the custom role if "Other" was selected
    if (finalUserData.role === 'Other') {
      finalUserData.role = finalUserData.otherRole;
    }
    
    setTimeout(() => {
      const user = signup(finalUserData);
      if (user) {
        toast({
          title: "Account Created Successfully!",
          description: "Welcome to the Living Oncology community.",
        });
        navigate('/profile');
      } else {
        toast({
          title: "Signup Failed",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
      }
    }, 1000);
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