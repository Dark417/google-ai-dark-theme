/**
 * Popup Script - Handles theme toggle and settings
 */

const STORAGE_KEY = 'google-ai-dark-theme-enabled';
const BRIGHTNESS_KEY = 'google-ai-dark-theme-brightness';
const LINK_HUE_KEY = 'google-ai-dark-theme-link-hue';

document.addEventListener('DOMContentLoaded', async () => {
    const toggle = document.getElementById('themeToggle');
    const status = document.getElementById('status');
    const statusText = status.querySelector('.status-text');
    const brightnessSlider = document.getElementById('brightnessSlider');
    const brightnessValue = document.getElementById('brightnessValue');
    const linkColorSlider = document.getElementById('linkColorSlider');
    const linkColorValue = document.getElementById('linkColorValue');

    // Load current state
    const result = await chrome.storage.local.get([STORAGE_KEY, BRIGHTNESS_KEY, LINK_HUE_KEY]);

    const isEnabled = result[STORAGE_KEY] !== false; // Default true
    const brightness = result[BRIGHTNESS_KEY] || 80; // Default 80%
    const linkHue = result[LINK_HUE_KEY] || 210; // Default blue (210)

    toggle.checked = isEnabled;
    brightnessSlider.value = brightness;
    brightnessValue.textContent = brightness + '%';
    linkColorSlider.value = linkHue;
    linkColorValue.textContent = getColorName(linkHue);

    updateStatusUI(isEnabled);

    // Theme toggle handler
    toggle.addEventListener('change', async () => {
        const enabled = toggle.checked;
        await chrome.storage.local.set({ [STORAGE_KEY]: enabled });
        updateStatusUI(enabled);
        notifyContentScript();
    });

    // Brightness slider handler
    brightnessSlider.addEventListener('input', async () => {
        const brightness = parseInt(brightnessSlider.value);
        brightnessValue.textContent = brightness + '%';
        await chrome.storage.local.set({ [BRIGHTNESS_KEY]: brightness });
        notifyContentScript();
    });

    // Link color slider handler
    linkColorSlider.addEventListener('input', async () => {
        const hue = parseInt(linkColorSlider.value);
        linkColorValue.textContent = getColorName(hue);
        await chrome.storage.local.set({ [LINK_HUE_KEY]: hue });
        notifyContentScript();
    });

    function updateStatusUI(enabled) {
        if (enabled) {
            status.classList.remove('disabled');
            statusText.textContent = 'Enabled';
        } else {
            status.classList.add('disabled');
            statusText.textContent = 'Disabled';
        }
    }

    function getColorName(hue) {
        if (hue < 15 || hue >= 345) return 'Red';
        if (hue < 45) return 'Orange';
        if (hue < 75) return 'Yellow';
        if (hue < 150) return 'Green';
        if (hue < 195) return 'Cyan';
        if (hue < 255) return 'Blue';
        if (hue < 285) return 'Purple';
        if (hue < 345) return 'Pink';
        return 'Red';
    }

    async function notifyContentScript() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab && tab.url && (tab.url.includes('google.com') || tab.url.includes('google.ai'))) {
                const settings = await chrome.storage.local.get([STORAGE_KEY, BRIGHTNESS_KEY, LINK_HUE_KEY]);
                await chrome.tabs.sendMessage(tab.id, {
                    type: 'UPDATE_SETTINGS',
                    enabled: settings[STORAGE_KEY] !== false,
                    brightness: settings[BRIGHTNESS_KEY] || 80,
                    linkHue: settings[LINK_HUE_KEY] || 210
                });
            }
        } catch (error) {
            console.log('Could not communicate with content script:', error);
        }
    }
});
