import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Menu, X, Check, Instagram, Facebook, Phone, Leaf, Rabbit, Droplets, Star, Sparkles, Sun, Heart, Mail, MessageCircle, CheckCircle, Globe, Shield } from 'lucide-react';
import CheckoutModal from './components/CheckoutModal';
import { translations } from './translations';

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
                        className="w-[110px] md:w-[160px] h-auto object-contain cursor-pointer transition-transform duration-500 hover:scale-105 brightness-0"
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

const LegalView = ({ title, children, onBack, t }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="pt-32 pb-20 px-6 md:px-12 bg-white min-h-screen"
    >
        <div className="max-w-4xl mx-auto">
            <button
                onClick={onBack}
                className="flex items-center space-x-2 text-luxury-gold hover:opacity-70 transition-opacity mb-12 uppercase tracking-widest text-xs font-bold"
            >
                <span>←</span>
                <span>{t.legal.back}</span>
            </button>
            <h1 className="text-4xl md:text-5xl font-serif text-black mb-16 leading-tight underline decoration-luxury-gold/30 underline-offset-8">{title}</h1>
            <div className="prose prose-luxury max-w-none text-left">
                {children}
            </div>
        </div>
    </motion.div>
);

const ShippingPolicy = ({ t }) => (
    <div className="space-y-12">
        {t.legal.shipping.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
                <h2 className="text-xl font-bold text-black uppercase tracking-widest">{section.t}</h2>
                <div className="text-gray-600 leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: section.d }} />
            </div>
        ))}
    </div>
);

const RefundPolicy = ({ t }) => (
    <div className="space-y-12">
        {t.legal.refund.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
                <h2 className="text-xl font-bold text-black uppercase tracking-widest">{section.t}</h2>
                <div className="text-gray-600 leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: section.d }} />
            </div>
        ))}
    </div>
);

const PrivacyPolicy = ({ t }) => (
    <div className="space-y-12">
        {t.legal.privacy.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
                <h2 className="text-xl font-bold text-black uppercase tracking-widest">{section.t}</h2>
                <div className="text-gray-600 leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: section.d }} />
            </div>
        ))}
    </div>
);

