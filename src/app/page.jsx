'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiCode, FiDatabase, FiCloud, FiBriefcase } from 'react-icons/fi';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <AnimatePresence mode='wait'>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen flex items-center justify-center bg-slate-900"
          >
            <motion.div
              className="relative w-48 h-48"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
              <motion.div
                className="absolute inset-0 border-4 border-white/20 rounded-lg"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-4 py-12"
          >
            {/* Hero Section */}
            <div className="text-center mb-20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mb-8 inline-block"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-5xl font-bold mb-4 text-slate-900"
              >
                Chirag Kumar
              </motion.h1>
              <motion.p className="text-xl text-slate-600 mb-6">
                Full Stack Engineer
              </motion.p>

              <div className="flex justify-center gap-4 mb-12">
                {[FiGithub, FiLinkedin, FiMail].map((Icon, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -5 }}
                    className="p-3 rounded-lg bg-white text-slate-700 hover:bg-cyan-100 transition-colors shadow-sm"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-20 text-center bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-8 text-slate-900">About Me</h2>
              <div className="max-w-3xl mx-auto text-slate-600 space-y-6">
                <p>
                  Experienced software developer specializing in building scalable web applications
                  with modern technologies. Focused on creating efficient, maintainable systems
                  with exceptional user experiences.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {['1+ Years', '10+ Projects', '4.9 Rating'].map((stat, index) => (
                    <div key={stat} className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                      <div className="text-2xl font-bold text-cyan-600">{stat}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">Experience</h2>
              <div className="relative max-w-3xl mx-auto">
                <div className="absolute left-1/2 w-1 h-full bg-slate-200 transform -translate-x-1/2" />
                {[
                  { year: 'Sep-2024-Present', role: 'Software Developer Intern', company: 'Cactus Communication' },
                  { year: 'June-2024-Augest-2024', role: 'Software Developer Intern', company: 'VerveBridge' },
                ].map((exp, index) => (
                  <motion.div
                    key={exp.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className={`relative mb-8 w-full ${index % 2 === 0 ? 'pr-24' : 'pl-24'}`}
                  >
                    <div className={`p-6 bg-white rounded-xl shadow-sm ${index % 2 === 0 ? 'text-right' : ''}`}>
                      <div className="text-cyan-600 font-semibold">{exp.year}</div>
                      <h3 className="text-xl font-semibold text-slate-900">{exp.role}</h3>
                      <p className="text-slate-600">{exp.company}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">Technical Skills</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: <FiCode />, title: 'Frontend', color: 'bg-cyan-100', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'GraphQL'] },
                  { icon: <FiDatabase />, title: 'Backend', color: 'bg-blue-100', skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'REST'] },
                  { icon: <FiCloud />, title: 'DevOps', color: 'bg-indigo-100', skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'] }
                ].map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className={`${category.color} rounded-xl p-6 backdrop-blur-sm`}
                  >
                    <div className="text-3xl mb-4 text-slate-900">{category.icon}</div>
                    <h3 className="text-xl font-semibold mb-4 text-slate-900">{category.title}</h3>
                    <div className="space-y-2">
                      {category.skills.map((skill) => (
                        <div key={skill} className="flex items-center justify-between p-3 bg-white/80 rounded-lg">
                          <span className="text-slate-700">{skill}</span>
                          <div className="h-2 w-16 bg-slate-100 rounded-full">
                            <div
                              className="h-full bg-cyan-500 rounded-full"
                              style={{ width: `${Math.random() * 40 + 60}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">Featured Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 * item }}
                    className="bg-white rounded-xl p-6 hover:shadow-xl transition-shadow group border border-slate-100"
                  >
                    <div className="h-48 bg-cyan-50 rounded-lg mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-900">Project {item}</h3>
                    <p className="text-slate-600 mb-4">
                      Enterprise application with modern architecture
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'TypeScript', 'Node.js', 'AWS'].map((tech) => (
                        <span key={tech} className="px-3 py-1 text-sm bg-cyan-50 text-cyan-700 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}