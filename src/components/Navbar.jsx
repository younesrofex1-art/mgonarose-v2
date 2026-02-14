import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Menu } from 'lucide-react';

const Navbar = ({ t, language, setLanguage, onNavClick, isSearchOpen, setIsSearchOpen, isScrolled, cartCount, setIsCartOpen, setIsMobileMenuOpen }) => {
    const textColorClass = isScrolled ? 'text-black' : 'text-white';
    const bgColorClass = isScrolled ? 'bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)]' : 'bg-transparent';

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 h-[55px] md:h-[65px] transition-all duration-300 ease-in-out ${bgColorClass}`}>
            <div className="max-w-[1800px] mx-auto px-[15px] md:px-12 h-full flex items-center justify-between relative">
                {/* Mobile Menu Icon - Far Left */}
                <div className="flex md:hidden items-center flex-1">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className={`p-3 -ml-3 transition-all duration-300 ${textColorClass} hover:bg-black/5 rounded-full`}
                    >
                        <Menu className="w-6 h-6" strokeWidth={1.5} />
                    </button>
                </div>

                {/* Desktop Menu - Left */}
                <div className="hidden md:flex items-center gap-10 flex-1">
                    <button onClick={() => onNavClick('products')} className={`${textColorClass} hover:text-luxury-gold transition-all duration-300 font-sans text-xs tracking-[0.2em] font-medium uppercase`}>{t.nav.shop}</button>
                    <button onClick={() => onNavClick('story')} className={`${textColorClass} hover:text-luxury-gold transition-all duration-300 font-sans text-xs tracking-[0.2em] font-medium uppercase`}>{t.nav.story}</button>
                </div>

                {/* Logo - Center */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-full py-1">
                    <img
                        src="/logo.png"
                        alt="MgonaRose"
                        className={`w-[110px] md:w-[160px] h-auto object-contain cursor-pointer transition-all duration-500 hover:scale-105 ${isScrolled ? 'brightness-0' : 'brightness-0 invert'}`}
                        onClick={() => onNavClick('hero')}
                    />
                </div>

                {/* Right Side Icons */}
                <div className="flex items-center gap-1 md:gap-8 flex-1 justify-end h-full">
                    {/* Language Switcher - Desktop Only */}
                    <div className="hidden md:flex items-center gap-4 border-r border-gray-200 pr-8 mr-2 h-6">
                        <button onClick={() => setLanguage('en')} className={`text-[10px] tracking-widest uppercase transition-colors ${language === 'en' ? 'text-luxury-gold font-bold' : textColorClass + ' opacity-50'}`}>EN</button>
                        <button onClick={() => setLanguage('fr')} className={`text-[10px] tracking-widest uppercase transition-colors ${language === 'fr' ? 'text-luxury-gold font-bold' : textColorClass + ' opacity-50'}`}>FR</button>
                    </div>

                    {/* Search Icon */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className={`transition-all duration-300 cursor-pointer group p-3 -mr-2 md:p-2 hover:bg-black/5 rounded-full ${textColorClass}`}
                    >
                        <Search className="w-5 h-5 md:w-5 md:h-5" strokeWidth={1.5} />
                    </button>

                    {/* Cart Icon with Badge */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className={`transition-all duration-300 cursor-pointer group p-3 -mr-2 md:p-2 hover:bg-black/5 rounded-full relative ${textColorClass}`}
                    >
                        <ShoppingCart className="w-5 h-5 md:w-5 md:h-5" strokeWidth={1.5} />
                        {cartCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2 right-2 md:-top-1 md:-right-1 bg-[#D4AF37] text-white text-[9px] md:text-[10px] w-3.5 h-3.5 md:w-4 md:h-4 rounded-full flex items-center justify-center font-bold shadow-sm"
                            >
                                {cartCount}
                            </motion.span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
