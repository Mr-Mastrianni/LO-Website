import { toast } from '@/components/ui/use-toast';
import { BookOpen, Users, FileText, Lock } from 'lucide-react';

export const handleDownload = (resourceName) => {
  toast({
    title: "🚧 Download Feature Coming Soon!",
    description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
  });
};

export const handleAccessRequest = () => {
  toast({
    title: "🚧 Access Request Coming Soon!",
    description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
  });
};

export const publicResources = [
  {
    id: 1,
    title: "Understanding Your Brain Tumor Diagnosis",
    description: "A comprehensive guide to help patients and families understand different types of brain tumors, staging, and what to expect.",
    type: "PDF Guide",
    pages: "24 pages",
    category: "Patient Education",
    featured: true
  },
  {
    id: 2,
    title: "Questions to Ask Your Oncologist",
    description: "Essential questions to help you prepare for medical appointments and make informed decisions about your care.",
    type: "Checklist",
    pages: "4 pages",
    category: "Patient Advocacy"
  },
  {
    id: 3,
    title: "Caregiver Support Guide",
    description: "Practical tips and resources for family members and friends supporting someone with a brain tumor.",
    type: "PDF Guide",
    pages: "18 pages",
    category: "Caregiver Support"
  },
  {
    id: 4,
    title: "Clinical Trials: What You Need to Know",
    description: "An overview of clinical trials, how to find them, and questions to ask when considering participation.",
    type: "Information Sheet",
    pages: "8 pages",
    category: "Clinical Research"
  },
  {
    id: 5,
    title: "Managing Treatment Side Effects",
    description: "Strategies for managing common side effects of brain tumor treatments and maintaining quality of life.",
    type: "PDF Guide",
    pages: "16 pages",
    category: "Treatment Support"
  },
  {
    id: 6,
    title: "Nutrition During Cancer Treatment",
    description: "Evidence-based nutrition guidelines and meal planning tips for brain tumor patients.",
    type: "PDF Guide",
    pages: "12 pages",
    category: "Wellness"
  }
];

export const restrictedResources = [
  {
    id: 7,
    title: "Advanced Treatment Protocols",
    description: "Detailed treatment protocols and clinical guidelines for healthcare professionals.",
    type: "Medical Reference",
    access: "Healthcare Professionals Only",
    category: "Professional Resources"
  },
  {
    id: 8,
    title: "Research Database Access",
    description: "Comprehensive database of current neuro-oncology research and clinical trial data.",
    type: "Database",
    access: "Researchers & Clinicians",
    category: "Research Tools"
  },
  {
    id: 9,
    title: "Patient Case Studies",
    description: "De-identified case studies for educational purposes and professional development.",
    type: "Case Studies",
    access: "Medical Professionals",
    category: "Education"
  }
];

export const resourceCategories = [
  { name: "Patient Education", count: 2, icon: BookOpen },
  { name: "Caregiver Support", count: 1, icon: Users },
  { name: "Clinical Research", count: 1, icon: FileText },
  { name: "Treatment Support", count: 1, icon: FileText },
  { name: "Wellness", count: 1, icon: FileText },
  { name: "Professional Resources", count: 3, icon: Lock }
];