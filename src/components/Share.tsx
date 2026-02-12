import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, MessageCircle, Check } from 'lucide-react';
import { weddingConfig } from '../config/wedding';

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: object) => void;
      };
    };
  }
}

export default function Share() {
  const [copied, setCopied] = useState(false);

  const shareKakao = () => {
    if (!window.Kakao) {
      alert('카카오 SDK를 불러오지 못했습니다.');
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(weddingConfig.kakao.jsKey);
    }

    // 현재 접속 URL 사용 (로컬/배포 환경 모두 대응)
    const currentUrl = window.location.origin + import.meta.env.BASE_URL;
    const imageUrl = currentUrl + weddingConfig.kakao.shareImage.replace(/^\//, '').replace(import.meta.env.BASE_URL, '');

    console.log('[Kakao Share] initialized:', window.Kakao.isInitialized());
    console.log('[Kakao Share] currentUrl:', currentUrl);
    console.log('[Kakao Share] imageUrl:', imageUrl);

    const { lat, lng } = weddingConfig.wedding.location;
    const locationUrl = `https://map.naver.com/p/entry/place/${lat},${lng}`;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: weddingConfig.meta.title,
        description: weddingConfig.meta.description,
        imageUrl,
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
        {
          title: '위치 보기',
          link: {
            mobileWebUrl: locationUrl,
            webUrl: locationUrl,
          },
        },
      ],
    });
  };

  const copyLink = async () => {
    const currentUrl = window.location.origin + import.meta.env.BASE_URL;
    try {
      await navigator.clipboard.writeText(currentUrl);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = currentUrl;
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
    <section className="py-16 px-6 bg-ivory">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="text-center mb-8">
          <p className="font-display italic text-[18px] text-gold-beige tracking-wider mb-3">
            Share
          </p>
          <div className="ornament">
            <span className="text-gold-beige/60 text-[10px]">&#10044;</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 max-w-[280px] mx-auto">
          {/* Kakao share */}
          {weddingConfig.features.kakaoShare && (
            <motion.button
              onClick={shareKakao}
              className="flex items-center justify-center gap-2.5 py-3.5
                         bg-[#FEE500] text-[#3B1C1C] rounded-xl text-[14px]
                         active:bg-[#F5DC00] transition-colors"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={18} />
              카카오톡으로 공유하기
            </motion.button>
          )}

          {/* Copy link */}
          <motion.button
            onClick={copyLink}
            className="flex items-center justify-center gap-2.5 py-3.5
                       bg-light-beige text-soft-black rounded-xl text-[14px]
                       active:bg-deep-ivory transition-colors"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileTap={{ scale: 0.98 }}
          >
            {copied ? (
              <>
                <Check size={18} className="text-green-500" />
                링크가 복사되었습니다
              </>
            ) : (
              <>
                <Link size={18} />
                링크 주소 복사하기
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
