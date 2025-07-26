import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'BrainStorm Cancer', path: '/brainstorm-cancer' },
    { name: 'Oncology Conversations', path: '/oncology-conversations' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Photo Gallery', path: '/photo-gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'Services', path: '/services' },
    { name: 'Resources', path: '/resources' },
    { name: 'Community', path: '/community' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-primary/20 border-t" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">LO</span>
              </div>
              <span className="text-xl font-bold text-foreground">Living Oncology</span>
            </div>
            <p className="text-foreground/80 mb-4">
              Bridging the gap between cancer patients, caregivers, and oncology professionals through education and support.
            </p>
            <p className="text-lg font-semibold text-accent mb-4">
              "LIVING is larger than Life."
            </p>
          </div>

          <div className="lg:col-span-1">
            <span className="text-lg font-semibold mb-4 block text-foreground">Quick Links</span>
            <ul className="space-y-2">
              {footerLinks.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-foreground/80 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <span className="text-lg font-semibold mb-4 block text-foreground">More</span>
            <ul className="space-y-2">
              {footerLinks.slice(6).map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-foreground/80 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/donate"
                  className="text-accent hover:opacity-80 font-semibold transition-colors duration-200"
                >
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <span className="text-lg font-semibold mb-4 block text-foreground">Connect With Us</span>
            <div className="space-y-3 mb-6">
              <a href="mailto:thepresident@livingoncology.org" className="flex items-center space-x-2 text-foreground/80 hover:text-accent transition-colors duration-200">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>thepresident@livingoncology.org</span>
              </a>
              <div className="flex items-start space-x-2 text-foreground/80">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                <div>
                    <span>c/o Living Oncology</span><br/>
                    <span>PO Box 12863</span><br/>
                    <span>Chandler, AZ 85248-9998</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-foreground/60 hover:text-accent transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-foreground/80">
            © {currentYear} Living Oncology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;