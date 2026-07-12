import { useState, useEffect } from 'react';
import { ArrowRight, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import profilePic from '@/assets/profile.jpg';

const PHRASES = [
  'Web3 & AI Products',
  'Autonomous Agents',
  'Automation Systems',
  'AI-Driven Workflows',
  'User Experiences',
  'Community Growth',
  'Product Strategy',
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const cycle = setInterval(() => {
      // Fade out + slide up
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % PHRASES.length);
        // Fade in + slide down into place
        setVisible(true);
      }, 350); // half of transition = smooth crossfade
    }, 2500);

    return () => clearInterval(cycle);
  }, [isHovered]);

  return (
    <section className="relative z-10 pt-16 pb-20 md:pt-24 md:pb-32 flex flex-col lg:flex-row-reverse gap-16 lg:gap-8 items-start">
      {/* Left Content */}
      <div className="flex-1 w-full lg:max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-6"
        >
          Hi, I'm Fatcurrahman
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-[72px] lg:text-[80px] font-bold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-8 select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="block">Turning ideas into</span>

          {/* Rotating text container — fixed height to prevent layout shift */}
          <span className="relative block h-[1.25em] overflow-hidden">
            <span
              style={{
                display: 'inline-block',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(-12px)',
                transition: 'opacity 350ms ease-in-out, transform 350ms ease-in-out',
              }}
              className="absolute left-0 whitespace-nowrap bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent pb-2"
            >
              {PHRASES[index]}
            </span>
          </span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs md:text-sm font-mono font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-12 leading-relaxed"
        >
          <span className="text-emerald-600 dark:text-emerald-400">INFORMATICS STUDENT</span> / AI INTEGRATOR / GTM ENGINEER / WEB3 BUILDER
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          <a href="#projects" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium text-sm hover:bg-slate-800 dark:hover:bg-white transition-colors">
            Explore Work <ArrowRight size={18} />
          </a>
          <a href="#projects" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            Full Archive
          </a>
        </motion.div>
      </div>

      {/* Right Content / Card */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full lg:w-[380px] shrink-0"
      >
        <div className="rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-2 shadow-2xl shadow-blue-900/5 dark:shadow-none">
          <div className="relative h-[380px] md:h-[420px] w-full rounded-[2rem] overflow-hidden mb-2">
            <img 
              src={profilePic} 
              alt="Fatcurrahman" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <h3 className="font-semibold text-lg mb-1.5">Building in public.</h3>
              <p className="text-sm text-slate-200/80 leading-relaxed">
                Focused on Web3 research and community building.
              </p>
            </div>
          </div>
          
          <div className="p-4 pt-2">
            <div className="flex flex-wrap gap-2">
              {['GTM', 'Web3', 'AI', 'Growth', 'Frontend', 'UI/UX'].map(skill => (
                <span key={skill} className="px-3 py-1.5 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 text-[10px] uppercase tracking-wider font-mono font-medium text-slate-700 dark:text-slate-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
