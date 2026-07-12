import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Notes } from './components/Notes';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { CommandPalette } from './components/CommandPalette';


export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={`relative min-h-screen font-sans selection:bg-blue-500/30 selection:text-blue-600 dark:selection:text-blue-200 transition-colors duration-500 bg-soft-blue dark:bg-[#050B14]`}>
      <CommandPalette />
      
      {/* Background Image at the top level, covering Header & Hero area */}
      <div className="absolute top-0 left-0 right-0 h-[640px] md:h-[720px] z-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-top bg-no-repeat transition-opacity duration-700 ${isDark ? 'opacity-85' : 'opacity-70'}`}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-soft-blue/40 to-soft-blue dark:via-[#050B14]/40 dark:to-[#050B14] transition-colors duration-500"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Global Floating Sticky Header */}
        <div className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8">
          <header className="mx-auto max-w-7xl rounded-full border border-slate-200/40 dark:border-slate-800/40 bg-soft-blue/60 dark:bg-[#050B14]/65 backdrop-blur-xl px-6 shadow-xl shadow-blue-900/5 dark:shadow-none transition-colors duration-500">
            <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
          </header>
        </div>
        
        <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <Hero />
          <Projects />
          <Notes />
          <Blog />
          <Contact />
        </main>

        <footer className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 section-divider py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-mono tracking-[0.1em] text-slate-500 dark:text-slate-500 uppercase">
            BUILT WITH A PRODUCT-FIRST PORTFOLIO MINDSET.
          </p>
          <p className="text-[10px] font-mono tracking-[0.1em] text-slate-500 dark:text-slate-500 uppercase">
            © {new Date().getFullYear()} FATCURRAHMAN
          </p>
        </footer>
      </div>
    </div>
  );
}
