import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { ChevronLeft, CreditCard, CheckCircle2, Clock, ShoppingBag, Info } from 'lucide-react';
import { orderService } from '../services/api';

interface OrderDetailsProps {
    orderId: string;
    onBack: () => void;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const OrderDetails = ({ orderId, onBack }: OrderDetailsProps) => {
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    const fetchOrder = async () => {
        setLoading(true);
        try {
            const response = await orderService.getOrderById(orderId);
            setOrder(response.data);
        } catch (error) {
            console.error('Failed to fetch order details:', error);
        } finally {
            setLoading(false);
        }
    };

    const getTimeline = (order: any) => {
        const base = [
            { label: 'Submitted', date: new Date(order?.createdAt).toLocaleDateString(), desc: 'Order request received.', status: 'completed' },
        ];

        const isQuoteSent = order?.quote?.sentAt || ['bill_sent', 'paid', 'in_progress', 'ready', 'delivered', 'revision_requested'].includes(order?.status);
        if (isQuoteSent) {
            base.push({ label: 'Quote Sent', date: order.quote?.sentAt ? new Date(order.quote.sentAt).toLocaleDateString() : 'Sent', desc: 'Pricing and timeline provided.', status: 'completed' });
        } else {
            base.push({ label: 'Awaiting Quote', date: 'TBD', desc: 'Designer is reviewing your specifications.', status: 'current' });
        }

        const isDepositPaid = ['paid', 'in_progress', 'ready', 'delivered', 'revision_requested'].includes(order?.status);
        if (isDepositPaid) {
            base.push({ label: 'Deposit Paid', date: 'Confirmed', desc: 'Commitment payment received.', status: 'completed' });
        } else if (isQuoteSent) {
            base.push({ label: 'Deposit Pending', date: 'Action Required', desc: 'Please pay the deposit to begin production.', status: 'current' });
        }

        const isInProduction = ['in_progress', 'revision_requested', 'ready', 'delivered'].includes(order?.status);
        if (isInProduction) {
            base.push({
                label: 'In Production',
                date: 'In Progress',
                desc: 'Our atelier is hand-crafting your garment.',
                status: ['ready', 'delivered'].includes(order?.status) ? 'completed' : 'current'
            });
        }

        const isReady = ['ready', 'delivered'].includes(order?.status);
        if (isReady) {
            const isDelivered = order?.status === 'delivered';
            base.push({
                label: isDelivered ? 'Delivered' : 'Ready!',
                date: isDelivered ? 'Completed' : 'Awaiting Pickup',
                desc: isDelivered ? 'Item has been picked up/delivered.' : 'Your masterpiece is ready for its final fitting.',
                status: 'completed'
            });
        }

        return base;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-40">
                <div className="size-16 border-4 border-accent-gold border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
                <Info className="size-16 text-white/10" />
                <h2 className="text-3xl font-bold text-white uppercase italic">Order Not Found</h2>
                <button onClick={onBack} className="text-accent-gold underline">Back to Portal</button>
            </div>
        );
    }

    const timeline = getTimeline(order);
    const totalPrice = order.totalPrice || 0;
    const depositPaid = order.isDepositPaid ? (order.depositAmount || 0) : 0;

    // Logic: Unpaid is Total - Deposit. However, if Delivered/Completed, assume fully paid (0).
    const isCompleted = ['delivered', 'completed'].includes(order.status);
    const unpaidAmount = isCompleted ? 0 : (totalPrice - depositPaid);

