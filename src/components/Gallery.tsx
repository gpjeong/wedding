import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingConfig } from '../config/wedding';

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const images = weddingConfig.gallery;

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  }, [images.length]);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, [images.length]);

  // Touch swipe support
  let touchStartX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  return (
    <section className="py-20 px-6 bg-light-beige">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="font-display italic text-[18px] text-gold-beige tracking-wider mb-3">
            Gallery
          </p>
          <div className="ornament">
            <span className="text-gold-beige/60 text-[10px]">&#10044;</span>
          </div>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-3 gap-[3px] rounded-lg overflow-hidden">
          {images.map((src, index) => (
            <motion.div
              key={index}
              className="aspect-square overflow-hidden cursor-pointer relative group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={src}
                alt={`웨딩 사진 ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500
                           group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/95 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center
                         text-white/70 hover:text-white transition-colors"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>

            {/* Image counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50 text-[12px] tracking-widest">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Navigation arrows */}
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10
                         flex items-center justify-center text-white/50 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft size={28} />
            </button>
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10
                         flex items-center justify-center text-white/50 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight size={28} />
            </button>

            {/* Image */}
            <div
              className="w-full h-full flex items-center justify-center px-4"
              onClick={closeLightbox}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIndex}
                  src={images[selectedIndex]}
                  alt={`확대 사진 ${selectedIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain select-none"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()}
                  draggable={false}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
