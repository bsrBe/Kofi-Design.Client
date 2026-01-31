import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { Diamond, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';
import { collectionService } from '../services/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const Collections = ({ onStartOrder }: { onStartOrder: () => void }) => {
    const [collections, setCollections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTag, setActiveTag] = useState('All');

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        setLoading(true);
        try {
            const response = await collectionService.getCollections();
            setCollections(response.data || []);
        } catch (error) {
            console.error('Failed to fetch collections:', error);
        } finally {
            setLoading(false);
        }
    };

    // Extract all unique tags
    const allTags = ['All', ...new Set(collections.flatMap(item => item.tags || []))];

    const filteredCollections = activeTag === 'All'
        ? collections
        : collections.filter(item => item.tags?.includes(activeTag));

    return (
        <div className="w-full bg-background-dark min-h-screen text-white">
            <header className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="flex items-center gap-3 text-accent-gold mb-2">
                        <Diamond className="size-5 fill-current" />
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase">The Atelier Vault</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none uppercase gold-glow">
                        Curated <br /> Collections
                    </h1>
                    <p className="text-white/40 max-w-2xl mx-auto text-lg font-light leading-relaxed mt-4">
                        Explore our seasonal masterpieces, each a testament to artisanal perfection and timeless elegance. Handcrafted in our private atelier.
                    </p>
                </motion.div>
            </header>

            <nav className="max-w-7xl mx-auto px-6 mb-16">
                <div className="flex flex-wrap justify-center items-center gap-4 border-y border-white/5 py-8">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={cn(
                                "px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all border",
                                activeTag === tag
                                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                                    : "bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/30"
                            )}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 pb-24">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-[4/5] bg-charcoal/30 rounded-[40px] animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <AnimatePresence mode="popLayout">
                            {filteredCollections.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group relative bg-charcoal/30 border border-white/5 rounded-[40px] overflow-hidden hover:border-accent-gold/20 transition-all"
                                >
                                    <div className="aspect-[4/5] overflow-hidden relative">
                                        <img
                                            src={item.image?.startsWith('http') ? item.image : `${API_URL}/media/${item.image}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-60" />

                                        <div className="absolute top-8 left-8 flex flex-wrap gap-2">
                                            {item.tags?.map((tag: string) => (
                                                <span key={tag} className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-bold uppercase tracking-widest">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-10 flex flex-col gap-6">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-accent-gold text-[10px] font-bold uppercase tracking-[0.3em]">Masterpiece</span>
                                            <div className="flex justify-between items-end">
                                                <h3 className="text-3xl font-bold tracking-tight">{item.title}</h3>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 pt-4">
                                            <button
                                                onClick={onStartOrder}
                                                className="flex-1 bg-white text-black py-4 px-8 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-accent-gold hover:text-white transition-all flex items-center justify-center gap-3"
                                            >
                                                <ShoppingBag className="size-4" />
                                                Start Your Version
                                            </button>
                                            <button className="size-12 rounded-2xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all group/arrow">
                                                <ArrowRight className="size-5 group-hover/arrow:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                <div className="mt-24 p-16 rounded-[60px] bg-gradient-to-br from-charcoal/50 to-background-dark border border-white/5 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 size-64 bg-primary/10 blur-[120px]" />
                    <div className="relative z-10 flex flex-col items-center gap-8">
                        <div className="size-16 rounded-3xl bg-accent-gold/10 flex items-center justify-center text-accent-gold">
                            <Diamond className="size-8 fill-current" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Need something truly unique?</h2>
                        <p className="text-white/40 max-w-xl text-lg font-light leading-relaxed">
                            While our collections showcase our vision, we thrive on creating entirely new silhouettes specifically for you.
                        </p>
                        <button
                            onClick={onStartOrder}
                            className="bg-primary text-white py-5 px-12 rounded-full text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 flex items-center gap-4"
                        >
                            Begin Bespoke Journey
                            <ChevronRight className="size-5" />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};
