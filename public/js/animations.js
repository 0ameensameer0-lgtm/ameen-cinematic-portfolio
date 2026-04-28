function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-copy', {
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: 'power3.out'
  });

  gsap.from('.hero-stage', {
    opacity: 0,
    y: 30,
    duration: 0.9,
    delay: 0.15,
    ease: 'power3.out'
  });

  gsap.utils.toArray('.section-heading').forEach((heading) => {
    gsap.from(heading, {
      scrollTrigger: {
        trigger: heading,
        start: 'top 82%'
      },
      opacity: 0,
      y: 28,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  gsap.utils.toArray('.section-card, .service-card, .portfolio-item, .timeline-card, .certificate-card, .contact-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%'
      },
      opacity: 0,
      y: 34,
      duration: 0.7,
      delay: (index % 3) * 0.08,
      ease: 'power2.out'
    });
  });

  gsap.to('.orb-a', {
    x: 70,
    y: 30,
    repeat: -1,
    yoyo: true,
    duration: 10,
    ease: 'sine.inOut'
  });

  gsap.to('.orb-b', {
    x: -50,
    y: 50,
    repeat: -1,
    yoyo: true,
    duration: 11,
    ease: 'sine.inOut'
  });

  gsap.to('.floating-code.top', {
    y: -10,
    repeat: -1,
    yoyo: true,
    duration: 3.2,
    ease: 'sine.inOut'
  });

  gsap.to('.floating-code.bottom', {
    y: 10,
    repeat: -1,
    yoyo: true,
    duration: 3.5,
    ease: 'sine.inOut'
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      const target = href ? document.querySelector(href) : null;
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
