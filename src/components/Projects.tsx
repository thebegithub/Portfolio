import { useState } from 'react';
import { ArrowUpRight, Github, X, Briefcase, Activity, Code } from 'lucide-react';
import { PROJECTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[number] | null>(null);
  const [activeStatus, setActiveStatus] = useState('ALL');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const statuses = ['ALL', 'SHIPPED', 'IN-PROGRESS', 'ARCHIVED'];

  // Pull primary categories dynamically from project data (first tech tag)
  const categories = ['ALL', ...Array.from(new Set(PROJECTS.map(p => p.tech[0].toUpperCase())))];

  const filteredProjects = PROJECTS.filter(project => {
    const matchesStatus = activeStatus === 'ALL' || (project.status && project.status.toUpperCase() === activeStatus);
    const matchesCategory = activeCategory === 'ALL' || project.tech[0].toUpperCase() === activeCategory;
    return matchesStatus && matchesCategory;
  });

  return (
    <section id="projects" className="pt-16 pb-24 section-divider">
      <div className="max-w-2xl mb-16">
        <p className="text-[10px] font-mono tracking-[0.1em] text-slate-500 dark:text-slate-400 uppercase mb-6 border border-slate-300 dark:border-slate-700 rounded-full px-3 py-1.5 inline-block">
          PROJECTS & CASE STUDIES
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] mb-6">
          Selected work, built with intent.
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Decentralized applications, product designs, and marketing automation workflows built for Web3 growth and transparency.
        </p>
      </div>

      {/* Dynamic Two-Row Filter System */}
      <div className="flex flex-col gap-3 mb-12 w-full">
        {/* Row 1: Status Filters */}
        <div className="flex flex-wrap gap-2.5">
          {statuses.map((status) => {
            const isActive = status === activeStatus;
            return (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'chip-active text-white shadow-lg'
                    : 'bg-white/40 dark:bg-slate-900/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200/50 dark:border-slate-800/50'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* Row 2: Category/Stack Filters */}
        <div className="flex flex-wrap gap-2.5">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'chip-active text-white shadow-lg'
                    : 'bg-white/40 dark:bg-slate-900/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200/50 dark:border-slate-800/50'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => {
            const isFeatured = activeCategory === 'ALL' && i === 0;
            return (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className={isFeatured ? 'lg:col-span-2' : 'lg:col-span-1'}
              >
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex flex-col text-left p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/20 hover:bg-white/60 dark:hover:bg-slate-900/40 backdrop-blur-sm group cursor-pointer w-full card-premium-hover overflow-hidden h-full"
                >
                  <div className="flex flex-col h-full w-full justify-between space-y-4">
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-4 w-full">
                        <span className="px-3.5 py-1.5 rounded-full badge-gradient-border text-[11px] font-mono tracking-wider uppercase font-bold">
                          {project.tech[0]}
                        </span>
                        <p className="text-[10px] font-mono tracking-[0.1em] text-slate-500 dark:text-slate-400 uppercase">
                          {project.status} • 2026
                        </p>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <p className={`text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4 ${
                        isFeatured ? 'max-w-4xl' : 'line-clamp-3'
                      }`}>
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-1.5 mt-auto text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors uppercase tracking-wider">
                      <span className="hover-text-accent-gradient">VIEW DETAILS</span> <ArrowUpRight size={14} />
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Modal Popup with AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/40 dark:bg-black/70 backdrop-blur-md"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-5xl bg-white dark:bg-[#070e17] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-soft-blue dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-6">
                {/* Left Column (Description & Tech) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Header Tag */}
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-slate-700 text-[10px] font-mono tracking-wider text-slate-500 dark:text-slate-400 uppercase font-semibold">
                      {selectedProject.tech[0]}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{selectedProject.status} • 2026 / FEATURED</span>
                  </div>

                  {/* Title & Role */}
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                      {selectedProject.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-3 text-emerald-600 dark:text-emerald-400">
                      <Briefcase size={14} />
                      <span className="text-xs font-mono font-medium tracking-wide uppercase">
                        {selectedProject.role}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest font-bold text-slate-400 dark:text-slate-500 uppercase">
                      <Code size={14} /> Technology
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tag) => (
                        <span key={tag} className="px-3.5 py-1.5 rounded-lg badge-gradient-border text-[13px] font-mono uppercase font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column (Contribution & Actions) */}
                <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200/60 dark:border-slate-800/60 pt-6 lg:pt-0 lg:pl-10 space-y-8">
                  {/* Contribution & Focus Section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest font-bold text-slate-400 dark:text-slate-500 uppercase">
                      <Activity size={14} /> Contribution & Focus
                    </div>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                      {selectedProject.contribution}
                    </p>
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 pt-6 lg:pt-0 lg:mt-auto">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-[11px] font-mono tracking-wider font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full"
                    >
                      <Github size={14} /> SOURCE CODE
                    </a>
                    <a
                      href={selectedProject.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-[11px] font-mono tracking-wider font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full"
                    >
                      <ArrowUpRight size={14} /> LIVE DEMO
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
