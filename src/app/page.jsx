'use client';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, FileText, Terminal, Flame, Zap, Star, Award, Briefcase, Code, Cpu, Boxes, Sparkles, ArrowRight, Send, Check } from 'lucide-react';

// Cyberpunk Grid Background
const CyberpunkGrid = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/20 to-black" />
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(16, 185, 129, 0.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(16, 185, 129, 0.15) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }} />
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)',
          backgroundSize: '100% 100%',
        }}
      />
    </div>
  );
};

// Glitch Text Effect
const GlitchText = ({ children, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 text-emerald-500 opacity-70 animate-glitch-1" aria-hidden="true">
        {children}
      </span>
      <span className="absolute top-0 left-0 text-amber-500 opacity-70 animate-glitch-2" aria-hidden="true">
        {children}
      </span>
      <style jsx>{`
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          33% { transform: translate(-2px, 2px); }
          66% { transform: translate(2px, -2px); }
        }
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          33% { transform: translate(2px, -2px); }
          66% { transform: translate(-2px, 2px); }
        }
        .animate-glitch-1 {
          animation: glitch-1 3s infinite;
        }
        .animate-glitch-2 {
          animation: glitch-2 3s infinite;
        }
      `}</style>
    </div>
  );
};

// Terminal Loader
const TerminalLoader = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const bootSequence = [
    '> Initializing system...',
    '> Loading portfolio.exe',
    '> Connecting to matrix...',
    '> Decrypting credentials...',
    '> System ready. Welcome.',
  ];

  useEffect(() => {
    bootSequence.forEach((line, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (i === bootSequence.length - 1) {
          setTimeout(onComplete, 500);
        }
      }, i * 400);
    });
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-gray-900 border-2 border-emerald-500 rounded-lg overflow-hidden shadow-2xl shadow-emerald-500/50">
          <div className="bg-emerald-950 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <span className="text-emerald-400 text-sm ml-4 font-mono">system@chirag:~$</span>
          </div>
          <div className="p-6 font-mono text-emerald-400 space-y-2">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" />
                <span>{line}</span>
                {i === lines.length - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-emerald-400 ml-1"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Neon Button
const NeonButton = ({ children, icon: Icon, href, ...props }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group"
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" />
      <div className="relative px-6 py-3 bg-black rounded-lg border border-emerald-500 flex items-center gap-2 group-hover:border-amber-500 transition-colors">
        {Icon && <Icon className="w-5 h-5" />}
        <span className="font-mono text-emerald-400 group-hover:text-amber-400 transition-colors">
          {children}
        </span>
      </div>
    </motion.a>
  );
};

// Hero Section
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <motion.div style={{ y }} className="text-center z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-32 h-32 rounded-full border-4 border-emerald-500/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 w-32 h-32 rounded-full border-4 border-amber-500/30 border-t-amber-500"
            />
            <Terminal className="absolute inset-0 m-auto w-12 h-12 text-emerald-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <GlitchText className="text-7xl md:text-9xl font-black mb-6 tracking-tighter">
            <span className="text-white">CHIRAG</span>
          </GlitchText>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
            <span className="text-2xl md:text-3xl font-mono text-emerald-400">
              &lt;SOFTWARE_ENGINEER/&gt;
            </span>
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </div>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-mono">
            Building digital experiences with <span className="text-emerald-400">cutting-edge tech</span> and 
            <span className="text-amber-400"> innovative solutions</span>
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <NeonButton icon={Github} href="https://github.com/Chirag-2199">
              GitHub
            </NeonButton>
            <NeonButton icon={Linkedin} href="https://linkedin.com/in/chirgkr">
              LinkedIn
            </NeonButton>
            <NeonButton icon={Mail} href="mailto:chiragkumar2199@gmail.com">
              Email
            </NeonButton>
            <NeonButton icon={FileText} href="/Chirag.Kumar.resume25.pdf">
              Resume
            </NeonButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Code Blocks */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-emerald-500/10 font-mono text-xs"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            x: [null, Math.random() * window.innerWidth],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          {'{ code }'}
        </motion.div>
      ))}
    </section>
  );
};

// Stats Counter
const StatCounter = ({ end, label, icon: Icon, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = end / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-gray-900 border-2 border-emerald-500/30 rounded-2xl p-8 group-hover:border-emerald-500 transition-colors">
        <Icon className="w-10 h-10 text-emerald-400 mb-4" />
        <div className="text-5xl font-black text-white mb-2 font-mono">
          {count}+
        </div>
        <div className="text-gray-400 font-mono text-sm uppercase tracking-wider">{label}</div>
      </div>
    </motion.div>
  );
};

