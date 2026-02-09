import { motion } from 'framer-motion';
import { weddingConfig } from '../config/wedding';
import { useCountdown } from '../hooks/useCountdown';

const DAYS_SHORT = ['일', '월', '화', '수', '목', '금', '토'];
const DAYS_FULL = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

export default function Calendar() {
  const wd = new Date(weddingConfig.wedding.date);
  const year = wd.getFullYear();
  const month = wd.getMonth();
  const date = wd.getDate();
  const dayOfWeek = DAYS_FULL[wd.getDay()];
  const hours = wd.getHours();
  const minutes = String(wd.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? '오후' : '오전';
  const displayHour = hours > 12 ? hours - 12 : hours;

  const countdown = useCountdown(weddingConfig.wedding.date);

  // Build calendar grid
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let d = 1; d <= lastDateOfMonth; d++) calendarDays.push(d);
  // Fill remaining cells to complete the row
  while (calendarDays.length % 7 !== 0) calendarDays.push(null);

  return (
    <section className="py-20 px-8 bg-ivory">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Section title */}
        <p className="font-display italic text-[18px] text-gold-beige tracking-wider mb-3">
          Calendar
        </p>
        <div className="ornament mb-10">
          <span className="text-gold-beige/60 text-[10px]">&#10044;</span>
        </div>

        {/* Date info */}
        <p className="font-serif text-[15px] text-soft-black mb-1">
          {year}년 {month + 1}월 {date}일 {dayOfWeek}
        </p>
        <p className="text-warm-brown/70 text-[14px] mb-8">
          {ampm} {displayHour}시 {minutes !== '00' ? `${minutes}분` : ''}
        </p>

        {/* Mini Calendar */}
        <motion.div
          className="max-w-[300px] mx-auto mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Month header */}
          <div className="mb-4">
            <p className="font-display italic text-[16px] text-gold-beige">
              {['January','February','March','April','May','June',
                'July','August','September','October','November','December'][month]} {year}
            </p>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_SHORT.map((d, i) => (
              <div
                key={d}
                className={`py-1 text-[12px] font-medium ${
                  i === 0 ? 'text-[#d4a0a0]' : i === 6 ? 'text-[#8fa8c8]' : 'text-warm-brown/60'
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((d, i) => {
              const isWeddingDay = d === date;
              const dayIndex = i % 7;
              return (
                <div
                  key={i}
                  className="flex items-center justify-center py-[6px]"
                >
                  {d ? (
                    <div
                      className={`w-8 h-8 flex items-center justify-center text-[13px] rounded-full
                        ${isWeddingDay
                          ? 'bg-gold-beige text-white font-bold'
                          : dayIndex === 0
                            ? 'text-[#d4a0a0]'
                            : dayIndex === 6
                              ? 'text-[#8fa8c8]'
                              : 'text-soft-black/70'
                        }`}
                    >
                      {d}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Countdown */}
        {weddingConfig.features.countdown && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="w-12 h-[0.5px] bg-gold-beige/40 mx-auto mb-8" />

            {countdown.isExpired ? (
              <p className="font-serif text-[15px] text-gold-beige">
                결혼식이 진행되었습니다
              </p>
            ) : (
              <>
                <p className="text-warm-brown/60 text-[13px] tracking-wider mb-5">
                  결혼식까지
                </p>
                <div className="flex justify-center gap-6">
                  {[
                    { value: countdown.days, label: 'Days' },
                    { value: countdown.hours, label: 'Hours' },
                    { value: countdown.minutes, label: 'Min' },
                    { value: countdown.seconds, label: 'Sec' },
                  ].map((item) => (
                    <div key={item.label} className="text-center min-w-[48px]">
                      <div className="font-display text-[28px] text-gold-beige leading-none">
                        {String(item.value).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] text-warm-brown/50 tracking-wider mt-2 uppercase">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 font-serif text-[14px] text-gold-beige/80">
                  D-{countdown.days}
                </p>
              </>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
