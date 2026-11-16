# Generic Food & Delicacies (`generickitchen-`)

> **Authentic Kenyan & East African Cuisine · Taste of Home, Made with Love**

A modern, high-performance, single-page restaurant and event catering web application built with **React 19**, **TanStack Start / Router**, **Vite**, **Tailwind CSS**, and **Nitro**. Features full-width visual hero presentations, an authentic 27-item Kenyan menu with realistic Australian Dollar ($ AUD) pricing, an interactive shopping cart drawer, direct WhatsApp ordering, and an official animated WhatsApp floating contact widget.

---

## 🌟 Highlights & Features

### 🍛 1. Authentic 27-Item Menu with Australian ($ AUD) Pricing
Curated and priced according to authentic East African restaurant benchmarks in Australia (e.g. Perth, Brisbane, Melbourne):
- **Grilled Meats & Mains ($20 – $28):** Sizzling Nyama Choma Platter ($28), Kuku Choma ($24), Mbuzi Goat Stew ($25), Beef Stew ($22), Chicken Stew ($22), Matumbo ($20), Beef Liver ($21).
- **Traditional & Vegetarian ($18 – $22):** Swahili Beef Pilau ($22), Mukimo Special ($20), Traditional Githeri ($18), Matoke Green Banana Stew ($19), Vegetarian Meal Combo ($19).
- **Slow-Simmered Soups ($13 – $14):** Bone Broth Soup (*Supu ya Mifupa*, $14), Hearty Beef Soup ($13), Free-Range Chicken Soup ($13).
- **Bites, Pastries & Accompaniments ($4 – $9):** Crispy Beef Samosas (3 pcs, $8), Potato Bhajias ($9), Golden Mahamri ($7), Sweet Kaimati ($7), Layered Chapati ($4), Classic Ugali ($5), Steamed Rice ($6), Braised Sukuma Wiki ($7), Fresh Kachumbari ($6), Sweet Potatoes ($6).
- **Spiced Beverages ($5):** Authentic Kenyan Spiced Chai (*Chai ya Tangawizi*, $5).

### 🛒 2. Interactive Cart & Drawer
- **Persistent Floating Pill**: Displays live item count and current cart total in `$ AUD`.
- **Side Slide-Over Drawer**:
  - Live quantity adjustment steppers (`+` / `-`).
  - Item removal with automatic subtotal and grand total calculation.
  - Optional fields for customer name, delivery address / table number, and special kitchen instructions.
  - "Browse Menu" empty state with quick link.

### 📱 3. Instant Kitchen WhatsApp Checkout
- One-click checkout compiles an itemized order receipt and opens a direct WhatsApp chat with the restaurant line (**+61 455 433 391**).
- Formats dish quantities, unit prices, subtotals, customer notes, and the grand total cleanly in the message.

### 💬 4. Official Animated WhatsApp Floating Widget
- **Official Brand Design**: Styled with official WhatsApp Green (`#25D366`), crisp white official vector emblem, and subtle glowing shadow.
- **Dynamic Periodic Motion**:
  - **Comes in**: Smoothly slides out from behind the WhatsApp button.
  - **Moves from time to time**: Performs an eye-catching attention nudge and gentle wave.
  - **Retreats**: Tucks away so the page stays clean and unobstructed.
  - **Hover / Touch Lock**: Hovering or focusing keeps the badge permanently expanded.

### 🎉 5. Event Catering Showcase
Showcases three distinct catering services with high-resolution imagery:
1. **Birthdays & Parties**: Bespoke menus, sizzling nyama choma platters, and authentic Kenyan sweet bars.
2. **Events & Banquets**: Weddings, corporate galas, and cultural get-togethers with full chafing-dish buffet setups.
3. **Meal Preps & Platters**: Hot, wholesome weekly family and individual meal prep packages.

### ⚡ 6. Single-Page Architecture & Responsive Design
- Continuous smooth-scroll navigation across `/` (`#home`, `#menu`, `#catering`, `#about`, `#contact`).
- Fully optimized responsive layout for mobile phones, tablets, laptops, and ultra-wide displays.
- High-performance next-gen WebP imagery with modern aspect ratios and accessible alt text.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Routing & SSR**: [TanStack Start](https://tanstack.com/start/latest) & [TanStack Router](https://tanstack.com/router/latest)
- **Bundler & Tooling**: [Vite](https://vite.dev/)
- **Server Engine**: [Nitro](https://nitro.unjs.io/) with Vercel Preset
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with OKLab custom palette
- **Icons**: [Lucide React](https://lucide.dev/) & Official SVG brand assets
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Testing & Quality**: [Vitest](https://vitest.dev/), [Testing Library](https://testing-library.com/), and [ESLint](https://eslint.org/)

---

## 📁 Project Structure

```text
├── src/
│   ├── assets/              # Optimized WebP dish photography and catering imagery
│   ├── components/          # Reusable UI primitives (Button, Badge, Navigation, etc.)
│   ├── lib/                 # Utility functions (cn, clsx, tailwind-merge)
│   ├── routes/
│   │   ├── __root.tsx       # Root layout and HTML document shell
│   │   └── index.tsx        # Single-page application containing all sections and state
│   ├── styles.css           # Global typography, colors, animations, and responsive rules
│   └── test/                # Unit and routing integration tests
├── public/                  # Static assets and favicon
├── vercel.json              # Vercel deployment configuration
├── vite.config.ts           # Vite + TanStack Start + Nitro Vercel preset config
└── package.json             # Scripts and dependencies
```

---

## 🚀 Local Development

### Prerequisites
- [Bun](https://bun.sh/) (version 1.0 or higher recommended) or [Node.js](https://nodejs.org/) (v20+)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rotz-kirwa/generickitchen-.git
   cd generickitchen-
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Start local development server:**
   ```bash
   bun run dev
   ```
   Open [http://localhost:8080](http://localhost:8080) in your browser.

4. **Run unit tests:**
   ```bash
   bun run test
   ```

5. **Lint and format code:**
   ```bash
   bun run lint
   bun run format
   ```

6. **Create a production build:**
   ```bash
   bun run build
   ```

---

## ☁️ Deploying to Vercel

This repository is pre-configured for seamless zero-config deployment on [Vercel](https://vercel.com/) via TanStack Start and Nitro's Vercel Output API v3 (`.vercel/output`).

### One-Click Vercel Setup:
1. Push your code to your GitHub repository:
   ```bash
   git push -u origin main
   ```
2. Navigate to your [Vercel Dashboard](https://vercel.com/new).
3. Click **"Add New..."** → **"Project"**.
4. Import the **`generickitchen-`** repository.
5. In the configuration screen:
   - **Framework Preset**: *Other* (configured automatically via `vercel.json`)
   - **Build Command**: `bun run build` (or leave default)
   - **Output Directory**: Automatically detected (`.vercel/output`)
6. Click **Deploy**. Vercel will bundle the static assets and deploy the Nitro serverless SSR functions automatically.

### Included `vercel.json` Configuration:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": null,
  "bunVersion": "1.x",
  "installCommand": "bun install --frozen-lockfile",
  "buildCommand": "bun run build"
}
```

---

## 📞 Kitchen Contact & Details

- **Location**: Australia
- **Phone**: `0455 433 391` (`+61 455 433 391`)
- **Direct WhatsApp**: [`+61 455 433 391`](https://wa.me/61455433391)
- **Tagline**: *Taste of Home, Made with Love*

---

## 📄 License

This project is licensed under the MIT License.
