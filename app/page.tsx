'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (password.trim() === '26102024'){;
    router.push('/quiz');
    }
  };

  const isPasswordValid = password.trim() !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffd6e8] via-[#ffecf2] to-[#fff5fa] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-20"
            initial={{ y: -20, x: Math.random() * 1000, opacity: 0 }}
            animate={{
              y: '100vh',
              opacity: [0, 0.3, 0],
              rotate: 360
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear'
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md border-2 border-[#ffe6f0]"
             style={{ boxShadow: '0 20px 60px rgba(255, 182, 215, 0.4)' }}>

          <motion.div
            className="flex justify-center mb-6"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <div className="bg-gradient-to-br from-[#ffd6e8] to-[#ffb6d9] p-6 rounded-full">
              <Lock className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-2xl font-bold text-center mb-2 cursive text-[#d946a6]">
            💌 ENTER YOUR SECRET KEY
          </h1>



          <div className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Secret Key"
                className="w-full px-6 py-4 rounded-2xl border-2 border-[#ffe6f0] focus:border-[#ffd6e8] focus:outline-none focus:ring-4 focus:ring-[#ffe6f0] transition-all duration-300 text-center text-lg"
                style={{ boxShadow: '0 4px 20px rgba(255, 182, 215, 0.15)' }}
              />
            </div>

            <motion.button
              onClick={handleContinue}
              disabled={!isPasswordValid}
              whileHover={isPasswordValid ? { scale: 1.02, boxShadow: '0 8px 30px rgba(217, 70, 166, 0.3)' } : {}}
              whileTap={isPasswordValid ? { scale: 0.98 } : {}}
              className={`w-full font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 ${
                isPasswordValid
                  ? 'bg-gradient-to-r from-[#ffd6e8] to-[#ffb6d9] text-white shadow-lg hover:shadow-xl cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </motion.button>


          </div>

          <motion.div
            className="flex justify-center gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              >
                <Heart className="w-4 h-4 text-[#ffd6e8] fill-[#ffd6e8]" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
