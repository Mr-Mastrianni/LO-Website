import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';

const EmailSignup = ({ source = 'signup_form', className = '' }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const { data, error } = await supabase.functions.invoke('subscribe', {
        body: { email: email.toLowerCase().trim(), name: name.trim() || null, source },
      });

      if (error) throw error;

      if (data?.already_confirmed) {
        setStatus('success');
        return;
      }

      setStatus('success');
      setEmail('');
      setName('');
    } catch (err) {
      console.error('Subscribe error:', err);
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`bg-white rounded-xl shadow-lg p-8 ${className}`}
    >
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-primary mb-2">Stay Connected</h3>
        <p className="text-gray-600 leading-relaxed">
          Get updates on events, resources, and our mission to support the neuro-oncology community.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-4"
          >
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-lg font-semibold text-gray-800">Check your email!</p>
            <p className="text-gray-600 mt-1">
              We sent you a confirmation link. Click it to complete your subscription.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Your email address"
                required
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm text-center"
                >
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>

            <p className="text-xs text-gray-400 text-center">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EmailSignup;
