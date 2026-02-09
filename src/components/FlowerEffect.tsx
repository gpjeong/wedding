import { useEffect, useRef } from 'react';

interface Leaf {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  swingAmplitude: number;
  swingSpeed: number;
  time: number;
  colorIndex: number; // 0~4 단풍 색상
  flip: number; // 3D 뒤집힘 효과용
  flipSpeed: number;
}

// 가을 단풍 컬러 팔레트
const LEAF_COLORS = [
  { r: 204, g: 51, b: 0 },    // 진한 빨강
  { r: 227, g: 100, b: 20 },  // 주황빨강
  { r: 232, g: 158, b: 32 },  // 골드 오렌지
  { r: 189, g: 50, b: 20 },   // 짙은 단풍
  { r: 196, g: 127, b: 34 },  // 황갈색
];

export default function FlowerEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let leaves: Leaf[] = [];
    const LEAF_COUNT = 14;

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = Math.min(parent?.clientWidth ?? 430, 430);
      canvas.height = window.innerHeight;
    };

    const createLeaf = (startFromTop = false): Leaf => ({
      x: Math.random() * canvas.width,
      y: startFromTop ? -30 : Math.random() * canvas.height * -1,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 0.5 + 0.25,
      opacity: Math.random() * 0.3 + 0.12,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      swingAmplitude: Math.random() * 2 + 0.8,
      swingSpeed: Math.random() * 0.012 + 0.006,
      time: Math.random() * 100,
      colorIndex: Math.floor(Math.random() * LEAF_COLORS.length),
      flip: Math.random() * Math.PI * 2,
      flipSpeed: Math.random() * 0.03 + 0.01,
    });

    // 단풍잎 모양 그리기
    const drawMapleLeaf = (leaf: Leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);

      // 3D 뒤집힘 효과 (x축 스케일 변화)
      const flipScale = Math.cos(leaf.flip);
      ctx.scale(flipScale, 1);

      ctx.globalAlpha = leaf.opacity;

      const color = LEAF_COLORS[leaf.colorIndex];
      const s = leaf.size;

      // 단풍잎 본체
      ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      ctx.beginPath();

      // 단풍잎 5갈래 모양
      const points = 5;
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2 - Math.PI / 2;
        const nextAngle = ((i + 1) / points) * Math.PI * 2 - Math.PI / 2;
        const midAngle = (angle + nextAngle) / 2;

        const outerX = Math.cos(angle) * s;
        const outerY = Math.sin(angle) * s;
        const innerX = Math.cos(midAngle) * s * 0.4;
        const innerY = Math.sin(midAngle) * s * 0.4;

        if (i === 0) {
          ctx.moveTo(outerX, outerY);
        } else {
          ctx.lineTo(outerX, outerY);
        }
        ctx.quadraticCurveTo(
          Math.cos(midAngle) * s * 0.7,
          Math.sin(midAngle) * s * 0.7,
          innerX,
          innerY
        );
      }
      ctx.closePath();
      ctx.fill();

      // 잎맥 (살짝 어두운 선)
      ctx.strokeStyle = `rgba(${Math.max(0, color.r - 40)}, ${Math.max(0, color.g - 30)}, ${Math.max(0, color.b - 20)}, ${leaf.opacity * 0.5})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.3);
      ctx.lineTo(0, -s * 0.8);
      ctx.stroke();

      // 줄기
      ctx.strokeStyle = `rgba(${Math.max(0, color.r - 60)}, ${Math.max(0, color.g - 40)}, ${Math.max(0, color.b - 20)}, ${leaf.opacity * 0.6})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.3);
      ctx.lineTo(0, s * 0.9);
      ctx.stroke();

      ctx.restore();
    };

    const init = () => {
      resize();
      leaves = Array.from({ length: LEAF_COUNT }, () => createLeaf(false));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const leaf of leaves) {
        leaf.time += 1;
        leaf.y += leaf.speedY;
        leaf.x += Math.sin(leaf.time * leaf.swingSpeed) * leaf.swingAmplitude;
        leaf.rotation += leaf.rotationSpeed;
        leaf.flip += leaf.flipSpeed;

        // 화면 밖으로 나가면 다시 위에서 생성
        if (leaf.y > canvas.height + 30) {
          Object.assign(leaf, createLeaf(true));
        }

        drawMapleLeaf(leaf);
      }

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ maxWidth: 430, margin: '0 auto', left: 0, right: 0 }}
    />
  );
}
