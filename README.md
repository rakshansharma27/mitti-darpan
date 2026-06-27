# Mitti & Darpan — Authentic Lippan Mud & Mirror Art Store

<div align="center">
  <h3>An online boutique showcasing authentic, handcrafted Kutch Lippan Art by Ruchi Sharma, curated by Rakshan Sharma.</h3>
  
  [![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
  [![React](https://img.shields.io/badge/react-%2320232d.svg?style=flat-square&logo=react&logoColor=%2361DAFB)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vanilla CSS](https://img.shields.io/badge/css-vanilla-blue?style=flat-square&logo=css3)](https://www.w3.org/Style/CSS/)
</div>

---

## 🎨 About the Project

**Mitti & Darpan** ("Mud & Mirror") is a premium e-commerce experience designed to bridge traditional Kutch heritage art with contemporary home spaces. The platform showcases a curated gallery of Lippan Kaam plaques individually hand-molded and painted by artisan **Ruchi Sharma** in Uttar Pradesh, India. 

Every piece utilizes premium **Fevicryl Mouldit** clay, high-grade acrylics, and hand-cut mirrors on seasoned **MDF boards**, ensuring heirloom-quality durability.

---

## ✨ Key Features

* **Bespoke Interactive Design Studio**: Customers can custom-design their own Lippan plaque, tuning dimensions (from 4" to 30"), clay palettes, and mirror complexities, with instant transparent pricing calculation.
* **Product Catalog**: Beautifully curated product grid detailing specifications, exact materials used, dimensions, and styling guides.
* **Honest Pledge of Authenticity**: Clean, placeholder-free listing with strict dedication to raw craftsmanship.
* **Secure UPI Checkout Flow**: Simulates a secure checkout generating dynamic UPI payment QR codes linked to curator Rakshan Sharma's payee credentials, finishing with a structured WhatsApp confirmation.
* **Insured Safe-Transit Guarantee**: Explicitly outlines Ruchi's safe-delivery protocol and transit replacement claims.

---

## 🛠️ Technology Stack

* **Core Framework**: React 18 & TypeScript
* **Build System**: Vite
* **Styling**: Vanilla CSS (Tailored HSL Earth-Tone Palette & Glassmorphic Shadows)
* **Icons**: Lucide React
* **Hosting Integration**: Pre-configured for GitHub & Netlify continuous integration.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/rakshansharma27/mitti-darpan.git
   cd mitti-darpan
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The local server will start at `http://localhost:3000/`.

4. **Build for Production**:
   ```bash
   npm run build
   ```
   Build files will be generated in the `dist/` directory.

---

## 📁 Repository Structure

```
├── public/                 # Static assets
├── src/
│   ├── assets/             # Decorative elements & textures
│   ├── components/         # Reusable React components
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── QuickViewModal.tsx
│   │   ├── CartDrawer.tsx
│   │   └── CustomConfigurator.tsx
│   ├── hooks/              # Custom React state hooks (useCart)
│   ├── data.ts             # Store catalog, faq data, and craft process steps
│   ├── types.ts            # Type definitions for products & order details
│   ├── index.css           # Global custom design system tokens & utility styles
│   └── main.tsx            # Application entry point
├── package.json
└── vite.config.ts
```

---

## ☁️ Deployment

This project is fully ready for deployment on **Netlify** or **Vercel** with zero-configuration:

1. Connect your fork or repository branch `main` to Netlify.
2. Set the following build settings:
   * **Build Command**: `npm run build`
   * **Publish Directory**: `dist`
3. Click **Deploy**. Netlify will handle building, serving, and continuous deployments upon pushing to `main`.

---

## 📞 Commissions & Contact

For custom commissions, sizing requests, or direct curator inquiries, reach out to Rakshan Sharma:
* **WhatsApp**: [+91 96968 66194](https://wa.me/919696866194)
* **Email**: [rakshansharma644@gmail.com](mailto:rakshansharma644@gmail.com)
* **Curator Address**: Uttar Pradesh, India.
