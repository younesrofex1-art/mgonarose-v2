import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose, cart, t, updateQuantity, removeFromCart, onCheckout }) => {
    const total = cart.reduce((acc, item) => {
        const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
        return acc + (price * item.quantity);
    }, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[250]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-[85%] md:w-[450px] bg-white z-[260] shadow-2xl flex flex-col"
                    >
                        <div className="p-8 flex justify-between items-center border-b border-gray-100">
                            <h2 className="text-2xl serif text-black">{t.cart.title}</h2>
                            <button onClick={onClose} className="p-2 hover:rotate-90 transition-transform duration-300">
                                <X className="w-6 h-6 text-black" strokeWidth={1.5} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                                    <div className="w-20 h-20 bg-luxury-cream/10 rounded-full flex items-center justify-center">
                                        <ShoppingCart className="w-10 h-10 text-luxury-gold/30" strokeWidth={1} />
                                    </div>
                                    <p className="text-gray-400 font-sans italic">{t.cart.empty}</p>
                                    <button
                                        onClick={onClose}
                                        className="bg-black text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-luxury-gold transition-colors"
                                    >
                                        {t.cart.startShopping}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-6">
                                            <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.id === 'gold' ? './product1.png' : item.id === 'classic' ? './product2.png' : item.id === 'noir' ? './product3.png' : './offer_pack.png'}
                                                    alt={item.title}
                                                    className="w-full h-full object-contain p-2"
                                                />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="text-sm font-bold text-black font-sans leading-tight pr-4">{item.title}</h4>
                                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-black">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="text-[#D4AF37] font-bold font-sans text-sm">{item.price}</div>
                                                <div className="flex items-center space-x-4 pt-2">
                                                    <div className="flex items-center border border-gray-100 rounded-full px-3 py-1 scale-90 origin-left">
                                                        <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400 hover:text-black px-1">-</button>
                                                        <span className="text-[12px] font-bold font-sans w-6 text-center">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400 hover:text-black px-1">+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-8 border-t border-gray-100 bg-gray-50 space-y-6">
                                <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-[#D4AF37]">
                                    <span>{t.cart.total}</span>
                                    <span>{total.toFixed(2)} dh</span>
                                </div>
                                <button
                                    onClick={onCheckout}
                                    className="w-full bg-[#D4AF37] text-white py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all duration-300 shadow-lg"
                                >
                                    {t.cart.checkout}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
