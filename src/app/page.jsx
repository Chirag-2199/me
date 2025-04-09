'use client';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiCode, FiServer, FiCloud, FiCpu, FiBriefcase, FiStar, FiDatabase } from 'react-icons/fi';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const LoaderEffect = () => (
  <Canvas className="absolute inset-0">
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={1.5} />
    <mesh>
      <torusKnotGeometry args={[1, 0.4, 128, 32]} />
      <meshStandardMaterial
        color="#d946ef"
        roughness={0.3}
        metalness={0.8}
        transparent
        opacity={0.9}
      />
    </mesh>
    <OrbitControls autoRotate enableZoom={false} autoRotateSpeed={2} />
  </Canvas>
);

const TextReveal = ({ children }) => {
  const letters = Array.from(children);

  return (
    <div className="flex">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{
            opacity: 0,
            y: 100,
            rotate: 40,
            scale: 3,
            textShadow: '0 0 32px rgba(217,70,239,0.8)'
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotate: 0,
            scale: 1,
            textShadow: '0 0 16px rgba(217,70,239,0.2)',
            transition: {
              type: 'spring',
              stiffness: 150,
              damping: 20,
              delay: i * 0.08
            }
          }}
          exit={{
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 }
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
};

export default function Home() {
  const [count, setCount] = useState(0);
  const [sending, setSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  const sendEmail = async () => {
    setSending(true);
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'chiragkr6699@gmail.com',
        cc: 'chiragkumar2199@gmail.com',
        subject: 'Someone Liked your Portfolio!',
        text: 'Hello Chirag, someone liked your portfolio! Check it out at https://chiragkumar.site/',
      }),
    });

    const data = await res.json();
    console.log(data.success ? 'Email sent!' : `Failed: ${data.error}`);
    setSending(false);
  };

  const TechSphere = () => (
    <Canvas camera={{ position: [0, 0, 5] }} className="w-full h-64">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#d946ef"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-orange-900">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-900 to-orange-900 space-y-8"
          >
            <LoaderEffect />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-64 h-64 relative"
            >
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                  <icosahedronGeometry args={[2, 0]} />
                  <meshStandardMaterial
                    color="#14b8a6"
                    roughness={0.1}
                    metalness={0.9}
                    transparent
                    opacity={0.8}
                  />
                </mesh>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
              </Canvas>
            </motion.div>

            <motion.div
              className="text-6xl font-bold bg-gradient-to-r from-teal-400 to-orange-500 bg-clip-text text-transparent"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <TextReveal>CHIRAG KUMAR</TextReveal>
            </motion.div>

            <motion.div
              className="absolute bottom-32 text-teal-300 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1.2 } }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Loading Portfolio...
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto px-4 py-12 relative overflow-hidden"
          >
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center relative">
              <div className="absolute inset-0 overflow-hidden" ref={ref}>
                <motion.div style={{ x }} className="flex gap-4">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-screen h-screen bg-gradient-to-br from-teal-900/20 to-orange-900/20" />
                  ))}
                </motion.div>
              </div>

              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mb-8 inline-block rounded-full p-1 bg-gradient-to-br from-teal-500 to-orange-600"
                >
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-orange-900">
                    <TechSphere />
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-6xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-orange-500 bg-clip-text text-transparent"
                >
                  Chirag Kumar
                </motion.h1>

                <motion.p
                  className="text-xl text-teal-300 mb-6 flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <FiStar className="text-yellow-400" />
                  Full Stack Engineer
                  <FiStar className="text-yellow-400" />
                </motion.p>

                <motion.div
                  className="flex justify-center gap-6 mb-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[
                    {
                      icon: FiGithub,
                      link: 'https://github.com/Chirag-2199',
                      label: 'GitHub'
                    },
                    {
                      icon: FiLinkedin,
                      link: 'https://www.linkedin.com/in/chirgkr/',
                      label: 'LinkedIn'
                    },
                    {
                      icon: FiMail,
                      link: 'mailto:chiragkumar2199@gmail.com',
                      label: 'Email'
                    },
                  ].map(({ icon: Icon, link, label }, i) => (
                    <motion.a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                      className="p-4 rounded-full bg-teal-800 hover:bg-teal-700 transition-colors relative group"
                    >
                      <Icon className="w-6 h-6 text-orange-400" />
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-orange-400 text-sm font-light">
                        {label}
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* About Section */}
            <section className="my-32 relative">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="max-w-4xl mx-auto text-center"
              >
                <h2 className="text-3xl font-bold mb-8 text-cyan-100">
                  About Me
                  <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mt-4 mx-auto" />
                </h2>
                <p className="text-lg text-cyan-200/80 leading-relaxed mb-8">
                  Experienced software developer specializing in building scalable web applications with modern technologies.
                  Focused on creating efficient, maintainable systems with exceptional user experiences.
                </p>

                <div className="grid grid-cols-3 gap-8 mt-12">
                  {['1+ Years', '10+ Projects', '4.9 Rating'].map((stat) => (
                    <motion.div
                      key={stat}
                      whileHover={{ y: -10 }}
                      className="p-6 bg-slate-800 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
                    >
                      <div className="text-2xl font-bold text-cyan-400">{stat}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Experience Section */}
            <section className="my-32 relative">
              <h2 className="text-3xl font-bold mb-16 text-center text-cyan-100">
                Experience
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mt-4 mx-auto" />
              </h2>

              <div className="relative max-w-5xl mx-auto">
                <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-cyan-500/30 to-transparent -translate-x-1/2" />

                {[
                  { year: '2024-Present', role: 'Software Developer Intern', company: 'Cactus Communications' },
                  { year: '2024', role: 'Software Developer Intern', company: 'VerveBridge' },
                ].map((exp, index) => (
                  <motion.div
                    key={exp.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className={`relative mb-16 w-full ${index % 2 === 0 ? 'pr-24' : 'pl-24'}`}
                  >
                    <div className={`p-8 bg-slate-800 rounded-3xl ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="text-cyan-400 text-xl mb-2">{exp.year}</div>
                      <h3 className="text-2xl font-bold text-cyan-100 mb-2">{exp.role}</h3>
                      <p className="text-cyan-400/80">{exp.company}</p>
                      <div className={`absolute top-8 ${index % 2 === 0 ? '-left-12' : '-right-12'} w-24 h-24 bg-cyan-400/10 rounded-full backdrop-blur-lg flex items-center justify-center`}>
                        <FiBriefcase className="text-cyan-400 w-8 h-8" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Skills Section */}
            <section className="my-32 grid grid-cols-1 md:grid-cols-3 gap-8">
              <h2 className="text-3xl font-bold mb-16 text-center text-cyan-100 col-span-full">
                Technical Skills
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mt-4 mx-auto" />
              </h2>

              {[
                {
                  icon: <FiCode />,
                  title: 'Frontend',
                  color: 'cyan',
                  skills: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'GraphQL']
                },
                {
                  icon: <FiDatabase />,
                  title: 'Backend',
                  color: 'blue',
                  skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'REST']
                },
                {
                  icon: <FiCloud />,
                  title: 'DevOps',
                  color: 'purple',
                  skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform']
                },
              ].map(({ icon, title, color, skills }) => (
                <motion.div
                  key={title}
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  className={`p-8 bg-slate-800 rounded-3xl border-2 border-${color}-400/20 hover:border-${color}-400/40 transition-colors group relative overflow-hidden`}
                >
                  <div className={`mb-6 text-${color}-400 text-4xl`}>{icon}</div>
                  <h3 className="text-2xl font-bold text-cyan-100 mb-6">{title}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {skills.map((skill) => (
                      <motion.div
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3 p-3 bg-slate-900/30 rounded-lg hover:bg-slate-900/50 transition-colors"
                      >
                        <div className={`relative flex items-center justify-center`}>
                          <div className={`absolute w-4 h-4 bg-${color}-400/20 rounded-full animate-ping`} />
                          <div className={`w-3 h-3 bg-${color}-400 rounded-full`} />
                        </div>
                        <span className="text-cyan-100/80 font-medium">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </section>

            {/* Projects Section */}
            <section className="my-32">
              <h2 className="text-3xl font-bold mb-16 text-center text-cyan-100">
                Featured Work
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mt-4 mx-auto" />
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((project) => (
                  <motion.div
                    key={project}
                    whileHover={{ y: -10 }}
                    className="relative h-96 bg-slate-800 rounded-3xl overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/20" />
                    <div className="relative p-8 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="text-cyan-100 text-2xl font-bold">Project {project}</div>
                        <FiArrowUpRight className="text-cyan-400 w-8 h-8 group-hover:rotate-45 transition-transform" />
                      </div>
                      <div className="space-y-4">
                        <p className="text-cyan-200/80">Enterprise application with modern architecture</p>
                        <div className="flex flex-wrap gap-2">
                          {['React', 'Node.js', 'AWS'].map((tech) => (
                            <span key={tech} className="px-3 py-1 text-sm bg-cyan-400/10 text-cyan-400 rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Styled Email Button */}
              <motion.div
                className="flex justify-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={sendEmail}
                  disabled={sending}
                  className="relative group px-8 py-4 rounded-full overflow-hidden transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0.5 bg-slate-900 rounded-full" />
                  <div className="relative flex items-center gap-3">
                    <motion.span
                      className="bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent font-bold text-lg"
                      animate={sending ? { opacity: 0.5 } : {}}
                    >
                      {sending ? (
                        'Sending Appreciation...'
                      ) : (
                        <>
                          <FiStar className="inline-block mr-2" />
                          Love My Work? Send Appreciation
                          <FiStar className="inline-block ml-2" />
                        </>
                      )}
                    </motion.span>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 text-sm font-light whitespace-nowrap">
                    Let Chirag know you liked this portfolio!
                  </div>
                </button>
              </motion.div>
            </section>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}