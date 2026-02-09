import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../config/wedding';

interface IntroProps {
  isOpen: boolean;
  onOpen: () => void;
}

function LetterAnimation({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * 0.08,
            duration: 0.5,
            ease: 'easeOut',
          }}
          className="inline-block"
          style={{ minWidth: char === ' ' ? '0.3em' : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Intro({ isOpen, onOpen }: IntroProps) {
  const weddingDate = new Date(weddingConfig.wedding.date);
  const year = weddingDate.getFullYear();
  const month = String(weddingDate.getMonth() + 1).padStart(2, '0');
  const day = String(weddingDate.getDate()).padStart(2, '0');

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
          style={{ maxWidth: 430, margin: '0 auto' }}
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Background photo with overlay */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{ backgroundImage: `url(${weddingConfig.introPhoto})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center text-white px-10">
            {/* English decorative text */}
            <motion.p
              className="font-display text-sm tracking-[0.3em] uppercase opacity-80 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Wedding Invitation
            </motion.p>

            {/* Names with letter-by-letter animation */}
            <div className="font-serif text-[28px] tracking-wide mb-3 font-bold">
              <LetterAnimation text={weddingConfig.groom.name} delay={0.8} />
              <motion.span
                className="inline-block mx-3 text-[#C9956B]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 0.6, ease: 'easeOut' }}
              >
                &hearts;
              </motion.span>
              <LetterAnimation text={weddingConfig.bride.name} delay={1.8} />
            </div>

            {/* Date */}
            <motion.p
              className="text-[13px] tracking-[0.25em] opacity-80 mt-6 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 2.6, duration: 0.8 }}
            >
              {year}. {month}. {day}
            </motion.p>

            {/* Open button */}
            <motion.button
              onClick={onOpen}
              className="mt-14 border border-white/50 text-white text-[13px] tracking-[0.2em]
                         px-10 py-3.5 hover:bg-white/10 active:bg-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.8, ease: 'easeOut' }}
              whileTap={{ scale: 0.97 }}
            >
              초대장 열기
            </motion.button>
          </div>

          {/* Bottom scroll hint */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ delay: 3.5, duration: 2, repeat: Infinity }}
          >
            <div className="w-[1px] h-8 bg-white/60 mx-auto" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
