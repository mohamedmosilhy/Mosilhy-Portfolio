# LDB Landing Page

## Overview

A motion-rich landing page for Learning Design Boutique, including services, project detail content, testimonials, and lead capture.

## Purpose

It markets learning-design services to prospective clients and routes qualified leads into consultation requests.

## Main Features

- Responsive navigation, hero, values, services, and client logos
- Project detail views
- Automatic testimonial carousel
- Validated Google Forms consultation submission
- GSAP motion and scroll-to-top control

## Technology Stack

- Frontend: React 19, Vite 7, Tailwind CSS 4
- Backend: Google Forms submission endpoint
- Database/Authentication: Not applicable
- Storage: Static content and assets
- Deployment: GitHub Pages
- Libraries: GSAP

## Architecture

A componentized single-page application with centralized content constants and isolated form configuration.

## Folder Structure

`src/components` contains sections and interactions; data/configuration modules hold repeated content and form mappings; assets are local.

## Database

Not directly accessible; responses are delegated to Google Forms.

## API

The contact flow maps validated fields to Google Forms and reports submission state to the UI.

## Engineering Decisions

Content arrays drive repeated cards, form integration avoids a custom backend, and project details are separated from the overview presentation.

## Technologies Used

React, Vite, Tailwind CSS, GSAP, Google Forms.

## Potential Portfolio Highlights

Production-oriented lead capture, motion polish, reusable sections, and rich project storytelling.

## Missing Pieces

Add tests, reduced-motion behavior, focus/accessibility review, form privacy/error documentation, and monitoring for the external form dependency.

## Suggested Screenshots

- Hero
- Services
- Project detail
- Testimonial carousel
- Contact form and mobile view

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/LDB-Landing-Page
- Live Demo: https://mohamedmosilhy.github.io/LDB-Landing-Page/
- Documentation: Repository README

## Confidence

High
