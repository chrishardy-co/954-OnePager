(() => {
  const video = document.getElementById('heroVideo');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const tryPlayVideo = () => {
    if (!video || prefersReducedMotion.matches) return;
    video.muted = true;
    const playback = video.play();
    if (playback && typeof playback.catch === 'function') playback.catch(() => {});
  };

  const initGsapStorytelling = () => {
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({ markers: false });

    const heroSection = document.querySelector('.hero-section, .home');
    const heroHeading = document.querySelector('.hero-content h1, .home-content h1');
    const contentBlocks = gsap.utils.toArray('.content-wrapper:not(.history-block)');
    const buttons = gsap.utils.toArray('.btn-primary, .btn-secondary');
    const roseMark = document.querySelector('.morph-rose');
    const roseDot = roseMark?.querySelector('.rose-dot');
    const roseShape = roseMark?.querySelector('.rose-shape');
    const timelineSection = document.querySelector('.history-section');
    const timelineLine = document.querySelector('.timeline-line');
    const roseSection = document.querySelector('.rose-supper-club-section');
    const historyBlocks = gsap.utils.toArray('.history-block');

    if (prefersReducedMotion.matches) {
      gsap.set([heroHeading, ...contentBlocks, ...buttons, ...historyBlocks, roseMark, roseDot, roseShape, timelineLine].filter(Boolean), { clearProps: 'all' });
      return;
    }

    if (heroHeading) {
      gsap.fromTo(
        heroHeading,
        { autoAlpha: 0, y: 26, filter: 'blur(12px)' },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.25,
          ease: 'power3.out',
          clearProps: 'willChange'
        }
      );
    }

    if (heroSection) {
      gsap.to(heroSection, {
        backgroundPosition: '50% 58%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.1
        }
      });

      if (video) {
        gsap.to(video, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1
          }
        });
      }
    }

    if (roseMark && roseDot && roseShape && document.querySelector('.onepage-shell')) {
      gsap.set(roseDot, {
        scale: 1,
        autoAlpha: 1,
        transformOrigin: '50% 50%'
      });

      gsap.set(roseShape, {
        scale: 0.12,
        autoAlpha: 0,
        filter: 'blur(10px)',
        transformOrigin: '50% 50%'
      });

      const roseTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      roseTimeline
        .to(roseDot, {
          scale: 0.18,
          autoAlpha: 0,
          ease: 'power2.out'
        }, 0)
        .to(roseShape, {
          scale: 1,
          autoAlpha: 1,
          filter: 'blur(0px)',
          ease: 'power3.out'
        }, 0.08)
        .to(roseMark, {
          rotate: -4,
          ease: 'none'
        }, 0);
    }

    if (timelineSection && timelineLine) {
      gsap.from(timelineLine, {
        scaleY: 0,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineSection,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      });
    }

    if (roseSection) {
      ScrollTrigger.create({
        trigger: roseSection,
        start: 'top center',
        onEnter: () => document.body.classList.add('zine-contrast'),
        onLeaveBack: () => document.body.classList.remove('zine-contrast')
      });
    }

    const revealContent = (block) => {
      const textTargets = block.matches('.content-wrapper')
        ? block.querySelectorAll('h1, h2, h3, p, .page-intro, .page-subtitle, .event-body, .event-title, .date-pill, .mission, .status-line, .eyebrow')
        : [];
      const buttonTargets = block.querySelectorAll('.btn-primary, .btn-secondary');

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: block,
          start: 'top 82%',
          once: true
        }
      });

      timeline.fromTo(
        block,
        { autoAlpha: 0, y: 44 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          ease: 'power3.out',
          clearProps: 'willChange'
        }
      );

      if (textTargets.length) {
        timeline.fromTo(
          textTargets,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power2.out',
            clearProps: 'willChange'
          },
          '-=0.58'
        );
      }

      if (buttonTargets.length) {
        timeline.fromTo(
          buttonTargets,
          { autoAlpha: 0, y: 16, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.12,
            ease: 'power2.out',
            clearProps: 'willChange'
          },
          '-=0.38'
        );
      }
    };

    contentBlocks.forEach(revealContent);

    historyBlocks.forEach((block) => {
      gsap.fromTo(
        block,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 80%'
          }
        }
      );
    });

    buttons.forEach((button) => {
      const isSecondary = button.classList.contains('btn-secondary');
      const hoverBackground = isSecondary ? 'rgba(255,255,255,0.14)' : 'var(--ink)';

      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.03,
          y: -2,
          backgroundColor: hoverBackground,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          y: 0,
          backgroundColor: '',
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      button.addEventListener('focus', () => {
        gsap.to(button, {
          scale: 1.02,
          y: -1,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      button.addEventListener('blur', () => {
        gsap.to(button, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    tryPlayVideo();
    initGsapStorytelling();
  });

  window.addEventListener('load', tryPlayVideo);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) tryPlayVideo();
  });

  ['touchstart', 'click'].forEach((eventName) => {
    window.addEventListener(eventName, tryPlayVideo, { once: true, passive: true });
  });
})();
