# Raukar (راهکار) — raukarpro.com

Complete mobile-first static website ready for **GitHub Pages**.

## 2-Minute Customization Before Publishing

Open `script.js` and edit the `CONFIG` block at the very top:

```js
const CONFIG = {
  YOUR_WHATSAPP_NUMBER: "12025551234", // Country code + digits only (no + or spaces)
  YOUR_ZELLE_EMAIL: "pay@raukarpro.com",
  YOUR_INTERAC_EMAIL: "canada@raukarpro.com",
  YOUTUBE_VIDEO_ID: "YOUR_11_CHAR_ID", // Autoplay (?autoplay=1&mute=1&playsinline=1&rel=0) is built in
  CAD_EXCHANGE_RATE: 1.38
};
```

*(You can also paste your YouTube Video ID directly at `<!-- PASTE_YOUTUBE_VIDEO_ID_HERE -->` in `index.html`.)*

## Deploying to GitHub Pages

1. Unzip `raukarpro-website.zip`.
2. Create a new GitHub repository (e.g., `raukarpro-website`).
3. Upload all files (`index.html`, `styles.css`, `script.js`, `README.md`, and the `assets/` folder) to the repository root.
4. Go to **Settings → Pages**, select **Deploy from a branch**, choose `main` and `/ (root)`, and click **Save**.
5. Under **Custom domain**, enter `raukarpro.com` and configure your DNS A/CNAME records.

## Included Files
- `index.html` — Bilingual (English + Dari `dir="rtl"`) mobile-first markup
- `styles.css` — Responsive utility styling (Deep Slate, Warm Amber, WhatsApp Green)
- `script.js` — Cart, Dynamic City Delivery Estimator, `RK-XXXX` Order Code Generator, Copy & WhatsApp pre-fill
- `assets/logo.svg` & `assets/logo.png` — Custom Raukar | راهکار brand logo
- `assets/favicon.svg` — Shield + Home + Warmth icon mark
- `assets/kit-mini.svg`, `assets/kit-tier1.svg`, `assets/kit-tier2.svg` — Custom product illustrations
