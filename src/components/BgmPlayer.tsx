import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface BgmPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function BgmPlayer({ isPlaying, onToggle }: BgmPlayerProps) {
  return (
    <motion.button
      className="fixed top-5 right-5 z-30 w-10 h-10 rounded-full
                 bg-white/90 backdrop-blur-sm shadow-lg shadow-black/5
                 flex items-center justify-center text-gold-beige
                 active:scale-95 transition-transform"
      onClick={onToggle}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      whileTap={{ scale: 0.9 }}
    >
      {isPlaying ? (
        <Volume2 size={16} strokeWidth={1.8} />
      ) : (
        <VolumeX size={16} strokeWidth={1.8} />
      )}

      {/* Playing indicator ring animation */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full border border-gold-beige/30"
          animate={{ scale: [1, 1.3, 1.3], opacity: [0.5, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
    </motion.button>
  );
}
