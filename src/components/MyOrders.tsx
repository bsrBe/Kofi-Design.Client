import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Search, ShoppingBag, ChevronRight } from 'lucide-react';
import { orderService } from '../services/api';

interface OrderCardProps {
    orderId: string;
    title: string;
    price: string;
    status: string;
    date: string;
    image: string;
    onViewDetails: () => void;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const OrderCard = ({ orderId, title, price, status, date, image, onViewDetails }: OrderCardProps) => {
    // Map backend status to UI status
    const isSubmitted = ['form_submitted', 'bill_sent'].includes(status);
    const isInProgress = ['paid', 'in_progress', 'revision_requested'].includes(status);
    const isReady = ['ready', 'delivered'].includes(status);

    const statusLabel = isSubmitted ? 'SUBMITTED' : isInProgress ? 'IN PROGRESS' : isReady ? 'READY' : status.replace('_', ' ').toUpperCase();
    const statusColor = isSubmitted ? 'bg-slate-500' : isInProgress ? 'bg-orange-500' : isReady ? 'bg-emerald-500' : 'bg-slate-700';

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group bg-charcoal/40 border border-white/5 rounded-3xl overflow-hidden hover:border-accent-gold/30 transition-all"
        >
            <div className="relative aspect-[3/4] overflow-hidden">
                {image ? (
                    <img src={image?.startsWith('http') ? image : `${API_URL}/media/${image}`} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                        <ShoppingBag className="size-12 text-white/10" />
                    </div>
                )}
                <div className="absolute top-4 left-4">
                    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold text-white tracking-widest", statusColor)}>
                        {statusLabel}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-bold text-lg truncate pr-4">{title}</h3>
                    <span className="text-accent-gold font-bold whitespace-nowrap">{price}</span>
                </div>
                <div className="flex flex-col gap-1 mb-6">
                    <p className="text-white/40 text-xs font-medium uppercase tracking-widest">{orderId}</p>
                    <p className="text-white/20 text-[10px] font-medium leading-relaxed">
                        {isSubmitted ? `Awaiting Processing • ${date}` :
                            isInProgress ? `In Production • ${date}` :
                                `Completed • ${date}`}
                    </p>
                </div>
                <button
                    onClick={onViewDetails}
                    className="w-full py-4 border border-white/10 rounded-xl text-white/60 text-xs font-bold uppercase tracking-widest hover:bg-white/5 hover:text-white hover:border-white transition-all flex items-center justify-center gap-2"
                >
                    View Order Details
                    <ChevronRight className="size-4" />
                </button>
            </div>
        </motion.div>
    );
};

export const MyOrders = ({ onViewOrder }: { onViewOrder: (id: string) => void }) => {
    const [activeTab, setActiveTab] = useState('all_orders');
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await orderService.getMyOrders();
            setOrders(response.data || []);
        } catch (error) {
            console.error('Failed to fetch my orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const stats = [
        {
            label: 'ACTIVE ORDERS',
            value: orders.filter((o: any) => !['delivered', 'cancelled'].includes(o.status)).length.toString().padStart(2, '0')
        },
        {
            label: 'IN PRODUCTION',
            value: orders.filter((o: any) => ['paid', 'in_progress', 'revision_requested'].includes(o.status)).length.toString().padStart(2, '0'),
            badge: orders.some((o: any) => o.rushMultiplier > 1) ? 'PRIORITY' : undefined
        },
        {
            label: 'READY FOR PICKUP',
            value: orders.filter((o: any) => o.status === 'ready').length.toString().padStart(2, '0'),
            color: 'text-emerald-500'
        },
    ];

    const filteredOrders = orders.filter((o: any) => {
        if (activeTab === 'all_orders') return true;
        if (activeTab === 'submitted') return ['form_submitted', 'bill_sent'].includes(o.status);
        if (activeTab === 'in_progress') return ['paid', 'in_progress', 'revision_requested'].includes(o.status);
        if (activeTab === 'ready') return ['ready'].includes(o.status);
        if (activeTab === 'delivered') return ['delivered', 'completed'].includes(o.status);
        return true;
    });

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                <div className="flex flex-col gap-2">
                    <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight">My Orders</h1>
                    <p className="text-white/40 text-base md:text-lg font-light">Track and manage your bespoke fashion pieces.</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-white/20" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-gold/50 transition-colors"
                        />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-charcoal/40 border border-white/5 p-6 md:p-8 rounded-2xl md:rounded-3xl flex flex-col gap-1 transition-all hover:border-white/10">
                        <div className="flex items-center gap-3">
                            <span className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase">{stat.label}</span>
                            {stat.badge && (
                                <span className="bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded text-[8px] font-bold tracking-widest">{stat.badge}</span>
                            )}
                        </div>
                        <span className={cn("text-4xl md:text-5xl font-bold tracking-tighter", stat.color || "text-white")}>
                            {loading ? '--' : stat.value}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-10">
                <div className="flex items-center justify-between border-b border-white/5 pb-0">
                    <div className="flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-4">
                        {['All Orders', 'Submitted', 'In Progress', 'Ready', 'Delivered'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '_'))}
                                className={cn(
                                    "relative pb-4 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap",
                                    activeTab === tab.toLowerCase().replace(' ', '_') ? "text-primary" : "text-white/40 hover:text-white"
                                )}
                            >
                                {tab}
                                {activeTab === tab.toLowerCase().replace(' ', '_') && (
                                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center p-20">
                        <div className="size-12 border-4 border-accent-gold border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-20 text-center opacity-40">
                        <ShoppingBag className="size-16 mb-6" />
                        <h3 className="text-2xl font-bold text-white uppercase italic tracking-widest">No matching orders</h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredOrders.map((order: any) => (
                            <OrderCard
                                key={order._id}
                                orderId={`#KD-${order._id.substring(order._id.length - 4).toUpperCase()}`}
                                title={order.orderType === 'custom_event_dress' ? 'Event Dress' : order.orderType === 'signature_dress' ? 'Signature Dress' : order.orderType || 'Bespoke Design'}
                                price={order.totalPrice ? `${order.totalPrice} Birr` : 'Quote Pending'}
                                status={order.status}
                                date={new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                image={order.inspirationPhoto}
                                onViewDetails={() => onViewOrder(order._id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
