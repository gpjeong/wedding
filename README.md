# 모바일 청첩장 (Mobile Wedding Invitation)

투아워게스트 "Amalfi" 템플릿에서 영감 받은 모바일 최적화 웹 청첩장입니다.
따뜻한 아이보리 & 골드 베이지 컬러에 부드러운 스크롤 애니메이션, 산뜻한 BGM이 포함된 원페이지 구조입니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 19 + TypeScript (Vite 7) |
| 스타일링 | TailwindCSS 4 |
| 애니메이션 | Framer Motion |
| 아이콘 | Lucide React |
| 지도 | Google Maps (임베드) + 네이버/카카오/티맵 내비 연동 |
| 방명록/RSVP | Firebase Firestore |
| 데이터 연동 | Google Sheets (Apps Script) |
| 배포 | GitHub Pages (gh-pages) |
| 폰트 | Gowun Batang, Noto Sans KR, Cormorant Garamond |

## 시작하기

### 사전 요구사항

- Node.js 20 이상 (`nvm use 20`)

### 설치 및 실행

```bash
cd wedding-invitation
nvm use 20
npm install
npm run dev
```

브라우저에서 `http://localhost:5173/wedding/` 접속

### 빌드 및 배포

```bash
npm run build    # 프로덕션 빌드
npm run deploy   # GitHub Pages 배포
```

배포 URL: https://gpjeong.github.io/wedding/

### 사이트 공개/비공개 전환

빈 페이지를 gh-pages에 덮어써서 사이트를 내리고, 다시 빌드+배포하여 올릴 수 있습니다.

```bash
# 사이트 내리기 (빈 페이지로 덮어쓰기 → 빈 화면)
npm run site:down

# 사이트 올리기 (빌드 + 배포)
npm run site:up
```

## 프로젝트 구조

```
wedding-invitation/
├── public/
│   ├── images/              # 웨딩 사진들
│   │   ├── main.svg         # 메인 커버 사진
│   │   ├── photo1~6.svg     # 갤러리 사진
│   │   └── share-thumbnail.svg
│   └── bgm.mp3             # 배경음악
├── src/
│   ├── components/
│   │   ├── MainCover.tsx    # 메인 커버 (사진 + 이름 + 날짜)
│   │   ├── Greeting.tsx     # 인사말
│   │   ├── FamilyInfo.tsx   # 양가 가족 안내 + 연락처 (故 표시 지원)
│   │   ├── Calendar.tsx     # 캘린더 + D-day 카운트다운
│   │   ├── Gallery.tsx      # 갤러리 + 라이트박스
│   │   ├── Location.tsx     # 오시는 길 + Google Map + 내비 연동
│   │   ├── Account.tsx      # 축의금 계좌 (아코디언)
│   │   ├── Rsvp.tsx         # 참석 의사 폼
│   │   ├── Guestbook.tsx    # 방명록
│   │   ├── Share.tsx        # 카카오톡 공유 + 링크 복사
│   │   ├── Footer.tsx       # 푸터
│   │   ├── BgmPlayer.tsx    # BGM 재생/정지 토글
│   │   └── FlowerEffect.tsx # 가을 단풍잎 파티클 효과
│   ├── config/
│   │   └── wedding.ts       # 모든 개인 정보 설정 파일
│   ├── hooks/
│   │   ├── useAudio.ts      # BGM 재생 훅
│   │   └── useCountdown.ts  # D-day 카운트다운 훅
│   ├── lib/
│   │   └── firebase.ts      # Firebase 초기화
│   ├── styles/
│   │   └── index.css        # TailwindCSS + 커스텀 테마
│   ├── App.tsx
│   └── main.tsx
├── google-apps-script.js     # Google Sheets 연동 스크립트
├── index.html
├── vite.config.ts
└── .nvmrc                   # Node 20 고정
```

## 주요 기능

