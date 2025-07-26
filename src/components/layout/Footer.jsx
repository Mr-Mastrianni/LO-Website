import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Footer = () => {
  const { toast } = useToast();

  const handleSocialClick = (socialMedia) => {
    toast({
      title: `Connecting to ${socialMedia}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const socialLinks = [
    { icon: Facebook, name: 'Facebook' },
    { icon: Twitter, name: 'Twitter' },
    { icon: Linkedin, name: 'LinkedIn' },
    { icon: Instagram, name: 'Instagram' },
  ];

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'BrainStorm Cancer', path: '/brainstorm-cancer' },
    { name: 'Contact', path: '/contact' },
    { name: 'Donate', path: '/donate' },
  ];

  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <p className="text-xl font-bold text-primary-green">Living Oncology</p>
            <p className="text-gray-600">LIVING is larger than Life.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-4">Quick Links</p>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-600 hover:text-primary-green transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-4">Connect With Us</p>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <button key={social.name} onClick={() => handleSocialClick(social.name)} className="text-gray-500 hover:text-primary-green transition-colors" aria-label={`Follow us on ${social.name}`}>
                  <social.icon className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Living Oncology. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;