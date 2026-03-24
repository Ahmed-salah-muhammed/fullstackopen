# ShopWave 🛍

Modern React e-commerce SPA — Vite + React Router v6 + **Tailwind CSS v4** + Context API.

---

## 🚀 Quick Start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build
```

---

## 📁 Project Structure

```
shopwave/
├── public/
│   └── _redirects              # Netlify SPA redirect
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Fixed nav + live cart badge
│   │   ├── ProductCard.jsx       # Shop grid card
│   │   ├── CartItem.jsx          # Cart row
│   │   └── QuantityControl.jsx   # Reusable +/− qty input
│   ├── context/
│   │   ├── CartContext.jsx       # Global cart (localStorage)
│   │   ├── AuthContext.jsx       # Mock auth (localStorage)
│   │   ├── ThemeContext.jsx      # Dark / light toggle
│   │   └── ToastContext.jsx      # Toast notifications
│   ├── hooks/
│   │   └── useFetchProducts.js   # Fetch hook w/ loading/error/refetch
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shop.jsx              # Filters: search, category, sort, price
│   │   ├── Cart.jsx              # Items + order summary
│   │   └── Login.jsx             # Validated form + mock auth
│   ├── services/
│   │   └── api.js                # All fetch() calls
│   ├── styles/
│   │   └── global.css            # @import "tailwindcss" + CSS variables
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js                # @tailwindcss/vite plugin
├── vercel.json
└── package.json
```

---

## 🎨 Tailwind v4 Setup

This project uses **Tailwind CSS v4** via the official Vite plugin — no `tailwind.config.js` needed.

### How it works

`vite.config.js` loads the plugin:
```js
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({ plugins: [tailwindcss(), react()] })
```

`src/styles/global.css` imports Tailwind + declares design tokens:
```css
@import "tailwindcss";

@theme {
  --font-display: 'Playfair Display', serif;
  --color-accent: #c8442a;
  /* ... */
}
```

CSS custom properties in `:root` / `[data-theme="dark"]` power dark mode since Tailwind's
`dark:` variant can't reach CSS variables dynamically — the `data-theme` attribute
is set on `<html>` by `ThemeContext`.

---

## 🌐 Routes

| Path     | Page  |
|----------|-------|
| `/`      | Home  |
| `/shop`  | Shop  |
| `/cart`  | Cart  |
| `/login` | Login |

---

## 🚀 Deploy

### Netlify
`public/_redirects` is included:
```
/* /index.html 200
```

### Vercel
`vercel.json` is included:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

### Cloudflare Pages
No config needed.
