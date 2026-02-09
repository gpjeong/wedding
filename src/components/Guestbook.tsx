import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Send } from 'lucide-react';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface GuestbookEntry {
  id: string;
  name: string;
  password: string;
  message: string;
  createdAt: { seconds: number } | null;
}

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as GuestbookEntry[];
        setEntries(data);
      },
      (err) => {
        console.error('방명록 로드 실패:', err);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !password.trim() || !message.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'guestbook'), {
        name: name.trim(),
        password: password.trim(),
        message: message.trim(),
        createdAt: serverTimestamp(),
      });
      setName('');
      setPassword('');
      setMessage('');
    } catch (err) {
      console.error('방명록 저장 실패:', err);
      alert('저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (entry: GuestbookEntry) => {
    const inputPassword = prompt('비밀번호를 입력해주세요.');
    if (!inputPassword) return;

    if (inputPassword !== entry.password) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await deleteDoc(doc(db, 'guestbook', entry.id));
    } catch (err) {
      console.error('방명록 삭제 실패:', err);
      alert('삭제에 실패했습니다.');
    }
  };

  const formatDate = (timestamp: { seconds: number } | null) => {
    if (!timestamp) return '';
    const d = new Date(timestamp.seconds * 1000);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
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
            Guestbook
          </p>
          <div className="ornament mb-6">
            <span className="text-gold-beige/60 text-[10px]">&#10044;</span>
          </div>
          <p className="font-serif text-[14px] text-soft-black/70">
            신랑 신부에게 축하 메시지를 남겨주세요
          </p>
        </div>

        {/* Write form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mb-8 bg-ivory rounded-2xl p-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="grid grid-cols-2 gap-2 mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
              className="w-full px-3.5 py-2.5 bg-light-beige rounded-xl text-[13px] text-soft-black
                         outline-none focus:ring-1 focus:ring-gold-beige/50 transition-shadow"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="w-full px-3.5 py-2.5 bg-light-beige rounded-xl text-[13px] text-soft-black
                         outline-none focus:ring-1 focus:ring-gold-beige/50 transition-shadow"
              required
            />
          </div>
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="축하 메시지를 남겨주세요"
              rows={3}
              className="w-full px-3.5 py-2.5 bg-light-beige rounded-xl text-[13px] text-soft-black
                         resize-none outline-none focus:ring-1 focus:ring-gold-beige/50
                         transition-shadow pr-12"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-gold-beige
                         flex items-center justify-center text-white
                         active:bg-gold-beige/80 transition-colors disabled:opacity-50"
            >
              <Send size={14} />
            </button>
          </div>
        </motion.form>

        {/* Entries list */}
        <div className="space-y-3">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              className="bg-ivory rounded-2xl p-5"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gold-beige/15 flex items-center justify-center">
                    <span className="text-[12px] text-gold-beige font-medium">
                      {entry.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[14px] text-soft-black font-medium">{entry.name}</span>
                    <span className="text-[11px] text-warm-brown/40 ml-2">
                      {formatDate(entry.createdAt)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(entry)}
                  className="text-warm-brown/30 active:text-warm-brown/60 transition-colors p-1"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <p className="text-[13px] text-soft-black/80 leading-relaxed pl-[42px]">
                {entry.message}
              </p>
            </motion.div>
          ))}

          {entries.length === 0 && (
            <p className="text-center text-[13px] text-warm-brown/40 py-8">
              첫 번째 축하 메시지를 남겨주세요
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