    return (
        <div className="w-full bg-background-dark min-h-screen animate-in fade-in duration-700">
            <div className="w-full border-b border-white/5 bg-charcoal/30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-all">
                            <ChevronLeft className="size-5" />
                            <span className="text-xs font-bold uppercase tracking-widest">Back to Portal</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase",
                                order.isRush ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-white/5 text-white/40"
                            )}>
                                {order.isRush ? 'Priority Production' : 'Standard Production'}
                            </span>
                        </div>
                        <h1 className="text-white text-3xl md:text-6xl font-bold tracking-tight px-0">Order #KD-{order._id.substring(order._id.length - 4).toUpperCase()}</h1>
                        <p className="text-white/40 text-base md:text-xl font-light">{order.orderType === 'custom_event_dress' ? 'Event Dress' : order.orderType === 'signature_dress' ? 'Signature Dress' : order.orderType} • <span className="text-white">{order.clientProfile?.fullName}</span></p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {order.status === 'bill_sent' && (
                            <button className="flex-1 md:flex-none py-4 px-8 bg-primary rounded-xl text-white font-bold text-sm flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                                <CreditCard className="size-5" />
                                Pay Deposit
                            </button>
                        )}
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
                    <div className="lg:col-span-4 bg-charcoal/30 border border-white/5 rounded-3xl md:rounded-[40px] p-6 md:p-10 h-fit backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <Clock className="size-5" />
                            </div>
                            <h3 className="text-white font-bold text-2xl">Timeline</h3>
                        </div>

                        <div className="flex flex-col gap-10 relative">
                            <div className="absolute left-[15px] top-2 bottom-0 w-0.5 bg-white/5" />
                            {timeline.map((item, i) => (
                                <div key={i} className="flex gap-6 relative">
                                    <div className={cn(
                                        "z-10 size-8 rounded-full flex items-center justify-center border-2 shrink-0",
                                        item.status === 'completed' ? "bg-red-500 border-red-500 text-white" :
                                            item.status === 'current' ? "bg-charcoal border-red-500 text-red-500 animate-pulse" :
                                                "bg-charcoal border-white/10 text-white/10"
                                    )}>
                                        {item.status === 'completed' ? <CheckCircle2 className="size-4" /> :
                                            item.status === 'current' ? <div className="size-2 rounded-full bg-red-500" /> :
                                                <div className="size-2 rounded-full bg-white/10" />}
                                    </div>
                                    <div className="flex flex-col gap-1 pt-1">
                                        <h4 className={cn("font-bold text-lg", item.status === 'pending' ? "text-white/20" : "text-white")}>{item.label}</h4>
                                        <p className={cn("text-xs font-bold uppercase tracking-widest", item.status === 'current' ? "text-red-500" : "text-white/40")}>{item.date}</p>
                                        {item.desc && <p className="text-sm text-white/20 mt-2 font-medium leading-relaxed">{item.desc}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-8 flex flex-col gap-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-charcoal/30 border border-white/5 rounded-3xl p-8 group overflow-hidden relative">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Status Monitor</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-white text-4xl font-bold tracking-tight uppercase italic">{order.status.replace(/_/g, ' ')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-charcoal/30 border border-white/5 rounded-3xl p-8">
                                <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-6">Financial Overview</h3>
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-white/20 font-medium">Total Contract</span>
                                        <span className="text-white font-bold">{totalPrice ? `${totalPrice.toLocaleString()} Birr` : 'PENDING'}</span>
                                    </div>
                                    <div className="h-px bg-white/5 my-2" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Unpaid Amount</span>
                                        <span className="text-white text-4xl font-bold tracking-tight">{unpaidAmount > 0 ? `${unpaidAmount.toLocaleString()} Birr` : '0 Birr'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-charcoal/30 border border-white/5 rounded-3xl md:rounded-[40px] p-6 md:p-10">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="size-8 md:size-10 rounded-xl md:rounded-2xl bg-accent-gold/10 flex items-center justify-center text-accent-gold">
                                        <ShoppingBag className="size-4 md:size-5" />
                                    </div>
                                    <h3 className="text-white font-bold text-xl md:text-2xl">Garment Specification</h3>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="flex flex-col gap-8">
                                    <div className="flex flex-col gap-4">
                                        <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Measurement Profile (Captured)</span>
                                        <div className="grid grid-cols-2 gap-2">
                                            {order.measurements && Object.entries(order.measurements).map(([key, val]: any) => (
                                                <div key={key} className="bg-white/5 border border-white/10 rounded-xl p-3 flex justify-between items-center">
                                                    <span className="text-white/20 text-[8px] font-bold uppercase tracking-widest">{key}</span>
                                                    <span className="text-white font-bold text-xs">{val}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {order.inspirationPhoto && (
                                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group border border-white/10">
                                        <img src={order.inspirationPhoto?.startsWith('http') ? order.inspirationPhoto : `${API_URL}/media/${order.inspirationFileId || order.inspirationPhoto}`} alt="Garment Sketch" className="w-full h-full object-cover" />
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
                                            <p className="text-white/40 text-[10px] font-bold italic">User Inspiration Upload</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
