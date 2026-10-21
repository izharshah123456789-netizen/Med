"use strict";

// Ported from GlowingEffect.tsx component for vanilla JS integration

class GlowingEffect {
  // Ensure the glow element is positioned absolutely and follows the border radius
  createGlowElement() {
    const glowElement = document.createElement('div');
    glowElement.className = 'glowing-effect-glow absolute inset-0 rounded-[inherit]';
    glowElement.style.backgroundAttachment = 'fixed';
    glowElement.style.opacity = 'var(--active)';
    glowElement.style.transition = 'opacity 300ms ease';
    glowElement.style.maskClip = 'padding-box, border-box';
    glowElement.style.maskComposite = 'intersect';
    glowElement.style.maskImage = 'linear-gradient(#0000, #0000), conic-gradient(from calc((var(--start) - var(--spread)) * 1deg), #00000000 0deg, #fff, #00000000 calc(var(--spread) * 2deg))';
    return glowElement;
  }
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      blur: options.blur || 0,
      inactiveZone: options.inactiveZone || 0.7,
      proximity: options.proximity || 0,
      spread: options.spread || 20,
      variant: options.variant || "default",
      glow: options.glow !== undefined ? options.glow : false,
      className: options.className || "",
      disabled: options.disabled !== undefined ? options.disabled : true,
      movementDuration: options.movementDuration || 2,
      borderWidth: options.borderWidth || 1,
      ...options,
    };

    this.lastPosition = { x: 0, y: 0 };
    this.animationFrameRef = null;
    this.isActive = false;

    this.init();
  }

  init() {
    const { element, options } = this;

    // Set CSS custom properties
    element.style.setProperty('--blur', `${options.blur}px`);
    element.style.setProperty('--spread', options.spread);
    element.style.setProperty('--start', '0');
    element.style.setProperty('--active', '0');
    element.style.setProperty('--glowingeffect-border-width', `${options.borderWidth}px`);
    element.style.setProperty('--repeating-conic-gradient-times', '5');

    // Set gradient based on variant
    const gradient = options.variant === 'white'
      ? `repeating-conic-gradient(from 236.84deg at 50% 50%, var(--black), var(--black) calc(25% / var(--repeating-conic-gradient-times)))`
      : `radial-gradient(circle, #226E4B 10%, #226E4B00 20%),
         radial-gradient(circle at 40% 40%, #0D9488 5%, #0D948800 15%),
         radial-gradient(circle at 60% 60%, #F59E0B 10%, #F59E0B00 20%),
         radial-gradient(circle at 40% 60%, #226E4B 10%, #226E4B00 20%),
         repeating-conic-gradient(from 236.84deg at 50% 50%, #226E4B 0%, #0D9488 calc(25% / var(--repeating-conic-gradient-times)), #F59E0B calc(50% / var(--repeating-conic-gradient-times)), #226E4B calc(75% / var(--repeating-conic-gradient-times)), #0D9488 calc(100% / var(--repeating-conic-gradient-times)))`;

    element.style.setProperty('--gradient', gradient);

    // Create and append glow element
    const glowElement = document.createElement('div');
    glowElement.className = 'glowing-effect-glow absolute inset-0 rounded-[inherit] border-[var(--glowingeffect-border-width)] solid transparent';
    glowElement.style.background = 'var(--gradient)';
    glowElement.style.backgroundAttachment = 'fixed';
    glowElement.style.opacity = 'var(--active)';
    glowElement.style.transition = 'opacity 300ms ease';
    glowElement.style.maskClip = 'padding-box, border-box';
    glowElement.style.maskComposite = 'intersect';
    glowElement.style.maskImage = 'linear-gradient(#0000, #0000), conic-gradient(from calc((var(--start) - var(--spread)) * 1deg), #00000000 0deg, #fff, #00000000 calc(var(--spread) * 2deg))';
    element.appendChild(glowElement);

    // Add CSS classes
    element.classList.add('glowing-effect-container');
    if (options.className) {
      element.classList.add(options.className);
    }

    // Initialize event listeners
    this.setupEventListeners();

    // Start the effect if not disabled
    if (!options.disabled) {
      this.start();
    }
  }

  handleMove(e) {
    if (!this.element) return;

    if (this.animationFrameRef) {
      cancelAnimationFrame(this.animationFrameRef);
    }

    this.animationFrameRef = requestAnimationFrame(() => {
      const element = this.element;
      const { options } = this;

      const { left, top, width, height } = element.getBoundingClientRect();
      const mouseX = e?.x ?? this.lastPosition.x;
      const mouseY = e?.y ?? this.lastPosition.y;

      if (e) {
        this.lastPosition = { x: mouseX, y: mouseY };
      }

      const center = [left + width * 0.5, top + height * 0.5];
      const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
      const inactiveRadius = 0.5 * Math.min(width, height) * options.inactiveZone;

      if (distanceFromCenter < inactiveRadius) {
        element.style.setProperty('--active', '0');
        return;
      }

      const isActive =
        mouseX > left - options.proximity &&
        mouseX < left + width + options.proximity &&
        mouseY > top - options.proximity &&
        mouseY < top + height + options.proximity;

      this.isActive = isActive;
      element.style.setProperty('--active', isActive ? '1' : '0');

      if (!isActive) return;

      const currentAngle = parseFloat(element.style.getPropertyValue('--start')) || 0;
      let targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;

      const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
      const newAngle = currentAngle + angleDiff;

      this.animate(currentAngle, newAngle);
    });
  }

  animate(from, to) {
    const { options } = this;
    const element = this.element;
    const duration = options.movementDuration;
    const startTime = performance.now();

    const animateStep = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      const ease = [0.16, 1, 0.3, 1]; // cubic bezier
      const value = this.cubicBezier(ease[0], ease[1], ease[2], ease[3], progress) * (to - from) + from;

      element.style.setProperty('--start', String(value));

      if (progress < 1) {
        requestAnimationFrame(animateStep);
      }
    };

    requestAnimationFrame(animateStep);
  }

  cubicBezier(p1, p2, p3, p4, t) {
    return (
      (1 - t) ** 3 * p1 +
      3 * (1 - t) ** 2 * t * p2 +
      3 * (1 - t) * t ** 2 * p3 +
      t ** 3 * p4
    );
  }

  setupEventListeners() {
    const { options } = this;

    if (options.disabled) return;

    const handleScroll = (e) => {
      // Get pointer position from last event or center of element
      const rect = this.element.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      this.handleMove({ x, y });
    };

    const handlePointerMove = (e) => {
      this.handleMove(e);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.body.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Store cleanup functions
    this.cleanup = () => {
      if (this.animationFrameRef) {
        cancelAnimationFrame(this.animationFrameRef);
      }
      window.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('pointermove', handlePointerMove);
    };
  }

  start() {
    if (this.options.disabled) return;

    this.setupEventListeners();
  }

  stop() {
    if (this.cleanup) {
      this.cleanup();
    }
    this.isActive = false;
  }

  updateOptions(newOptions) {
    Object.assign(this.options, newOptions);
    // Re-initialize with new options
    this.stop();
    this.init();
  }
}

