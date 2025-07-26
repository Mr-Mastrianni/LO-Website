import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AccountStep = ({ formData, updateFormData, nextStep }) => {
  const { toast } = useToast();
  const [localData, setLocalData] = useState({
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLocalData(prev => ({ ...prev, [id]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = localData;

    if (!email || !password || !confirmPassword) {
      toast({ title: "All fields are required.", variant: "destructive" });
      return;
    }
    if (password.length < 8) {
      toast({ title: "Password must be at least 8 characters.", variant: "destructive" });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Passwords do not match.", variant: "destructive" });
      return;
    }
    
    updateFormData(localData);
    nextStep();
  };

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={localData.email} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={localData.password} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input id="confirmPassword" type="password" value={localData.confirmPassword} onChange={handleChange} required />
      </div>
      <Button type="submit" className="w-full">Next</Button>
      <p className="text-center text-sm text-gray-600">
        Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Log in</Link>
      </p>
    </form>
  );
};

export default AccountStep;