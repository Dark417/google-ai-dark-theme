# 🌙 Google AI Dark Theme

A premium Chrome extension that applies a sleek dark theme to Google Search AI Mode. Reduce eye strain and browse in style with customizable brightness and accent colors.

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat&logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-green?style=flat)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat)

## ✨ Features

- **🎨 Premium Dark Theme** - Deep dark backgrounds with carefully chosen contrast ratios
- **🤖 AI Mode Optimized** - Specifically styled for Google's AI responses, source cards, and conversation UI
- **🔆 Adjustable Brightness** - Slider control to set text brightness from dim (40%) to bright (100%)
- **🌈 Custom Link Colors** - Pick any color for links using a hue slider (0°-360°)
- **💾 Persistent Settings** - Your preferences are saved and persist across browser sessions
- **⚡ Performance Optimized** - Disables animations during scroll for smooth browsing
- **🔄 Real-time Updates** - Changes apply instantly without page refresh

## 📸 Screenshots

| Dark Theme Applied | Settings Popup |
|-------------------|----------------|
| Dark backgrounds, custom text brightness | Toggle, brightness slider, color picker |

## 🚀 Installation

### Method 1: Load Unpacked (Developer Mode)

1. **Download** this repository:
   ```bash
   git clone https://github.com/Dark417/google-ai-dark-theme.git
   ```

2. **Open Chrome** and navigate to:
   ```
   chrome://extensions/
   ```

3. **Enable Developer Mode** - Toggle the switch in the top-right corner

4. **Click "Load unpacked"** and select the cloned folder

5. **Done!** The extension icon (🌙) will appear in your toolbar

### Method 2: From Release (Coming Soon)

Download the latest `.crx` file from the [Releases](https://github.com/Dark417/google-ai-dark-theme/releases) page.

## 📖 Usage

1. **Navigate** to [google.ai](https://google.ai) or use Google Search AI Mode
2. **Click** the 🌙 moon icon in your Chrome toolbar
3. **Toggle** the dark theme on/off
4. **Adjust** text brightness using the slider (40% = dim gray, 100% = bright white)
5. **Customize** link colors by sliding through the color spectrum

## 📁 Project Structure

```
google-ai-dark-theme/
├── manifest.json          # Chrome extension manifest (V3)
├── styles/
│   └── dark-theme.css     # Main dark theme stylesheet
├── scripts/
│   └── content.js         # Content script for theme injection
├── popup/
│   ├── popup.html         # Extension popup UI
│   ├── popup.css          # Popup styling
│   └── popup.js           # Popup logic & settings
├── icons/
│   ├── icon16.png         # 16x16 toolbar icon
│   ├── icon48.png         # 48x48 extension list icon
│   └── icon128.png        # 128x128 store icon
├── README.md              # This file
└── LICENSE                # MIT License
```

## ⚙️ Customization

### Modify Theme Colors

Edit `styles/dark-theme.css` and update the CSS variables:

```css
:root {
  --dark-bg-primary: #0d1117;      /* Main background */
  --dark-bg-secondary: #161b22;    /* Card backgrounds */
  --dark-bg-tertiary: #21262d;     /* Input backgrounds */
  --dark-border: #30363d;          /* Border color */
  --text-primary: hsl(210, 20%, 80%);  /* Default text */
  --accent-green: hsl(140, 60%, 50%);  /* URL color */
}
```

### Add More Targeted Styles

The extension uses aggressive CSS selectors to override Google's styles. Add new selectors to `dark-theme.css`:

```css
.google-ai-dark-theme .your-target-class {
  background-color: var(--dark-bg-secondary) !important;
  color: var(--text-primary) !important;
}
```

## 🛠️ Development

### Prerequisites

- Google Chrome or Chromium-based browser
- Git (for cloning)

### Making Changes

1. Edit the source files
2. Go to `chrome://extensions/`
3. Click the 🔄 reload button on the extension
4. Refresh any Google pages to see changes

### Building for Production

The extension doesn't require a build step. For distribution:

1. Zip the entire folder (excluding `.git`, `README.md`, etc.)
2. Upload to Chrome Web Store or distribute the ZIP

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by GitHub's dark theme color palette
- Built for Google Search AI Mode enthusiasts who prefer dark interfaces

## 📧 Contact

- **GitHub**: [@Dark417](https://github.com/Dark417)
- **Issues**: [Report a bug](https://github.com/Dark417/google-ai-dark-theme/issues)

---

<p align="center">Made with 🌙 for night owls</p>
