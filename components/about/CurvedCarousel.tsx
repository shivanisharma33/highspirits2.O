"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface CurvedCarouselProps {
  items: React.ReactNode[];
  perspective?: number;
  itemDistance?: number;
  initialRotation?: number;
  repeatCount?: number;
  draggable?: boolean;
  dragSensitivity?: number;
  momentumFriction?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  autoRotateDirection?: "left" | "right";
  hoverSpeedMultiplier?: number;
  enableMobileDrag?: boolean;
  fadeClipping?: {
    enabled?: boolean;
    fadeWidth?: number; // percentage width of fade on edges (0 - 50)
    fadeAlpha?: number; // opacity at extreme edge (0 - 1)
  };
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
  onRotationChange?: (currentAngle: number, activeIndex: number) => void;
  // External control ref handle
  carouselRef?: React.RefObject<CurvedCarouselHandle | null>;
}

export interface CurvedCarouselHandle {
  next: () => void;
  prev: () => void;
  togglePlay: () => void;
  isPlaying: boolean;
  rotateTo: (angle: number) => void;
}

export const CurvedCarousel: React.FC<CurvedCarouselProps> = ({
  items,
  perspective = 2000,
  itemDistance = 1100,
  initialRotation = 0,
  repeatCount = 2,
  draggable = true,
  dragSensitivity = 0.2,
  momentumFriction = 0.94,
  autoRotate = true,
  autoRotateSpeed = 20,
  autoRotateDirection = "right",
  hoverSpeedMultiplier = 0.65,
  enableMobileDrag = true,
  fadeClipping = {
    enabled: true,
    fadeWidth: 22,
    fadeAlpha: 0.15,
  },
  cardWidth = 380,
  cardHeight = 520,
  className = "",
  onRotationChange,
  carouselRef,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // State & mutable refs for high-performance 60/120fps animation loop
  const rotationRef = useRef<number>(initialRotation);
  const isDraggingRef = useRef<boolean>(false);
  const isHoveredRef = useRef<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoRotate);
  const isPlayingRef = useRef<boolean>(autoRotate);

  // Drag physics tracking
  const startXRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const momentumFrameIdRef = useRef<number | null>(null);

  // Mobile touch gesture disambiguation
  const touchStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchIntentRef = useRef<"drag" | "scroll" | null>(null);

  // Dynamic responsive sizing
  const [responsiveProps, setResponsiveProps] = useState({
    perspective,
    itemDistance,
    cardWidth,
    cardHeight,
  });

  // Calculate responsive dimensions
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setResponsiveProps({
          perspective: 800,
          itemDistance: Math.max(480, Math.round(w * 1.15)),
          cardWidth: Math.min(290, Math.round(w * 0.76)),
          cardHeight: Math.min(410, Math.round(w * 0.76 * 1.38)),
        });
      } else if (w < 1024) {
        setResponsiveProps({
          perspective: 1500,
          itemDistance: 880,
          cardWidth: 330,
          cardHeight: 460,
        });
      } else {
        setResponsiveProps({
          perspective,
          itemDistance,
          cardWidth,
          cardHeight,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [perspective, itemDistance, cardWidth, cardHeight]);

  const totalSlots = useMemo(
    () => (items.length > 0 ? items.length : 1) * repeatCount,
    [items.length, repeatCount]
  );

  const angleStep = useMemo(() => 360 / totalSlots, [totalSlots]);

  // Normalize angle to [0, 360)
  const normalizeAngle = useCallback((angle: number) => {
    return ((angle % 360) + 360) % 360;
  }, []);

  // Update DOM transform directly without triggering React re-renders every frame
  const applyRotation = useCallback(
    (angle: number) => {
      rotationRef.current = angle;
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${angle}deg)`;
        ringRef.current.style.webkitTransform = `rotateY(${angle}deg)`;
      }

      if (onRotationChange && items.length > 0) {
        const norm = normalizeAngle(-angle);
        const activeIdx = Math.round(norm / angleStep) % items.length;
        onRotationChange(angle, activeIdx);
      }
    },
    [angleStep, items.length, normalizeAngle, onRotationChange]
  );

  // Sync playing state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Expose external ref methods
  useEffect(() => {
    if (!carouselRef) return;
    (carouselRef as React.MutableRefObject<CurvedCarouselHandle | null>).current = {
      next: () => {
        applyRotation(rotationRef.current - angleStep);
      },
      prev: () => {
        applyRotation(rotationRef.current + angleStep);
      },
      togglePlay: () => {
        setIsPlaying((prev) => !prev);
      },
      isPlaying,
      rotateTo: (targetAngle: number) => {
        applyRotation(targetAngle);
      },
    };
  }, [carouselRef, angleStep, applyRotation, isPlaying]);

  // Auto-rotation engine using requestAnimationFrame
  useEffect(() => {
    let lastTime = performance.now();
    let isRunning = true;

    const loop = (now: number) => {
      if (!isRunning) return;
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (
        isPlayingRef.current &&
        !isDraggingRef.current &&
        momentumFrameIdRef.current === null
      ) {
        const speed = autoRotateSpeed;
        const dir = autoRotateDirection === "right" ? 1 : -1;
        const hoverMultiplier = isHoveredRef.current
          ? hoverSpeedMultiplier
          : 1.0;
        const delta = speed * dir * hoverMultiplier * dt;
        applyRotation(rotationRef.current + delta);
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [
    autoRotateSpeed,
    autoRotateDirection,
    hoverSpeedMultiplier,
    applyRotation,
  ]);

  // Stop momentum animation
  const stopMomentum = useCallback(() => {
    if (momentumFrameIdRef.current !== null) {
      cancelAnimationFrame(momentumFrameIdRef.current);
      momentumFrameIdRef.current = null;
    }
  }, []);

  // Momentum coasting animation on drag release
  const startMomentum = useCallback(() => {
    stopMomentum();
    let vel = velocityRef.current;

    const step = () => {
      if (Math.abs(vel) < 0.04) {
        momentumFrameIdRef.current = null;
        velocityRef.current = 0;
        return;
      }

      applyRotation(rotationRef.current + vel);
      vel *= momentumFriction;
      momentumFrameIdRef.current = requestAnimationFrame(step);
    };

    momentumFrameIdRef.current = requestAnimationFrame(step);
  }, [applyRotation, momentumFriction, stopMomentum]);

  // Pointer / Mouse drag listeners
  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggable) return;
      // Only handle primary button
      if (e.button !== 0) return;

      stopMomentum();
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      lastXRef.current = e.clientX;
      lastTimeRef.current = performance.now();
      velocityRef.current = 0;

      const onPointerMove = (moveEvent: PointerEvent) => {
        if (!isDraggingRef.current) return;
        const now = performance.now();
        const dt = now - lastTimeRef.current;
        const dx = moveEvent.clientX - lastXRef.current;

        // Invert dx for intuitive drag (drag left -> rotates items leftwards)
        const angleDelta = -dx * dragSensitivity;
        applyRotation(rotationRef.current + angleDelta);

        if (dt > 0) {
          const currentVel = (angleDelta / dt) * 16.66;
          velocityRef.current = velocityRef.current * 0.65 + currentVel * 0.35;
        }

        lastXRef.current = moveEvent.clientX;
        lastTimeRef.current = now;
      };

      const onPointerUp = () => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);

        if (Math.abs(velocityRef.current) > 0.1) {
          startMomentum();
        }
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerup", onPointerUp, { passive: true });
      window.addEventListener("pointercancel", onPointerUp, { passive: true });
    },
    [draggable, stopMomentum, dragSensitivity, applyRotation, startMomentum]
  );

  // Touch handlers with vertical scroll safety (pan-y)
  useEffect(() => {
    if (!enableMobileDrag || !draggable) return;
    const container = containerRef.current;
    if (!container) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      stopMomentum();
      const touch = e.touches[0];
      touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
      touchIntentRef.current = null;
      lastXRef.current = touch.clientX;
      lastTimeRef.current = performance.now();
      velocityRef.current = 0;
      isDraggingRef.current = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const dx = touch.clientX - touchStartPosRef.current.x;
      const dy = touch.clientY - touchStartPosRef.current.y;

      // Disambiguate horizontal swipe vs vertical page scroll
      if (touchIntentRef.current === null) {
        if (Math.abs(dx) < 7 && Math.abs(dy) < 7) return;
        touchIntentRef.current = Math.abs(dx) > Math.abs(dy) ? "drag" : "scroll";
      }

      if (touchIntentRef.current === "scroll") {
        isDraggingRef.current = false;
        return;
      }

      // Horizontal drag confirmed - prevent page scroll
      e.preventDefault();
      const now = performance.now();
      const dt = now - lastTimeRef.current;
      const stepX = touch.clientX - lastXRef.current;
      const angleDelta = -stepX * dragSensitivity;

      applyRotation(rotationRef.current + angleDelta);

      if (dt > 0) {
        const currentVel = (angleDelta / dt) * 16.66;
        velocityRef.current = velocityRef.current * 0.65 + currentVel * 0.35;
      }

      lastXRef.current = touch.clientX;
      lastTimeRef.current = now;
    };

    const onTouchEnd = () => {
      if (touchIntentRef.current === "drag" && Math.abs(velocityRef.current) > 0.1) {
        isDraggingRef.current = false;
        startMomentum();
      } else {
        isDraggingRef.current = false;
      }
      touchIntentRef.current = null;
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    container.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [
    enableMobileDrag,
    draggable,
    stopMomentum,
    dragSensitivity,
    applyRotation,
    startMomentum,
  ]);

  // Edge fade clipping mask
  const maskStyle = useMemo(() => {
    if (!fadeClipping?.enabled) return undefined;
    const fw = fadeClipping.fadeWidth ?? 22;
    const fa = fadeClipping.fadeAlpha ?? 0.15;
    const leftStop = Math.max(0, fw / 2);
    const rightStop = Math.min(100, 100 - fw / 2);

    const gradient = `linear-gradient(to right, rgba(0,0,0,${fa}) 0%, rgba(0,0,0,1) ${leftStop}%, rgba(0,0,0,1) ${rightStop}%, rgba(0,0,0,${fa}) 100%)`;

    return {
      WebkitMaskImage: gradient,
      maskImage: gradient,
    };
  }, [fadeClipping]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="3D Curved Carousel"
      className={`relative w-full select-none overflow-hidden ${
        draggable ? "cursor-grab active:cursor-grabbing" : ""
      } ${className}`}
      style={{
        height: responsiveProps.cardHeight + 10,
        backgroundColor: "transparent",
        touchAction: "pan-y",
        ...maskStyle,
      }}
      onPointerDown={onPointerDown}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      {/* 3D Scene Root */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          perspective: `${responsiveProps.perspective}px`,
          WebkitPerspective: `${responsiveProps.perspective}px`,
        }}
      >
        {/* Revolving Cylinder Ring */}
        <div
          ref={ringRef}
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            transform: `rotateY(${initialRotation}deg)`,
            WebkitTransform: `rotateY(${initialRotation}deg)`,
            willChange: "transform",
          }}
        >
          {Array.from({ length: repeatCount }).map((_, rIdx) =>
            items.map((item, itemIdx) => {
              const slotIdx = itemIdx + rIdx * items.length;
              const angle = -slotIdx * angleStep;

              return (
                <div
                  key={`card-${rIdx}-${itemIdx}`}
                  className="pointer-events-auto absolute left-1/2 top-1/2"
                  style={{
                    width: responsiveProps.cardWidth,
                    height: responsiveProps.cardHeight,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(-${responsiveProps.itemDistance}px)`,
                    WebkitTransform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(-${responsiveProps.itemDistance}px)`,
                    transformStyle: "preserve-3d",
                    WebkitTransformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                >
                  {item}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
