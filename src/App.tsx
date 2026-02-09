import { useEffect, useRef } from 'react';
import { weddingConfig } from './config/wedding';
import { useAudio } from './hooks/useAudio';
import MainCover from './components/MainCover';
import Greeting from './components/Greeting';
import FamilyInfo from './components/FamilyInfo';
import Calendar from './components/Calendar';
import Gallery from './components/Gallery';
import Location from './components/Location';
import Account from './components/Account';
import Rsvp from './components/Rsvp';
import Guestbook from './components/Guestbook';
import Share from './components/Share';
import Footer from './components/Footer';
import BgmPlayer from './components/BgmPlayer';
import FlowerEffect from './components/FlowerEffect';

function App() {
  const { isPlaying, play, toggle } = useAudio('/bgm.mp3');
  const bgmStarted = useRef(false);

  // 첫 번째 사용자 인터랙션(터치/클릭) 시 BGM 자동 재생
  useEffect(() => {
    if (!weddingConfig.features.bgm) return;

    const startBgm = () => {
      if (!bgmStarted.current) {
        bgmStarted.current = true;
        play();
      }
      document.removeEventListener('click', startBgm);
      document.removeEventListener('touchstart', startBgm);
    };

    document.addEventListener('click', startBgm, { once: true });
    document.addEventListener('touchstart', startBgm, { once: true });

    return () => {
      document.removeEventListener('click', startBgm);
      document.removeEventListener('touchstart', startBgm);
    };
  }, [play]);

  return (
    <>
      {/* Flower petal effect */}
      {weddingConfig.features.flowerEffect && <FlowerEffect />}

      {/* BGM toggle button */}
      {weddingConfig.features.bgm && (
        <BgmPlayer isPlaying={isPlaying} onToggle={toggle} />
      )}

      {/* Main sections */}
      <main>
        <MainCover />
        <Greeting />
        <FamilyInfo />
        <Calendar />
        <Gallery />
        <Location />
        <Account />
        {weddingConfig.features.rsvp && <Rsvp />}
        {weddingConfig.features.guestbook && <Guestbook />}
        <Share />
        <Footer />
      </main>
    </>
  );
}

export default App;
