import { gsap } from 'gsap';

export function animatePageIn(container: HTMLElement): gsap.core.Tween {
  return gsap.from(container, {
    opacity: 0,
    y: 15,
    duration: 0.5,
    ease: 'power2.out',
  });
}
