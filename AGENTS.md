<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Terra Bloom — Project Context for AI Agents

## Overview
Terra Bloom is a WhatsApp-based e-commerce storefront for handcrafted terrariums. Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Supabase**.

## Architecture
- **Framework**: Next.js 16.3.1 with App Router (`src/app/`)
- **Styling**: Tailwind CSS v4 with `@theme` tokens in `globals.css`
- **Backend**: Supabase (optional — app falls back to mock data when env vars are missing)
- **State**: React Context (`StoreContext`, `AdminAuthContext`)
- **No payment gateway** — orders are handled via WhatsApp enquiry flow

## Key Conventions
1. **Layout Props**: Next.js 16 uses typed `LayoutProps<"/">` for root layout
2. **Params**: Dynamic route params are `Promise<{ id: string }>` — must be awaited
3. **useSearchParams()**: Must be wrapped in `<Suspense>` boundary
4. **CSS**: All styling via Tailwind utility classes; custom tokens defined in `@theme` block in `globals.css`
5. **Data Layer**: Services in `src/services/` fetch from Supabase with automatic fallback to `src/lib/constants.ts` mock data

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (StoreProvider)
│   ├── page.tsx            # Home page
│   ├── shop/               # Shop with category filters
│   ├── products/[id]/      # Product detail
│   ├── custom-terrariums/  # Custom order enquiry
│   ├── kits-accessories/   # Kits & accessories
│   ├── about/              # About page
│   └── admin/              # Admin dashboard
│       ├── login/          # Admin login
│       ├── banners/        # Banner management
│       ├── products/       # Product management
│       ├── orders/         # Order log
│       └── settings/       # Store settings (WhatsApp, contact info)
├── components/
│   ├── ui/                 # Reusable: Button, Input, Modal, Spinner
│   ├── layout/             # AnnouncementBar, Header, Footer
│   └── storefront/         # HeroSlider, CategoryGrid, ProductCard, ProductGrid, TrustBadges, TestimonialSlider, WhatsappModal
├── context/                # StoreContext, AdminAuthContext
├── lib/
│   ├── supabase/           # Supabase client setup
│   ├── constants.ts        # Mock/fallback data
│   ├── utils.ts            # Shared utilities
│   └── whatsapp.ts         # WhatsApp message builder
├── services/               # Data access layer (banners, products, settings, orders)
└── types/                  # TypeScript type definitions
```

## Environment Setup
Copy `.env.example` to `.env.local` and add Supabase credentials. Without them, the app uses built-in mock data.

## Admin Credentials (Demo)
- Email: `admin@terrabloom.in`
- Password: `terrabloom2024`
