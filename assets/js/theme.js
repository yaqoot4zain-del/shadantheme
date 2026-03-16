/**
 * SHADAN - Quiet Luxury Jewelry Theme
 * Premium Salla Theme JavaScript
 * Version: 1.0.0
 */

(function() {
  'use strict';

  // ============================================
  // THEME CONFIGURATION
  // ============================================
  const ThemeConfig = {
    selectors: {
      header: '.header',
      mobileMenuToggle: '.menu-toggle',
      mobileNav: '.mobile-nav',
      mobileNavClose: '.mobile-nav__close',
      cartToggle: '[data-cart-toggle]',
      cartDrawer: '.cart-drawer',
      cartOverlay: '.cart-drawer__overlay',
      cartClose: '.cart-drawer__close',
      revealElements: '[data-reveal]',
      zoomContainers: '.zoom-container',
      quantityInputs: '.quantity-selector__input',
      quantityBtns: '.quantity-selector__btn'
    },
    classes: {
      scrolled: 'header--scrolled',
      active: 'active',
      open: 'open',
      visible: 'reveal--visible',
      transparent: 'header--transparent'
    },
    options: {
      scrollThreshold: 50,
      revealThreshold: 0.1,
      revealRootMargin: '0px 0px -50px 0px',
      zoomLevel: 2
    }
  };

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  const Utils = {
    /**
     * Debounce function
     */
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    /**
     * Throttle function
     */
    throttle(func, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    /**
     * Check if element is in viewport
     */
    isInViewport(element, threshold = 0) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * (1 - threshold) &&
        rect.bottom >= 0
      );
    },

    /**
     * Add event listener with multiple events
     */
    addEventListeners(element, events, handler) {
      events.forEach(event => element.addEventListener(event, handler));
    },

    /**
     * Get CSS custom property value
     */
    getCSSVariable(name) {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }
  };

  // ============================================
  // HEADER MODULE
  // ============================================
  const Header = {
    element: null,
    isTransparent: false,

    init() {
      this.element = document.querySelector(ThemeConfig.selectors.header);
      if (!this.element) return;

      this.isTransparent = this.element.classList.contains(ThemeConfig.classes.transparent);
      this.bindEvents();
    },

    bindEvents() {
      // Scroll handler for header styling
      const handleScroll = Utils.throttle(() => {
        const scrollY = window.scrollY;
        
        if (scrollY > ThemeConfig.options.scrollThreshold) {
          this.element.classList.add(ThemeConfig.classes.scrolled);
          if (this.isTransparent) {
            this.element.style.backgroundColor = 'var(--color-white)';
          }
        } else {
          this.element.classList.remove(ThemeConfig.classes.scrolled);
          if (this.isTransparent) {
            this.element.style.backgroundColor = 'transparent';
          }
        }
      }, 100);

      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Initial check
      handleScroll();
    }
  };

  // ============================================
  // MOBILE MENU MODULE
  // ============================================
  const MobileMenu = {
    toggle: null,
    nav: null,
    closeBtn: null,
    isOpen: false,

    init() {
      this.toggle = document.querySelector(ThemeConfig.selectors.mobileMenuToggle);
      this.nav = document.querySelector(ThemeConfig.selectors.mobileNav);
      
      if (!this.toggle || !this.nav) return;

      this.closeBtn = this.nav.querySelector(ThemeConfig.selectors.mobileNavClose);
      this.bindEvents();
    },

    bindEvents() {
      // Toggle menu
      this.toggle.addEventListener('click', () => this.toggleMenu());
      
      // Close button
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.close());
      }

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });

      // Close on overlay click (if exists)
      const overlay = document.querySelector('.mobile-nav__overlay');
      if (overlay) {
        overlay.addEventListener('click', () => this.close());
      }

      // Prevent body scroll when menu is open
      this.nav.addEventListener('transitionend', () => {
        if (this.isOpen) {
          document.body.style.overflow = 'hidden';
        }
      });
    },

    toggleMenu() {
      this.isOpen = !this.isOpen;
      this.toggle.classList.toggle('menu-toggle--active', this.isOpen);
      this.nav.classList.toggle('mobile-nav--open', this.isOpen);
      
      if (!this.isOpen) {
        document.body.style.overflow = '';
      }
    },

    open() {
      if (!this.isOpen) {
        this.toggleMenu();
      }
    },

    close() {
      if (this.isOpen) {
        this.toggleMenu();
      }
    }
  };

  // ============================================
  // CART DRAWER MODULE
  // ============================================
  const CartDrawer = {
    toggle: null,
    drawer: null,
    overlay: null,
    closeBtn: null,
    isOpen: false,

    init() {
      this.toggle = document.querySelector(ThemeConfig.selectors.cartToggle);
      this.drawer = document.querySelector(ThemeConfig.selectors.cartDrawer);
      
      if (!this.drawer) return;

      this.overlay = document.querySelector(ThemeConfig.selectors.cartOverlay);
      this.closeBtn = this.drawer.querySelector(ThemeConfig.selectors.cartClose);
      
      this.bindEvents();
    },

    bindEvents() {
      // Toggle cart
      if (this.toggle) {
        this.toggle.addEventListener('click', (e) => {
          e.preventDefault();
          this.open();
        });
      }

      // Close button
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.close());
      }

      // Overlay click
      if (this.overlay) {
        this.overlay.addEventListener('click', () => this.close());
      }

      // Close on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });

      // Quantity buttons
      this.bindQuantityHandlers();

      // Remove item buttons
      this.bindRemoveHandlers();
    },

    bindQuantityHandlers() {
      const quantityBtns = document.querySelectorAll(ThemeConfig.selectors.quantityBtns);
      
      quantityBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const input = btn.parentElement.querySelector(ThemeConfig.selectors.quantityInputs);
          const currentValue = parseInt(input.value) || 1;
          const isIncrement = btn.classList.contains('quantity-selector__btn--plus');
          
          if (isIncrement) {
            input.value = currentValue + 1;
          } else if (currentValue > 1) {
            input.value = currentValue - 1;
          }
          
          // Trigger change event
          input.dispatchEvent(new Event('change', { bubbles: true }));
          
          // Update cart (would connect to Salla API)
          this.updateCartItem(input.dataset.itemId, input.value);
        });
      });
    },

    bindRemoveHandlers() {
      const removeBtns = document.querySelectorAll('.cart-item__remove');
      
      removeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const itemId = btn.dataset.itemId;
          this.removeCartItem(itemId);
        });
      });
    },

    open() {
      this.isOpen = true;
      this.drawer.classList.add('cart-drawer--open');
      document.body.style.overflow = 'hidden';
      
      // Focus trap
      this.trapFocus();
    },

    close() {
      this.isOpen = false;
      this.drawer.classList.remove('cart-drawer--open');
      document.body.style.overflow = '';
    },

    trapFocus() {
      const focusableElements = this.drawer.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      firstElement.focus();
      
      this.drawer.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      });
    },

    updateCartItem(itemId, quantity) {
      // Would integrate with Salla cart API
      console.log(`Updating item ${itemId} to quantity ${quantity}`);
      
      // Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent('cart:update', {
        detail: { itemId, quantity }
      }));
    },

    removeCartItem(itemId) {
      // Would integrate with Salla cart API
      console.log(`Removing item ${itemId}`);
      
      // Animate removal
      const item = document.querySelector(`[data-cart-item="${itemId}"]`);
      if (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        setTimeout(() => item.remove(), 300);
      }
      
      window.dispatchEvent(new CustomEvent('cart:remove', {
        detail: { itemId }
      }));
    },

    updateCartCount(count) {
      const badges = document.querySelectorAll('.cart-badge');
      badges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
      });
    }
  };

  // ============================================
  // SCROLL REVEAL MODULE
  // ============================================
  const ScrollReveal = {
    observer: null,
    elements: [],

    init() {
      this.elements = document.querySelectorAll(ThemeConfig.selectors.revealElements);
      
      if (this.elements.length === 0) return;

      // Check for IntersectionObserver support
      if ('IntersectionObserver' in window) {
        this.createObserver();
      } else {
        // Fallback for older browsers
        this.fallbackReveal();
      }
    },

    createObserver() {
      const options = {
        root: null,
        rootMargin: ThemeConfig.options.revealRootMargin,
        threshold: ThemeConfig.options.revealThreshold
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.reveal(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      }, options);

      this.elements.forEach(el => {
        el.classList.add('reveal');
        this.observer.observe(el);
      });
    },

    reveal(element) {
      // Add stagger delay if specified
      const stagger = element.dataset.stagger;
      if (stagger) {
        element.style.transitionDelay = `${stagger * 0.1}s`;
      }
      
      // Add reveal direction class
      const direction = element.dataset.revealDirection;
      if (direction) {
        element.classList.add(`reveal--${direction}`);
      }
      
      // Trigger reveal
      requestAnimationFrame(() => {
        element.classList.add(ThemeConfig.classes.visible);
      });
    },

    fallbackReveal() {
      // Simple scroll-based fallback
      const checkElements = Utils.throttle(() => {
        this.elements.forEach(el => {
          if (Utils.isInViewport(el, 0.1)) {
            this.reveal(el);
          }
        });
      }, 100);

      window.addEventListener('scroll', checkElements, { passive: true });
      checkElements();
    }
  };

  // ============================================
  // IMAGE ZOOM MODULE
  // ============================================
  const ImageZoom = {
    containers: [],

    init() {
      this.containers = document.querySelectorAll(ThemeConfig.selectors.zoomContainers);
      
      if (this.containers.length === 0) return;

      this.containers.forEach(container => this.setupZoom(container));
    },

    setupZoom(container) {
      const image = container.querySelector('.zoom-container__image');
      if (!image) return;

      // Create lens element if not exists
      let lens = container.querySelector('.zoom-container__lens');
      if (!lens) {
        lens = document.createElement('div');
        lens.className = 'zoom-container__lens';
        container.appendChild(lens);
      }

      // Mouse events
      container.addEventListener('mouseenter', () => {
        image.style.transform = `scale(${ThemeConfig.options.zoomLevel})`;
      });

      container.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
        lens.style.opacity = '0';
      });

      container.addEventListener('mousemove', (e) => this.handleMouseMove(e, container, image, lens));

      // Touch events for mobile
      container.addEventListener('touchstart', (e) => {
        e.preventDefault();
        image.style.transform = `scale(${ThemeConfig.options.zoomLevel})`;
      }, { passive: false });

      container.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
          clientX: touch.clientX,
          clientY: touch.clientY
        });
        container.dispatchEvent(mouseEvent);
      }, { passive: false });

      container.addEventListener('touchend', () => {
        image.style.transform = 'scale(1)';
      });
    },

    handleMouseMove(e, container, image, lens) {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate percentage position
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      // Move image
      image.style.transformOrigin = `${xPercent}% ${yPercent}%`;

      // Move lens
      const lensSize = 100;
      let lensX = x - lensSize / 2;
      let lensY = y - lensSize / 2;

      // Clamp lens position
      lensX = Math.max(0, Math.min(lensX, rect.width - lensSize));
      lensY = Math.max(0, Math.min(lensY, rect.height - lensSize));

      lens.style.left = `${lensX}px`;
      lens.style.top = `${lensY}px`;
      lens.style.opacity = '1';
    }
  };

  // ============================================
  // SMOOTH SCROLL MODULE
  // ============================================
  const SmoothScroll = {
    init() {
      // Handle anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const targetId = anchor.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            this.scrollTo(targetElement);
          }
        });
      });
    },

    scrollTo(element, offset = 80) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // ============================================
  // PRODUCT CARD MODULE
  // ============================================
  const ProductCard = {
    init() {
      this.bindQuickView();
      this.bindWishlist();
      this.bindAddToCart();
    },

    bindQuickView() {
      const quickViewBtns = document.querySelectorAll('[data-quick-view]');
      
      quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const productId = btn.dataset.productId;
          this.openQuickView(productId);
        });
      });
    },

    bindWishlist() {
      const wishlistBtns = document.querySelectorAll('[data-wishlist-toggle]');
      
      wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          btn.classList.toggle('is-active');
          
          const productId = btn.dataset.productId;
          const isActive = btn.classList.contains('is-active');
          
          // Dispatch wishlist event
          window.dispatchEvent(new CustomEvent('wishlist:toggle', {
            detail: { productId, isActive }
          }));
        });
      });
    },

    bindAddToCart() {
      const addToCartBtns = document.querySelectorAll('[data-add-to-cart]');
      
      addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const productId = btn.dataset.productId;
          
          // Show loading state
          const originalText = btn.textContent;
          btn.textContent = 'Adding...';
          btn.disabled = true;
          
          // Simulate API call
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            
            // Open cart drawer
            CartDrawer.open();
            
            // Update cart count
            const currentCount = parseInt(document.querySelector('.cart-badge')?.textContent || '0');
            CartDrawer.updateCartCount(currentCount + 1);
            
            // Dispatch event
            window.dispatchEvent(new CustomEvent('cart:add', {
              detail: { productId }
            }));
          }, 500);
        });
      });
    },

    openQuickView(productId) {
      // Would open a modal with product details
      console.log(`Opening quick view for product ${productId}`);
    }
  };

  // ============================================
  // NOTIFICATION MODULE
  // ============================================
  const Notification = {
    container: null,

    init() {
      this.createContainer();
    },

    createContainer() {
      this.container = document.createElement('div');
      this.container.className = 'notification-container';
      this.container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `;
      document.body.appendChild(this.container);
    },

    show(message, type = 'success', duration = 3000) {
      const notification = document.createElement('div');
      notification.className = `notification notification--${type}`;
      notification.style.cssText = `
        background: ${type === 'success' ? '#28A745' : type === 'error' ? '#DC3545' : '#C9A962'};
        color: white;
        padding: 16px 24px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-size: 14px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
      `;
      notification.textContent = message;

      this.container.appendChild(notification);

      // Animate in
      requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
      });

      // Remove after duration
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
      }, duration);
    }
  };

  // ============================================
  // LAZY LOADING MODULE
  // ============================================
  const LazyLoad = {
    init() {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              this.loadImage(img);
              imageObserver.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px'
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      } else {
        // Fallback: load all images immediately
        document.querySelectorAll('img[data-src]').forEach(img => this.loadImage(img));
      }
    },

    loadImage(img) {
      const src = img.dataset.src;
      if (src) {
        img.src = src;
        img.removeAttribute('data-src');
        img.classList.add('is-loaded');
      }
    }
  };

  // ============================================
  // THEME INITIALIZATION
  // ============================================
  const Theme = {
    init() {
      // Initialize all modules
      Header.init();
      MobileMenu.init();
      CartDrawer.init();
      ScrollReveal.init();
      ImageZoom.init();
      SmoothScroll.init();
      ProductCard.init();
      Notification.init();
      LazyLoad.init();

      // Add loaded class to body
      document.body.classList.add('theme-loaded');

      // Dispatch ready event
      window.dispatchEvent(new CustomEvent('shadan:ready'));

      console.log('🎨 Shadan Theme initialized');
    }
  };

  // ============================================
  // DOM READY
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Theme.init());
  } else {
    Theme.init();
  }

  // Expose Theme to global scope for debugging
  window.ShadanTheme = Theme;

})();
