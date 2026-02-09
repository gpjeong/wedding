import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Copy, Check } from 'lucide-react';
import { weddingConfig } from '../config/wedding';

interface AccountInfo {
  bank: string;
  number: string;
  holder: string;
}

function AccountItem({ account, delay }: { account: AccountInfo; delay: number }) {
  const [copied, setCopied] = useState(false);

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(account.number);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = account.number;
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

  return (
    <motion.div
      className="flex items-center justify-between py-3.5"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <div>
        <p className="text-[12px] text-warm-brown/60 mb-0.5">{account.bank}</p>
        <p className="text-[14px] text-soft-black tracking-wide">{account.number}</p>
        <p className="text-[12px] text-warm-brown/50 mt-0.5">{account.holder}</p>
      </div>
      {weddingConfig.features.copyAccount && (
        <button
          onClick={copyAccount}
          className="flex items-center gap-1.5 px-4 py-2 bg-gold-beige/10 rounded-full
                     text-[12px] text-gold-beige active:bg-gold-beige/20 transition-colors shrink-0"
        >
          {copied ? (
            <>
              <Check size={12} /> 복사됨
            </>
          ) : (
            <>
              <Copy size={12} /> 복사
            </>
          )}
        </button>
      )}
    </motion.div>
  );
}

function AccordionSection({
  title,
  subtitle,
  accounts,
  isOpen,
  onToggle,
}: {
  title: string;
  subtitle: string;
  accounts: AccountInfo[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-ivory rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 active:bg-light-beige/50 transition-colors"
      >
        <div className="text-left">
          <p className="text-gold-beige text-[11px] tracking-widest uppercase mb-0.5">{title}</p>
          <p className="text-[14px] font-serif text-soft-black">{subtitle}</p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={18} className="text-warm-brown/40" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <div className="w-full h-[0.5px] bg-gold-beige/15 mb-1" />
              {accounts.map((account, i) => (
                <div key={i}>
                  <AccountItem account={account} delay={i * 0.1} />
                  {i < accounts.length - 1 && (
                    <div className="w-full h-[0.5px] bg-gold-beige/10" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function collectAccounts(person: typeof weddingConfig.groom | typeof weddingConfig.bride) {
  const list: AccountInfo[] = [person.account];
  if ('fatherAccount' in person && person.fatherAccount) list.push(person.fatherAccount);
  if ('motherAccount' in person && person.motherAccount) list.push(person.motherAccount as AccountInfo);
  return list;
}

export default function Account() {
  const [openSection, setOpenSection] = useState<'groom' | 'bride' | null>(null);
  const { groom, bride } = weddingConfig;

  const toggle = (section: 'groom' | 'bride') => {
    setOpenSection(openSection === section ? null : section);
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
            Gift
          </p>
          <div className="ornament mb-6">
            <span className="text-gold-beige/60 text-[10px]">&#10044;</span>
          </div>
          <p className="font-serif text-[14px] text-soft-black/70 leading-relaxed">
            축하의 마음을 전해주시는 분들을 위해<br />
            계좌번호를 안내드립니다
          </p>
        </div>

        {/* Accordion sections */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <AccordionSection
              title="Groom"
              subtitle="신랑측 계좌번호"
              accounts={collectAccounts(groom)}
              isOpen={openSection === 'groom'}
              onToggle={() => toggle('groom')}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <AccordionSection
              title="Bride"
              subtitle="신부측 계좌번호"
              accounts={collectAccounts(bride)}
              isOpen={openSection === 'bride'}
              onToggle={() => toggle('bride')}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
