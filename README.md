# NOVALO Jersey Store

NOVALO Jersey Store is a responsive e-commerce web application for browsing and ordering premium football jerseys. The project includes product listing, product details, cart, wishlist, checkout, order tracking, customer authentication, and an admin dashboard for managing store content.

## Live Demo

[https://www.novalo.xyz/](https://www.novalo.xyz/)

## GitHub Repository

[https://github.com/GalibDev/jersey-shop](https://github.com/GalibDev/jersey-shop)

## Features

- Responsive football jersey shopping experience
- Product listing with search and quick view
- Product details page with image gallery, size, and quantity selection
- Cart and wishlist functionality
- Checkout flow with customer billing and payment information
- Order tracking by phone number
- Customer registration, login, and profile page
- Admin authentication and protected admin dashboard
- Admin product, category, slider, notice, and order management
- Visitor tracking
- PWA manifest setup
- Google Analytics integration

## Technologies Used

- Next.js
- React.js
- TypeScript
- Tailwind CSS
- Supabase
- Zustand

## My Role

Full Stack Developer

- Designed and developed the frontend user interface
- Built product, cart, checkout, wishlist, and order tracking flows
- Implemented customer authentication and profile pages
- Developed the admin dashboard and management pages
- Integrated Supabase for authentication, database, and storage
- Added responsive layouts and e-commerce focused UI components

## Getting Started

### Prerequisites

- Node.js
- npm
- Supabase project credentials

### Installation

```bash
git clone https://github.com/GalibDev/jersey-shop.git
cd jersey-shop
npm install
```

### Environment Variables

Create a `.env.local` file in the project root and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
app/          Application routes and pages
components/   Reusable UI components
data/         Static product/category data
lib/          Supabase client and shared utilities
public/       Static assets and PWA files
store/        Zustand cart and wishlist stores
types/        TypeScript type definitions
```

## Author

**GalibDev**

- GitHub: [https://github.com/GalibDev](https://github.com/GalibDev)
- Repository: [https://github.com/GalibDev/jersey-shop](https://github.com/GalibDev/jersey-shop)

## License

This project is licensed under the MIT License.

Copyright (c) 2026 GalibDev.
