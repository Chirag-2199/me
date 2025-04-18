'use client';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiCode, FiServer, FiCloud, FiBriefcase, FiStar, FiDatabase, FiUsers, FiAward, FiFileText } from 'react-icons/fi';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const LoaderParticles = (props) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000 * 3), { radius: 2.5 })
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

const FloatingIcosahedron = () => (
  <Canvas camera={{ position: [0, 0, 5] }}>
    <ambientLight intensity={0.5} />
    <mesh>
      <icosahedronGeometry args={[1.8]} />
      <meshStandardMaterial
        color="#6366f1"
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.8}
      />
    </mesh>
    <OrbitControls enableZoom={false} autoRotate speed={0.5} />
  </Canvas>
);

const ProjectCard = ({ title, description, technologies, link }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -10 }}
    className="relative h-96 bg-slate-800/50 rounded-3xl overflow-hidden group backdrop-blur-lg block"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20" />
    <div className="relative p-8 h-full flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="text-indigo-100 text-2xl font-bold">{title}</div>
        <FiArrowUpRight className="text-indigo-400 w-8 h-8 group-hover:rotate-45 transition-transform" />
      </div>
      <div className="space-y-4">
        <p className="text-indigo-200/80">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 text-sm bg-indigo-400/10 text-indigo-400 rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.a>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

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
                  <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-indigo-500/30">
                    <FloatingIcosahedron />
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent"
                >
                  Chirag Kumar
                </motion.h1>

                <motion.p
                  className="text-xl md:text-3xl text-indigo-300 flex items-center justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <FiStar className="text-cyan-400 animate-pulse" />
                  <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                    Full Stack Engineer
                  </span>
                  <FiStar className="text-cyan-400 animate-pulse" />
                </motion.p>

                <motion.div
                  className="flex justify-center gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[
                    { icon: FiGithub, link: 'https://github.com/Chirag-2199', label: 'GitHub' },
                    { icon: FiLinkedin, link: 'https://linkedin.com/in/chirgkr', label: 'LinkedIn' },
                    { icon: FiMail, link: 'mailto:chiragkumar2199@gmail.com', label: 'Email' },
                  ].map(({ icon: Icon, link, label }, i) => (
                    <motion.a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                      className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 transition-all relative group"
                    >
                      <Icon className="w-8 h-8 text-indigo-400 group-hover:text-cyan-400 transition-colors" />
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 text-sm font-medium">
                        {label}
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
                className="max-w-6xl mx-auto text-center"
              >
                <h2 className="text-4xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    Digital Craftsman
                  </span>
                  <div className="mt-4 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 w-64 mx-auto" />
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                  Bridging the gap between imagination and implementation. With expertise spanning the entire development stack,
                  I architect solutions that are as robust as they are beautiful. My code tells stories, solves problems, and
                  creates experiences that linger in memory.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  {[
                    { title: 'Development Experience', value: '1+ Years', icon: <FiCode /> },
                    { title: 'Projects Delivered', value: '20+', icon: <FiAward /> },
                    { title: 'Client Satisfaction', value: '100%', icon: <FiUsers /> },
                  ].map((stat) => (
                    <motion.div
                      key={stat.title}
                      whileHover={{ scale: 1.05 }}
                      className="p-8 bg-slate-800/50 rounded-3xl border border-indigo-500/20 hover:border-cyan-500/40 backdrop-blur-lg"
                    >
                      <div className="text-cyan-400 text-4xl mb-4">{stat.icon}</div>
                      <div className="text-3xl font-bold text-indigo-100 mb-2">{stat.value}</div>
                      <div className="text-indigo-300">{stat.title}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Experience Section */}
            <section className="my-48 relative">
              <h2 className="text-4xl font-bold mb-16 text-center">
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Professional Journey
                </span>
                <div className="mt-4 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 w-48 mx-auto" />
              </h2>

              <div className="relative max-w-5xl mx-auto">
                <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-indigo-500/30 to-transparent -translate-x-1/2" />

                {[
                  {
                    year: '2024-Present',
                    role: 'Software Engineer',
                    company: 'Cactus Communications',
                    description: 'Cactus Communications is a global science communication and technology company that helps researchers.'
                  },
                  {
                    year: '2024-2025',
                    role: 'Engineering Advisor',
                    company: 'RevQ',
                    description: 'RevQ is a SaaS platform that helps brands optimize sales and marketing on quick commerce platforms through real-time data insights.'
                  },
                  {
                    year: '2024-2024',
                    role: 'Full Stack Developer Intern',
                    company: 'VerveBridge',
                    description: '​VerveBridge is an Indian EdTech platform offering remote internships, interactive courses, and software services to enhance professional development and connect learners with career opportunities.'
                  },
                ].map((exp, index) => (
                  <motion.div
                    key={exp.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className={`relative mb-16 w-full ${index % 2 === 0 ? 'pr-24' : 'pl-24'}`}
                  >
                    <div className={`p-8 bg-slate-800/50 rounded-3xl border border-indigo-500/20 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="text-cyan-400 text-xl mb-2">{exp.year}</div>
                      <h3 className="text-2xl font-bold text-indigo-100 mb-2">{exp.role}</h3>
                      <p className="text-indigo-300 mb-4">{exp.company}</p>
                      <p className="text-indigo-300/80">{exp.description}</p>
                      <div className={`absolute top-8 ${index % 2 === 0 ? '-left-12' : '-right-12'} w-24 h-24 bg-indigo-400/10 rounded-full backdrop-blur-lg flex items-center justify-center`}>
                        <FiBriefcase className="text-indigo-400 w-8 h-8" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Projects Section */}
            <section className="my-48">
              <h2 className="text-4xl font-bold mb-16 text-center">
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Signature Projects
                </span>
                <div className="mt-4 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 w-48 mx-auto" />
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard
                  title="TradeFlow"
                  description="A comprehensive trading platform with real-time analytics"
                  technologies={['PHP', 'Laravel', 'SQL', 'ORM']}
                  link="https://github.com/Chirag-2199/tradeflow"
                />
                <ProjectCard
                  title="EZ Jobs"
                  description="Job portal with advanced search and filtering capabilities"
                  technologies={['Next JS', 'Node.js', 'Express', 'MongoDB']}
                  link="https://github.com/Chirag-2199/easy-job"
                />
                <ProjectCard
                  title="Crypto Mint"
                  description="A decentralized application for minting and trading NFTs"
                  technologies={['TypeScript', 'Next JS', 'Chart JS',]}
                  link="https://crypto-mint.vercel.app/"
                />
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="my-48">
              <h2 className="text-4xl font-bold mb-16 text-center">
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Client Voices
                </span>
                <div className="mt-4 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 w-48 mx-auto" />
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {[
                  {
                    text: "Chirag transformed our vision into a digital masterpiece. His attention to detail and technical prowess are unmatched.",
                    author: "Karan Chorpa, CTO PrepWithMe"
                  },
                  {
                    text: "The system architecture he designed reduced our operational costs by 40%. Truly exceptional work.",
                    author: "Rishabh Shukla, CEO RevQ India"
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-8 bg-slate-800/50 rounded-3xl border border-indigo-500/20 backdrop-blur-lg"
                  >
                    <FiFileText className="text-cyan-400 w-8 h-8 mb-4" />
                    <p className="text-indigo-200 mb-4">{testimonial.text}</p>
                    <p className="text-indigo-400 font-medium">{testimonial.author}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Assignments Section */}
            <section className="my-48 relative">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="max-w-6xl mx-auto text-center"
              >
                <h2 className="text-4xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    Assignments
                  </span>
                  <div className="mt-4 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 w-64 mx-auto" />
                </h2>

                <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                  A collection of tasks and assignments I've completed to sharpen my skills and demonstrate my capabilities.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                  {[
                    {
                      title: 'Kraftbase Dropbox Clone',
                      description: 'A frontend clone of the Dropbox Brand website built using Next.js, TypeScript, Tailwind CSS, and Framer Motion.',
                      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                      link: 'https://kraftbase-assignment-one.vercel.app/'
                    },
                    {
                      title: 'Lief Clock-In System',
                      description: 'A healthcare web app with geolocation clock-in/out, dashboard, and analytics using Next.js and GraphQL.',
                      technologies: ['Next.js', 'GraphQL', 'Prisma', 'Ant Design'],
                      link: 'https://github.com/Chirag-2199/healthcare-clockin'
                    },
                    {
                      title: 'PDF Merger',
                      description: 'A web app to merge multiple PDF files into one, built with Python.',
                      technologies: ['Python', 'Flask', 'PDF.js'],
                      link: 'https://github.com/Chirag-2199/pdf-merger'
                    },
                    {
                      title: 'Terminal UI',
                      description: 'A terminal-like UI built with React and Tailwind CSS, showcasing my skills in frontend development.',
                      technologies: ['Next.js', 'Python', 'CSS', 'Framer-motion'],
                      link: 'https://github.com/Chirag-2199/Terminal'
                    },
                    {
                      title: 'Student Job Tracker',
                      description: 'A web application for students to track job applications and interviews, built with React and Node.js.',
                      technologies: ['Next.js', 'Node.js', 'MongoDB'],
                      link: 'https://jobe-frontend.vercel.app/'
                    },
                    {
                      title: 'QA Automatation',
                      description: 'A Automation app with C# to automate the process of filling form on a web page .',
                      technologies: ['C#', 'Selenium'],
                      link: 'https://github.com/Chirag-2199/CloudQaAutomation/'
                    },
                    {
                      title: 'Web Scrapper',
                      description: 'A web scrapper built with Python to extract data from websites and store it in a database.',
                      technologies: ['Python', 'BeautifulSoup', 'MongoDB'],
                      link: 'https://github.com/Chirag-2199/WebScraper-For-iliabeauty'
                    },

                    // Add more assignments as needed
                  ].map((assignment) => (
                    <ProjectCard
                      key={assignment.title}
                      title={assignment.title}
                      description={assignment.description}
                      technologies={assignment.technologies}
                      link={assignment.link}
                    />
                  ))}
                </div>
              </motion.div>
            </section>


            {/* Contact Section */}
            <section className="my-48">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    Let's Connect
                  </span>
                  <div className="mt-4 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 w-48 mx-auto" />
                </h2>

                <motion.form
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="space-y-6 text-left"
                >
                  <div>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full p-4 bg-slate-800/50 border border-indigo-500/30 rounded-lg focus:outline-none focus:border-cyan-400/50 text-indigo-100"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your message"
                      rows="5"
                      className="w-full p-4 bg-slate-800/50 border border-indigo-500/30 rounded-lg focus:outline-none focus:border-cyan-400/50 text-indigo-100"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="w-full py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg font-bold text-slate-950 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                  >
                    Send Message
                  </motion.button>
                </motion.form>
              </div>
            </section>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}