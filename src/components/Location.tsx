import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, MapPin, Navigation, Train, Bus, Car, Check } from 'lucide-react';
import { weddingConfig } from '../config/wedding';

export default function Location() {
  const [copied, setCopied] = useState(false);
  const { location } = weddingConfig.wedding;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(location.address);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = location.address;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openNavKakao = () => {
    window.open(
      `https://map.kakao.com/link/to/${encodeURIComponent(location.name)},${location.lat},${location.lng}`
    );
  };

  const openNavNaver = () => {
    const encodedName = encodeURIComponent(location.name);
    window.open(
      `https://map.naver.com/v5/search/${encodedName}?c=${location.lng},${location.lat},15,0,0,0,dh`
    );
  };

  const openNavTmap = () => {
    const encodedName = encodeURIComponent(location.name);
    window.open(
      `https://tmap.life/route?goalx=${location.lng}&goaly=${location.lat}&goalname=${encodedName}`
    );
  };

  const navButtons = [
    { show: weddingConfig.features.navKakao, label: '카카오맵', onClick: openNavKakao },
    { show: weddingConfig.features.navNaver, label: '네이버지도', onClick: openNavNaver },
    { show: weddingConfig.features.navTmap, label: '티맵', onClick: openNavTmap },
  ].filter(b => b.show);

  const transportInfo = [
    { icon: Train, label: '지하철', text: location.subway },
    { icon: Bus, label: '버스', text: location.bus },
    { icon: Car, label: '주차', text: location.parking },
  ];

  return (
    <section className="py-20 px-6 bg-ivory">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="font-display italic text-[18px] text-gold-beige tracking-wider mb-3">
            Location
          </p>
          <div className="ornament mb-8">
            <span className="text-gold-beige/60 text-[10px]">&#10044;</span>
          </div>
          <p className="font-serif text-[17px] text-soft-black">{location.name}</p>
          <p className="text-[13px] text-warm-brown/70 mt-1">{location.hall}</p>
        </div>

        {/* Google Map embed - 클릭하면 네이버 지도로 이동 */}
        <motion.div
          className="w-full h-[220px] rounded-2xl overflow-hidden mb-5 relative"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <iframe
            src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=16&output=embed`}
            className="w-full h-full border-0"
            title="지도"
            loading="lazy"
            referrerPolicy="no-referrer"
            allowFullScreen
          />
          {/* 지도 위 오버레이 - 탭하면 네이버 지도로 이동 */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={openNavNaver}
          >
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5
                            flex items-center gap-1.5 shadow-sm">
              <MapPin size={12} className="text-gold-beige" />
              <span className="text-[11px] text-soft-black/70">지도 크게 보기</span>
            </div>
          </div>
        </motion.div>

        {/* Address with copy */}
        <motion.div
          className="bg-light-beige rounded-2xl p-4 mb-5"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-gold-beige mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-[14px] text-soft-black leading-relaxed">{location.address}</p>
              <p className="text-[12px] text-warm-brown/60 mt-1">TEL. {location.tel}</p>
            </div>
            <button
              onClick={copyAddress}
              className="shrink-0 flex items-center gap-1 px-3 py-1.5 bg-ivory rounded-full
                         text-[11px] text-warm-brown active:bg-gold-beige/10 transition-colors"
            >
              {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
              {copied ? '복사됨' : '주소복사'}
            </button>
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <motion.div
          className="grid grid-cols-3 gap-2 mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {navButtons.map((btn) => (
            <button
              key={btn.label}
              onClick={btn.onClick}
              className="flex flex-col items-center gap-2 py-4 bg-light-beige rounded-2xl
                         active:bg-deep-ivory transition-colors"
            >
              <Navigation size={18} className="text-gold-beige" />
              <span className="text-[12px] text-soft-black/80">{btn.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Transportation info */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {transportInfo.map((info) => (
            <div key={info.label} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-gold-beige/10 flex items-center justify-center shrink-0 mt-0.5">
                <info.icon size={14} className="text-gold-beige" />
              </div>
              <div>
                <p className="text-[12px] text-gold-beige font-medium mb-0.5">{info.label}</p>
                <p className="text-[13px] text-soft-black/80 leading-relaxed">{info.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
