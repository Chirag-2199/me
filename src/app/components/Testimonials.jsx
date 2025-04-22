import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiFileText } from 'react-icons/fi';

export default function Testimonials() {
    const testimonials = [
        {
            text: "Chirag transformed our vision into a digital masterpiece. His attention to detail and technical prowess are unmatched.",
            author: "Karan Chorpa, CTO PrepWithMe"
        },
        {
            text: "The system architecture he designed reduced our operational costs by 40%. Truly exceptional work.",
            author: "Rishabh Shukla, CEO RevQ India"
        },
        {
            text: "We saw a significant increase in user engagement thanks to Chirag’s innovative UI/UX designs.",
            author: "Anjali Verma, Product Manager"
        },
        {
            text: "His expertise in React.js and full-stack development is top-notch. Highly recommend for any project.",
            author: "Amit Kumar, Lead Developer"
        },
        {
            text: "Chirag’s work helped us improve team productivity by 30%, making him an invaluable asset to our project.",
            author: "Priya Gupta, Project Lead"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex(prev => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="my-48">
            <h2 className="text-4xl font-bold mb-16 text-center">
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    Client Voices
                </span>
                <div className="mt-4 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 w-48 mx-auto" />
            </h2>

            <div className="relative max-w-6xl mx-auto overflow-hidden h-96">
                <AnimatePresence mode='popLayout' custom={direction}>
                    <motion.div
                        key={currentIndex}
                        className="absolute flex gap-8 w-full px-4"
                        custom={direction}
                        initial={{ x: direction === 1 ? '100%' : '-100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction === 1 ? '-100%' : '100%', opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                        {[...Array(2)].map((_, index) => {
                            const testimonial = testimonials[
                                (currentIndex + index) % testimonials.length
                            ];
                            return (
                                <div
                                    key={testimonial.author}
                                    className="p-8 bg-slate-800/50 rounded-3xl border border-indigo-500/20 backdrop-blur-lg w-[55%]"
                                >
                                    <FiFileText className="text-cyan-400 w-8 h-8 mb-4" />
                                    <p className="text-indigo-200 mb-4 text-lg">{testimonial.text}</p>
                                    <p className="text-indigo-400 font-medium">{testimonial.author}</p>
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}