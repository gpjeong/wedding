import { motion } from 'framer-motion';
import { weddingConfig } from '../config/wedding';

const DAYS_KR = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

export default function MainCover() {
  const d = new Date(weddingConfig.wedding.date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const dayOfWeek = DAYS_KR[d.getDay()];
  const hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? '오후' : '오전';
  const displayHour = hours > 12 ? hours - 12 : hours;

  return (
    <section className="relative bg-ivory">
      {/* Main photo */}
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <img
            src={weddingConfig.mainPhoto}
            alt="웨딩 메인 사진"
            className="w-full h-full object-cover"
          />
          {/* Bottom gradient fade into ivory */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32"
            style={{
              background: 'linear-gradient(to bottom, transparent, #FFF8F0)',
            }}
          />
        </div>
      </motion.div>

      {/* Text content below photo */}
      <div className="text-center px-8 pb-16 -mt-4">
        {/* English decorative */}
        <motion.p
          className="font-display italic text-[22px] text-gold-beige tracking-wider mb-8 pt-2 leading-normal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Wedding Invitation
        </motion.p>

        {/* Ornament */}
        <motion.div
          className="ornament mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="text-gold-beige text-xs">&#10044;</span>
        </motion.div>

        {/* Names */}
        <motion.div
          className="font-serif text-[22px] text-soft-black tracking-wider mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span>{weddingConfig.groom.name}</span>
          <span className="mx-4 font-display text-gold-beige text-lg italic">&amp;</span>
          <span>{weddingConfig.bride.name}</span>
        </motion.div>

        {/* Date & Location */}
        <motion.div
          className="space-y-1.5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <p className="text-warm-brown text-[14px] tracking-widest">
            {year}. {month}. {day} {dayOfWeek}
          </p>
          <p className="text-warm-brown text-[14px] tracking-wider">
            {ampm} {displayHour}시 {minutes !== '00' ? `${minutes}분` : ''}
          </p>
          <p className="text-warm-brown/70 text-[13px] mt-3 tracking-wide">
            {weddingConfig.wedding.location.name} {weddingConfig.wedding.location.hall}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
