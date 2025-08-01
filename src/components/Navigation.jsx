import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, UserCircle, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const auth = useAuth();
  const navigate = useNavigate();

  const user = auth?.user;
  const signOut = auth?.signOut;
  const profile = auth?.profile;
  const isAdmin = auth?.isAdmin;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'BrainStorm Cancer', path: '/brainstorm-cancer' },
    { name: 'Educational Hub', path: '/educational-hub' },
    { name: 'Oncology Conversations', path: '/oncology-conversations' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Photo Gallery', path: '/photo-gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleLogout = async () => {
    if (signOut) {
      await signOut();
    }
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">LO</span>
              </div>
              <span className="text-xl font-bold text-foreground">Living Oncology</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:text-accent hover:bg-primary/50'
                  }`}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-accent transition-colors duration-200 focus:outline-none">
                  <UserCircle className="w-5 h-5" />
                  <span>{profile?.full_name?.split(' ')[0] || 'Account'}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-foreground hover:text-accent transition-colors duration-200"
                aria-label="Log in to your account"
              >
                <User className="w-4 h-4" />
                <span>Log In</span>
              </Link>
            )}
            <Link
              to="/donate"
              className="btn-primary"
              aria-label="Donate to Living Oncology"
            >
              Donate
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-accent hover:bg-primary/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
              aria-expanded={isOpen}
              aria-label="Toggle main menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:text-accent hover:bg-primary/50'
                  }`}
                  onClick={() => setIsOpen(false)}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3 space-y-2 flex-col">
                  {user ? (
                    <>
                      <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center space-x-1 text-foreground hover:text-accent transition-colors duration-200 w-full justify-center py-2">
                        <UserCircle className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex items-center space-x-1 text-foreground hover:text-accent transition-colors duration-200 w-full justify-center py-2">
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </>
                  ) : (
                    <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center space-x-1 text-foreground hover:text-accent transition-colors duration-200 w-full justify-center py-2">
                      <User className="w-4 h-4" />
                      <span>Log In</span>
                    </Link>
                  )}
                  <Link
                    to="/donate"
                    className="btn-primary w-full text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Donate
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;