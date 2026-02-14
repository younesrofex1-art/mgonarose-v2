import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Facebook, MessageCircle } from 'lucide-react';

const MobileMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen, handleNavClick, t }) => {
    return (
        <AnimatePresence>
            {isMobileMenuOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[250]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[300] shadow-2xl flex flex-col p-12 overflow-y-auto"
                    >
                        <div className="flex justify-end mb-16">
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:rotate-90 transition-transform duration-300">
                                <X className="w-8 h-8 text-black" strokeWidth={1} />
                            </button>
                        </div>
                        <nav className="flex flex-col space-y-8">
                            {[
                                { label: t.nav.story, action: () => handleNavClick('story') },
                                { label: t.howToUse.menuLabel, action: () => handleNavClick('how-to-use') },
                                { label: t.benefits.menuLabel, action: () => handleNavClick('benefits') },
                                { label: t.faq.title, action: () => handleNavClick('faq') },
                                { label: t.nav.contact, action: () => handleNavClick('footer') }
                            ].map((item, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={item.action}
                                    className="group flex items-center space-x-6 text-left"
                                >
                                    <span className="text-[10px] text-gray-300 font-sans tracking-widest">0{index + 1}</span>
                                    <span className="text-3xl md:text-4xl font-serif text-black group-hover:text-luxury-gold transition-all duration-300 hover:pl-4">{item.label}</span>
                                </motion.button>
                            ))}
                        </nav>
                        <div className="mt-auto pt-20">
                            <div className="h-px w-12 bg-luxury-gold mb-8" />
                            <div className="space-y-6">
                                <div className="flex space-x-6">
                                    <a href="https://www.instagram.com/mgonarose/" className="text-black hover:text-luxury-gold transition-colors"><Instagram className="w-5 h-5" /></a>
                                    <a href="https://www.facebook.com/saudicodksa/" className="text-black hover:text-luxury-gold transition-colors"><Facebook className="w-5 h-5" /></a>
                                    <a href="https://wa.me/212717573727" className="text-black hover:text-luxury-gold transition-colors"><MessageCircle className="w-5 h-5" /></a>
                                </div>
                                <p className="text-[12px] text-gray-400 font-sans">{t.footer.story}</p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