// Initialize all glowing effects on the page
document.addEventListener('DOMContentLoaded', () => {
  const effectElements = document.querySelectorAll('.glowing-effect-container');

  effectElements.forEach((element) => {
    // Extract data attributes for options
    const options = {};

    // Map data attributes to options with explicit defaults
    const dataAttributes = [
      { attr: 'blur', default: 0 },
      { attr: 'inactiveZone', default: 0.01 },
      { attr: 'proximity', default: 64 },
      { attr: 'spread', default: 40 },
      { attr: 'variant', default: 'default' },
      { attr: 'glow', default: true },
      { attr: 'disabled', default: false },
      { attr: 'movementDuration', default: 2 },
      { attr: 'borderWidth', default: 2 }
    ];

    dataAttributes.forEach(({ attr, default: defaultValue }) => {
      const value = element.getAttribute(`data-${attr}`);
      if (value !== null) {
        // Convert string values to appropriate types
        if (attr === 'glow' || attr === 'disabled') {
          options[attr] = value === 'true' || value === '1' || value === 'yes';
        } else {
          options[attr] = isNaN(value) ? defaultValue : Number(value);
        }
      } else {
        // Use default value if attribute not found
        options[attr] = defaultValue;
      }
    });

    // Create effect instance
    new GlowingEffect(element, options);
  });
});

console.log('GlowingEffect initialized');