import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const $ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => c.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) =>
  Array.from(c.querySelectorAll<T>(s));

// Header style on scroll (works with or without motion).
const header = $('.site-header');
const onScrollHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
onScrollHeader();
window.addEventListener('scroll', onScrollHeader, { passive: true });

// Pointer glow on cards (cheap, CSS-variable based).
$$('.card').forEach((card) => {
  card.addEventListener('pointermove', (e: PointerEvent) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

// Everything below is skipped when the visitor prefers reduced motion.
if (root.classList.contains('anim')) init();

function init() {
  root.classList.add('ready');

  /* ---------- smooth scroll ---------- */
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  $$<HTMLAnchorElement>('a[href*="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = $(url.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -70, duration: 1.2 });
    });
  });

  /* ---------- hero intro ---------- */
  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro
    .from('.line-inner', { yPercent: 115, duration: 1.1, stagger: 0.12 })
    .from('.hero [data-reveal]', { y: 26, opacity: 0, duration: 0.8, stagger: 0.09 }, '-=0.7')
    .from('.hero-phone', { y: 90, opacity: 0, rotate: 7, duration: 1.3 }, 0.15)
    .from('.app-item', { x: 44, opacity: 0, duration: 0.65, stagger: 0.1 }, '-=0.7')
    .from('.float-card', { scale: 0.5, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(2)' }, '-=0.5');

  gsap.to('.fc-1', { y: -14, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.fc-2', { y: 12, duration: 3.1, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.orb-a', { x: 40, y: -30, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.orb-b', { x: -30, y: 36, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  // Hero phone follows the pointer a little (fine pointers only).
  if (matchMedia('(pointer: fine)').matches) {
    const phone = $('.hero-phone');
    if (phone) {
      const rx = gsap.quickTo(phone, 'rotationX', { duration: 0.8, ease: 'power3.out' });
      const ry = gsap.quickTo(phone, 'rotationY', { duration: 0.8, ease: 'power3.out' });
      $('.hero')?.addEventListener('pointermove', (e: PointerEvent) => {
        ry(((e.clientX / innerWidth) - 0.5) * 16);
        rx(((e.clientY / innerHeight) - 0.5) * -12);
      });
    }
  }

  // Living demo: the milk's countdown ticks and its badge changes colour.
  const milk = $('.app-item');
  const soonLabel = milk?.querySelector('em')?.textContent ?? '';
  const badLabel = $('.pill.bad em')?.textContent ?? '';
  if (milk) {
    const pill = milk.querySelector<HTMLElement>('.pill')!;
    const num = milk.querySelector<HTMLElement>('.pill-n')!;
    const label = milk.querySelector<HTMLElement>('em')!;
    const states = [
      { n: '2', cls: 'warn', text: soonLabel },
      { n: '1', cls: 'warn', text: soonLabel },
      { n: '0', cls: 'bad', text: badLabel },
    ];
    let i = 0;
    window.setInterval(() => {
      i = (i + 1) % states.length;
      const s = states[i];
      gsap.fromTo(pill, { scale: 1.18 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' });
      pill.classList.remove('warn', 'bad', 'ok');
      pill.classList.add(s.cls);
      num.textContent = s.n;
      label.textContent = s.text;
    }, 2400);
  }

  /* ---------- section headings ---------- */
  $$('.section-head').forEach((el) => {
    gsap.from(el.children, {
      y: 36, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  /* ---------- pinned story ---------- */
  const steps = $$('.story-step');
  const screens = $$('.screen');
  const dots = $$('[data-dot]');
  const phone = $('.story-phone');
  const n = steps.length;
  if (n && phone) {
    gsap.set(steps, { autoAlpha: 0, y: 36 });
    gsap.set(screens, { autoAlpha: 0, scale: 1.05 });
    let cur = -1;
    const show = (i: number) => {
      if (cur >= 0) {
        gsap.to(steps[cur], { autoAlpha: 0, y: -28, duration: 0.35, overwrite: true });
        gsap.to(screens[cur], { autoAlpha: 0, scale: 0.97, duration: 0.45, overwrite: true });
      }
      gsap.to(steps[i], { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.12, ease: 'power3.out', overwrite: true });
      gsap.to(screens[i], { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'power2.out', overwrite: true });
      dots.forEach((d, k) => d.classList.toggle('on', k === i));
      cur = i;
    };
    show(0);
    ScrollTrigger.create({
      trigger: '.story-pin',
      start: 'top top',
      end: `+=${n * 75}%`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const i = Math.min(n - 1, Math.floor(self.progress * n));
        if (i !== cur) show(i);
        gsap.set(phone, { rotationY: (self.progress - 0.5) * -14, rotationX: 3 });
      },
    });
  }

  /* ---------- feature cards ---------- */
  gsap.set('[data-card]', { opacity: 0, y: 50 });
  ScrollTrigger.batch('[data-card]', {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out', overwrite: true }),
  });

  /* ---------- privacy ---------- */
  gsap.set('.privacy [data-reveal]', { opacity: 0, x: -24 });
  ScrollTrigger.batch('.privacy [data-reveal]', {
    start: 'top 92%',
    once: true,
    onEnter: (b) => gsap.to(b, { opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' }),
  });
  gsap.from('.lock', {
    scale: 0.4, opacity: 0, rotate: -20, duration: 1.1, ease: 'back.out(1.8)',
    scrollTrigger: { trigger: '.privacy-visual', start: 'top 80%', once: true },
  });
  // "Everything we collect" counts down to the real number.
  $$('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count ?? 0);
    const o = { v: 100 };
    el.textContent = '100';
    gsap.to(o, {
      v: target, duration: 2, ease: 'power2.out',
      onUpdate: () => (el.textContent = String(Math.round(o.v))),
      scrollTrigger: { trigger: '.stats', start: 'top 85%', once: true },
    });
  });

  /* ---------- final call to action ---------- */
  gsap.from('.cta-card', {
    y: 70, scale: 0.94, opacity: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.cta', start: 'top 80%', once: true },
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
}
