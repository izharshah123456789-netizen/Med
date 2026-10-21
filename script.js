// Main application script for Medora
// This script handles various UI interactions and components

// Prevent right-click context menu on certain elements
function disableRightClick(elementSelector) {
  document.querySelectorAll(elementSelector).forEach(element => {
    element.addEventListener('contextmenu', (e) => e.preventDefault());
  });
}

// Initialize navigation toggle functionality
function initNavToggle() {
  const nav = document.querySelector('.nav-container');
  if (!nav) return;

  // Add any navigation-specific functionality here
  console.log('Navigation initialized');
}

// Initialize interactive elements
function initInteractiveElements() {
  // Close any open dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.closest('.has-dropdown')) {
      document.querySelectorAll('.dropdown-open').forEach(dropdown => {
        dropdown.classList.remove('dropdown-open');
      });
    }
  });

  // Initialize buttons and interactive elements
  document.querySelectorAll('button, a, input').forEach(element => {
    element.addEventListener('focus', () => {
      element.classList.add('focus-visible');
    });

    element.addEventListener('blur', () => {
      element.classList.remove('focus-visible');
    });
  });
}

// Handle form submissions
function initForms() {
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Form validation and submission logic would go here
      console.log('Form submitted:', form.getAttribute('id'));
    });
  });
}

// Initialize carousel functionality
function initCarousel() {
  const carousel = document.querySelector('.carousel-stage');
  if (!carousel) return;

  let currentSlide = 0;
  const slides = carousel.querySelectorAll('.slide');

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  }

  function updateCarousel() {
    slides.forEach((slide, index) => {
      const offset = (index - currentSlide + slides.length) % slides.length;
      slide.style.transform = `translateX(${offset * 100}%)`;
    });
  }

  // Add navigation buttons if they don't exist
  if (!document.querySelector('.carousel-btn')) {
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-btn prev-btn';
    prevBtn.innerHTML = '&#10094;';
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-btn next-btn';
    nextBtn.innerHTML = '&#10095;';
    nextBtn.addEventListener('click', nextSlide);

    carousel.parentNode.insertBefore(prevBtn, carousel);
    carousel.parentNode.insertBefore(nextBtn, carousel.nextSibling);
  }

  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);
}

// Initialize scroll-based animations
function initScrollAnimations() {
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-animate-on-scroll]').forEach(element => {
      observer.observe(element);
    });
  }
}

// Initialize card hover effects
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.card-hover');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}

// Initialize smooth scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Main initialization function
function init() {
  try {
    disableRightClick('.no-right-click');
    initNavToggle();
    initInteractiveElements();
    initForms();
    initCarousel();
    initScrollAnimations();
    initCardHoverEffects();
    initSmoothScrolling();

    console.log('Application initialized successfully');
  } catch (error) {
    console.error('Initialization error:', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export functions for testing or external use
window.MedoraApp = {
  init,
  disableRightClick,
  initNavToggle,
  initInteractiveElements,
  initForms,
  initCarousel,
  initScrollAnimations,
  initCardHoverEffects,
  initSmoothScrolling
};