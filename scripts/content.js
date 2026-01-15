/**
 * Google AI Dark Theme - Content Script
 * Applies dark theme with customizable brightness and link color
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'google-ai-dark-theme-enabled';
    const BRIGHTNESS_KEY = 'google-ai-dark-theme-brightness';
    const LINK_HUE_KEY = 'google-ai-dark-theme-link-hue';
    const THEME_CLASS = 'google-ai-dark-theme';

    // Check if we're on Google
    function isGoogle() {
        const hostname = window.location.hostname;
        return hostname.includes('google.ai') || hostname.includes('google.com');
    }

    // Apply custom CSS variables for brightness and colors
    function applyCustomStyles(brightness, linkHue) {
        // Calculate text lightness based on brightness (40-100)
        const textLightness = brightness;
        const secondaryLightness = Math.round(brightness * 0.65);
        const mutedLightness = Math.round(brightness * 0.45);

        // Create or update style element
        let styleEl = document.getElementById('google-ai-dark-theme-vars');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'google-ai-dark-theme-vars';
            document.head.appendChild(styleEl);
        }

        // Override CSS with dynamic values
        styleEl.textContent = `
      :root {
        --text-primary: hsl(210, 20%, ${textLightness}%) !important;
        --text-secondary: hsl(210, 10%, ${secondaryLightness}%) !important;
        --text-muted: hsl(210, 10%, ${mutedLightness}%) !important;
        --text-link: hsl(${linkHue}, 80%, 65%) !important;
        --text-link-hover: hsl(${linkHue}, 85%, 75%) !important;
      }
      
      /* Force text colors */
      .google-ai-dark-theme,
      .google-ai-dark-theme *,
      .google-ai-dark-theme *::before,
      .google-ai-dark-theme *::after {
        color: hsl(210, 20%, ${textLightness}%) !important;
      }
      
      /* Force link colors */
      .google-ai-dark-theme a,
      .google-ai-dark-theme a *,
      .google-ai-dark-theme .LC20lb,
      .google-ai-dark-theme h3 a,
      .google-ai-dark-theme h3 {
        color: hsl(${linkHue}, 80%, 65%) !important;
      }
      
      .google-ai-dark-theme a:hover,
      .google-ai-dark-theme a:hover *,
      .google-ai-dark-theme .LC20lb:hover,
      .google-ai-dark-theme h3 a:hover {
        color: hsl(${linkHue}, 85%, 75%) !important;
      }
      
      /* Keep green for URLs */
      .google-ai-dark-theme cite,
      .google-ai-dark-theme .NJjxre,
      .google-ai-dark-theme .qLRx3b,
      .google-ai-dark-theme .tjvcx,
      .google-ai-dark-theme .ylgVCe {
        color: hsl(140, 60%, 50%) !important;
      }
    `;

        console.log(`[Google AI Dark Theme] Applied - Brightness: ${brightness}%, Link Hue: ${linkHue}°`);
    }

    // Remove custom styles
    function removeCustomStyles() {
        const styleEl = document.getElementById('google-ai-dark-theme-vars');
        if (styleEl) {
            styleEl.remove();
        }
    }

    // Apply or remove the dark theme
    function setTheme(enabled, brightness = 80, linkHue = 210) {
        if (enabled) {
            document.documentElement.classList.add(THEME_CLASS);
            if (document.body) {
                document.body.classList.add(THEME_CLASS);
            }
            applyCustomStyles(brightness, linkHue);
        } else {
            document.documentElement.classList.remove(THEME_CLASS);
            if (document.body) {
                document.body.classList.remove(THEME_CLASS);
            }
            removeCustomStyles();
            console.log('[Google AI Dark Theme] Disabled');
        }
    }

    // Get settings from storage
    function getSettings() {
        return new Promise((resolve) => {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                chrome.storage.local.get([STORAGE_KEY, BRIGHTNESS_KEY, LINK_HUE_KEY], (result) => {
                    resolve({
                        enabled: result[STORAGE_KEY] !== false,
                        brightness: result[BRIGHTNESS_KEY] || 80,
                        linkHue: result[LINK_HUE_KEY] || 210
                    });
                });
            } else {
                resolve({ enabled: true, brightness: 80, linkHue: 210 });
            }
        });
    }

    // Initialize
    async function init() {
        if (!isGoogle()) return;

        const settings = await getSettings();
        setTheme(settings.enabled, settings.brightness, settings.linkHue);

        // Listen for popup messages
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                if (message.type === 'UPDATE_SETTINGS') {
                    setTheme(message.enabled, message.brightness, message.linkHue);
                    sendResponse({ success: true });
                }
                return true;
            });
        }

        // Performance: disable transitions while scrolling
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            document.documentElement.classList.add('scrolling');
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                document.documentElement.classList.remove('scrolling');
            }, 100);
        }, { passive: true });

        // Re-apply on dynamic content changes
        const observer = new MutationObserver(() => {
            if (!document.documentElement.classList.contains(THEME_CLASS)) {
                getSettings().then(s => {
                    if (s.enabled) setTheme(true, s.brightness, s.linkHue);
                });
            }
        });

        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }

    // Apply immediately to prevent flash
    document.documentElement.classList.add(THEME_CLASS);
    getSettings().then(s => {
        if (s.enabled) applyCustomStyles(s.brightness, s.linkHue);
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
