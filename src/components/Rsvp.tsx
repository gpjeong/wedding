import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

type AttendanceType = 'attending' | 'undecided' | 'declined';

export default function Rsvp() {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<AttendanceType>('attending');
  const [meal, setMeal] = useState(true);
  const [guests, setGuests] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'rsvp'), {
        name: name.trim(),
        attendance,
        meal,
        guests,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('RSVP 저장 실패:', err);
      alert('전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const attendanceOptions: { value: AttendanceType; label: string }[] = [
    { value: 'attending', label: '참석' },
    { value: 'undecided', label: '미정' },
    { value: 'declined', label: '불참' },
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
            RSVP
          </p>
          <div className="ornament mb-6">
            <span className="text-gold-beige/60 text-[10px]">&#10044;</span>
          </div>
          <p className="font-serif text-[14px] text-soft-black/70 leading-relaxed">
            참석 여부를 미리 알려주시면<br />
            준비하는 데 큰 도움이 됩니다
          </p>
        </div>

        {submitted ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mb-4"
            >
              <Heart size={32} className="mx-auto text-gold-beige fill-gold-beige/30" />
            </motion.div>
            <p className="font-serif text-[16px] text-soft-black mb-2">감사합니다</p>
            <p className="text-[14px] text-warm-brown/70">참석 의사가 전달되었습니다</p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5 bg-light-beige rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Name */}
            <div>
              <label className="block text-[12px] text-warm-brown/60 tracking-wider uppercase mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="성함을 입력해주세요"
                className="w-full px-4 py-3.5 bg-ivory rounded-xl text-[14px] text-soft-black
                           outline-none focus:ring-1 focus:ring-gold-beige/50 transition-shadow"
                required
              />
            </div>

            {/* Attendance */}
            <div>
              <label className="block text-[12px] text-warm-brown/60 tracking-wider uppercase mb-2">
                Attendance
              </label>
              <div className="flex gap-2">
                {attendanceOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setAttendance(option.value)}
                    className={`flex-1 py-3 rounded-xl text-[13px] transition-all duration-300 ${
                      attendance === option.value
                        ? 'bg-gold-beige text-white shadow-sm'
                        : 'bg-ivory text-warm-brown/60 hover:text-warm-brown'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Meal */}
            <div>
              <label className="block text-[12px] text-warm-brown/60 tracking-wider uppercase mb-2">
                Meal
              </label>
              <div className="flex gap-2">
                {[
                  { value: true, label: '식사 함' },
                  { value: false, label: '식사 안 함' },
                ].map((option) => (
                  <button
                    key={String(option.value)}
                    type="button"
                    onClick={() => setMeal(option.value)}
                    className={`flex-1 py-3 rounded-xl text-[13px] transition-all duration-300 ${
                      meal === option.value
                        ? 'bg-gold-beige text-white shadow-sm'
                        : 'bg-ivory text-warm-brown/60 hover:text-warm-brown'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest count */}
            <div>
              <label className="block text-[12px] text-warm-brown/60 tracking-wider uppercase mb-2">
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-4 py-3.5 bg-ivory rounded-xl text-[14px] text-soft-black
                           outline-none focus:ring-1 focus:ring-gold-beige/50 transition-shadow pr-10"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    총 {n}명
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gold-beige text-white rounded-xl text-[14px] tracking-wider
                         hover:bg-gold-beige/90 active:bg-gold-beige/80
                         transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? '전송 중...' : '참석 의사 전달하기'}
            </button>
          </motion.form>
        )}
      </motion.div>
    </section>
  );
}