const App = () => {
    const [language, setLanguage] = useState('en');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedBundle, setSelectedBundle] = useState('gold');
    const [hoveredBundle, setHoveredBundle] = useState(null);
    const [activeFaq, setActiveFaq] = useState(null);
    const [activeOverlay, setActiveOverlay] = useState(null); // 'story', 'benefits', 'how-to-use'
    const [view, setView] = useState('home');
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeUnlockIndex, setActiveUnlockIndex] = useState(0);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart] = useState([]);

    const addToCart = (productId, productData) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === productId);
            if (existing) {
                return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { id: productId, ...productData, quantity: 1 }];
        });
        setIsCartOpen(true); // Open cart automatically when adding
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const handleUnlockScroll = (e) => {
        if (window.innerWidth >= 768) return;
        const scrollPosition = e.target.scrollLeft;
        const cardWidth = e.target.offsetWidth * 0.85; // 85vw
        const index = Math.round(scrollPosition / cardWidth);
        setActiveUnlockIndex(index);
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleNavClick = (target) => {
        setIsMobileMenuOpen(false);
        if (['story', 'benefits', 'how-to-use'].includes(target)) {
            setActiveOverlay(target);
        } else {
            if (view !== 'home') {
                setView('home');
                setTimeout(() => scrollToSection(target), 150);
            } else {
                scrollToSection(target);
            }
        }
    };

    const handleShopClick = () => handleNavClick('products');

    const t = translations[language];

    useEffect(() => {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = language;
        document.body.style.fontFamily = "'Montserrat', sans-serif";
        document.body.style.fontWeight = "400";

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [language]);

    const productData = {
        'gold': { title: "MgonaRose - Pure Gold", price: "249 MAD", img: './product1.png' },
        'classic': { title: "MgonaRose - Classic Red", price: "199 MAD", img: './product2.png' },
        'noir': { title: "MgonaRose - Deep Noir", price: "199 MAD", img: './product3.png' },
        'bundle': { title: "MgonaRose - Special Offer", price: "320 MAD", img: './offer_pack.png' }
    };

    const renderView = () => {
        const bundles = t.shop.bundles;
        const searchResults = searchQuery.trim() === '' ? [] :
            Object.entries(bundles).filter(([id, bundle]) =>
                bundle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                bundle.desc.toLowerCase().includes(searchQuery.toLowerCase())
            );

        if (view === 'shipping') return (
            <LegalView key="shipping" title={t.legal.shipping.title} onBack={() => { setView('home'); window.scrollTo(0, 0); }} t={t}>
                <ShippingPolicy t={t} />
            </LegalView>
        );
        if (view === 'refund') return (
            <LegalView key="refund" title={t.legal.refund.title} onBack={() => { setView('home'); window.scrollTo(0, 0); }} t={t}>
                <RefundPolicy t={t} />
            </LegalView>
        );
        if (view === 'privacy') return (
            <LegalView key="privacy" title={t.legal.privacy.title} onBack={() => { setView('home'); window.scrollTo(0, 0); }} t={t}>
                <PrivacyPolicy t={t} />
            </LegalView>
        );
        return (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <section className="relative h-screen flex items-center justify-center overflow-hidden">
                    <picture className="absolute inset-0 z-0">
                        <source srcSet="/photo hero mobile.png" media="(max-width: 768px)" />
                        <img src="/hero_new.jpg.jpeg" alt="Hero Background" className="w-full h-full object-cover" />
                    </picture>
                    <div className="absolute top-0 left-0 w-full h-1/4 z-10 pointer-events-none"
                        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)' }} />
                    <div className="absolute inset-0 bg-black/20 z-10" />
                    <div className="relative z-20 flex flex-col items-center justify-center md:justify-end h-full pb-12 md:pb-16 px-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="flex flex-col items-center space-y-10 text-center">
                            <h4 className="text-white text-[11px] md:text-sm uppercase tracking-[0.8em] font-light leading-relaxed px-4">{t.hero.subtitle}</h4>
                            <button onClick={handleShopClick} className="bg-transparent border border-white/60 text-white px-14 md:px-12 py-6 md:py-5 rounded-full text-[11px] md:text-xs uppercase tracking-[0.4em] hover:bg-white hover:text-luxury-charcoal transition-all duration-500 backdrop-blur-sm active:scale-[0.98]">
                                {t.hero.cta}
                            </button>
                        </motion.div>
                    </div>
                </section>

                <section className="pt-[20px] pb-[40px] bg-white overflow-hidden">
                    <div className="flex whitespace-nowrap">
                        <motion.div className="flex items-center" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="flex items-center space-x-12 md:space-x-24 px-6 md:px-12">
                                    {[
                                        { icon: Leaf, text: t.badges.organic },
                                        { icon: Rabbit, text: t.badges.crueltyFree },
                                        { icon: Droplets, text: t.badges.parabenFree },
                                        { icon: Star, text: t.badges.madeInMorocco }
                                    ].map((badge, idx) => (
                                        <div key={idx} className="flex items-center space-x-4">
                                            <badge.icon className="w-6 h-6 md:w-8 md:h-8 text-black" strokeWidth={1.5} />
                                            <span className="text-black text-xs md:text-sm font-bold uppercase tracking-[0.2em]">{badge.text}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <section className="pt-[60px] pb-[60px] bg-white px-5 md:px-0" id="unlock">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-[1.8rem] md:text-[3.2rem] serif mb-4 tracking-tight font-bold text-[#D4AF37] uppercase px-4">{t.unlock.title}</h2>
                            <p className="text-gray-400 text-sm font-sans tracking-wide max-w-lg mx-auto px-4">{t.unlock.subtitle}</p>
                        </div>
                        <div
                            className="flex md:grid md:grid-cols-3 gap-[25px] md:gap-[40px] overflow-x-auto md:overflow-x-visible hide-scrollbar snap-x snap-mandatory px-5 md:px-0"
                            onScroll={handleUnlockScroll}
                        >
                            {t.unlock.cards.map((card, idx) => (
                                <div key={idx} className="flex-shrink-0 w-[85vw] md:w-auto flex flex-col items-center text-center group snap-center">
                                    <div className="relative w-full overflow-hidden rounded-[15px] aspect-[4/5] md:aspect-[3/4] mb-[20px]">
                                        <img
                                            src={`/${card.img}`}
                                            alt={card.t}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-6 left-6 bg-black text-white text-[10px] font-bold tracking-[0.2em] px-4 py-2 uppercase rounded-sm">
                                            {card.t}
                                        </div>
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                                    </div>
                                    <h3 className="serif text-xl md:text-2xl font-bold mb-3 text-black uppercase tracking-wider">{card.title}</h3>
                                    <p className="text-gray-500 font-sans text-[15px] leading-relaxed max-w-[320px] md:max-w-[280px]">
                                        {card.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Scroll Indicators (Mobile Only) */}
                        <div className="flex md:hidden justify-center items-center space-x-3 mt-10">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${activeUnlockIndex === i
                                        ? "w-8 bg-[#D4AF37]"
                                        : "w-2 bg-[#D4AF37]/30"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="pt-[60px] pb-[60px] bg-[#FFFFFF] px-5 md:px-0" id="reviews">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-[1.8rem] md:text-[2.8rem] serif mb-4 tracking-tight font-bold text-[#D4AF37] uppercase">{t.testimonials.title}</h2>
                            <p className="text-black text-sm font-sans tracking-wide mb-8 px-4">{t.testimonials.subtitle}</p>
                            <div className="w-24 h-px bg-luxury-gold mx-auto" />
                        </div>

                        {/* Mobile Carousel / Desktop Grid */}
                        <div className="md:grid md:grid-cols-4 md:gap-8 hidden">
                            {t.testimonials.reviews.map((review, i) => (
                                <div key={i} className="group flex flex-col h-full bg-white rounded-[12px] overflow-hidden transition-all duration-300 hover:border-black border-2 border-transparent shadow-sm hover:shadow-md">
                                    <div className="aspect-square w-full overflow-hidden">
                                        <img src={`/review${i + 1}.png`} alt={review.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow text-left">
                                        <div className="flex mb-4 space-x-1">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />)}
                                        </div>
                                        <h3 className="serif text-xl font-bold mb-3 text-black">{review.name}</h3>
                                        <p className="text-gray-600 serif italic text-[14px] leading-relaxed flex-grow">"{review.text}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile view with simple scroll snap as it's cleaner for thumb swipe */}
                        <div className="flex md:hidden gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-2">
                            {t.testimonials.reviews.map((review, i) => (
                                <div key={i} className="flex-shrink-0 w-[85vw] snap-center group flex flex-col h-full bg-white rounded-[12px] overflow-hidden border border-gray-100 shadow-sm">
                                    <div className="aspect-square w-full overflow-hidden">
                                        <img src={`/review${i + 1}.png`} alt={review.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow text-left">
                                        <div className="flex mb-4 space-x-1">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />)}
                                        </div>
                                        <h3 className="serif text-2xl font-bold mb-3 text-black">{review.name}</h3>
                                        <p className="text-gray-600 serif italic text-[16px] leading-relaxed flex-grow">"{review.text}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="pt-0 pb-[80px] bg-white px-5 md:px-0" id="difference">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:grid md:grid-cols-10 gap-16 items-center">
                            {/* Left Column: Comparison Table - Always first on stack */}
                            <div className="md:col-span-6 space-y-12 order-1">
                                <div className="text-center md:text-left">
                                    <h2 className="text-[1.8rem] md:text-[2.8rem] serif mb-4 tracking-tight font-bold text-[#D4AF37] uppercase">{t.difference.title}</h2>
                                    <p className="text-black font-bold text-xs md:text-sm tracking-[0.3em] uppercase">{t.difference.subtitle}</p>
                                </div>

                                <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
                                    <table className="w-full text-left border-collapse min-w-[320px]">
                                        <thead>
                                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                                <th className="p-4 md:p-6 text-[9px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.2em] text-gray-400 uppercase">{t.difference.labels.feature}</th>
                                                <th className="p-4 md:p-6 text-[9px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.2em] text-gray-400 uppercase text-center">{t.difference.labels.others}</th>
                                                <th className="p-4 md:p-6 text-[9px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.2em] text-[#D4AF37] uppercase text-center bg-[#D4AF37]/5">{t.difference.labels.mgona}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {t.difference.rows.map((row, idx) => (
                                                <tr key={idx} className="group hover:bg-gray-50/30 transition-colors">
                                                    <td className="p-4 md:p-6 text-[11px] md:text-sm font-bold text-black uppercase tracking-wide">{row.f}</td>
                                                    <td className="p-4 md:p-6 text-center">
                                                        <div className="flex flex-col items-center space-y-1">
                                                            <X className="w-4 h-4 md:w-5 md:h-5 text-red-500" strokeWidth={2.5} />
                                                            <span className="text-[8px] md:text-[10px] font-medium text-gray-400 uppercase tracking-tighter">{row.o}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 md:p-6 text-center bg-[#D4AF37]/5">
                                                        <div className="flex flex-col items-center space-y-1">
                                                            <Check className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" strokeWidth={3} />
                                                            <span className="text-[8px] md:text-[10px] font-bold text-[#D4AF37] uppercase tracking-tighter">{row.m}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Right Column: Bottle Splash Image - Below Table on Mobile */}
                            <div className="md:col-span-4 relative group order-2 w-full max-w-md mx-auto">
                                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                                    <motion.img
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 1.5 }}
                                        viewport={{ once: true }}
                                        src="/photo hero pc.png"
                                        alt="MgonaRose Difference"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                                <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl -z-10" />
                            </div>
                        </div>
                    </div>
                </section>



                <section className="py-[60px] bg-[#FFFFFF] px-5 md:px-0" id="products">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-[1.8rem] md:text-[3.2rem] serif mb-6 tracking-tight font-bold text-[#D4AF37] uppercase">{t.shop.title}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
                            <div className="relative">
                                <div className="space-y-8">
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-transparent flex items-center justify-center p-12">
                                        <AnimatePresence mode="wait">
                                            <motion.img key={selectedBundle} src={selectedBundle === 'gold' ? './product1.png' : selectedBundle === 'classic' ? './product2.png' : selectedBundle === 'noir' ? './product3.png' : './offer_pack.png'} alt="MgonaRose" className="w-full h-auto object-contain" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} />
                                        </AnimatePresence>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 px-4">
                                        {[{ id: 'gold', img: './product1.png' }, { id: 'classic', img: './product2.png' }, { id: 'noir', img: './product3.png' }, { id: 'bundle', img: './offer_pack.png' }].map((thumb) => (
                                            <button key={thumb.id} onClick={() => setSelectedBundle(thumb.id)} className={`aspect-square rounded-[12px] overflow-hidden border transition-all p-2 flex items-center justify-center cursor-pointer ${selectedBundle === thumb.id ? 'border-black ring-1 ring-black/5 bg-white shadow-sm' : 'border-[#E0E0E0] opacity-60 hover:opacity-100 bg-white'}`}>
                                                <img src={thumb.img} className="w-full h-full object-contain" alt="MgonaRose" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-5">
                                {['gold', 'classic', 'noir', 'bundle'].map((id) => {
                                    const bundle = t.shop.bundles[id];
                                    return (
                                        <div key={id} onClick={() => setSelectedBundle(id)} onMouseEnter={() => setHoveredBundle(id)} onMouseLeave={() => setHoveredBundle(null)} className={`relative p-8 rounded-[12px] border transition-all duration-300 ease-in-out cursor-pointer ${selectedBundle === id ? 'border-black border-2 bg-white shadow-lg' : hoveredBundle === id ? 'border-black border-2 bg-white' : 'border-[#E0E0E0] bg-white'} ${hoveredBundle && hoveredBundle !== id ? 'opacity-80' : 'opacity-100'}`}>
                                            {bundle.badge && <span className="absolute -top-3 right-8 px-4 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full shadow-sm bg-[#D4AF37] text-black">{bundle.badge}</span>}
                                            <div className="flex items-center space-x-6">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedBundle === id ? 'border-black' : 'border-gray-200'}`}>{selectedBundle === id && <div className="w-2.5 h-2.5 rounded-full bg-black" />}</div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="font-bold text-[18px] serif text-[#000000] tracking-wide">{bundle.title}</h3>
                                                        <div className="text-right"><span className="text-2xl font-bold font-sans text-black">{bundle.price}</span></div>
                                                    </div>
                                                    <p className="text-gray-500 text-[13px] font-sans leading-relaxed mt-1 text-left">{bundle.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="pt-10 space-y-6 text-center">
                                    <button onClick={() => setIsCheckoutOpen(true)} className="w-full bg-black text-[#D4AF37] border border-[#D4AF37] py-6 rounded-xl font-bold font-sans tracking-[0.2em] text-lg hover:bg-[#1a1a1a] transition-all shadow-xl group flex items-center justify-center space-x-3 active:scale-[0.98]">
                                        <span>{t.shop.shopNow}</span>
                                        <span className="text-xl inline-block transform group-hover:translate-x-1 transition-transform font-sans">{'>'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-[60px] bg-[#FFFFFF] px-5 md:px-0">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-[1.8rem] md:text-[3.2rem] serif mb-4 tracking-tight font-bold text-[#D4AF37] uppercase">{t.results.realResultsTitle}</h2>
                            <div className="w-24 h-px bg-luxury-gold mx-auto mb-6" />
                            <p className="text-gray-500 font-sans text-sm italic px-4">{t.results.realResultsSubtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                            <div className="group relative rounded-[12px] overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-black shadow-md">
                                <img src="/skin_results.png" alt="Skin" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-gray-100">
                                    <span className="text-black text-[10px] font-bold tracking-[0.2em] uppercase">{t.results.skinResults}</span>
                                </div>
                            </div>
                            <div className="group relative rounded-[12px] overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-black shadow-md">
                                <img src="/hair_results.png" alt="Hair" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-gray-100">
                                    <span className="text-black text-[10px] font-bold tracking-[0.2em] uppercase">{t.results.hairResults}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-[30px] py-[60px]">
                            <a href="https://www.tiktok.com/@mgonarose" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                                <svg className="w-[28px] h-[28px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/saudicodksa/" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                                <Facebook className="w-[28px] h-[28px]" strokeWidth={1.5} />
                            </a>
                            <a href="https://www.instagram.com/mgonarose/" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                                <Instagram className="w-[28px] h-[28px]" strokeWidth={1.5} />
                            </a>
                        </div>
                    </div>
                </section>

                <section className="py-[60px] bg-white px-5 md:px-0" id="faq">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-stretch justify-center gap-12 md:gap-20">
                            <div className="flex-1 hidden md:flex items-start">
                                <img src="/faq_new_image.png" alt="FAQ" className="w-full h-full object-contain object-left-top" />
                            </div>
                            <div className="flex-1 max-w-2xl flex flex-col justify-between text-left">
                                <div>
                                    <div className="mb-12">
                                        <h2 className="text-[1.8rem] md:text-[3.2rem] serif mb-4 tracking-[0.1em] font-bold text-[#D4AF37] uppercase">{t.faq.title}</h2>
                                        <div className="w-16 h-px bg-gray-200" />
                                    </div>
                                    <div className="space-y-0">
                                        {t.faq.items.map((item, i) => (
                                            <div key={i} className="border-b border-gray-100 last:border-0">
                                                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full py-6 flex justify-between items-center transition-all duration-300 group">
                                                    <span className="text-[17px] font-medium font-sans text-black group-hover:text-gray-600 transition-colors tracking-wide leading-tight pr-8">{item.q}</span>
                                                    <motion.span animate={{ rotate: activeFaq === i ? 180 : 0 }} className="text-gray-400 group-hover:text-black flex-shrink-0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9L12 15L18 9" /></svg></motion.span>
                                                </button>
                                                <AnimatePresence>
                                                    {activeFaq === i && (
                                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                            <p className="pb-8 pt-1 text-gray-400 font-sans font-light leading-relaxed text-[15px]">{item.a}</p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="bg-white text-black pt-12 pb-12 px-6" id="footer">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20 text-left">
                            <div className="space-y-8">
                                <img src="/logo.png" className="h-20 w-auto brightness-0" alt="MgonaRose" />
                                <p className="text-gray-400 text-sm leading-relaxed font-sans max-w-xs">{t.footer.story}</p>
                            </div>
                            <div>
                                <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-8">{t.footer.help}</h4>
                                <ul className="space-y-4 text-sm font-sans text-gray-400">
                                    <li><button onClick={() => handleNavClick('story')} className="hover:text-black transition-colors">{t.footer.aboutUs}</button></li>
                                    <li><button onClick={() => setView('shipping')} className="hover:text-black transition-colors">{t.footer.shipping}</button></li>
                                    <li><button onClick={() => setView('refund')} className="hover:text-black transition-colors">{t.footer.refunds}</button></li>
                                    <li><button onClick={() => setView('privacy')} className="hover:text-black transition-colors">{t.footer.privacy}</button></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-8">{t.footer.contact}</h4>
                                <div className="space-y-4 text-sm font-sans text-gray-400">
                                    <p className="flex items-center space-x-3"><Mail className="w-4 h-4 text-[#D4AF37]" /><span>mgonarose@gmail.com</span></p>
                                    <p className="flex items-center space-x-3"><Phone className="w-4 h-4 text-[#D4AF37]" /><span>0717573727</span></p>
                                </div>
                            </div>
                            <div className="space-y-8">
                                <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-8">{t.footer.newsletter}</h4>
                                <div className="flex border-b border-gray-200 pb-2"><input type="email" placeholder={t.footer.emailPlaceholder} className="bg-transparent border-none outline-none flex-1 text-sm font-sans py-1" /><button className="text-[11px] font-bold tracking-[0.2em] text-black hover:text-[#D4AF37]">{t.footer.join}</button></div>
                                <div className="flex space-x-[30px] justify-start md:justify-start">
                                    <a href="https://www.tiktok.com/@mgonarose" className="text-black hover:text-[#D4AF37] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                        </svg>
                                    </a>
                                    <a href="https://www.facebook.com/saudicodksa/" className="text-black hover:text-[#D4AF37] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                                        <Facebook className="w-5 h-5" strokeWidth={1.5} />
                                    </a>
                                    <a href="https://www.instagram.com/mgonarose/" className="text-black hover:text-[#D4AF37] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                                        <Instagram className="w-5 h-5" strokeWidth={1.5} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-gray-100 flex flex-col items-center space-y-6">
                            <p className="text-[13px] text-gray-400 font-sans tracking-wide">© 2026 MgonaRose. {t.footer.rights}</p>
                            <div className="flex items-center space-x-6 opacity-40">
                                <div className="text-[10px] font-bold border border-black px-2 py-0.5 rounded">VISA</div>
                                <div className="text-[10px] font-bold border border-black px-2 py-0.5 rounded">MASTERCARD</div>
                                <div className="text-[10px] font-bold border border-black px-2 py-0.5 rounded">PAYPAL</div>
                            </div>
                        </div>
                    </div>
                </footer>
            </motion.div >
        );
    };

    return (
        <div className="min-h-screen font-sans selection:bg-luxury-gold selection:text-white text-left">
            <Navbar
                t={t}
                language={language}
                setLanguage={setLanguage}
                onNavClick={handleNavClick}
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
                isScrolled={scrolled}
                cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
                setIsCartOpen={setIsCartOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                t={t}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                productData={productData}
            />
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                t={t}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
            />
            <main>
                <AnimatePresence mode="wait">
                    {renderView()}
                </AnimatePresence>
            </main>

            <AnimatePresence>
                {activeOverlay && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-[200] bg-white overflow-y-auto"
                    >
                        <button
                            onClick={() => setActiveOverlay(null)}
                            className="fixed top-8 right-8 p-3 z-[210] group transition-all duration-300 hover:rotate-90"
                        >
                            <X className="w-10 h-10 text-[#D4AF37] drop-shadow-sm" strokeWidth={1} />
                        </button>
                        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
                            {activeOverlay === 'story' && (
                                <div className="max-w-3xl mx-auto py-12 md:py-20 text-center">
                                    <div className="mb-20">
                                        <h2 className="text-4xl md:text-6xl serif text-black uppercase tracking-tight leading-tight">
                                            {t.legal.about.title}
                                        </h2>
                                        <div className="w-24 h-px bg-luxury-gold mx-auto mt-10" />
                                    </div>
                                    <div className="space-y-16">
                                        <div className="space-y-10">
                                            <h3 className="text-2xl md:text-3xl serif text-luxury-gold italic leading-relaxed">{t.legal.about.subtitle}</h3>
                                            <p className="text-gray-600 font-sans text-lg md:text-xl md:leading-[1.8] leading-relaxed">
                                                {t.legal.about.story.d}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-1 gap-12 pt-10">
                                            {t.legal.about.pillars.map((pillar, idx) => {
                                                const icons = [CheckCircle, Globe, Shield];
                                                const Icon = icons[idx];
                                                return (
                                                    <div key={idx} className="flex flex-col items-center space-y-4">
                                                        <div className="p-4 bg-luxury-cream/10 rounded-full">
                                                            <Icon className="w-8 h-8 text-luxury-gold" />
                                                        </div>
                                                        <div className="space-y-3">
                                                            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-black font-sans">{pillar.t}</h4>
                                                            <p className="text-base text-gray-500 font-sans leading-relaxed max-w-md mx-auto">{pillar.d}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeOverlay === 'benefits' && (
                                <div className="max-w-3xl mx-auto py-12 md:py-20 text-center">
                                    <div className="mb-20">
                                        <h2 className="text-4xl md:text-5xl serif mb-6 tracking-tight text-black font-medium">{t.benefits.title}</h2>
                                        <div className="w-16 h-1 bg-luxury-gold mx-auto" />
                                    </div>
                                    <div className="space-y-16">
                                        {t.benefits.items.map((item, index) => (
                                            <div key={index} className="space-y-4">
                                                <h3 className="text-xl font-bold tracking-[0.3em] text-[#D4AF37] uppercase font-sans">{item.t}</h3>
                                                <p className="text-gray-600 leading-[1.8] font-sans text-lg max-w-xl mx-auto">{item.d}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {activeOverlay === 'how-to-use' && (
                                <div className="max-w-3xl mx-auto py-12 md:py-20 text-center">
                                    <div className="mb-20">
                                        <h2 className="text-4xl md:text-5xl serif mb-6 tracking-tight text-black font-medium">{t.howToUse.title}</h2>
                                        <div className="w-16 h-1 bg-luxury-gold mx-auto" />
                                    </div>
                                    <div className="space-y-20">
                                        {t.howToUse.steps.map((step, index) => (
                                            <div key={index} className="flex flex-col items-center space-y-6">
                                                <span className="text-5xl serif text-luxury-gold/30">0{index + 1}</span>
                                                <div className="space-y-4">
                                                    <h3 className="text-2xl font-bold tracking-widest text-black uppercase font-sans">{step.t}</h3>
                                                    <p className="text-gray-600 leading-[1.8] font-sans text-lg max-w-xl mx-auto">{step.d}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <MobileMenu
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                handleNavClick={handleNavClick}
                t={t}
            />

            {isCheckoutOpen && (
                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                    selectedProduct={productData[selectedBundle]}
                    t={t}
                    language={language}
                />
            )}
        </div>
    );
};

export default App;
