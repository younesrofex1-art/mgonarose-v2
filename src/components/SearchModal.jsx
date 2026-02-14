import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

const SearchModal = ({ isOpen, onClose, t, searchQuery, setSearchQuery, productData }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[600] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-[92%] md:w-[75%] max-w-[900px] bg-white rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden"
                    >
                        {/* Top Bar */}
                        <div className="flex items-center px-6 md:px-10 py-6 border-b border-gray-100">
                            <Search className="w-5 h-5 text-luxury-gold mr-4" strokeWidth={2} />
                            <input
                                autoFocus
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t.nav.searchPlaceholder || "Discover your natural radiance..."}
                                className="flex-1 bg-transparent text-black text-lg md:text-xl italic font-serif outline-none placeholder:text-gray-300"
                            />
                            <button
                                onClick={onClose}
                                className="ml-4 p-2 text-gray-400 hover:text-black hover:rotate-90 transition-all duration-300"
                            >
                                <X className="w-5 h-5" strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 md:p-10 bg-[#FAFAFA]/50">
                            <div className="mb-8">
                                <h3 className="text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase text-center">
                                    {t.shop.title || "YOUR ESSENTIAL RITUAL"}
                                </h3>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                                {Object.entries(productData).map(([id, product]) => (
                                    <div key={id} className="group cursor-pointer">
                                        <div className="relative aspect-square rounded-[12px] bg-white border border-gray-100 overflow-hidden mb-4 p-4 flex items-center justify-center transition-all duration-500 hover:border-luxury-gold/30 hover:shadow-lg">
                                            <img
                                                src={product.img}
                                                alt={product.title}
                                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="space-y-1 text-center">
                                            <h4 className="text-[10px] md:text-[11px] font-sans font-bold text-black/80 uppercase tracking-widest leading-snug h-[2.8em] flex items-center justify-center">
                                                {product.title}
                                            </h4>
                                            <div className="flex items-center justify-center space-x-1">
                                                <span className="text-[12px] md:text-[13px] font-sans font-extrabold text-[#D4AF37]">
                                                    {product.price.split(' ')[0]}
                                                </span>
                                                <span className="text-[9px] md:text-[10px] font-sans font-bold text-[#D4AF37] opacity-80 uppercase tracking-tighter">
                                                    {product.price.split(' ')[1]}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Aesthetic Bottom Accents */}
                        <div className="h-1 bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchModal;
