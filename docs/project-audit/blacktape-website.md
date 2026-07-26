# Blacktape Website

## Overview

An animation-led corporate website for a digital infrastructure brand, built around cinematic scroll choreography and device imagery.

## Purpose

It communicates Blacktape’s services, positioning, and contact path to prospective clients while serving as a high-fidelity front-end showcase.

## Main Features

- Asset-prefetched SVG introduction and animated hero
- Responsive navigation, service sections, client content, and footer
- Pinned, horizontal, and vertical GSAP sequences
- Device mockups, phone slides, modal interactions, and contact validation
- Local/CDN asset switching

## Technology Stack

- Frontend: React 19, Vite 7, Tailwind CSS 4
- Backend/Database/Authentication: Not implemented
- Storage: Local assets or configured CDN assets
- Deployment: Vercel
- Libraries: GSAP, `@gsap/react`, ScrollTrigger, SplitText, React Responsive, React Icons

## Architecture

A section-oriented React application with reusable visual components and centralized asset behavior. GSAP contexts coordinate animation lifecycles.

## Folder Structure

`src/components` contains page sections and interaction components; public assets hold imagery and frame sequences; root configuration controls Vite and Tailwind.

## Database

Not applicable.

## API

The contact form validates client-side but targets a placeholder endpoint, so submission is not operational.

## Engineering Decisions

Critical assets are prefetched before the intro, local and CDN delivery are switchable, and breakpoint changes reset choreography to avoid stale animation geometry.

## Technologies Used

React, Vite, Tailwind CSS, GSAP, ScrollTrigger, SplitText.

## Potential Portfolio Highlights

Complex scroll direction changes, polished responsive art direction, performance planning, and extensive animation composition.

## Missing Pieces

Connect a real contact service; add automated tests, reduced-motion behavior, focus management, and measured performance budgets; replace the forced breakpoint reload where practical.

## Suggested Screenshots

- Intro and hero
- Device sequence
- Services choreography
- Mobile layout
- Contact modal

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Blacktape-Website
- Live Demo: https://blacktape-website.vercel.app/
- Documentation: README and repository planning documents

## Confidence

High