// Experience Card
const ExperienceCard = ({ exp, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-gray-900 border-2 border-emerald-500/30 rounded-2xl p-6 md:p-8 group-hover:border-amber-500 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
            <p className="text-emerald-400 font-mono mb-1">{exp.company}</p>
            <p className="text-amber-400 text-sm font-mono">{exp.period}</p>
          </div>
          <Briefcase className="w-8 h-8 text-emerald-400" />
        </div>
        <p className="text-gray-400">{exp.description}</p>
      </div>
    </motion.div>
  );
};

// Project Card
const ProjectCard = ({ project, index }) => {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative group block"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative h-full bg-gray-900 border-2 border-emerald-500/30 rounded-2xl p-6 group-hover:border-emerald-500 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-emerald-500/10 rounded-lg">
            <Code className="w-6 h-6 text-emerald-400" />
          </div>
          <ArrowRight className="w-6 h-6 text-amber-400 group-hover:translate-x-2 transition-transform" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
        <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

// Contact Form
const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto"
    >
      <div className="space-y-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-6 py-4 bg-gray-900 border-2 border-emerald-500/30 rounded-lg text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors font-mono"
            required
          />
        </div>
        <div className="relative">
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-6 py-4 bg-gray-900 border-2 border-emerald-500/30 rounded-lg text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors font-mono"
            required
          />
        </div>
        <div className="relative">
          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={6}
            className="w-full px-6 py-4 bg-gray-900 border-2 border-emerald-500/30 rounded-lg text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition-colors font-mono resize-none"
            required
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full group"
          disabled={status === 'sending'}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" />
          <div className="relative px-8 py-4 bg-black rounded-lg border-2 border-emerald-500 group-hover:border-amber-500 transition-colors flex items-center justify-center gap-2">
            {status === 'sent' ? (
              <>
                <Check className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-emerald-400">Message Sent!</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 text-emerald-400 group-hover:text-amber-400 transition-colors" />
                <span className="font-mono text-emerald-400 group-hover:text-amber-400 transition-colors">
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </span>
              </>
            )}
          </div>
        </motion.button>
      </div>
    </motion.form>
  );
};

// Main App
export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();

  const experiences = [
    { period: 'March 2025 - Present', role: 'Software Engineer', company: 'Sterling INC', description: 'Leading real estate development innovation with cutting-edge solutions' },
    { period: 'Sep 2024 - March 2025', role: 'Software Engineer', company: 'Cactus Communications', description: 'Science communication technology solutions' },
    { period: 'Dec 2024 - March 2025', role: 'Engineering Advisor', company: 'RevQ', description: 'SaaS platform optimization and architecture' },
    { period: 'March 2024 - Sep 2024', role: 'Full Stack Developer Intern', company: 'VerveBridge', description: 'EdTech platform development' },
  ];

  const projects = [
    { title: 'TradeFlow', description: 'Real-time trading platform with advanced analytics', technologies: ['PHP', 'Laravel', 'SQL'], link: 'https://github.com/Chirag-2199/tradeflow' },
    { title: 'EZ Jobs', description: 'AI-powered job portal with smart matching', technologies: ['Next.js', 'Node.js', 'MongoDB'], link: 'https://github.com/Chirag-2199/easy-job' },
    { title: 'Crypto Mint', description: 'Decentralized NFT minting platform', technologies: ['TypeScript', 'Next.js', 'Chart.js'], link: 'https://crypto-mint.vercel.app/' },
  ];

  if (isLoading) {
    return <TerminalLoader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <CyberpunkGrid />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <Hero />

      {/* Stats */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCounter end={1} label="Years Exp" icon={Flame} delay={0} />
          <StatCounter end={20} label="Projects" icon={Cpu} delay={0.1} />
          <StatCounter end={15} label="Technologies" icon={Boxes} delay={0.2} />
          <StatCounter end={100} label="Satisfaction" icon={Star} delay={0.3} />
        </div>
      </section>

      {/* Experience */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-center mb-16"
          >
            <GlitchText>
              <span className="text-emerald-400 font-mono">&lt;EXPERIENCE/&gt;</span>
            </GlitchText>
          </motion.h2>
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-center mb-16"
          >
            <GlitchText>
              <span className="text-amber-400 font-mono">&lt;PROJECTS/&gt;</span>
            </GlitchText>
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-center mb-4"
          >
            <GlitchText>
              <span className="text-emerald-400 font-mono">&lt;CONTACT/&gt;</span>
            </GlitchText>
          </motion.h2>
          <p className="text-center text-gray-400 mb-12 font-mono">
            Let's build something <span className="text-emerald-400">extraordinary</span> together
          </p>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-emerald-500/30">
        <p className="text-gray-500 font-mono text-sm">
          © 2025 Chirag Kumar | Coded with <span className="text-emerald-400">passion</span> & <span className="text-amber-400">coffee</span>
        </p>
      </footer>
    </div>
  );
}
