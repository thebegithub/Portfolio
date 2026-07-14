import { ArrowRight, Github, Twitter, Linkedin, Mail, Instagram } from 'lucide-react';
import React from 'react';

export function Contact() {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      _subject: formData.get('subject') || 'Collaboration Inquiry',
      message: formData.get('message'),
      _captcha: 'false'
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/fatcurrahman125@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setStatus('success');
        e.currentTarget.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 section-divider mt-12 mb-12">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        <div className="flex-1">
          <p className="text-[10px] font-mono tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase mb-6 border border-slate-300 dark:border-slate-700 rounded-full px-3 py-1.5 inline-block">
            CONTACT / COLLABORATIONS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] mb-6 max-w-xl">
            Available for sharp product work across Web3, growth, and community.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-12 max-w-lg text-lg">
            Open to builder collaborations, technical product design, and growth-heavy roles that need both execution and strategy.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                name="name"
                required
                placeholder="Your name" 
                className="w-full bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors placeholder:text-slate-400" 
              />
              <input 
                type="email" 
                name="email"
                required
                placeholder="Email address" 
                className="w-full bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors placeholder:text-slate-400" 
              />
            </div>
            <input 
              type="text" 
              name="subject"
              required
              placeholder="Subject" 
              className="w-full bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors placeholder:text-slate-400" 
            />
            <textarea 
              name="message"
              required
              placeholder="Tell me what you're building, what you need, and the timeline..." 
              rows={5} 
              className="w-full bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors resize-none placeholder:text-slate-400"
            ></textarea>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-slate-500">Messages go directly to the configured inbox.</p>
                {status === 'success' && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">✓ Message sent! Please verify your inbox on the first submission.</p>
                )}
                {status === 'error' && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">✗ Failed to send message. Please try again.</p>
                )}
              </div>
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full btn-primary-gradient font-medium text-sm w-full sm:w-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'} <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-[460px] flex flex-col gap-5">
          <SocialCard icon={<Github size={22} />} label="GITHUB" value="thebegithub" href="https://github.com/thebegithub" />
          <SocialCard icon={<Twitter size={22} />} label="TWITTER" value="@Thebex_nncur" href="https://x.com/Thebex_nncur" />
          <SocialCard icon={<Linkedin size={22} />} label="LINKEDIN" value="fatcurrahman-77268124a" href="https://www.linkedin.com/in/fatcurrahman-77268124a/" />
          <SocialCard icon={<Instagram size={22} />} label="INSTAGRAM" value="@thebex.nncur_" href="https://www.instagram.com/thebex.nncur_/" />
          <SocialCard icon={<Mail size={22} />} label="EMAIL" value="fatcurrahman125@gmail.com" href="mailto:fatcurrahman125@gmail.com" />
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
      className="flex items-center gap-6 p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/20 hover:bg-white/80 dark:hover:bg-slate-800/50 transition-colors group backdrop-blur-sm"
    >
      <div className="text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs font-mono tracking-widest text-slate-500 dark:text-slate-500 uppercase mb-0.5">{label}</p>
        <p className="text-base font-semibold text-slate-900 dark:text-slate-200">{value}</p>
      </div>
      <ArrowRight size={18} className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:-rotate-45 transition-all" />
    </a>
  );
}
