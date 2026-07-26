# Nova E-commerce Platform

## Overview

A large Arabic-first, MENA-oriented commerce platform with a storefront, operations dashboard, content tooling, themes, and integration infrastructure.

## Purpose

It supports merchants selling physical and digital products through configurable catalog, offer, payment, fulfillment, and marketing workflows.

## Main Features

- Physical/digital catalog, variants, attributes, inventory, brands, categories, and reviews
- Multi-slot bundles, cross-sells, cart, checkout, city/country shipping, COD, and proof-based payments
- Order and independent payment lifecycles with historical snapshots
- Digital access after payment confirmation
- Admin analytics, catalog, orders, payments, moderation, settings, and content management
- Landing pages, SEO, pixels, assisted content, two previewable/publishable themes
- WhatsApp/n8n configuration, logs, and webhook support

## Technology Stack

- Frontend: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4
- Backend: Next.js route handlers and server-side feature services
- Database: PostgreSQL through Prisma 7
- Authentication: Auth.js v5 credentials/JWT with Admin and Super Admin roles
- Storage: PostgreSQL; uploads currently use local filesystem
- Deployment: No verified public deployment found
- Libraries: Zustand, TanStack Query, React Hook Form, Zod, Recharts, Next/Image, Sharp

## Architecture

A feature-based modular monolith. Thin route handlers and server-rendered routes delegate to feature services, validation schemas, repositories/queries, and shared infrastructure.

## Folder Structure

`src/app` owns routes; `src/features` groups domain behavior; shared UI/lib/config live outside features; `prisma` contains a large schema and 31 migrations; tests cover multiple layers.

## Database

The relational model covers catalog, offers, carts, orders, payments, shipping, digital access, reviews, content, analytics, themes, integrations, and immutable transaction snapshots.

## API

App Router handlers expose authenticated admin and storefront operations. Zod validates inputs, roles gate privileged actions, and webhook/integration routes record external activity.

## Engineering Decisions

Order snapshots preserve historical truth, payment status is independent from fulfillment, feature boundaries constrain scale, themes use draft/preview/publish state, and server/client state tools are separated by responsibility.

## Technologies Used

Next.js, React, TypeScript, Prisma, PostgreSQL, Auth.js, Tailwind CSS, Zustand, TanStack Query, Zod, Vitest, Playwright.

## Potential Portfolio Highlights

Deep commerce modeling, scalable modular architecture, authorization, tested business rules, multilingual/RTL design, configurable themes, and integration readiness.

## Missing Pieces

Resolve existing strict lint/type-hook violations, replace local uploads with durable object storage, harden uploads and rate limits, add backup/observability procedures, rotate production secrets, and verify external integrations before deployment.

## Suggested Screenshots

- Storefront and product detail
- Bundle/cart/checkout
- Order and payment operations
- Admin KPI dashboard
- Landing-page editor
- Nova/Kiddex theme comparison
- Mobile RTL flow

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/e-commerce-app
- Live Demo: [demo](https://kenzkids.com/); repository includes extensive screenshots/recordings
- Documentation: README and extensive project documentation

## Confidence

High
