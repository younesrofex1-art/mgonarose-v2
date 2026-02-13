import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ShieldCheck, Truck, Leaf } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, selectedProduct, t, language }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        city: '',
        address: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Internal Data Saving (Placeholder)
        console.log("Saving order to database...", {
            timestamp: new Date().toISOString(),
            orderData: formData
        });

        // WhatsApp Configuration
        const phoneNumber = "212717573727";
        const message = `New Order for MgonaRose! 🌹
- Name: ${formData.fullName}
- Phone: ${formData.phone}
- City: ${formData.city}
- Address: ${formData.address}
Please confirm this delivery.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Show Success Modal
        setIsSubmitted(true);
    };

    if (!isOpen) return null;

    const ct = t.checkout;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        dir="ltr"
                        className="relative w-[95vw] md:w-full md:max-w-2xl bg-white rounded-[20px] shadow-2xl overflow-hidden font-sans max-h-[95vh] flex flex-col"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 p-2 text-[#D4AF37] hover:text-[#B8962E] transition-colors z-20 right-6"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="overflow-y-auto flex-1">
                            {!isSubmitted ? (
                                <div className="flex flex-col md:flex-row">
                                    {/* Order Summary (Left/Right) */}
                                    <div className="w-full md:w-5/12 bg-gray-50/50 p-6 md:p-12 border-b md:border-b-0 border-gray-100 md:border-r">
                                        <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-gray-400 mb-8">{ct.summary}</h3>

                                        <div className="flex flex-col items-center text-center">
                                            <div className="w-24 h-24 md:w-32 md:h-32 mb-6 p-2 bg-white rounded-2xl border border-gray-100 flex items-center justify-center">
                                                <img
                                                    src={selectedProduct?.img || './product1.png'}
                                                    alt="Product"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <h4 className="serif text-lg md:text-xl font-bold mb-1">{selectedProduct?.title || 'MgonaRose Elixir'}</h4>
                                            <p className="text-[10px] text-gray-400 font-sans italic mb-4">Authentic Kelaat M'Gouna Quality Guaranteed</p>
                                            <p className="text-[#D4AF37] font-bold mb-1 uppercase tracking-widest text-[10px] md:text-xs">{ct.freeDelivery}</p>
                                            <div className="mt-4 pt-4 border-t border-gray-100 w-full flex justify-between items-center">
                                                <span className="text-[#D4AF37] font-bold uppercase tracking-widest text-[11px]">{ct.total}</span>
                                                <span className="text-2xl md:text-3xl font-bold text-[#D4AF37]">{selectedProduct?.price || '249 MAD'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form */}
                                    <div className="w-full md:w-7/12 p-6 md:p-12 bg-white">
                                        <h2 className="serif text-2xl md:text-3xl font-bold mb-8 text-black">{ct.title}</h2>

                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div>
                                                <label className="block serif text-[14px] font-bold text-black mb-2 opacity-100 visible text-left">
                                                    Full Name
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder={ct.placeholders.name}
                                                    className="w-full px-5 py-4 bg-white border border-[#CCCCCC] rounded-xl focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all text-sm font-sans text-left text-black"
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                />
                                            </div>

                                            <div>
                                                <label className="block serif text-[14px] font-bold text-black mb-2 opacity-100 visible text-left">
                                                    Phone Number
                                                </label>
                                                <input
                                                    required
                                                    type="tel"
                                                    placeholder={ct.placeholders.phone}
                                                    className="w-full px-5 py-4 bg-white border border-[#CCCCCC] rounded-xl focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all text-sm font-sans text-left text-black"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>

                                            <div>
                                                <label className="block serif text-[14px] font-bold text-black mb-2 opacity-100 visible text-left">
                                                    City
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder={ct.placeholders.city}
                                                    className="w-full px-5 py-4 bg-white border border-[#CCCCCC] rounded-xl focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all text-sm font-sans text-left text-black"
                                                    value={formData.city}
                                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                />
                                            </div>

                                            <div>
                                                <label className="block serif text-[14px] font-bold text-black mb-2 opacity-100 visible text-left">
                                                    Shipping Address
                                                </label>
                                                <textarea
                                                    required
                                                    rows="2"
                                                    placeholder={ct.placeholders.address}
                                                    className="w-full px-5 py-4 bg-white border border-[#CCCCCC] rounded-xl focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all text-sm font-sans resize-none text-left text-black"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full bg-[#D4AF37] text-white py-6 md:py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-sm hover:bg-[#B8962E] transition-all shadow-lg shadow-[#D4AF37]/30 mt-4 active:scale-[0.98]"
                                            >
                                                CONFIRM MY ORDER
                                            </button>

                                            <p className="text-[11px] text-gray-400 text-center italic font-sans mb-8">
                                                {ct.cod}
                                            </p>

                                            <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                                                <div className="flex flex-col items-center space-y-1">
                                                    <ShieldCheck className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
                                                    <span className="text-[8px] font-bold uppercase tracking-tighter text-gray-400">Secure Payment</span>
                                                </div>
                                                <div className="flex flex-col items-center space-y-1">
                                                    <Truck className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
                                                    <span className="text-[8px] font-bold uppercase tracking-tighter text-gray-400">Fast Delivery</span>
                                                </div>
                                                <div className="flex flex-col items-center space-y-1">
                                                    <Leaf className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
                                                    <span className="text-[8px] font-bold uppercase tracking-tighter text-gray-400">100% Organic</span>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-12 md:p-20 text-center bg-white">
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                            delay: 0.1
                                        }}
                                        className="relative inline-flex items-center justify-center w-24 h-24 mb-10"
                                    >
                                        <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-full blur-2xl animate-pulse" />
                                        <div className="relative flex items-center justify-center w-20 h-20 bg-white rounded-full border border-[#D4AF37]/20 shadow-sm">
                                            <CheckCircle className="w-10 h-10 text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
                                        </div>
                                    </motion.div>

                                    <h2 className="serif text-4xl md:text-5xl font-bold mb-3 tracking-tight text-black">
                                        {ct.thankYou}
                                    </h2>

                                    <p className="serif text-lg md:text-xl text-[#D4AF37] italic mb-8 opacity-80">
                                        {ct.subtitle}
                                    </p>

                                    <p className="text-gray-500 font-sans text-base md:text-lg mb-12 max-w-md mx-auto leading-relaxed px-4">
                                        {ct.contactShortly}
                                    </p>

                                    <button
                                        onClick={onClose}
                                        className="inline-flex items-center justify-center min-w-[240px] bg-gradient-to-r from-[#D4AF37] via-[#E5C76B] to-[#D4AF37] bg-[length:200%_auto] hover:bg-right text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs transition-all duration-500 shadow-xl shadow-[#D4AF37]/20 active:scale-[0.98]"
                                    >
                                        {ct.back}
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CheckoutModal;
