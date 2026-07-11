import { useState, useEffect } from 'react';
import { Moon, Sun, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [activeTab, setActiveTab] = useState('HOME');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const navItems = [
    { name: 'HOME', href: '#' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'NOTES', href: '#notes' },
    { name: 'BLOG', href: '#blog' },
    { name: 'CONTACT', href: '#contact' },
  ];


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160; // Offset for activation point
      
      const homeEl = document.getElementById('home');
      const projectsEl = document.getElementById('projects');
      const notesEl = document.getElementById('notes');
      const blogEl = document.getElementById('blog');
      const contactEl = document.getElementById('contact');

      let current = 'HOME';

      if (contactEl && scrollPosition >= contactEl.offsetTop) {
        current = 'CONTACT';
      } else if (blogEl && scrollPosition >= blogEl.offsetTop) {
        current = 'BLOG';
      } else if (notesEl && scrollPosition >= notesEl.offsetTop) {
        current = 'NOTES';
      } else if (projectsEl && scrollPosition >= projectsEl.offsetTop) {
        current = 'PROJECTS';
      }

      setActiveTab(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between w-full py-5 z-50 relative"
    >
      <div className="flex flex-col">
        <span className="font-bold text-slate-900 dark:text-slate-100 tracking-tight text-lg">Fatcurrahman</span>
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5">Web3 & AI Builder</span>
      </div>

      <div className="hidden md:flex items-center bg-white/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/50 rounded-full p-1 backdrop-blur-xl shadow-lg relative">
        {navItems.map((item) => {
          const isActive = activeTab === item.name;
          const isHovered = hoveredTab === item.name;
          
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setActiveTab(item.name)}
              onMouseEnter={() => setHoveredTab(item.name)}
              onMouseLeave={() => setHoveredTab(null)}
              className={`relative px-5 py-2 text-[10px] font-mono tracking-widest rounded-full transition-colors duration-300 font-semibold cursor-pointer select-none ${
                isActive 
                  ? 'text-slate-900 dark:text-white' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {/* Glassmorphic Active Pill */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-white/80 dark:bg-slate-800/70 border border-slate-200/30 dark:border-slate-700/30 shadow-md rounded-full -z-10 backdrop-blur-md"
                />
              )}

              {/* Light Hover Background */}
              {!isActive && isHovered && (
                <motion.div
                  layoutId="hover-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute inset-0 bg-slate-200/40 dark:bg-slate-800/30 rounded-full -z-10"
                />
              )}

              <span className="relative z-10">{item.name}</span>
            </a>
          );
        })}
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden sm:flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <a href="https://github.com/thebegithub" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><Github size={18} /></a>
          <a href="https://x.com/Thebex_nncur" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><Twitter size={18} /></a>
          <a href="https://www.linkedin.com/in/fatcurrahman-77268124a/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><Linkedin size={18} /></a>
          <a href="https://www.instagram.com/thebex.nncur_/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><Instagram size={18} /></a>
        </div>
        <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>
        <button
          onClick={toggleTheme}
          className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </motion.nav>
  );
}
