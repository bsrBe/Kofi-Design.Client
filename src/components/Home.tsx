
import { motion } from 'framer-motion';

export const Hero = ({ onStartOrder }: { onStartOrder: () => void }) => {
    return (
        <section className="w-full max-w-[1440px] px-4 md:px-10 py-6 md:py-12">
            <div className="@container">
                <div className="relative overflow-hidden rounded-xl bg-slate-900 dark:bg-charcoal min-h-[600px] flex flex-col items-center justify-center text-center p-8 border border-white/5 shadow-2xl transition-colors duration-500">
                    {/* Background Gradient & Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-background-dark via-transparent to-transparent z-0"></div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 max-w-3xl flex flex-col items-center gap-8"
                    >
                        <span className="text-accent-gold uppercase tracking-[0.3em] text-xs font-bold animate-pulse">
                            Couture Excellence
                        </span>
                        <h1 className="text-white text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-[-0.033em] gold-glow">
                            Designed for <br />Your Moment
                        </h1>
                        <p className="text-white/80 text-sm md:text-xl font-light max-w-xl leading-relaxed">
                            Bespoke elegance, tailored to your unique silhouette. Experience the pinnacle of custom fashion craftsmanship in our private atelier.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto px-4 sm:px-0">
                            <button
                                onClick={onStartOrder}
                                className="w-full sm:min-w-[200px] cursor-pointer bg-primary text-white py-4 px-8 rounded-lg text-sm md:text-base font-bold tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 uppercase"
                            >
                                Start Your Order
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export const ProcessSection = () => {
    const steps = [
        {
            id: '01',
            title: 'Consultation',
            icon: 'chat_bubble',
            desc: 'A private session at our atelier or virtually to discuss your style, silhouette preferences, and event details.'
        },
        {
            id: '02',
            title: 'Design Sketching',
            icon: 'edit_note',
            desc: 'Our master designers bring your vision to life with artisanal gold-leaf sketches and hand-picked fabric swatches.'
        },
        {
            id: '03',
            title: 'Hand-Crafted Fitting',
            icon: 'content_cut',
            desc: 'Experience precision tailoring. We host multiple fittings to ensure your garment fits like a second skin.'
        }
    ];

    return (
        <section className="w-full max-w-7xl px-4 md:px-10 py-20 mx-auto">
            <div className="flex flex-col gap-16">
                <div className="flex flex-col items-center text-center gap-4">
                    <h2 className="text-accent-gold text-xs font-bold tracking-widest uppercase">The Atelier Process</h2>
                    <h1 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-bold tracking-tight transition-colors duration-500">How It Works</h1>
                    <div className="w-20 h-1 bg-primary rounded-full"></div>
                    <p className="text-slate-500 dark:text-white/60 text-base md:text-lg font-light max-w-2xl mt-4 transition-colors duration-500 px-4">
                        From initial sketch to the final stitch, your vision is our blueprint. Every garment is an artisanal masterpiece.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step) => (
                        <motion.div
                            key={step.id}
                            whileHover={{ scale: 1.02 }}
                            className="group flex flex-col gap-6 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-charcoal/50 p-10 hover:border-accent-gold/30 transition-all hover:bg-slate-50 dark:hover:bg-charcoal shadow-sm dark:shadow-none"
                        >
                            <div className="w-14 h-14 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-black transition-colors duration-500">
                                <span className="material-symbols-outlined !text-3xl">{step.icon}</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 className="text-slate-900 dark:text-white text-xl font-bold transition-colors duration-500">{step.title}</h3>
                                <p className="text-slate-500 dark:text-white/50 text-base leading-relaxed transition-colors duration-500">{step.desc}</p>
                            </div>
                            <div className="mt-auto pt-4 text-accent-gold/40 text-xs font-bold uppercase tracking-widest">
                                Step {step.id}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
