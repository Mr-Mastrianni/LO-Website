import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const navLinks = [
  { name: 'Home', path: '/' },
  { 
    name: 'About Us', 
    path: '/about-us',
    dropdown: [
      { name: 'Our Mission', path: '/about-us' },
      { name: 'About Dr. Gatson', path: '/about-dr-gatson' },
    ]
  },
  { name: 'BrainStorm Cancer', path: '/brainstorm-cancer' },
  { name: 'Oncology Conversations', path: '/oncology-conversations' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Photo Gallery', path: '/photo-gallery' },
  { name: 'Contact', path: '/contact' },
];

const NavItem = ({ item, closeMenu }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLinkClick = () => {
    if (closeMenu) closeMenu();
  };

  if (item.dropdown) {
    return (
      <div 
        className="relative"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <button
          className="flex items-center text-gray-700 hover:text-primary-green transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-green rounded-md px-2 py-1"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          {item.name}
          <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-20 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <div className="py-1">
                {item.dropdown.map((subItem) => (
                  <NavLink
                    key={subItem.name}
                    to={subItem.path}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm ${
                        isActive ? 'bg-primary-green text-white' : 'text-gray-700'
                      } hover:bg-gray-100 hover:text-primary-green`
                    }
                  >
                    {subItem.name}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      onClick={handleLinkClick}
      className={({ isActive }) =>
        `text-gray-700 hover:text-primary-green transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-green rounded-md px-2 py-1 ${
          isActive ? 'font-bold text-primary-green' : ''
        }`
      }
    >
      {item.name}
    </NavLink>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleLoginClick = () => {
    toast({
      title: "Feature Coming Soon!",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0">
            <span className="text-2xl font-bold text-primary-green">Living Oncology</span>
          </Link>
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <button onClick={handleLoginClick} className="text-gray-700 hover:text-primary-green transition-colors duration-300">Log In</button>
            <Link to="/donate">
              <Button className="bg-accent-gold hover:bg-accent-gold/90 text-white">Donate</Button>
            </Link>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
              <Menu className="h-6 w-6 text-primary-green" />
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((item) => (
                <NavItem key={item.name} item={item} closeMenu={() => setIsMenuOpen(false)} />
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-5 flex flex-col space-y-4">
                <button onClick={() => { handleLoginClick(); setIsMenuOpen(false); }} className="text-left text-gray-700 hover:text-primary-green transition-colors duration-300">Log In</button>
                <Link to="/donate" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-accent-gold hover:bg-accent-gold/90 text-white">Donate</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;