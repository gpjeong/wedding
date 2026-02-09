import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { weddingConfig } from '../config/wedding';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 bg-light-beige">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Scroll to top */}
        <button
          onClick={scrollToTop}
          className="mx-auto mb-6 w-10 h-10 rounded-full bg-gold-beige/15
                     flex items-center justify-center text-gold-beige
                     active:bg-gold-beige/25 transition-colors"
        >
          <ArrowUp size={18} />
        </button>

        {/* Decorative text */}
        <p className="font-display italic text-[14px] text-gold-beige/50 tracking-wider mb-4">
          Thank you
        </p>

        {/* Copyright */}
        <p className="text-[11px] text-warm-brown/40 tracking-wider">
          &copy; 2026 {weddingConfig.groom.name} &amp; {weddingConfig.bride.name}
        </p>
      </motion.div>
    </footer>
  );
}
