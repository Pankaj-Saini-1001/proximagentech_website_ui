import { gsap } from 'gsap';

export function staggerChildren(
  selector: string,
  options?: { duration?: number; stagger?: number; y?: number }
): gsap.core.Tween {
  return gsap.from(selector, {
    opacity: 0,
    y: options?.y ?? 30,
    duration: options?.duration ?? 0.7,
    stagger: options?.stagger ?? 0.15,
    ease: 'power3.out',
  });
}
