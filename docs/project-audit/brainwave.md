# Brainwave

## Overview

A polished product landing page presenting a conceptual AI service through layered artwork and parallax motion.

## Purpose

It targets prospective AI-product customers and demonstrates reusable React marketing sections.

## Main Features

- Responsive header with scroll-locked mobile menu
- Hero artwork, parallax details, benefits, integrations, services, pricing, and roadmap
- Data-driven repeated content and social footer

## Technology Stack

- Frontend: React 18, Vite 5, Tailwind CSS 3
- Backend/Database/Authentication: Not implemented
- Storage: Static local assets
- Deployment: Vercel
- Libraries: React Router DOM, React Just Parallax, Scroll Lock

## Architecture

A component-based single-page React application. Shared constants drive repeated sections and decorative elements are isolated from content components.

## Folder Structure

`src/components` contains sections and decorations; `src/constants` contains content data; assets are grouped under `src/assets`.

## Database

Not applicable.

## API

Not applicable; account and pricing actions are illustrative.

## Engineering Decisions

Repeated content is modeled as arrays, section wrappers standardize layout, and the mobile menu prevents background scrolling.

## Technologies Used

React, Vite, Tailwind CSS, React Router, React Just Parallax.

## Potential Portfolio Highlights

Reusable components, responsive art direction, and layered visual composition.

## Missing Pieces

Add meaningful routes or actions, tests, reduced-motion support, keyboard/focus review, performance measurements, and stronger original design differentiation.

## Suggested Screenshots

- Hero
- Benefits cards
- Collaboration orbit
- Mobile menu

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Brainwave
- Live Demo: https://brainwave-rosy-ten.vercel.app/
- Documentation: Repository README

## Confidence

High
