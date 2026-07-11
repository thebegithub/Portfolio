import { useState } from 'react';
import { ArrowUpRight, Calendar, Clock, X } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<typeof BLOG_POSTS[number] | null>(null);

  return (
    <section id="blog" className="py-24 border-t border-slate-200 dark:border-slate-800/50">
      <div className="max-w-2xl mb-16">
        <p className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-6 border border-slate-300 dark:border-slate-700 rounded-full px-3 py-1.5 inline-block">
          PUBLICATIONS & BLOG
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] mb-6">
          Writing on growth, Web3, and workflows.
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Sharing educational Web3 guides, developer automation frameworks, and product design takeaways.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post) => (
          <button
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="flex flex-col text-left rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/20 hover:bg-white/60 dark:hover:bg-slate-900/40 hover:border-blue-500/30 dark:hover:border-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 hover:-translate-y-2 hover:scale-[1.01] transition-all duration-300 ease-out backdrop-blur-sm group overflow-hidden cursor-pointer w-full"
          >
            {/* Image Banner */}
            <div className="h-52 w-full overflow-hidden relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
              <span className="absolute bottom-5 left-5 px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-md text-[9px] font-mono tracking-wider font-semibold text-white border border-white/10 uppercase">
                {post.category}
              </span>
            </div>

            <div className="p-6 md:p-8 flex flex-col flex-1">
              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-3 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-1 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Link */}
              <div className="flex items-center gap-1.5 mt-auto text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-wider">
                READ ARTICLE <ArrowUpRight size={14} />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal Popup with AnimatePresence */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-slate-900/40 dark:bg-black/70 backdrop-blur-md"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#070e17] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-soft-blue dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="space-y-6">
                {/* Header Tag */}
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-slate-700 text-[10px] font-mono tracking-wider text-slate-500 dark:text-slate-400 uppercase font-semibold">
                    {selectedPost.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{selectedPost.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  {selectedPost.title}
                </h3>

                {/* Image */}
                <div className="h-64 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Meta Row */}
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> PUBLISHED ON: {selectedPost.date}</span>
                </div>

                {/* Article Content */}
                <div className="space-y-4 text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                  <p>
                    {selectedPost.excerpt}
                  </p>
                  <p>
                    This is an educational blog publication snippet. Full reading and community discussions are shared via local channels and GitHub archives. Stay tuned for more updates!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
