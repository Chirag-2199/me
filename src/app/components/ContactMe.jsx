'use client';
import { useState } from "react";
import { motion } from "framer-motion";
export default function ContactSection() {
    const [messageSent, setMessageSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        const res = await fetch("https://formspree.io/f/mwpoedlz", {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" },
        });

        if (res.ok) {
            setMessageSent(true);
            form.reset();
        } else {
            alert("Something went wrong!");
        }
    };

    return (
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
                    onSubmit={handleSubmit}
                    className="space-y-6 text-left"
                >
                    <div>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="example@gmail.com"
                            className="w-full p-4 bg-slate-800/50 border border-indigo-500/30 rounded-lg focus:outline-none focus:border-cyan-400/50 text-indigo-100"
                        />
                    </div>
                    <div>
                        <textarea
                            name="message"
                            required
                            placeholder="Loved my work? Let me know!"
                            rows="5"
                            className="w-full p-4 bg-slate-800/50 border border-indigo-500/30 rounded-lg focus:outline-none focus:border-cyan-400/50 text-indigo-100"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg font-bold text-slate-950 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                    >
                        Send Message
                    </motion.button>

                    {messageSent && (
                        <p className="text-green-400 text-sm mt-4">
                            ✅ Message sent! I’ll get back to you soon.
                        </p>
                    )}
                </motion.form>
            </div>
        </section>
    );
}