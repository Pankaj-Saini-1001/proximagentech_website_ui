import { gsap } from 'gsap';

export function revealElement(target: string | HTMLElement, options?: { duration?: number; scale?: number }): gsap.core.Tween {
  return gsap.from(target, {
    opacity: 0,
    scale: options?.scale ?? 0.95,
    duration: options?.duration ?? 0.7,
    ease: 'power2.out',
  });
}
