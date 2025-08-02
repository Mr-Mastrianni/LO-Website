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
import AdminRoute from '@/components/AdminRoute';
import AdminDashboard from '@/pages/admin/AdminDashboard';

// Trigger deployment
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
              <Route path="/" element={<Home />} />
              <Route path="/LO-Website/" element={<Home />} />
              <Route path="/LO-Website/about-us" element={<AboutUs />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/LO-Website/about-dr-gatson" element={<AboutDrGatson />} />
              <Route path="/about-dr-gatson" element={<AboutDrGatson />} />
              <Route path="/LO-Website/brainstorm-cancer" element={<BrainStormCancer />} />
              <Route path="/brainstorm-cancer" element={<BrainStormCancer />} />
              <Route path="/LO-Website/brainstorm-cancer/:eventId" element={<EventDetail />} />
              <Route path="/brainstorm-cancer/:eventId" element={<EventDetail />} />
              <Route path="/LO-Website/oncology-conversations" element={<OncologyConversations />} />
              <Route path="/oncology-conversations" element={<OncologyConversations />} />
              <Route path="/LO-Website/educational-hub" element={<EducationalHub />} />
              <Route path="/educational-hub" element={<EducationalHub />} />
              <Route path="/LO-Website/testimonials" element={<Testimonials />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/LO-Website/photo-gallery" element={<PhotoGallery />} />
              <Route path="/photo-gallery" element={<PhotoGallery />} />
              <Route path="/LO-Website/contact" element={<Contact />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/LO-Website/services" element={<Services />} />
              <Route path="/services" element={<Services />} />
              <Route path="/LO-Website/resources" element={<Resources />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/LO-Website/community" element={<Community />} />
              <Route path="/community" element={<Community />} />
              <Route path="/LO-Website/members-directory" element={<MembersDirectory />} />
              <Route path="/members-directory" element={<MembersDirectory />} />
              <Route path="/LO-Website/donate" element={<Donate />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/LO-Website/signup" element={<SignUp />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/LO-Website/login" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/LO-Website/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/LO-Website/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
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