import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { weddingConfig } from '../config/wedding';

interface PersonContactProps {
  label: string;
  name: string;
  phone: string;
  alive?: boolean;
}

function PersonContact({ label, name, phone, alive = true }: PersonContactProps) {
  const phoneNumber = phone.replace(/-/g, '');

  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-2">
        <span className="text-warm-brown/60 text-[13px] w-8">{label}</span>
        <span className="text-soft-black text-[15px] font-serif">
          {!alive && <span className="text-warm-brown/50 text-[13px] mr-1">故</span>}
          {name}
        </span>
      </div>
      {alive && (
        <div className="flex items-center gap-1.5">
          <a
            href={`tel:${phoneNumber}`}
            className="w-8 h-8 rounded-full bg-gold-beige/15 flex items-center justify-center
                       active:bg-gold-beige/30 transition-colors"
          >
            <Phone size={14} className="text-gold-beige" />
          </a>
          <a
            href={`sms:${phoneNumber}`}
            className="w-8 h-8 rounded-full bg-gold-beige/15 flex items-center justify-center
                       active:bg-gold-beige/30 transition-colors"
          >
            <MessageCircle size={14} className="text-gold-beige" />
          </a>
        </div>
      )}
    </div>
  );
}

export default function FamilyInfo() {
  const { groom, bride } = weddingConfig;

  return (
    <section className="py-20 px-8 bg-light-beige">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Names display */}
        <div className="text-center mb-10">
          <div className="font-serif text-[15px] text-soft-black leading-[2.4]">
            <p>
              <span className="text-warm-brown/60 text-[13px]">
                {!groom.father.alive && <span className="text-warm-brown/40">故 </span>}
                {groom.father.name} · {!groom.mother.alive && <span className="text-warm-brown/40">故 </span>}{groom.mother.name}
              </span>
              <span className="text-warm-brown/40 mx-2">의</span>
              <span className="text-warm-brown/60 text-[13px]">{groom.familyOrder}</span>
              <span className="ml-2 text-[18px] font-bold">{groom.name}</span>
            </p>
            <p>
              <span className="text-warm-brown/60 text-[13px]">
                {!bride.father.alive && <span className="text-warm-brown/40">故 </span>}
                {bride.father.name} · {!bride.mother.alive && <span className="text-warm-brown/40">故 </span>}{bride.mother.name}
              </span>
              <span className="text-warm-brown/40 mx-2">의</span>
              <span className="text-warm-brown/60 text-[13px]">{bride.familyOrder}</span>
              <span className="ml-2 text-[18px] font-bold">{bride.name}</span>
            </p>
          </div>
        </div>

        {/* Contact cards */}
        <div className="space-y-4">
          {/* Groom side */}
          <motion.div
            className="bg-ivory rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-gold-beige text-[12px] tracking-widest uppercase mb-3">
              Groom
            </p>
            <PersonContact label="신랑" name={groom.name} phone={groom.phone} />
            <div className="w-full h-[0.5px] bg-gold-beige/15 my-1" />
            <PersonContact label="부" name={groom.father.name} phone="010-0000-0000" alive={groom.father.alive} />
            <div className="w-full h-[0.5px] bg-gold-beige/15 my-1" />
            <PersonContact label="모" name={groom.mother.name} phone="010-0000-0000" alive={groom.mother.alive} />
          </motion.div>

          {/* Bride side */}
          <motion.div
            className="bg-ivory rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="text-gold-beige text-[12px] tracking-widest uppercase mb-3">
              Bride
            </p>
            <PersonContact label="신부" name={bride.name} phone={bride.phone} />
            <div className="w-full h-[0.5px] bg-gold-beige/15 my-1" />
            <PersonContact label="부" name={bride.father.name} phone="010-0000-0000" alive={bride.father.alive} />
            <div className="w-full h-[0.5px] bg-gold-beige/15 my-1" />
            <PersonContact label="모" name={bride.mother.name} phone="010-0000-0000" alive={bride.mother.alive} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
