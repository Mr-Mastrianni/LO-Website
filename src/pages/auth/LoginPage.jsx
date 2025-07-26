import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { LogIn } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const from = location.state?.from?.pathname || "/profile";

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const user = login(email, password);

      if (user) {
        toast({
          title: "Login Successful!",
          description: `Welcome back, ${user.name}!`,
        });
        navigate(from, { replace: true });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Login - Living Oncology</title>
        <meta name="description" content="Log in to your Living Oncology account to access your personalized profile and community features." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-yellow-50 p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-primary">Welcome Back</CardTitle>
              <CardDescription>Log in to access your profile and our community.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging In...' : 'Log In'}
                </Button>
                <p className="text-sm text-center text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="font-semibold text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;