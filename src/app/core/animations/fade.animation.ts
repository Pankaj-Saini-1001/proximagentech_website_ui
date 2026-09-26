import { gsap } from 'gsap';

export function fadeIn(target: string | HTMLElement, options?: { duration?: number; delay?: number; y?: number }): gsap.core.Tween {
  return gsap.from(target, {
    opacity: 0,
    y: options?.y ?? 20,
    duration: options?.duration ?? 0.8,
    delay: options?.delay ?? 0,
    ease: 'power3.out',
  });
}
