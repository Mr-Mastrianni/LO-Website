import { toast } from '@/components/ui/use-toast';

export const handleJoinGroup = (groupName) => {
  toast({
    title: "🚧 Group Registration Coming Soon!",
    description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
  });
};

export const handleCreatePost = () => {
  toast({
    title: "🚧 Post Creation Coming Soon!",
    description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
  });
};

export const supportGroups = [
  {
    id: 1,
    name: "Brain Tumor Survivors",
    description: "A supportive community for individuals who have been diagnosed with brain tumors, sharing experiences and encouragement.",
    members: 156,
    category: "Patient Support",
    meetingType: "Monthly Virtual & In-Person"
  },
  {
    id: 2,
    name: "Caregivers Circle",
    description: "Support and resources for family members and friends caring for someone with a brain tumor diagnosis.",
    members: 89,
    category: "Caregiver Support",
    meetingType: "Bi-weekly Virtual"
  },
  {
    id: 3,
    name: "Young Adults (18-39)",
    description: "Specialized support for young adults facing brain tumor diagnoses, addressing unique challenges and concerns.",
    members: 42,
    category: "Age-Specific",
    meetingType: "Weekly Virtual"
  },
  {
    id: 4,
    name: "Healthcare Professionals",
    description: "A forum for healthcare providers to discuss cases, share resources, and collaborate on patient care.",
    members: 73,
    category: "Professional",
    meetingType: "Monthly Professional"
  }
];

export const forumCategories = [
  {
    id: 1,
    name: "General Discussion",
    description: "Open forum for general questions, introductions, and community conversations",
    posts: 234,
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    name: "Treatment Q&A",
    description: "Questions and discussions about treatments, side effects, and medical care",
    posts: 189,
    lastActivity: "4 hours ago"
  },
  {
    id: 3,
    name: "Clinical Trials",
    description: "Information and discussions about clinical trial opportunities and experiences",
    posts: 67,
    lastActivity: "1 day ago"
  },
  {
    id: 4,
    name: "Wellness & Lifestyle",
    description: "Tips and discussions about nutrition, exercise, and maintaining wellness during treatment",
    posts: 145,
    lastActivity: "6 hours ago"
  }
];

export const recentPosts = [
  {
    id: 1,
    title: "Newly diagnosed - feeling overwhelmed",
    author: "Sarah M.",
    category: "General Discussion",
    replies: 12,
    timeAgo: "3 hours ago"
  },
  {
    id: 2,
    title: "Tips for managing fatigue during treatment?",
    author: "Mike R.",
    category: "Treatment Q&A",
    replies: 8,
    timeAgo: "5 hours ago"
  },
  {
    id: 3,
    title: "Caregiver burnout - how to cope",
    author: "Jennifer L.",
    category: "General Discussion",
    replies: 15,
    timeAgo: "1 day ago"
  }
];

export const communityStats = [
  { label: "Active Members", value: "360+" },
  { label: "Support Groups", value: "4" },
  { label: "Forum Posts", value: "635+" },
  { label: "Resources Shared", value: "150+" }
];