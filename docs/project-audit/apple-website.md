# Apple iPhone 15 Pro Website Recreation

## Overview

A high-fidelity iPhone 15 Pro product-page recreation combining video, scroll animation, and an interactive 3D model.

## Purpose

It demonstrates advanced front-end motion and WebGL product presentation rather than an original commerce workflow.

## Main Features

- Responsive hero video
- Highlights carousel with timed progress and replay
- Interactive 3D phone with color and size selection
- Scroll-triggered feature videos and A17 presentation
- Error monitoring integration

## Technology Stack

- Frontend: React 18, Vite 5, Tailwind CSS 3
- Backend/Database/Authentication: Not applicable
- Storage: Local/static media
- Deployment: Vercel
- Libraries: Three.js, React Three Fiber, Drei, GSAP, ScrollTrigger, Sentry

## Architecture

Section components consume centralized constants; animation utilities coordinate GSAP timelines, while React Three Fiber owns the model canvas.

## Folder Structure

`src/components` contains page sections and 3D content; `src/constants` supplies data; `src/utils` holds animation helpers; assets include media and models.

## Database

Not applicable.

## API

No product or commerce API is implemented. Sentry receives configured client telemetry.

## Engineering Decisions

Video timing drives carousel progress, WebGL state switches model variants, and scroll timelines synchronize media with narrative sections.

## Technologies Used

React, Vite, Tailwind CSS, Three.js, React Three Fiber, GSAP, Sentry.

## Potential Portfolio Highlights

Interactive 3D, synchronized video animation, responsive fidelity, and production telemetry exposure.

## Missing Pieces

Add WebGL/video fallbacks, tests, reduced motion, keyboard controls, performance measurements, environment-safe Sentry configuration, and clear educational/IP attribution.

## Suggested Screenshots

- Hero
- Highlights carousel
- 3D color/size configurator
- A17 section
- Mobile view

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/apple_website
- Live Demo: https://apple-website-lac.vercel.app/
- Documentation: Repository README

## Confidence

High
