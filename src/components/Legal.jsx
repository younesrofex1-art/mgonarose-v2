import React from 'react';
import { motion } from 'framer-motion';

export const LegalView = ({ title, children, onBack, t }) => (
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

export const ShippingPolicy = ({ t }) => (
    <div className="space-y-12">
        {t.legal.shipping.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
                <h2 className="text-xl font-bold text-black uppercase tracking-widest">{section.t}</h2>
                <div className="text-gray-600 leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: section.d }} />
            </div>
        ))}
    </div>
);

export const RefundPolicy = ({ t }) => (
    <div className="space-y-12">
        {t.legal.refund.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
                <h2 className="text-xl font-bold text-black uppercase tracking-widest">{section.t}</h2>
                <div className="text-gray-600 leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: section.d }} />
            </div>
        ))}
    </div>
);

export const PrivacyPolicy = ({ t }) => (
    <div className="space-y-12">
        {t.legal.privacy.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
                <h2 className="text-xl font-bold text-black uppercase tracking-widest">{section.t}</h2>
                <div className="text-gray-600 leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: section.d }} />
            </div>
        ))}
    </div>
);