- **가을 단풍잎 효과**: 10월 결혼 컨셉에 맞춘 단풍잎 파티클 (5가지 가을 컬러, 3D 뒤집힘 효과)
- **BGM 자동 재생**: 첫 클릭/터치 시 자동 재생 시작
- **Google Maps 임베드**: API 키 없이 지도 표시, 클릭 시 네이버 지도로 이동
- **내비게이션 연동**: 카카오맵 / 네이버지도 / 티맵 길찾기 버튼
- **카카오톡 공유**: Kakao SDK 연동 (현재 접속 URL 자동 감지)
- **RSVP + 방명록**: Firebase Firestore 저장 + Google Sheets 자동 동기화
- **故 표시**: `alive: false` 설정 시 이름 앞에 故 표시 + 연락처 버튼 숨김
- **축의금 계좌**: 아코디언 UI, 계좌번호 클립보드 복사
- **D-day 카운트다운**: 실시간 카운트다운 (일/시/분/초)

## 커스터마이징

`src/config/wedding.ts` 한 파일만 수정하면 됩니다.

### 신랑·신부 정보

```ts
groom: {
  name: '홍길동',
  phone: '010-1234-5678',
  father: { name: '홍판서', alive: true },
  mother: { name: '춘섬', alive: true },
  familyOrder: '장남',
  account: { bank: '국민은행', number: '123-456-789012', holder: '홍길동' },
  // ...
},
```

> `alive: false`로 설정하면 이름 앞에 **故** 표시, 연락처 버튼 숨김

### 예식 정보

```ts
wedding: {
  date: '2026-10-17T13:30:00',  // ISO 형식
  location: {
    name: 'DMC타워웨딩',
    hall: '펠리체홀 4층',
    address: '서울 마포구 상암로 189 중소기업DMC타워',
    lat: 37.5767396,
    lng: 126.8979123,
    // ...
  },
},
```

### 사진 교체

`public/images/` 폴더에 사진을 넣고 config의 경로를 수정합니다.

```ts
mainPhoto: '/images/main.jpg',
gallery: [
  '/images/photo1.jpg',
  '/images/photo2.jpg',
  // ... 최대 20장
],
```

### 기능 ON/OFF

```ts
features: {
  bgm: true,           // 배경음악
  rsvp: true,           // 참석 의사
  guestbook: true,      // 방명록
  kakaoShare: true,     // 카카오톡 공유
  flowerEffect: true,   // 단풍잎 효과
  countdown: true,      // D-day 카운트다운
  // ...
},
```

## 외부 서비스 설정

### Firebase (방명록 / RSVP)

1. [Firebase Console](https://console.firebase.google.com)에서 프로젝트 생성
2. Firestore Database 활성화 (테스트 모드, 위치: asia-northeast3 서울)
3. 웹 앱 추가 후 `firebaseConfig` 값을 `wedding.ts`의 `firebase` 항목에 입력

### Kakao (공유)

1. [Kakao Developers](https://developers.kakao.com)에서 앱 등록
2. 플랫폼 → Web → 사이트 도메인 추가 (개발: `http://localhost:5174`, 배포: GitHub Pages URL)
3. **JavaScript 키**를 `wedding.ts`의 `kakao.jsKey`와 `index.html`의 Kakao SDK에 입력

### Google Sheets 연동 (RSVP/방명록 자동 동기화)

1. Google 스프레드시트 생성
2. **확장 프로그램** → **Apps Script** → `google-apps-script.js` 내용 붙여넣기
3. `syncAll` 함수 실행 → 권한 승인
4. 자동 동기화: Apps Script **트리거** → `syncAll` 함수, 시간 기반, 5분마다 설정
5. 스프레드시트에 **RSVP** / **방명록** 시트가 자동 생성되어 데이터 동기화

## 이미지 최적화 권장사항

- WebP 포맷 권장, 각 이미지 500KB 이하
- 갤러리: 정사각형 또는 3:4 비율
- 메인 사진: 3:4 세로 비율
- OG 썸네일: 1200x630px

## 라이선스

MIT
