import { Diamond, Instagram } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
    onStartOrder?: () => void;
    onHome?: () => void;
    onMyOrders?: () => void;
    onCollections?: () => void;
    currentView?: string;
}

export const Navbar = ({ onStartOrder, onHome, onMyOrders, onCollections, currentView }: NavbarProps) => {
    return (
        <div className="w-full border-b border-white/10 dark:border-white/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-500">
            <header className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
                <div onClick={onHome} className="flex items-center gap-4 text-accent-gold cursor-pointer">
                    <div className="size-8 text-accent-gold">
                        <Diamond className="w-full h-full fill-current" />
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight uppercase">Kofi's Design</h2>
                </div>

                <nav className="hidden md:flex items-center gap-10">
                    <button
                        onClick={onHome}
                        className={cn(
                            "transition-colors text-sm font-medium",
                            currentView === 'home' ? "text-accent-gold" : "text-slate-600 dark:text-white/70 hover:text-accent-gold"
                        )}
                    >
                        Home
                    </button>
                    <button
                        onClick={onMyOrders}
                        className={cn(
                            "transition-colors text-sm font-medium",
                            currentView === 'my-orders' || currentView === 'order-details' ? "text-accent-gold" : "text-slate-600 dark:text-white/70 hover:text-accent-gold"
                        )}
                    >
                        My Orders
                    </button>
                    <button
                        onClick={onCollections}
                        className={cn(
                            "transition-colors text-sm font-medium",
                            currentView === 'collections' ? "text-accent-gold" : "text-slate-600 dark:text-white/70 hover:text-accent-gold"
                        )}
                    >
                        Collections
                    </button>


                    <button
                        onClick={onStartOrder}
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg text-sm font-bold transition-all transform hover:scale-105"
                    >
                        Start Your Order
                    </button>
                </nav>
            </header>
        </div>
    );
};

export const Footer = () => {
    return (
        <footer className="w-full bg-slate-50 dark:bg-charcoal border-t border-slate-200 dark:border-white/5 py-12 px-6 md:px-10 transition-colors duration-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="flex items-center gap-3 text-accent-gold">
                        <Diamond className="size-5 fill-current" />
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-widest uppercase">Kofi's Design</h2>
                    </div>
                    <p className="text-slate-500 dark:text-white/40 text-sm max-w-xs text-center md:text-left">
                        Refining the art of bespoke tailoring for the modern woman.
                    </p>
                </div>
                <div className="flex gap-10 text-slate-400 dark:text-white/60 text-sm font-medium">
                    {/* Links removed */}
                </div>

                <div className="flex items-center gap-4">
                    <a href="#" className="size-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-white/40 hover:text-accent-gold hover:border-accent-gold transition-all">
                        <Instagram className="size-5" />
                    </a>
                </div>

                <div className="text-center text-slate-300 dark:text-white/20 text-[10px] uppercase tracking-widest mt-4 md:mt-0 font-bold">
                    © 2026 Kofi's Design Atelier. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};
