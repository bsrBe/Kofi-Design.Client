import { Instagram, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

interface NavbarProps {
    onStartOrder?: () => void;
    onHome?: () => void;
    onMyOrders?: () => void;
    onCollections?: () => void;
    currentView?: string;
}

const Logo = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
            fill="currentColor"
        />
    </svg>
);

export const Navbar = ({ onStartOrder, onHome, onMyOrders, onCollections, currentView }: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'Home', action: onHome },
        { id: 'my-orders', label: 'My Orders', action: onMyOrders },
        { id: 'collections', label: 'Collections', action: onCollections },
    ];

    const handleAction = (action?: () => void) => {
        if (action) action();
        setIsMenuOpen(false);
    };

    return (
        <div className="w-full border-b border-white/10 dark:border-white/10 bg-white dark:bg-[#0a0a0c] sticky top-0 z-50 transition-colors duration-500">
            <header className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
                <div onClick={() => handleAction(onHome)} className="flex items-center gap-3 md:gap-4 text-accent-gold cursor-pointer">
                    <div className="size-6 md:size-8 text-accent-gold flex-shrink-0">
                        <Logo className="w-full h-full" />
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-base md:text-xl font-bold tracking-tight uppercase whitespace-nowrap">Kofi's Design</h2>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={item.action}
                            className={cn(
                                "transition-colors text-sm font-medium",
                                currentView === item.id || (item.id === 'my-orders' && currentView === 'order-details') ? "text-accent-gold" : "text-slate-600 dark:text-white/70 hover:text-accent-gold"
                            )}
                        >
                            {item.label}
                        </button>
                    ))}

                    <button
                        onClick={onStartOrder}
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg text-sm font-bold transition-all transform hover:scale-105"
                    >
                        Start Your Order
                    </button>
                </nav>

                {/* Mobile Icons */}
                <div className="flex md:hidden items-center gap-4">
                    <button
                        onClick={onStartOrder}
                        className="bg-primary text-white p-2 rounded-lg text-[10px] font-bold uppercase tracking-widest px-3"
                    >
                        Order
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-900 dark:text-white">
                        {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-0 bg-[#0a0a0c] opacity-100 z-[60] flex flex-col pt-24 px-8 gap-8 transition-transform duration-500 md:hidden",
                isMenuOpen ? "translate-x-0" : "translate-x-full"
            )}>
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-6 right-6 text-white p-2"
                >
                    <X className="size-8" />
                </button>

                <div className="flex flex-col gap-8 mt-10">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleAction(item.action)}
                            className={cn(
                                "text-4xl font-bold text-left tracking-tighter transition-colors",
                                currentView === item.id ? "text-primary" : "text-white"
                            )}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="mt-auto pb-12 flex flex-col gap-6 border-t border-white/10 pt-8">
                    <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em]">Contact Atelier</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="size-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-accent-gold">
                            <Instagram className="size-6" />
                        </a>
                    </div>
                    <button
                        onClick={() => handleAction(onStartOrder)}
                        className="w-full bg-primary text-white py-5 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 uppercase tracking-widest"
                    >
                        Start Custom Order
                    </button>
                </div>

                <div className="absolute top-6 left-6" onClick={() => setIsMenuOpen(false)}>
                    <div className="flex items-center gap-3 text-accent-gold">
                        <Logo className="size-5" />
                        <h2 className="text-white text-sm font-bold tracking-widest uppercase">Kofi's Design</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Footer = () => {
    return (
        <footer className="w-full bg-slate-50 dark:bg-charcoal border-t border-slate-200 dark:border-white/5 py-12 px-6 md:px-10 transition-colors duration-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="flex items-center gap-3 text-accent-gold">
                        <Logo className="size-5" />
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-widest uppercase">Kofi's Design</h2>
                    </div>
                    <p className="text-slate-500 dark:text-white/40 text-sm max-w-xs text-center md:text-left">
                        Refining the art of bespoke tailoring for the modern woman.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <a href="#" className="size-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-white/40 hover:text-accent-gold hover:border-accent-gold transition-all">
                        <Instagram className="size-5" />
                    </a>
                </div>

                <div className="text-center text-slate-300 dark:text-white/20 text-[10px] uppercase tracking-widest font-bold">
                    © 2026 Kofi's Design Atelier. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};
