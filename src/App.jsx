import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider as SupabaseAuthProvider } from '@/contexts/SupabaseAuthContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import AboutUs from '@/pages/AboutUs';
import AboutDrGatson from '@/pages/AboutDrGatson';
import BrainStormCancer from '@/pages/BrainStormCancer';
import EventDetail from '@/pages/EventDetail';
import OncologyConversations from '@/pages/OncologyConversations';
import Testimonials from '@/pages/Testimonials';
import PhotoGallery from '@/pages/PhotoGallery';
import Contact from '@/pages/Contact';
import Services from '@/pages/Services';
import Resources from '@/pages/Resources';
import Community from '@/pages/Community';
import MembersDirectory from '@/pages/MembersDirectory';
import Donate from '@/pages/Donate';
import EducationalHub from '@/pages/EducationalHub';
import SignUp from '@/pages/SignUp';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <SupabaseAuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Helmet>
            <title>Living Oncology – Cancer Health Literacy & Support</title>
            <meta name="description" content="Living Oncology is a 501(c)(3) charitable nonprofit organization improving health literacy for cancer patients, caregivers, and professionals. LIVING is larger than Life." />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
          </Helmet>
          
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          
          <Navigation />
          
          <main id="main-content" className="flex-grow">
            <Routes>
              <Route path="/LO-Website/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/about-dr-gatson" element={<AboutDrGatson />} />
              <Route path="/brainstorm-cancer" element={<BrainStormCancer />} />
              <Route path="/brainstorm-cancer/:eventId" element={<EventDetail />} />
              <Route path="/oncology-conversations" element={<OncologyConversations />} />
              <Route path="/educational-hub" element={<EducationalHub />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/photo-gallery" element={<PhotoGallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/community" element={<Community />} />
              <Route path="/members-directory" element={<MembersDirectory />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
          </main>
          
          <Footer />
          <Toaster />
        </div>
      </Router>
    </SupabaseAuthProvider>
  );
}

export default App;