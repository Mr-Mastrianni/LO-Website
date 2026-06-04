export const events = {
  1: {
    title: "BrainStorm Cancer '25",
    date: "May 10, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Marriott Resort Tempe at The Buttes, Tempe, AZ",
    description: "Our flagship annual conference brought together patients, caregivers, and medical professionals for a comprehensive one-day event with expert-led sessions and community connections. This successful event featured leading neuro-oncology experts, patient advocates, and breakthrough research presentations.",
    image: "/images/01 (1).jpg",
    agenda: [
      { time: "9:00 AM - 9:30 AM", activity: "Registration & Welcome Coffee" },
      { time: "9:30 AM - 10:30 AM", activity: "Keynote: Latest Advances in Brain Tumor Treatment" },
      { time: "10:45 AM - 12:00 PM", activity: "Panel: Living with Brain Cancer - Patient Stories" },
      { time: "12:00 PM - 1:00 PM", activity: "Lunch & Networking" },
      { time: "1:00 PM - 2:15 PM", activity: "Workshop: Understanding Clinical Trials" },
      { time: "2:30 PM - 3:30 PM", activity: "Research Updates & Future Directions" },
      { time: "3:30 PM - 4:00 PM", activity: "Closing Remarks & Resources" }
    ],
    speakers: [
      "Dr. Na Tosha Gatson - Founder, Living Oncology",
      "Dr. Sarah Johnson - Mayo Clinic Neuro-Oncology",
      "Michael Rodriguez - Brain Tumor Survivor & Advocate",
      "Dr. Emily Chen - Clinical Trials Coordinator"
    ],
    status: "past"
  },
  4: {
    title: "BrainStorm Cancer 2024",
    date: "May 11, 2024",
    time: "9:00 AM - 4:00 PM",
    location: "Marriott Resort Tempe at The Buttes, Tempe, AZ",
    description: "Our successful 2024 conference brought together over 500 participants for education, networking, and inspiration in the fight against brain cancer. This comprehensive event featured leading neuro-oncology experts, patient advocates, and breakthrough research presentations.",
    image: "/images/01 (62).jpg",
    agenda: [
      { time: "9:00 AM - 9:30 AM", activity: "Registration & Welcome Coffee" },
      { time: "9:30 AM - 10:30 AM", activity: "Keynote: Latest Advances in Brain Tumor Treatment" },
      { time: "10:45 AM - 12:00 PM", activity: "Panel: Living with Brain Cancer - Patient Stories" },
      { time: "12:00 PM - 1:00 PM", activity: "Lunch & Networking" },
      { time: "1:00 PM - 2:15 PM", activity: "Workshop: Understanding Clinical Trials" },
      { time: "2:30 PM - 3:30 PM", activity: "Research Updates & Future Directions" },
      { time: "3:30 PM - 4:00 PM", activity: "Closing Remarks & Resources" }
    ],
    speakers: [
      "Dr. Na Tosha Gatson - Founder, Living Oncology",
      "Dr. Sarah Johnson - Mayo Clinic Neuro-Oncology",
      "Michael Rodriguez - Brain Tumor Survivor & Advocate",
      "Dr. Emily Chen - Clinical Trials Coordinator"
    ],
    status: "past"
  },
  5: {
    title: "Young Adult Brain Tumor Support Group Launch",
    date: "January 15, 2024",
    time: "6:00 PM - 7:30 PM",
    location: "Virtual Event",
    description: "The inaugural meeting of our new support group specifically designed for young adults (ages 18-39) affected by brain tumors. This session provided a safe space for connection, support, and resource sharing.",
    agenda: [
      { time: "6:00 PM - 6:15 PM", activity: "Welcome & Introductions" },
      { time: "6:15 PM - 6:45 PM", activity: "Group Guidelines & Expectations" },
      { time: "6:45 PM - 7:15 PM", activity: "Open Discussion & Sharing" },
      { time: "7:15 PM - 7:30 PM", activity: "Next Steps & Resources" }
    ],
    speakers: [
      "Dr. Na Tosha Gatson - Facilitator",
      "Sarah Williams - Young Adult Advocate"
    ],
    status: "past"
  },
  2026: {
    title: "BrainStorm Cancer - Arizona Symposium",
    date: "May 9, 2026",
    time: "8:00 AM - 1:00 PM",
    location: "Marriott Resort Tempe at The Buttes, 2000 W Westcourt Way, Tempe, AZ 85282",
    description: "A transformative half day dedicated to advancing brain tumor care through education, networking, and shared insights from experts and survivors alike. This comprehensive educational and networking symposium united a diverse group of participants, including patients, physicians, nurses, caregivers, scientists, and vendors to share insights, offer support, and explore advancements in the treatment and care of brain tumors.",
    mission: "We endeavor to reconnect patients and their caregivers with the science and educational resources that afford optimized living through their oncology journey. We are uniquely positioned to provide ample patient-facing learning spaces for physicians and oncology care experts to intersect for the betterment of the patient. Living Oncology is indispensable to cancer education.",
    agenda: [
      { time: "6:00 AM", activity: "Doors Open for Vendor Set-up" },
      { time: "8:00 AM", activity: "Breakfast & Registration" },
      { time: "9:00 AM", activity: "Symposium Begins" },
      { time: "1:00 PM", activity: "Symposium Ends" }
    ],
    registrationTypes: [
      { type: "patient", label: "Patient/Caregiver", price: "Free", fields: ["firstName", "lastName", "email", "ticketCount", "phone"] },
      { type: "physician", label: "Physician/APP/Provider", price: "Donation", fields: ["firstName", "lastName", "credentials", "institution", "email", "phone"] },
      { type: "researcher", label: "Researcher", price: "Donation", fields: ["firstName", "lastName", "credentials", "institution", "email", "phone"] },
      { type: "vendor", label: "Scientist/Vendor", price: "$850", fields: ["firstName", "lastName", "organization", "email", "phone"] },
      { type: "sponsor", label: "Sponsor", price: "Direct Link", fields: ["firstName", "lastName", "organization", "email", "sponsorshipLevel", "phone"] }
    ],
    sponsorshipLevels: [
      { name: "Other", price: "$3,000", benefits: ["Listed on Syllabus Sponsor Page"] },
      { name: "Gold", price: "$4,500", benefits: ["1 Vendor Admission", "Honoring-A-Patient Award (Partial)", "Listed on Syllabus Sponsor Page"] },
      { name: "Platinum", price: "$8,000", benefits: ["2 Vendor Admissions", "Private Luncheon Intro (10 min)", "1 We Are The Storm Award", "Full-Page Ad", "Social Media Promotion"] },
      { name: "Diamond", price: "$15,000", benefits: ["3 Vendor Admissions", "Private Physician Luncheon (40 min)", "3 We Are The Storm Awards", "2-Page Ad", "Banner at Stage", "Bag Inserts", "Named Sponsor for Vivere Luncheon"] },
      { name: "Specialized", price: "As Agreed", benefits: ["Custom sponsorship package tailored to your organization"] }
    ],
    image: "/images/01 (151).jpg",
    status: "past",
    featured: false,
    registrationClosed: true
  },
  20260905: {
    title: "BrainStorm Cancer - Arizona Symposium",
    date: "September 5, 2026",
    time: "8:00 AM - 1:00 PM",
    location: "Indianapolis, IN",
    description: "Our second BrainStorm Cancer symposium of 2026 heads to Indianapolis. This comprehensive educational and networking symposium brings together patients, physicians, nurses, caregivers, scientists, and vendors to share insights, offer support, and explore advancements in brain tumor care. The half-day event facilitates in-depth discussions on treatment, nutrition, supportive care, and living well through the oncology journey.",
    mission: "We endeavor to reconnect patients and their caregivers with the science and educational resources that afford optimized living through their oncology journey. We are uniquely positioned to provide ample patient-facing learning spaces for physicians and oncology care experts to intersect for the betterment of the patient.",
    agenda: [
      { time: "6:00 AM", activity: "Doors Open for Vendor Set-up" },
      { time: "8:00 AM", activity: "Breakfast & Registration" },
      { time: "9:00 AM", activity: "Symposium Begins" },
      { time: "1:00 PM", activity: "Symposium Ends" }
    ],
    registrationTypes: [
      { type: "patient", label: "Patient/Caregiver", price: "Free", fields: ["firstName", "lastName", "email", "ticketCount", "phone"] },
      { type: "physician", label: "Physician/APP/Provider", price: "Donation", fields: ["firstName", "lastName", "credentials", "institution", "email", "phone"] },
      { type: "researcher", label: "Researcher", price: "Donation", fields: ["firstName", "lastName", "credentials", "institution", "email", "phone"] },
      { type: "vendor", label: "Scientist/Vendor", price: "$850", fields: ["firstName", "lastName", "organization", "email", "phone"] },
      { type: "sponsor", label: "Sponsor", price: "Direct Link", fields: ["firstName", "lastName", "organization", "email", "sponsorshipLevel", "phone"] }
    ],
    sponsorshipLevels: [
      { name: "Other", price: "$3,000", benefits: ["Listed on Syllabus Sponsor Page"] },
      { name: "Gold", price: "$4,500", benefits: ["1 Vendor Admission", "Honoring-A-Patient Award (Partial)", "Listed on Syllabus Sponsor Page"] },
      { name: "Platinum", price: "$8,000", benefits: ["2 Vendor Admissions", "Private Luncheon Intro (10 min)", "1 We Are The Storm Award", "Full-Page Ad", "Social Media Promotion"] },
      { name: "Diamond", price: "$15,000", benefits: ["3 Vendor Admissions", "Private Physician Luncheon (40 min)", "3 We Are The Storm Awards", "2-Page Ad", "Banner at Stage", "Bag Inserts", "Named Sponsor for Vivere Luncheon"] },
      { name: "Specialized", price: "As Agreed", benefits: ["Custom sponsorship package tailored to your organization"] }
    ],
    image: "/images/2026/brainstorm-2026-254.jpg",
    status: "upcoming",
    featured: true,
    registrationClosed: true
  }
};
