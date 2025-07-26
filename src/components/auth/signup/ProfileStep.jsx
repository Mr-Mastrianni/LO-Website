import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const roles = [
  'Patient / Survivor',
  'Caregiver / Family Member',
  'Healthcare Professional',
  'Scientist / Inventor',
  'Community Supporter',
  'Other'
];

const ProfileStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  const { toast } = useToast();
  const [localData, setLocalData] = useState({
    name: formData.name,
    role: formData.role,
    otherRole: formData.otherRole || ''
  });

  const handleChange = (e) => {
    setLocalData(prev => ({ ...prev, name: e.target.value }));
  };
  
  const handleRoleChange = (value) => {
    if (value !== 'Other') {
      setLocalData(prev => ({ ...prev, role: value, otherRole: '' }));
    } else {
      setLocalData(prev => ({ ...prev, role: value }));
    }
  };

  const handleOtherRoleChange = (e) => {
    setLocalData(prev => ({ ...prev, otherRole: e.target.value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!localData.name || !localData.role) {
      toast({ title: "Please fill out all fields.", variant: "destructive" });
      return;
    }
    if (localData.role === 'Other' && !localData.otherRole) {
      toast({ title: "Please specify your role.", variant: "destructive" });
      return;
    }
    updateFormData(localData);
    nextStep();
  };

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" type="text" value={localData.name} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label>I am a...</Label>
        <RadioGroup value={localData.role} onValueChange={handleRoleChange} className="mt-2 space-y-2">
          {roles.map(role => (
            <div key={role} className="flex items-center space-x-2">
              <RadioGroupItem value={role} id={role.replace(/[\s/]/g, '')} />
              <Label htmlFor={role.replace(/[\s/]/g, '')}>{role}</Label>
            </div>
          ))}
        </RadioGroup>
        {localData.role === 'Other' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pl-6 pt-2"
          >
            <Label htmlFor="otherRole">Please specify:</Label>
            <Input 
              id="otherRole" 
              type="text" 
              value={localData.otherRole} 
              onChange={handleOtherRoleChange} 
              required 
              placeholder="Your role"
              className="mt-1"
            />
          </motion.div>
        )}
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

export default ProfileStep;