# TEO

## Overview

A media-rich portfolio for an architecture studio with project discovery, specialties, story content, and a detailed gallery experience.

## Purpose

It helps prospective clients evaluate the studio’s work and request a consultation.

## Main Features

- Home, projects, specialties, and story routes
- Rotating hero and filtered design/real project collections
- Grid/list modes and project counts
- Image/video modal with previous/next navigation, thumbnails, zoom, playback, and auto-advance
- Lazy route loading, error boundary, and Google Forms consultation

## Technology Stack

- Frontend: React 19, Vite 7 with SWC, Tailwind CSS 4
- Backend: Google Forms for consultation
- Database/Authentication: Not applicable
- Storage: Local project media
- Deployment: GitHub Pages is linked
- Libraries: React Router 7, GSAP, Lucide, React Icons

## Architecture

Route-level pages are lazy loaded. Project data and filtering logic are separated into data modules and a dedicated hook; gallery behavior lives in reusable components.

## Folder Structure

`src/pages` defines routes; `src/components/projects` owns discovery/gallery UI; hooks and project data modules contain behavior and content.

## Database

Not applicable.

## API

Consultation fields submit to Google Forms. No project-content API is present.

## Engineering Decisions

Media types share one modal model, route chunks load through `Suspense`, and project filtering is isolated from rendering.

## Technologies Used

React, Vite, Tailwind CSS, React Router, GSAP, Google Forms.

## Potential Portfolio Highlights

Sophisticated mixed-media gallery, strong architecture storytelling, and reusable project discovery.

## Missing Pieces

Resolve the repository-subpath mismatch between Vite base/BrowserRouter and GitHub Pages, then add tests, reduced-motion support, modal accessibility, and media-performance budgets.

## Suggested Screenshots

- Hero
- Filtered projects in both layouts
- Mixed-media modal
- Specialties
- Mobile consultation flow

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/TEO
- Live Demo: https://mohamedmosilhy.github.io/TEO/ (configuration indicates direct-route/subpath risk)
- Documentation: Repository README

## Confidence

High
