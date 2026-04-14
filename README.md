# Aura Scents - Product Showcase Website

A modern, interactive product showcase website built with Next.js, featuring smooth animations and responsive design. This project demonstrates advanced React components for displaying fragrance products with engaging user interactions.

## Tech Stack

### Frontend Framework

- **Next.js 16.2.1** - React framework for production
- **React 19.2.4** - UI library
- **TypeScript** - Type-safe JavaScript

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing tool
- **Tailwind Merge** - Utility for merging Tailwind classes
- **clsx** - Conditional CSS classes utility

### Animations & Interactions

- **GSAP (GreenSock Animation Platform)** - High-performance animations
- **Framer Motion** - React animation library
- **@gsap/react** - GSAP React integration

### Icons & Assets

- **Lucide React** - Beautiful & consistent icon library

### Development Tools

- **ESLint** - Code linting
- **Next.js Font Optimization** - Automatic font loading with Geist font

## Features

- **Interactive Product Display**: Smooth scrolling product bottles with animations
- **Product Switcher**: Dynamic switching between different products
- **Testimonials Section**: Customer feedback display
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI Components**: Navbar, Footer, and custom components
- **Performance Optimized**: Built with Next.js for optimal loading and SEO

## Project Structure

```
aura-scents/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── ProductBottleScroll.tsx
│   ├── ProductSwitcher.tsx
│   └── Testimonials.tsx
├── data/                  # Static data
│   └── products.ts
├── public/                # Static assets
│   └── images/           # Product images
└── config files          # Next.js, TypeScript, ESLint configs
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/aura-scents.git
cd aura-scents
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Navigate through the product showcase
- Use the product switcher to view different items
- Scroll through animated product displays
- View customer testimonials

## Build & Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Connect your GitHub repository
2. Vercel will automatically detect Next.js and deploy

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Animations powered by [GSAP](https://greensock.com/gsap/) and [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)
