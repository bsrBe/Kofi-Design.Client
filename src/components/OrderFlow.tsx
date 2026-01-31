import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { orderService } from '../services/api';
import bustGuide from '../assets/bust-guide.png';
import waistGuide from '../assets/waist-guide.png';
import hipsGuide from '../assets/hips-guide.png';
import shoulderGuide from '../assets/shoulder-guide.png';
import dressLengthGuide from '../assets/dress-length-guide.png';
import armLengthGuide from '../assets/arm-length-guide.png';
import heightGuide from '../assets/height-guide.png';

interface OrderFormState {
    fullName: string;
    phoneNumber: string;
    city: string;
    instagramHandle?: string;
    orderType: 'custom_event_dress' | 'signature_dress';
    occasion: 'wedding' | 'party' | 'graduation' | 'other';
    fabricPreference: string;
    eventDate: string;
    preferredDeliveryDate: string;
    measurements: {
        bust: number;
        waist: number;
        hips: number;
        shoulderWidth: number;
        dressLength: number;
        armLength: number;
        height: number;
    };
    bodyConcerns: string;
    colorPreference: string;
    termsAccepted: boolean;
    revisionPolicyAccepted: boolean;
    agreedToTerms: boolean;
}

export const OrderFlow = ({ onBack }: { onBack: () => void }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inspirationPhoto, setInspirationPhoto] = useState<File | null>(null);
    const [formData, setFormData] = useState<Partial<OrderFormState>>(() => {
        const saved = localStorage.getItem('kofi_order_form');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse saved form data', e);
            }
        }
        return {
            orderType: 'custom_event_dress',
            occasion: 'wedding',
            measurements: {
                bust: 0,
                waist: 0,
                hips: 0,
                shoulderWidth: 0,
                dressLength: 0,
                armLength: 0,
                height: 0,
            }
        };
    });


    const [returningProfile, setReturningProfile] = useState<any>(null); // Store fetched profile
    const [useReturnedProfile, setUseReturnedProfile] = useState(false);

    useEffect(() => {
        // Fetch profile from backend
        const fetchProfile = async () => {
            try {
                // @ts-ignore
                const { userService } = await import('../services/api');
                const data = await userService.getProfile();
                if (data && data.profile) {
                    setReturningProfile(data.profile);
                    setUseReturnedProfile(true);
                    updateFormData(data.profile);

                    // Auto-skip to Step 2 if we're on Step 1
                    setStep(prev => prev === 1 ? 2 : prev);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        localStorage.setItem('kofi_order_form', JSON.stringify(formData));
    }, [formData]);


    const nextStep = () => setStep(s => Math.min(s + 1, 6));
    const prevStep = () => {
        if (step === 1) {
            onBack();
        } else {
            setStep(s => Math.max(s - 1, 1));
        }
    };

    const updateFormData = (data: Partial<OrderFormState>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const [showSuccess, setShowSuccess] = useState(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        setSubmissionError(null);
        try {
            const payload = {
                fullName: formData.fullName || '',
                phoneNumber: formData.phoneNumber || '',
                city: formData.city || '',
                instagramHandle: formData.instagramHandle || '',
                orderType: formData.orderType || 'custom_event_dress',
                occasion: formData.occasion || 'wedding',
                fabricPreference: formData.fabricPreference || '',
                eventDate: formData.eventDate || '',
                preferredDeliveryDate: formData.preferredDeliveryDate || '',
                measurements: formData.measurements as any,
                bodyConcerns: formData.bodyConcerns || '',
                colorPreference: formData.colorPreference || '',
                termsAccepted: formData.agreedToTerms || false,
                revisionPolicyAccepted: formData.agreedToTerms || false, // Use terms as proxy for simplicity in prototype
            };

            await orderService.createOrder(payload as any, inspirationPhoto || undefined);
            localStorage.removeItem('kofi_order_form');
            setShowSuccess(true);
        } catch (error: any) {
            console.error('Submission failed:', error);
            const message = error.response?.data?.message || error.response?.data?.error || 'Failed to submit order. Please check your connection or try again later.';
            setSubmissionError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    {step === 1 && (
                        <ProfileStep
                            data={formData}
                            update={updateFormData}
                            onNext={nextStep}
                            onBack={onBack}
                            returningProfile={returningProfile}
                            useReturnedProfile={useReturnedProfile}
                            setUseReturnedProfile={setUseReturnedProfile}
                        />
                    )}
                    {step === 2 && (
                        <DesignStep
                            data={formData}
                            update={updateFormData}
                            onNext={nextStep}
                            onBack={prevStep}
                        />
                    )}
                    {step === 3 && (
                        <TimelineStep
                            data={formData}
                            update={updateFormData}
                            onNext={nextStep}
                            onBack={prevStep}
                        />
                    )}
                    {step === 4 && (
                        <MeasurementStep
                            data={formData}
                            update={updateFormData}
                            onNext={nextStep}
                            onBack={prevStep}
                        />
                    )}
                    {step === 5 && (
                        <InspirationStep
                            data={formData}
                            photo={inspirationPhoto}
                            setPhoto={setInspirationPhoto}
                            update={updateFormData}
                            onNext={nextStep}
                            onBack={prevStep}
                        />
                    )}
                    {step === 6 && (
                        <ReviewStep
                            data={formData}
                            isSubmitting={isSubmitting}
                            update={updateFormData}
                            onSubmit={handleSubmit}
                            onBack={prevStep}
                            error={submissionError}
                        />
                    )}
                </motion.div>
            </AnimatePresence>

            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="w-full max-w-md bg-gradient-to-br from-[#1c1c1c] to-[#121212] border border-white/10 rounded-[2.5rem] p-12 text-center shadow-2xl relative overflow-hidden"
                        >
                            {/* Decorative blur */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/20 blur-[100px] pointer-events-none" />

                            <div className="relative z-10 flex flex-col items-center gap-8">
                                <div className="size-24 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-2 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                                    <CheckCircle2 className="size-12" />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h2 className="text-white text-4xl font-bold tracking-tight">Masterpiece Initiated</h2>
                                    <p className="text-white/40 text-lg font-light leading-relaxed">
                                        Your order has been successfully submitted. Our artisans will review your request and contact you shortly.
                                    </p>
                                </div>

                                <button
                                    onClick={onBack}
                                    className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/20 group"
                                >
                                    Return to Home
                                    <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ProfileStep = ({ data, update, onNext, onBack, returningProfile, useReturnedProfile, setUseReturnedProfile }: any) => {

    if (useReturnedProfile && returningProfile) {
        return (
            <div className="flex flex-col items-center justify-center gap-12 py-12">
                <div className="text-center flex flex-col gap-4 px-6 md:px-0">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">Welcome Back</span>
                    <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight px-4 md:px-0">Nice to see you again, {returningProfile.fullName.split(' ')[0]}</h1>
                    <p className="text-white/40 text-sm md:text-lg font-light max-w-md mx-auto">We've loaded your profile details to save you time. Would you like to use them for this order?</p>
                </div>

                <div className="bg-[#1c1c1c] border border-white/5 rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 w-full max-w-md flex flex-col gap-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                        <div className="size-12 md:size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl md:text-2xl font-bold">
                            {returningProfile.fullName.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-white font-bold text-base md:text-lg">{returningProfile.fullName}</h3>
                            <p className="text-white/40 text-xs md:text-sm">{returningProfile.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-xs md:text-sm">
                            <span className="text-white/40">City</span>
                            <span className="text-white font-medium">{returningProfile.city}</span>
                        </div>
                        {returningProfile.instagramHandle && (
                            <div className="flex justify-between items-center text-xs md:text-sm">
                                <span className="text-white/40">Instagram</span>
                                <span className="text-white font-medium">@{returningProfile.instagramHandle}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-4 w-full max-w-xs">
                    <button
                        onClick={onNext}
                        className="bg-primary text-white py-4 px-12 rounded-xl text-sm font-bold tracking-[0.1em] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 w-full"
                    >
                        CONTINUE AS {returningProfile.fullName.split(' ')[0].toUpperCase()}
                    </button>
                    <button
                        onClick={() => setUseReturnedProfile(false)}
                        className="text-white/40 font-bold hover:text-white transition-all uppercase tracking-widest text-xs py-2"
                    >
                        Edit Profile Details
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="flex-1 flex flex-col gap-12">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div className="flex flex-col gap-2">
                            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Kofi's Design Portal</span>
                            <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight">Step 1: Client Profile</h1>
                        </div>
                        <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1">
                            <span className="text-white/40 text-xs font-medium uppercase tracking-widest">Step 1 of 6</span>
                            <span className="text-primary text-3xl font-bold">16%</span>
                        </div>
                    </div>
                    <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-1/6" />
                    </div>
                </div>

                <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">Let's begin by capturing your details. This information ensures we can provide a personalized experience and keep you updated on your garment's progress.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3 group">
                        <label className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Full Name</label>
                        <input
                            type="text"
                            placeholder="e.g., Sarah Jenkins"
                            autoComplete="name"
                            className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 md:py-5 px-6 md:px-8 focus:ring-1 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all text-white font-medium text-sm md:text-base"
                            value={data.fullName || ''}
                            onChange={(e) => update({ fullName: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col gap-3 group">
                        <label className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="+251 ..."
                            className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 md:py-5 px-6 md:px-8 focus:ring-1 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all text-white font-medium text-sm md:text-base"
                            value={data.phoneNumber || ''}
                            onChange={(e) => update({ phoneNumber: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col gap-3 group">
                        <label className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Current City</label>
                        <input
                            type="text"
                            placeholder="e.g., Addis Ababa"
                            className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 md:py-5 px-6 md:px-8 focus:ring-1 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all text-white font-medium text-sm md:text-base"
                            value={data.city || ''}
                            onChange={(e) => update({ city: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col gap-3 group">
                        <label className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-secondary-cyan transition-colors">Instagram Handle (Optional)</label>
                        <div className="relative">
                            <span className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20 font-bold">@</span>
                            <input
                                type="text"
                                placeholder="username"
                                className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 md:py-5 pl-12 md:pl-14 pr-6 md:pr-8 focus:ring-1 focus:ring-secondary-cyan/20 focus:border-secondary-cyan/50 outline-none transition-all text-white font-medium text-sm md:text-base"
                                value={data.instagramHandle || ''}
                                onChange={(e) => update({ instagramHandle: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0 pt-10 border-t border-white/5">
                    <button onClick={onBack} className="flex items-center gap-2 text-white/40 font-bold hover:text-white transition-all uppercase tracking-widest text-xs">
                        <span className="material-symbols-outlined !text-xl">arrow_back</span>
                        Back Home
                    </button>
                    <button
                        onClick={onNext}
                        disabled={!data.fullName || !data.phoneNumber || !data.city}
                        className="w-full sm:w-auto bg-primary text-white py-4 md:py-5 px-10 md:px-12 rounded-xl text-sm font-bold tracking-[0.1em] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                    >
                        Continue to Style
                    </button>
                </div>
            </div>

            <div className="w-full lg:w-[450px]">
                <div className="bg-[#1c1c1c] border border-white/5 rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 flex flex-col gap-10 sticky top-10">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight">Why we need this?</h3>
                        <p className="text-white/40 text-xs md:text-sm leading-relaxed">Our atelier connects with you via Telegram to ensure every fitting and adjustment is perfectly scheduled.</p>
                    </div>

                    <div className="flex flex-col gap-6">
                        {[
                            { icon: 'verified_user', title: 'Private & Secure', desc: 'Your data is safe and only accessible by our master tailors.' },
                            { icon: 'notifications_active', title: 'Real-time Updates', desc: 'Receive status photos of your garment from our workroom.' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 items-start">
                                <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary flex-shrink-0">
                                    <span className="material-symbols-outlined !text-xl">{item.icon}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="text-white font-bold text-sm tracking-tight">{item.title}</h4>
                                    <p className="text-white/30 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

const DesignStep = ({ data, update, onNext, onBack }: any) => {
    const types = [
        { id: 'custom_event_dress', title: 'Custom Event Dress', desc: 'Unique, one-of-a-kind creations for your most important moments.', icon: 'auto_awesome', color: 'primary' },
        { id: 'signature_dress', title: 'Signature Collection', desc: 'Bespoke adaptations from our renowned heritage designs.', icon: 'star', color: 'secondary-cyan' },
    ];

    const occasions = [
        { id: 'wedding', label: 'Wedding', icon: 'favorite' },
        { id: 'party', label: 'Gala / Party', icon: 'celebration' },
        { id: 'graduation', label: 'Graduation', icon: 'school' },
        { id: 'other', label: 'Other Special', icon: 'more_horiz' },
    ];

    return (
        <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Crafting the Vision</span>
                        <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight">Step 2: Design Selection</h1>
                    </div>
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1">
                        <span className="text-white/40 text-xs font-medium uppercase tracking-widest">Step 2 of 6</span>
                        <span className="text-primary text-3xl font-bold">33%</span>
                    </div>
                </div>
                <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-1/3" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {types.map((type) => (
                    <div
                        key={type.id}
                        onClick={() => update({ orderType: type.id })}
                        className={cn(
                            "group cursor-pointer p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden flex flex-col gap-8 md:gap-12",
                            data.orderType === type.id
                                ? (type.color === 'primary' ? "bg-primary/10 border-primary" : "bg-secondary-cyan/10 border-secondary-cyan")
                                : "bg-white/5 border-white/5 hover:border-white/20"
                        )}
                    >
                        <div className={cn(
                            "size-12 md:size-16 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500",
                            data.orderType === type.id
                                ? (type.color === 'primary' ? "bg-primary text-white shadow-lg shadow-primary/40" : "bg-secondary-cyan text-black")
                                : "bg-white/5 text-white/40 group-hover:text-white"
                        )}>
                            <span className="material-symbols-outlined !text-2xl md:text-3xl">{type.icon}</span>
                        </div>
                        <div className="flex flex-col gap-3 md:gap-4 relative z-10">
                            <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight">{type.title}</h3>
                            <p className="text-white/40 text-sm md:text-base font-light leading-relaxed">{type.desc}</p>
                        </div>
                        <div className={cn(
                            "absolute -bottom-10 -right-10 size-40 rounded-full blur-[80px] transition-all duration-700",
                            data.orderType === type.id
                                ? (type.color === 'primary' ? "bg-primary/40" : "bg-secondary-cyan/40")
                                : "bg-transparent"
                        )} />
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-8">
                <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">Occasion Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {occasions.map((occ) => (
                        <button
                            key={occ.id}
                            onClick={() => update({ occasion: occ.id })}
                            className={cn(
                                "flex flex-col items-center gap-4 md:gap-6 p-6 md:p-8 rounded-2xl md:rounded-3xl border transition-all group",
                                data.occasion === occ.id
                                    ? "bg-primary text-white border-primary shadow-xl shadow-primary/20"
                                    : "bg-white/5 border-white/5 text-white/40 hover:border-white/20 hover:text-white"
                            )}
                        >
                            <span className="material-symbols-outlined !text-2xl md:text-3xl group-hover:scale-110 transition-transform">{occ.icon}</span>
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{occ.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3 group">
                <label className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Fabric Preference & Texture</label>
                <textarea
                    placeholder="e.g., Heavy silk, flowing chiffon, intricate lace details..."
                    rows={4}
                    className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl py-5 md:py-6 px-6 md:px-8 focus:ring-1 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all text-white font-medium resize-none leading-relaxed text-sm md:text-base"
                    value={data.fabricPreference || ''}
                    onChange={(e) => update({ fabricPreference: e.target.value })}
                />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0 pt-10 border-t border-white/5">
                <button onClick={onBack} className="flex items-center gap-2 text-white/40 font-bold hover:text-white transition-all uppercase tracking-widest text-xs">
                    <span className="material-symbols-outlined !text-xl">arrow_back</span>
                    Previous
                </button>
                <button
                    onClick={onNext}
                    className="w-full sm:w-auto bg-primary text-white py-4 md:py-5 px-10 md:px-12 rounded-xl text-sm font-bold tracking-[0.1em] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 uppercase"
                >
                    Continue to Timeline
                </button>
            </div>
        </div>
    );
};

const DatePicker = ({ value, onChange, label, icon }: { value: string, onChange: (date: string) => void, label: string, icon: string }) => {
    const [viewDate, setViewDate] = useState(() => {
        if (value) {
            const [y, m] = value.split('-').map(Number);
            return new Date(y, m - 1, 1);
        }
        return new Date();
    });

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handlePrevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const handleDateClick = (day: number) => {
        const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        const formatted = `${selected.getFullYear()}-${(selected.getMonth() + 1).toString().padStart(2, '0')}-${selected.getDate().toString().padStart(2, '0')}`;
        onChange(formatted);
    };

    const isSelected = (day: number) => {
        if (!value) return false;
        const [y, m, d] = value.split('-').map(Number);
        return y === viewDate.getFullYear() && m === (viewDate.getMonth() + 1) && d === day;
    };

    const isToday = (day: number) => {
        const today = new Date();
        return today.getFullYear() === viewDate.getFullYear() && today.getMonth() === viewDate.getMonth() && today.getDate() === day;
    };

    const isPast = (day: number) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const check = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        return check < today;
    };

    const days = Array.from({ length: daysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }, (_, i) => i + 1);
    const prefixDays = Array.from({ length: firstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth()) }, (_, i) => i);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined !text-xl">{icon}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{label}</span>
                    <span className="text-white font-bold text-sm">{value || 'Not selected'}</span>
                </div>
            </div>
            <div className="bg-[#1c1c1c] border border-white/5 rounded-[2rem] p-6 text-white shadow-2xl relative overflow-hidden max-w-[320px]">
                {/* Subtle background glow */}
                <div className="absolute top-0 right-0 size-24 bg-primary/5 blur-[50px] pointer-events-none" />

                <div className="flex justify-between items-center mb-6 relative z-10">
                    <button onClick={handlePrevMonth} className="size-8 flex items-center justify-center hover:bg-white/5 rounded-full transition-all text-white/20 hover:text-white">
                        <span className="material-symbols-outlined !text-base">chevron_left</span>
                    </button>
                    <div className="flex flex-col items-center">
                        <span className="font-bold uppercase tracking-[0.2em] text-[8px] text-white/20 mb-px">{viewDate.getFullYear()}</span>
                        <span className="font-bold text-sm tracking-tight">{monthNames[viewDate.getMonth()]}</span>
                    </div>
                    <button onClick={handleNextMonth} className="size-8 flex items-center justify-center hover:bg-white/5 rounded-full transition-all text-white/20 hover:text-white">
                        <span className="material-symbols-outlined !text-base">chevron_right</span>
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-3 relative z-10">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                        <span key={d} className="text-[9px] font-bold text-white/10 py-1">{d}</span>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1.5 text-center relative z-10">
                    {prefixDays.map(d => <div key={`prefix-${d}`} className="aspect-square" />)}
                    {days.map(d => {
                        const past = isPast(d);
                        return (
                            <button
                                key={d}
                                onClick={() => !past && handleDateClick(d)}
                                disabled={past}
                                className={cn(
                                    "aspect-square flex flex-col items-center justify-center rounded-lg text-xs transition-all group relative",
                                    isSelected(d) ? "bg-primary text-white font-bold shadow-lg shadow-primary/40" : "text-white/90",
                                    past ? "opacity-10 cursor-not-allowed" : "hover:bg-white/5",
                                    isToday(d) && !isSelected(d) ? "border border-primary/40" : ""
                                )}
                            >
                                {d}
                                {isToday(d) && <div className={cn("size-1 rounded-full absolute bottom-1.5", isSelected(d) ? "bg-white" : "bg-primary")} />}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const TimelineStep = ({ data, update, onNext, onBack }: any) => {
    return (
        <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-2">
                        <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">The Atelier Roadmap</span>
                        <h1 className="text-white text-5xl font-bold tracking-tight">Step 3: Event & Delivery</h1>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-white/40 text-xs font-medium uppercase tracking-widest">Step 3 of 6</span>
                        <span className="text-primary text-3xl font-bold">50%</span>
                    </div>
                </div>
                <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-1/2" />
                </div>
            </div>

            <p className="text-white/60 text-lg font-light leading-relaxed max-w-3xl">Timing is essential for bespoke luxury. We need to reserve atelier hours for your piece. Standard production is 4-6 weeks.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <DatePicker
                    label="Event Date"
                    icon="event"
                    value={data.eventDate}
                    onChange={(date) => update({ eventDate: date })}
                />
                <DatePicker
                    label="Preferred Delivery"
                    icon="local_shipping"
                    value={data.preferredDeliveryDate}
                    onChange={(date) => update({ preferredDeliveryDate: date })}
                />
            </div>

            <div className="flex items-center justify-between pt-10 border-t border-white/5">
                <button onClick={onBack} className="flex items-center gap-2 text-white/40 font-bold hover:text-white transition-all uppercase tracking-widest text-xs">
                    <span className="material-symbols-outlined !text-xl">arrow_back</span>
                    Back
                </button>
                <div className="flex items-center gap-6">
                    <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest hidden md:block italic">Progress saved automatically</span>
                    <button
                        onClick={onNext}
                        disabled={!data.preferredDeliveryDate || !data.eventDate}
                        className="bg-primary text-white py-4 px-10 rounded-xl text-sm font-bold tracking-[0.1em] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Continue to Measurements
                    </button>
                </div>
            </div>
        </div>
    );
};


const MeasurementStep = ({ data, update, onNext, onBack }: any) => {
    const [selectedField, setSelectedField] = useState<string | null>(null);

    const fields = [
        { key: 'bust', label: 'Bust', sub: 'Widest part of the chest', guide: 'Wrap the tape level around the fullest part of your bust. Keep it snug but not tight.', image: bustGuide },
        { key: 'waist', label: 'Waist', sub: 'Natural waistline narrowest point', guide: 'Measure around your natural waistline, which is the narrowest part of your torso.', image: waistGuide },
        { key: 'hips', label: 'Hips', sub: 'Widest part around buttocks', guide: 'Stand with your heels together and measure around the fullest part of your hips.', image: hipsGuide },
        { key: 'shoulderWidth', label: 'Shoulder', sub: 'Seam to seam', guide: 'Measure across the back from the edge of one shoulder bone to the other.', image: shoulderGuide },
        { key: 'dressLength', label: 'Dress Length', sub: 'Shoulder to hemline', guide: 'Measure from the highest point of your shoulder down to where you want the hem to end.', image: dressLengthGuide },
        { key: 'armLength', label: 'Arm Length', sub: 'Shoulder tip to wrist', guide: 'Measure from the top of the shoulder bone down to the wrist bone.', image: armLengthGuide },
        { key: 'height', label: 'Total Height', sub: 'Calculated with heels', guide: 'Stand straight against a wall with heels together. Measure from the top of your head to the floor. Mention whether this is with or without heels in the notes.', image: heightGuide },
    ];

    const handleUpdate = (key: string, val: string) => {
        update({
            measurements: {
                ...data.measurements,
                [key]: parseFloat(val) || 0
            }
        });
    };

    return (
        <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 flex flex-col gap-10 md:gap-12">
                <div className="flex flex-col gap-6 md:gap-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div className="flex flex-col gap-2">
                            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">New Custom Order</span>
                            <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight">Step 4: Body Measurements</h1>
                        </div>
                        <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1">
                            <span className="text-white/40 text-xs font-medium uppercase tracking-widest">Step 4 of 6</span>
                            <span className="text-primary text-3xl font-bold">66%</span>
                        </div>
                    </div>
                    <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-2/3" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {fields.map((f) => (
                        <div key={f.key} className="flex flex-col gap-4">
                            <div
                                onClick={() => setSelectedField(f.key)}
                                className={cn(
                                    "bg-[#1c1c1c] border p-6 md:p-8 rounded-2xl transition-all group relative cursor-pointer",
                                    selectedField === f.key ? "border-primary/50 bg-[#222222]" : "border-white/5 hover:border-primary/30"
                                )}
                            >
                                <div className="flex justify-between items-start mb-4 md:mb-6">
                                    <div className="flex flex-col gap-1 md:gap-2">
                                        <h3 className="font-bold text-lg md:text-xl text-white tracking-tight">{f.label}</h3>
                                        <p className="text-[10px] md:text-xs text-white/30 font-light">{f.sub}</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input
                                        type="number"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 md:py-4 px-5 md:px-6 focus:ring-1 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all text-xl md:text-2xl font-bold text-white placeholder:text-white/5"
                                        placeholder="0.0"
                                        value={data.measurements?.[f.key] || ''}
                                        onChange={(e) => handleUpdate(f.key, e.target.value)}
                                        onFocus={() => setSelectedField(f.key)}
                                    />
                                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs md:text-sm font-bold text-white/20 uppercase tracking-widest">cm</span>
                                </div>
                            </div>

                            <AnimatePresence>
                                {selectedField === f.key && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="lg:hidden overflow-hidden"
                                    >
                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-4">
                                            <div className="h-40 flex items-center justify-center bg-black/20 rounded-xl">
                                                <img
                                                    src={f.image}
                                                    alt={f.label}
                                                    className="h-full w-auto object-contain opacity-80"
                                                />
                                            </div>
                                            <p className="text-white/40 text-[10px] leading-relaxed text-center font-medium">
                                                {f.guide}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0 pt-10 border-t border-white/5">
                    <button onClick={onBack} className="flex items-center gap-2 text-white/40 font-bold hover:text-white transition-all uppercase tracking-widest text-xs">
                        <span className="material-symbols-outlined !text-xl">arrow_back</span>
                        Back
                    </button>
                    <button
                        onClick={onNext}
                        className="w-full sm:w-auto bg-primary text-white py-4 md:py-5 px-10 rounded-xl text-sm font-bold tracking-[0.1em] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 uppercase"
                    >
                        Continue to Step 5
                    </button>
                </div>
            </div>

            <aside className="hidden lg:flex w-full lg:w-[400px] flex-col">
                <div className="bg-[#1c1c1c] border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col gap-6 sticky top-24">
                    <h2 className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Measurement Guide</h2>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 min-h-[250px] md:min-h-[300px] flex items-center justify-center">
                        {selectedField && fields.find(f => f.key === selectedField)?.image ? (
                            <img
                                src={fields.find(f => f.key === selectedField)?.image}
                                alt={`${fields.find(f => f.key === selectedField)?.label} measurement guide`}
                                className="w-full h-auto rounded-lg opacity-90 transition-all duration-300 max-w-[200px] md:max-w-none"
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-3 text-white/20 text-center">
                                <span className="material-symbols-outlined !text-4xl md:text-5xl">checkroom</span>
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Select a field to see<br />measurement guidance</span>
                            </div>
                        )}
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl">
                        <h4 className="text-white font-bold text-base md:text-lg mb-2 text-center md:text-left">
                            {selectedField ? fields.find(f => f.key === selectedField)?.label : 'Instructions'}
                        </h4>
                        <p className="text-white/40 text-[10px] md:text-sm leading-relaxed text-center md:text-left">
                            {selectedField ? fields.find(f => f.key === selectedField)?.guide : 'Tap or click on any measurement field to see specific instructions and visual guides for accurate measurements.'}
                        </p>
                    </div>
                </div>
            </aside>
        </div >
    );
};

const InspirationStep = ({ data, photo, setPhoto, update, onNext, onBack }: any) => {
    const fileRef = useRef<HTMLInputElement>(null);
    const colors = [
        { name: 'Midnight', hex: '#121212' },
        { name: 'Crimson', hex: '#7a1215' },
        { name: 'Forest', hex: '#1c3a32' },
        { name: 'Gold', hex: '#C5B358' },
        { name: 'Champagne', hex: '#f3e5ab' },
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    return (
        <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-4">
                <span className="text-white/40 text-xs font-medium uppercase tracking-widest">Step 5 of 6 • 83% Complete</span>
                <h1 className="text-white text-5xl font-bold tracking-tight">Creative Inspiration</h1>
            </div>

            <div
                onClick={() => fileRef.current?.click()}
                className="bg-gradient-to-br from-[#2a3a30] to-[#121212] border border-white/5 rounded-[2rem] p-16 flex flex-col items-center gap-6 text-center group cursor-pointer hover:border-primary/30 transition-all shadow-2xl relative overflow-hidden"
            >
                <input type="file" ref={fileRef} className="hidden" onChange={handleFileChange} accept="image/*" />
                <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary relative z-10">
                    <span className="material-symbols-outlined !text-4xl">{photo ? 'check_circle' : 'add_photo_alternate'}</span>
                </div>
                <div className="relative z-10">
                    <p className="text-white text-2xl font-bold tracking-tight">{photo ? photo.name : 'Upload Your Inspiration'}</p>
                    <p className="text-white/40 text-sm mt-2 font-light">
                        {photo ? 'Click to change the selected file.' : 'Drag and drop images here or click to browse.'}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-10">
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">palette</span>
                    Preferred Color Palette
                </h3>
                <div className="bg-[#1c1c1c] border border-white/5 rounded-2xl p-8 flex flex-wrap gap-8">
                    {colors.map((c) => (
                        <button key={c.name} onClick={() => update({ colorPreference: c.name })} className="flex flex-col items-center gap-3 group transition-all">
                            <div className={cn("size-14 rounded-full border-2 transition-all duration-300 transform group-hover:scale-110", data.colorPreference === c.name ? "border-primary ring-4 ring-primary/20 ring-offset-4 ring-offset-[#1c1c1c]" : "border-white/10")} style={{ backgroundColor: c.hex }} />
                            <span className={cn("text-[10px] uppercase font-bold tracking-widest", data.colorPreference === c.name ? "text-white" : "text-white/20")}>{c.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between pt-10 border-t border-white/5">
                <button onClick={onBack} className="flex items-center gap-2 text-white/40 font-bold hover:text-white transition-all uppercase tracking-widest text-xs">
                    <span className="material-symbols-outlined !text-xl">arrow_back</span>
                    Back
                </button>
                <button onClick={onNext} className="bg-primary text-white py-4 px-12 rounded-xl text-sm font-bold tracking-[0.1em] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 uppercase">
                    Review Order
                </button>
            </div>
        </div>
    );
};

const ReviewItem = ({ label, value }: { label: string; value: string | number | undefined | null }) => (
    <div className="bg-[#1c1c1c] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4 hover:bg-[#222222] transition-colors group">
        <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{label}</span>
        <span className="text-white text-base md:text-lg font-bold tracking-tight">{value || 'Not specified'}</span>
    </div>
);

const ReviewStep = ({ data, isSubmitting, onSubmit, onBack, error, update }: any) => {
    return (
        <div className="flex flex-col gap-16 pb-20">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Final Review</span>
                        <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight">Step 6: Confirm Order</h1>
                    </div>
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1">
                        <span className="text-white/40 text-xs font-medium uppercase tracking-widest">Step 6 of 6</span>
                        <span className="text-primary text-3xl font-bold">100%</span>
                    </div>
                </div>
                <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-full transition-all duration-1000" />
                </div>
            </div>

            <div className="flex flex-col gap-px bg-white/5 rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                <ReviewItem label="Style" value={data.orderType?.replace('_', ' ').toUpperCase()} />
                <ReviewItem label="Occasion" value={data.occasion?.toUpperCase()} />
                <ReviewItem label="Fabric" value={data.fabricPreference} />
                <ReviewItem label="Event Date" value={new Date(data.eventDate).toLocaleDateString()} />
                <ReviewItem label="Measurements" value={`${Object.keys(data.measurements || {}).length} recorded`} />
            </div>

            <div className="flex flex-col gap-6">
                <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative mt-1">
                        <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={data.agreedToTerms || false}
                            onChange={(e) => update({ agreedToTerms: e.target.checked })}
                        />
                        <div className="size-5 md:size-6 rounded border-2 border-white/10 peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-sm md:text-base opacity-0 peer-checked:opacity-100">check</span>
                        </div>
                    </div>
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                        I understand that bespoke garments are tailored to my specific measurements and I agree to the <span className="text-primary hover:underline">Terms of Service</span>.
                    </p>
                </label>
            </div>
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-4 text-red-400"
                >
                    <XCircle className="size-6 shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                </motion.div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0 pt-10 border-t border-white/5">
                <button onClick={onBack} disabled={isSubmitting} className="flex items-center gap-2 text-white/40 font-bold hover:text-white transition-all uppercase tracking-widest text-xs disabled:opacity-30">
                    <span className="material-symbols-outlined !text-xl">arrow_back</span>
                    Revision
                </button>
                <button
                    onClick={onSubmit}
                    disabled={isSubmitting || !data.agreedToTerms}
                    className="w-full sm:w-auto bg-primary text-white py-4 md:py-5 px-10 md:px-12 rounded-xl text-sm font-bold tracking-[0.1em] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed uppercase flex items-center justify-center gap-3"
                >
                    {isSubmitting ? (
                        <>
                            <div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Finalizing...
                        </>
                    ) : (
                        'Submit Bespoke Order'
                    )}
                </button>
            </div>
        </div>
    );
};
