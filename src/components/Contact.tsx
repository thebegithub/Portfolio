import { ArrowRight, Github, Twitter, Linkedin, Mail, Instagram } from 'lucide-react';
import React from 'react';

export function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-slate-200 dark:border-slate-800/50 mt-12 mb-12">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        <div className="flex-1">
          <p className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-6">
            CONTACT / COLLABORATIONS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] mb-6 max-w-xl">
            Available for sharp product work across Web3, growth, and community.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-12 max-w-lg text-lg">
            Open to builder collaborations, technical product design, and growth-heavy roles that need both execution and strategy.
          </p>

          <form className="space-y-4 max-w-lg">
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="text" placeholder="Your name" className="w-full bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors placeholder:text-slate-400" />
              <input type="email" placeholder="Email address" className="w-full bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors placeholder:text-slate-400" />
            </div>
            <input type="text" placeholder="Subject" className="w-full bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors placeholder:text-slate-400" />
            <textarea placeholder="Tell me what you're building, what you need, and the timeline..." rows={5} className="w-full bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors resize-none placeholder:text-slate-400"></textarea>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <p className="text-xs text-slate-500">Messages go directly to the configured inbox.</p>
              <button type="button" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium text-sm hover:bg-slate-800 dark:hover:bg-white transition-colors w-full sm:w-auto">
                SEND MESSAGE <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-80 flex flex-col gap-4">
          <SocialCard icon={<Github size={20} />} label="GITHUB" value="thebegithub" href="https://github.com/thebegithub" />
          <SocialCard icon={<Twitter size={20} />} label="TWITTER" value="@Thebex_nncur" href="https://x.com/Thebex_nncur" />
          <SocialCard icon={<Linkedin size={20} />} label="LINKEDIN" value="fatcurrahman-77268124a" href="https://www.linkedin.com/in/fatcurrahman-77268124a/" />
          <SocialCard icon={<Instagram size={20} />} label="INSTAGRAM" value="@thebex.nncur_" href="https://www.instagram.com/thebex.nncur_/" />
          <SocialCard icon={<Mail size={20} />} label="EMAIL" value="fatcurrahman125@gmail.com" href="mailto:fatcurrahman125@gmail.com" />
        </div>
      </div>
    </section>
  );
}

function SocialCard({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href: string }) {
  const isMail = href.startsWith('mailto:');
  return (
    <a 
      href={href} 
      target={isMail ? undefined : "_blank"} 
      rel={isMail ? undefined : "noopener noreferrer"} 
      className="flex items-center gap-5 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/20 hover:bg-white/80 dark:hover:bg-slate-800/50 transition-colors group backdrop-blur-sm"
    >
      <div className="text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-500 uppercase mb-0.5">{label}</p>
        <p className="text-sm font-medium text-slate-900 dark:text-slate-200">{value}</p>
      </div>
      <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:-rotate-45 transition-all" />
    </a>
  );
}
