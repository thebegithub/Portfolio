import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Home, Briefcase, FileCode, BookOpen, Mail, CornerDownLeft } from 'lucide-react';

const ITEMS = [
  { id: 'home', name: 'Home', description: 'Go to the hero section', icon: Home },
  { id: 'projects', name: 'Projects & Case Studies', description: 'View selected work and Web3 build logs', icon: Briefcase },
  { id: 'notes', name: 'Field Notes', description: 'Read technical writeups and snippets', icon: FileCode },
  { id: 'blog', name: 'Blog & Publications', description: 'Read educational guides and articles', icon: BookOpen },
  { id: 'contact', name: 'Contact & Socials', description: 'Get in touch for collaborations', icon: Mail }
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Trigger palette on Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen to custom toggle event from Navbar search click
  useEffect(() => {
    const handleOpenPalette = () => setIsOpen((prev) => !prev);
    window.addEventListener('open-command-palette', handleOpenPalette);
    return () => window.removeEventListener('open-command-palette', handleOpenPalette);
  }, []);

  // Autofocus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredItems = ITEMS.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (selectedIndex >= filteredItems.length) {
      setSelectedIndex(0);
    }
  }, [search, filteredItems.length, selectedIndex]);

  const handleNavigate = (id: string) => {
    setIsOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  useEffect(() => {
    const handleNavigationKeys = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleNavigate(filteredItems[selectedIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleNavigationKeys);
    return () => window.removeEventListener('keydown', handleNavigationKeys);
  }, [isOpen, selectedIndex, filteredItems]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-950/40 dark:bg-black/60 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="relative w-full max-w-lg bg-white dark:bg-[#070e17]/95 border border-slate-200/85 dark:border-slate-800/85 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 border-b border-slate-200/80 dark:border-slate-800/80">
              <Search size={18} className="text-slate-400 dark:text-slate-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search sections or type to filter..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-slate-800 dark:text-slate-100 py-4 outline-none text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 font-sans"
              />
              <span className="text-[10px] font-mono tracking-wider bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 rounded px-1.5 py-0.5 shrink-0 uppercase">
                Esc
              </span>
            </div>

            {/* List of items */}
            <div className="p-2 max-h-[300px] overflow-y-auto space-y-1">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between gap-3 w-full px-4 py-3 rounded-xl text-left transition-colors duration-150 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600/10 dark:bg-blue-500/15 border-l-2 border-blue-500 text-slate-900 dark:text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} className={isSelected ? 'text-blue-500' : 'text-slate-400'} />
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-light mt-0.5">{item.description}</p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="flex items-center gap-1 text-[9px] font-mono tracking-wider bg-blue-500/10 text-blue-500 dark:text-blue-400 rounded px-1.5 py-0.5">
                          <span>ENTER</span>
                          <CornerDownLeft size={10} />
                        </div>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center text-slate-400 dark:text-slate-500">
                  No matching sections found.
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-900 text-[10px] font-mono text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px]">Ctrl+K / ⌘K</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
