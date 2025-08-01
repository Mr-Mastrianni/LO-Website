import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import MemberCard from '@/components/members/MemberCard';
import PageAnimator from '@/components/PageAnimator';
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users } from 'lucide-react';

const MembersDirectory = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name, role, bio')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }
        
        setMembers(data);
      } catch (err) {
        setError(err.message);
        toast({
          variant: "destructive",
          title: "Failed to load members",
          description: "There was a problem fetching the community members. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [toast]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <PageAnimator>
      <Helmet>
        <title>Members Directory – Living Oncology</title>
        <meta name="description" content="Connect with the Living Oncology community. Browse our directory of patients, survivors, caregivers, and professionals." />
      </Helmet>
      <div className="bg-primary/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Users className="mx-auto h-12 w-12 text-accent" />
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Community Members
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-foreground/80">
              Meet the incredible individuals who make up the Living Oncology community.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
           <div className="flex justify-center items-center py-20">
             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
           </div>
        )}

        {error && (
          <Alert variant="destructive" className="max-w-3xl mx-auto">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && !error && members.length === 0 && (
           <div className="text-center py-20">
             <Users className="mx-auto h-12 w-12 text-foreground/50" />
             <p className="mt-4 text-lg text-foreground/70">No members have joined yet. Be the first!</p>
           </div>
        )}

        {!loading && !error && members.length > 0 && (
          <motion.div
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </motion.div>
        )}
      </div>
    </PageAnimator>
  );
};

export default MembersDirectory;