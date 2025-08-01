import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { User, Mail, Edit, Save, Shield, Heart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    bio: user?.bio || 'No bio provided.',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      updateUser(formData);
    }
    setIsEditing(!isEditing);
  };

  if (!user) {
    return null;
  }

  const getRoleInfo = (role) => {
    switch (role) {
      case 'Patient/Survivor':
        return { icon: Heart, color: 'text-pink-500', description: 'Navigating a personal cancer journey.' };
      case 'Caregiver/Family':
        return { icon: Shield, color: 'text-blue-500', description: 'Supporting a loved one through their journey.' };
      case 'Healthcare Professional':
        return { icon: User, color: 'text-green-500', description: 'Providing medical care and expertise.' };
      default:
        return { icon: BookOpen, color: 'text-yellow-500', description: 'A valued member of our community.' };
    }
  };

  const roleInfo = getRoleInfo(user.role);

  return (
    <>
      <Helmet>
        <title>My Profile - Living Oncology</title>
        <meta name="description" content="Manage your Living Oncology profile, view your information, and update your details." />
      </Helmet>
      <div className="bg-gradient-to-br from-green-50 to-yellow-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative bg-white p-8 rounded-2xl shadow-2xl">
              <div className="absolute top-4 right-4">
                <Button onClick={handleEditToggle} variant="ghost" size="icon">
                  {isEditing ? <Save className="h-5 w-5 text-primary" /> : <Edit className="h-5 w-5 text-gray-500" />}
                </Button>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-200 to-yellow-200 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-16 h-16 text-primary" />
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  {isEditing ? (
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="text-3xl font-bold text-primary mb-2"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold text-primary">{user.name}</h1>
                  )}
                  <div className="flex items-center justify-center md:justify-start text-gray-500 mb-4">
                    <roleInfo.icon className={`w-5 h-5 mr-2 ${roleInfo.color}`} />
                    <p className="text-lg">{user.role}</p>
                  </div>
                  {isEditing ? (
                    <Input
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Your bio..."
                      className="text-md text-gray-600"
                    />
                  ) : (
                    <p className="text-md text-gray-600 max-w-xl">{user.bio || 'No bio provided.'}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><User className="mr-2" /> Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Full Name</Label>
                    <p className="text-gray-800">{user.name}</p>
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <p className="text-gray-800">{user.email}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Shield className="mr-2" /> Assessment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Your Role</Label>
                    <p className="text-gray-800">{user.role}</p>
                    <p className="text-sm text-gray-500">{roleInfo.description}</p>
                  </div>
                  <div>
                    <Label>Primary Goal</Label>
                    <p className="text-gray-800">{user.goal}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Profile;