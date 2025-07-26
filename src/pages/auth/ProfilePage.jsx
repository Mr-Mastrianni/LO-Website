import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { User, Edit, Save } from 'lucide-react';

const ProfilePage = () => {
  const { user, updateUser, logout } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    diagnosis: user?.diagnosis || '',
    supportNeeded: user?.supportNeeded || '',
    bio: user?.bio || 'Tell us a little about yourself...'
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your changes have been saved successfully.',
    });
  };

  if (!user) {
    return null; 
  }

  return (
    <>
      <Helmet>
        <title>My Profile - Living Oncology</title>
        <meta name="description" content="Manage your Living Oncology profile, update your information, and view your community assessment details." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="shadow-2xl">
            <CardHeader className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="flex-grow">
                <CardTitle className="text-3xl text-primary">{user.name}</CardTitle>
                <CardDescription>{user.role}</CardDescription>
              </div>
              <Button onClick={() => (isEditing ? handleSave() : setIsEditing(true))} variant={isEditing ? 'default' : 'outline'}>
                {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                {isEditing ? 'Save' : 'Edit Profile'}
              </Button>
            </CardHeader>
            <CardContent className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary border-b pb-2">Account Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={formData.name} onChange={handleInputChange} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role in Community</Label>
                  <Input id="role" value={formData.role} disabled />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" value={formData.bio} onChange={handleInputChange} disabled={!isEditing} className="min-h-[100px]" />
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary border-b pb-2">My Assessment</h3>
                 <div className="space-y-2">
                  <Label htmlFor="diagnosis">Primary Diagnosis</Label>
                  <Input id="diagnosis" value={formData.diagnosis} onChange={handleInputChange} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label>Interests</Label>
                  <div className="flex flex-wrap gap-2">
                    {user.interests && user.interests.length > 0 ? (
                      user.interests.map(interest => (
                        <span key={interest} className="bg-green-100 text-primary text-sm font-medium px-3 py-1 rounded-full">{interest}</span>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No interests specified.</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportNeeded">Hoping to find</Label>
                  <Textarea id="supportNeeded" value={formData.supportNeeded} onChange={handleInputChange} disabled={!isEditing} className="min-h-[100px]" />
                </div>
              </div>
            </CardContent>
             <CardFooter className="flex justify-end">
                <Button variant="destructive" onClick={logout}>Logout</Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default ProfilePage;