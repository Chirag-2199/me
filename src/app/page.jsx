'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiBriefcase, FiGithub, FiLinkedin, FiMail, FiCode, FiDatabase, FiCloud, FiArrowRight, FiStar } from 'react-icons/fi';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);



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
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                    initial={{ x: -100 }}
                    animate={{ x: 100 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'mirror'
                    }}
                  />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-5xl font-bold mb-4 text-slate-900 bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600"
                style={{ WebkitTextFillColor: 'transparent' }}
              >
                Chirag Kumar
              </motion.h1>
              <motion.p className="text-xl text-slate-600 mb-6 flex items-center justify-center gap-2">
                <FiStar className="text-amber-400" />
                Full Stack Engineer
                <FiStar className="text-amber-400" />
              </motion.p>

              <div className="flex justify-center gap-4 mb-12">
                {[FiGithub, FiLinkedin, FiMail].map((Icon, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-lg bg-white text-slate-700 hover:bg-cyan-100 transition-colors shadow-sm relative overflow-hidden group"
                  >
                    <Icon className="w-6 h-6 relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* About Section */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="mb-20 text-center bg-white rounded-2xl p-8 shadow-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('/subtle-pattern.svg')] opacity-10" />
              <h2 className="text-3xl font-bold mb-8 text-slate-900 relative">
                About Me
                <motion.div
                  className="absolute bottom-0 left-1/2 w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </h2>
              <div className="max-w-3xl mx-auto text-slate-600 space-y-6 relative">
                <p className="text-lg leading-relaxed">
                  Experienced software developer specializing in building <span className="font-semibold text-cyan-600">scalable web applications</span> with modern technologies. Focused on creating <span className="font-semibold text-blue-600">efficient, maintainable systems</span> with exceptional user experiences.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {['1+ Years', '10+ Projects', '4.9 Rating'].map((stat) => (
                    <motion.div
                      key={stat}
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      className="p-4 bg-cyan-50 rounded-xl border border-cyan-100 hover:bg-cyan-100 transition-colors cursor-default"
                      whileHover={{ y: -5 }}
                    >
                      <div className="text-2xl font-bold text-cyan-600">{stat}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Experience Section */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">
                Experience
                <motion.div
                  className="mx-auto mt-2 w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </h2>
              <div className="relative max-w-5xl mx-auto">
                <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600 transform -translate-x-1/2" />
                {[
                  { year: '2024-Present', role: 'Software Developer Intern', company: 'Cactus Communication' },
                  { year: '2024', role: 'Software Developer Intern', company: 'VerveBridge' },
                ].map((exp, index) => (
                  <motion.div
                    key={exp.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`relative mb-8 w-full ${index % 2 === 0 ? 'pr-24' : 'pl-24'}`}
                  >
                    <div className={`p-6 bg-white rounded-xl shadow-lg group hover:shadow-xl transition-shadow ${index % 2 === 0 ? 'text-right' : ''}`}>
                      <div className="text-cyan-600 font-semibold mb-2">{exp.year}</div>
                      <h3 className="text-xl font-semibold text-slate-900">{exp.role}</h3>
                      <p className="text-slate-600">{exp.company}</p>
                      <motion.div
                        className={`absolute top-4 ${index % 2 === 0 ? '-left-8' : '-right-8'} w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                      >
                        <FiBriefcase className="text-cyan-600 w-6 h-6" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Technical Skills Section */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">
                Technical Skills
                <motion.div
                  className="mx-auto mt-2 w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                  {
                    icon: <FiCode className="w-8 h-8" />,
                    title: 'Frontend',
                    color: 'from-cyan-500 to-blue-500',
                    skills: [
                      { name: 'React', level: 90 },
                      { name: 'TypeScript', level: 85 },
                      { name: 'Next.js', level: 88 },
                      { name: 'Tailwind', level: 95 },
                      { name: 'GraphQL', level: 80 }
                    ]
                  },
                  {
                    icon: <FiDatabase className="w-8 h-8" />,
                    title: 'Backend',
                    color: 'from-purple-500 to-pink-500',
                    skills: [
                      { name: 'Node.js', level: 88 },
                      { name: 'Python', level: 82 },
                      { name: 'PostgreSQL', level: 85 },
                      { name: 'Redis', level: 78 },
                      { name: 'REST', level: 90 }
                    ]
                  },
                  {
                    icon: <FiCloud className="w-8 h-8" />,
                    title: 'DevOps',
                    color: 'from-orange-500 to-red-500',
                    skills: [
                      { name: 'AWS', level: 83 },
                      { name: 'Docker', level: 85 },
                      { name: 'Kubernetes', level: 75 },
                      { name: 'CI/CD', level: 88 },
                      { name: 'Terraform', level: 72 }
                    ]
                  }
                ].map((category) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-shadow group"
                  >
                    <motion.div
                      className={`mb-6 p-4 w-fit rounded-xl bg-gradient-to-br ${category.color} shadow-md`}
                      whileHover={{ rotate: 15 }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-6 text-slate-900">{category.title}</h3>
                    <div className="space-y-4">
                      {category.skills.map((skill) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="group relative"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-700 font-medium">{skill.name}</span>
                            <span className="text-sm text-slate-500">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
                            <motion.div
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className={`h-full transform origin-left ${category.color.split(' ')[0].replace('from-', 'bg-')} relative`}
                              style={{ width: `${skill.level}%` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent w-1/2" />
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Featured Work Section */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">
                Featured Work
                <motion.div
                  className="mx-auto mt-2 w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    transition={{ duration: 0.4 }}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
                    onHoverStart={() => setHoveredProject(item)}
                    onHoverEnd={() => setHoveredProject(null)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: hoveredProject === item ? 1.1 : 1 }}
                        className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600"
                      >
                        <div className="absolute inset-0 bg-[url('/project-pattern.svg')] opacity-20" />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-bold mb-2">Project {item}</h3>
                        <p className="text-sm opacity-90">Enterprise application with modern architecture</p>
                      </div>
                      <motion.div
                        className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <FiStar className="w-5 h-5 text-amber-400" />
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {['React', 'TypeScript', 'Node.js', 'AWS'].map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.1 }}
                            className="px-3 py-1 text-sm bg-cyan-50 text-cyan-700 rounded-full cursor-default shadow-inner"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      <motion.div
                        whileHover={{ x: 10 }}
                        className="flex items-center text-cyan-600 font-medium cursor-pointer w-fit"
                      >
                        View Project
                        <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </motion.div>
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