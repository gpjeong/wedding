import { motion } from 'framer-motion';
import { weddingConfig } from '../config/wedding';

export default function Greeting() {
  const lines = weddingConfig.greeting.split('\n');

  return (
    <section className="py-20 px-10 bg-ivory">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Section title */}
        <motion.p
          className="font-display italic text-[18px] text-gold-beige tracking-wider mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Invitation
        </motion.p>

        {/* Ornament */}
        <motion.div
          className="ornament mb-10"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="text-gold-beige/60 text-[10px]">&#10044;</span>
        </motion.div>

        {/* Greeting text - line by line */}
        <div className="space-y-0">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              className={`font-serif text-[15px] leading-[2.2] text-soft-black/85 ${
                line.trim() === '' ? 'h-4' : ''
              }`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
            >
              {line || '\u00A0'}
            </motion.p>
          ))}
        </div>

        {/* Bottom ornament */}
        <motion.div
          className="ornament mt-10"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <span className="text-gold-beige/60 text-[10px]">&#10044;</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
