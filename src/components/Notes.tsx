import { useState } from 'react';
import { ArrowUpRight, Code, Copy, Check, X } from 'lucide-react';
import { NOTES } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export function Notes() {
  const [selectedNote, setSelectedNote] = useState<typeof NOTES[number] | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedNotes = showAll ? NOTES : NOTES.slice(0, 2);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="notes" className="py-24 section-divider">
      <div className="max-w-2xl mb-16">
        <p className="text-[10px] font-mono tracking-[0.1em] text-slate-500 dark:text-slate-400 uppercase mb-6 border border-slate-300 dark:border-slate-700 rounded-full px-3 py-1.5 inline-block">
          FIELD NOTES
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] mb-6">
          Short technical notes, selected with intent.
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Research fragments, code snippets, and automated blueprints that support the work shown elsewhere.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedNotes.map((note) => (
          <button
            key={note.id}
            onClick={() => setSelectedNote(note)}
            className="flex flex-col text-left p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/20 hover:bg-white/60 dark:hover:bg-slate-900/40 backdrop-blur-sm group cursor-pointer w-full card-premium-hover overflow-hidden"
          >
             <div className="flex items-center justify-between mb-4 w-full">
              <span className="px-3.5 py-1.5 rounded-full badge-gradient-border text-[11px] font-mono tracking-wider uppercase font-bold">
                {note.category}
              </span>
              <p className="text-[10px] font-mono tracking-[0.1em] text-slate-500 dark:text-slate-400 uppercase">
                FRAGMENT
              </p>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {note.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-1 line-clamp-3">
              {note.desc}
            </p>
            
            <div className="flex items-center gap-1.5 mt-auto text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors uppercase tracking-wider">
              <span className="hover-text-accent-gradient">VIEW CODE SNIPPET</span> <ArrowUpRight size={14} />
            </div>
          </button>
        ))}
      </div>

      {NOTES.length > 2 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/20 hover:bg-white/60 dark:hover:bg-slate-900/40 text-slate-800 dark:text-slate-200 font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 backdrop-blur-sm cursor-pointer hover:border-blue-500/30 dark:hover:border-blue-500/20"
          >
            {showAll ? 'Show Less' : 'View All Notes'}
          </button>
        </div>
      )}

      {/* Modal Popup with AnimatePresence */}
      <AnimatePresence>
        {selectedNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNote(null)}
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
                onClick={() => setSelectedNote(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-soft-blue dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="space-y-6">
                {/* Header Tag */}
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-full badge-gradient-border text-[11px] font-mono tracking-wider uppercase font-bold">
                    {selectedNote.category}
                  </span>
                  <span className="text-[10px] font-mono tracking-[0.1em] text-slate-400 uppercase">TECHNICAL NOTE</span>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  {selectedNote.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedNote.desc}
                </p>

                {/* Code block */}
                <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest font-bold text-slate-400 dark:text-slate-500 uppercase">
                    <span className="flex items-center gap-2"><Code size={14} /> Code Preview</span>
                    <button
                      onClick={() => handleCopy(selectedNote.code, selectedNote.id)}
                      className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {copiedId === selectedNote.id ? (
                        <>
                          <Check size={12} className="text-emerald-500" /> COPIED
                        </>
                      ) : (
                        <>
                          <Copy size={12} /> COPY CODE
                        </>
                      )}
                    </button>
                  </div>
                  <div className="relative rounded-2xl bg-slate-950 p-5 overflow-x-auto border border-slate-800">
                    <pre className="text-xs font-mono text-emerald-400/90 leading-relaxed whitespace-pre font-medium">
                      <code>{selectedNote.code}</code>
                    </pre>
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
