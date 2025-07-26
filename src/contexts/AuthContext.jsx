import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('livingOncologyUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('livingOncologyUsers')) || [];
    const foundUser = storedUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const userToSave = { ...foundUser };
      delete userToSave.password;
      setUser(userToSave);
      localStorage.setItem('livingOncologyUser', JSON.stringify(userToSave));
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${userToSave.name}!`,
      });
      return userToSave;
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const signup = (userData) => {
    const storedUsers = JSON.parse(localStorage.getItem('livingOncologyUsers')) || [];
    const existingUser = storedUsers.find(u => u.email === userData.email);

    if (existingUser) {
      toast({
        title: "Signup Failed",
        description: "An account with this email already exists.",
        variant: "destructive",
      });
      return null;
    }

    const newUser = { ...userData, id: Date.now().toString() };
    storedUsers.push(newUser);
    localStorage.setItem('livingOncologyUsers', JSON.stringify(storedUsers));
    
    const userToSave = { ...newUser };
    delete userToSave.password;
    setUser(userToSave);
    localStorage.setItem('livingOncologyUser', JSON.stringify(userToSave));

    toast({
      title: "Account Created!",
      description: "Welcome to Living Oncology! Your profile has been created.",
    });
    return userToSave;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('livingOncologyUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const updateUser = (updatedData) => {
    if (!user) return;

    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('livingOncologyUser', JSON.stringify(updatedUser));

    const storedUsers = JSON.parse(localStorage.getItem('livingOncologyUsers')) || [];
    const userIndex = storedUsers.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      const fullUser = storedUsers[userIndex];
      storedUsers[userIndex] = { ...fullUser, ...updatedData };
      localStorage.setItem('livingOncologyUsers', JSON.stringify(storedUsers));
    }
    
    toast({
        title: "Profile Updated",
        description: "Your profile information has been saved.",
    });
  };

  const value = { user, login, logout, signup, updateUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};