'use client';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiCode, FiServer, FiCloud, FiBriefcase, FiStar, FiDatabase } from 'react-icons/fi';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const LoaderParticles = (props) => {
  const ref = useRef();
  // Correct the positions array initialization
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000 * 3), { radius: 2.5 }) // 5000 points × 3 coordinates (x,y,z)
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#6366f1"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const LoaderEffect = () => (
  <div className="absolute inset-0 bg-slate-950">
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <LoaderParticles />
      <OrbitControls autoRotate enableZoom={false} />
    </Canvas>
  </div>
);

const FloatingDodecahedron = () => (
  <Canvas camera={{ position: [0, 0, 5] }}>
    <ambientLight intensity={0.5} />
    <mesh>
      <dodecahedronGeometry args={[1.5]} />
      <meshStandardMaterial
        color="#6366f1"
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.8}
      />
    </mesh>
    <OrbitControls enableZoom={false} autoRotate />
  </Canvas>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  const sendEmail = async () => {
    setSending(true);
    // Email sending logic remains the same
    setSending(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen flex items-center justify-center"
          >
            <LoaderEffect />
            <motion.div
              className="absolute z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="w-64 h-64 relative flex items-center justify-center">
                <div className="absolute inset-0 animate-pulse border-4 border-indigo-500/30 rounded-full" />
                <div className="absolute inset-8 animate-pulse border-4 border-indigo-500/20 rounded-full" />
                <motion.div
                  className="text-6xl font-bold text-indigo-500"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                >
                  ✶
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto px-4 py-12 relative overflow-hidden font-sans"
          >
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center relative">
              <div className="absolute inset-0 overflow-hidden" ref={ref}>
                <motion.div style={{ x }} className="flex gap-4">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-screen h-screen bg-gradient-to-br from-indigo-900/10 to-slate-900/20" />
                  ))}
                </motion.div>
              </div>

              <div className="relative z-10 text-center space-y-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-block relative"
                >
                  <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-indigo-500/30">
                    <FloatingDodecahedron />
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-6xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent"
                >
                  Chirag Kumar
                </motion.h1>

                <motion.p
                  className="text-xl text-indigo-300 flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <FiStar className="text-cyan-400" />
                  Full Stack Engineer
                  <FiStar className="text-cyan-400" />
                </motion.p>

                <motion.div
                  className="flex justify-center gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[
                    { icon: FiGithub, link: 'https://github.com/Chirag-2199' },
                    { icon: FiLinkedin, link: 'https://www.linkedin.com/in/chirgkr/' },
                    { icon: FiMail, link: 'mailto:chiragkumar2199@gmail.com' },
                  ].map(({ icon: Icon, link }, i) => (
                    <motion.a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                      className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors relative group"
                    >
                      <Icon className="w-6 h-6 text-indigo-400" />
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 text-sm">
                        {['GitHub', 'LinkedIn', 'Email'][i]}
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* About Section */}
            <section className="my-48 relative">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="max-w-4xl mx-auto text-center"
              >
                <h2 className="text-4xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    About Me
                  </span>
                  <div className="mt-4 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 w-48 mx-auto" />
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed mb-8">
                  Experienced software developer specializing in building scalable web applications with modern technologies.
                  Focused on creating efficient, maintainable systems with exceptional user experiences.
                </p>

                <div className="grid grid-cols-3 gap-8 mt-12">
                  {['1+ Years', '10+ Projects', '4.9 Rating'].map((stat) => (
                    <motion.div
                      key={stat}
                      whileHover={{ y: -10 }}
                      className="p-6 bg-slate-800/50 rounded-xl border border-indigo-500/20 hover:border-indigo-500/40 backdrop-blur-lg"
                    >
                      <div className="text-2xl font-bold text-cyan-400">{stat}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Experience Section */}
            <section className="my-48 relative">
              <h2 className="text-4xl font-bold mb-16 text-center">
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Experience
                </span>
                <div className="mt-4 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 w-48 mx-auto" />
              </h2>

              <div className="relative max-w-5xl mx-auto">
                <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-indigo-500/30 to-transparent -translate-x-1/2" />

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
                    <div className={`p-8 bg-slate-800/50 rounded-3xl backdrop-blur-lg ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="text-cyan-400 text-xl mb-2">{exp.year}</div>
                      <h3 className="text-2xl font-bold text-indigo-100 mb-2">{exp.role}</h3>
                      <p className="text-indigo-300">{exp.company}</p>
                      <div className={`absolute top-8 ${index % 2 === 0 ? '-left-12' : '-right-12'} w-24 h-24 bg-indigo-400/10 rounded-full backdrop-blur-lg flex items-center justify-center`}>
                        <FiBriefcase className="text-indigo-400 w-8 h-8" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Skills Section */}
            <section className="my-48 grid grid-cols-1 md:grid-cols-3 gap-8">
              <h2 className="text-4xl font-bold mb-16 text-center col-span-full">
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Technical Skills
                </span>
                <div className="mt-4 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 w-48 mx-auto" />
              </h2>

              {[
                { icon: <FiCode />, title: 'Frontend', skills: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'GraphQL'] },
                { icon: <FiDatabase />, title: 'Backend', skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'REST'] },
                { icon: <FiCloud />, title: 'DevOps', skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'] },
              ].map(({ icon, title, skills }) => (
                <motion.div
                  key={title}
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  className="p-8 bg-slate-800/50 rounded-3xl border border-indigo-500/20 hover:border-indigo-500/40 backdrop-blur-lg"
                >
                  <div className="text-indigo-400 text-4xl mb-6">{icon}</div>
                  <h3 className="text-2xl font-bold text-indigo-100 mb-6">{title}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {skills.map((skill) => (
                      <motion.div
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3 p-3 bg-slate-900/30 rounded-lg hover:bg-slate-900/50"
                      >
                        <div className="relative flex items-center justify-center">
                          <div className="absolute w-4 h-4 bg-cyan-400/20 rounded-full animate-ping" />
                          <div className="w-3 h-3 bg-cyan-400 rounded-full" />
                        </div>
                        <span className="text-indigo-100/80 font-medium">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </section>

            {/* Projects Section */}
            <section className="my-48">
              <h2 className="text-4xl font-bold mb-16 text-center">
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Featured Work
                </span>
                <div className="mt-4 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 w-48 mx-auto" />
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((project) => (
                  <motion.div
                    key={project}
                    whileHover={{ y: -10 }}
                    className="relative h-96 bg-slate-800/50 rounded-3xl overflow-hidden group backdrop-blur-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20" />
                    <div className="relative p-8 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="text-indigo-100 text-2xl font-bold">Project {project}</div>
                        <FiArrowUpRight className="text-indigo-400 w-8 h-8 group-hover:rotate-45 transition-transform" />
                      </div>
                      <div className="space-y-4">
                        <p className="text-indigo-200/80">Enterprise application with modern architecture</p>
                        <div className="flex flex-wrap gap-2">
                          {['React', 'Node.js', 'AWS'].map((tech) => (
                            <span key={tech} className="px-3 py-1 text-sm bg-indigo-400/10 text-indigo-400 rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="flex justify-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <button
                  onClick={sendEmail}
                  disabled={sending}
                  className="relative group px-8 py-4 rounded-full overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/30 to-cyan-500/30 opacity-0 group-hover:opacity-100" />
                  <div className="absolute inset-0.5 bg-slate-900 rounded-full" />
                  <div className="relative flex items-center gap-3">
                    <motion.span
                      className="bg-gradient-to-br from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-bold text-lg"
                      animate={sending ? { opacity: 0.5 } : {}}
                    >
                      {sending ? 'Sending...' : 'Send Appreciation'}
                    </motion.span>
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