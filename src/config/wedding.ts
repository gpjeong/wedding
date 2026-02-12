// Vite base path를 public 경로에 자동 적용
const base = import.meta.env.BASE_URL;
const asset = (path: string) => `${base}${path.replace(/^\//, '')}`;

export const weddingConfig = {
  // 기본 정보
  groom: {
    name: '정광필',
    englishName: 'Gildong',
    phone: '010-1234-5678',
    father: { name: '정환식', alive: true },
    mother: { name: '성경수', alive: true },
    familyOrder: '장남',
    account: {
      bank: '국민은행',
      number: '524902-01-300399',
      holder: '정광필',
    },
    fatherAccount: {
      bank: '우리은행',
      number: '111-222-333',
      holder: '정환식',
    },
    motherAccount: {
      bank: '신한은행',
      number: '444-555-666',
      holder: '성경수',
    },
  },
  bride: {
    name: '우은정',
    englishName: 'Chunhyang',
    phone: '010-9876-5432',
    father: { name: '우대호', alive: false },
    mother: { name: '이화자', alive: true },
    familyOrder: '삼녀',
    account: {
      bank: '카카오뱅크',
      number: '3333-01-1234567',
      holder: '우은정',
    },
    motherAccount: {
      bank: '하나은행',
      number: '777-888-999',
      holder: '이화자',
    },
  },

  // 예식 정보
  wedding: {
    date: '2026-10-17T13:30:00',
    location: {
      name: 'DMC타워웨딩',
      hall: '펠리체홀 4층',
      address: '서울 마포구 상암로 189 중소기업DMC타워',
      lat: 37.5767396,
      lng: 126.8979123,
      tel: '0507-1318-9308',
      subway: '6호선 공항철도 경의선 디지털미디어시티역 8번출구',
      bus: '간선 171, 172, 673 / 공항버스 6012',
      parking: '지하 주차장 2시간 무료',
    },
  },

  // 인사말
  greeting: `서로 마주 보며 다져온 사랑을
이제 함께 한 곳을 바라보며
걸어갈 수 있는 큰 사랑으로 키우고자 합니다.

저희 두 사람이 사랑의 이름으로 지켜나갈 수 있게
앞날을 축복해 주시면 감사하겠습니다.`,

  // 갤러리 이미지 (public/images/ 경로)
  gallery: [
    asset('/images/photo1.svg'),
    asset('/images/photo2.svg'),
    asset('/images/photo3.svg'),
    asset('/images/photo4.svg'),
    asset('/images/photo5.svg'),
    asset('/images/photo6.svg'),
  ],

  // 메인/커버 이미지
  mainPhoto: asset('/images/main.svg'),
  introPhoto: asset('/images/intro.svg'),

  // 카카오 설정
  kakao: {
    jsKey: '1fc4d9ed95ff86f64cd7bf04a7a2bed0',
    shareImage: asset('/images/share-thumbnail.jpg'),
  },

  // Firebase 설정
  firebase: {
    apiKey: 'AIzaSyD3jOj1CduVpXhY_mqmZR33czhu0eooHS8',
    authDomain: 'wedding-invitation-b32f4.firebaseapp.com',
    projectId: 'wedding-invitation-b32f4',
    storageBucket: 'wedding-invitation-b32f4.firebasestorage.app',
    messagingSenderId: '227190765419',
    appId: '1:227190765419:web:084785417c7ab8a2dd3e2e',
  },

  // 기능 on/off
  features: {
    bgm: true,
    rsvp: true,
    guestbook: true,
    kakaoShare: true,
    kakaoPay: false,
    copyAccount: true,
    navKakao: true,
    navNaver: true,
    navTmap: true,
    flowerEffect: true,
    countdown: true,
  },

  // OG 메타 태그
  meta: {
    title: '광필 ♥ 은정 결혼 합니다',
    description: '2026년 10월 17일 (토)\n오후 1시 30분',
    siteUrl: 'https://gpjeong.github.io/wedding',
  },
};
