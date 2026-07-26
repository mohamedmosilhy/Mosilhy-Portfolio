# CV Crafter

## Overview

A client-side CV builder with live editing, layout choices, color customization, and print output.

## Purpose

It helps job seekers compose a structured résumé and preview changes immediately.

## Main Features

- Editable personal, education, and experience sections
- Add/remove repeatable entries
- Three résumé layouts and accent-color selection
- Reset and browser print workflow
- Responsive editor and preview

## Technology Stack

- Frontend: React 19, Vite 7, Tailwind CSS 4
- Backend/Database/Authentication: Not applicable
- Storage: In-memory state
- Deployment: GitHub Pages
- Libraries: React To Print, Font Awesome

## Architecture

`App` owns résumé state and passes focused data/actions into controller, content-card, and template components.

## Folder Structure

`src` contains editor controls, résumé content components, templates, and styles; public assets support the deployed shell.

## Database

Not applicable.

## API

Not applicable.

## Engineering Decisions

State is lifted to keep all layouts synchronized, reusable cards model repeatable records, and accent text color adjusts for contrast.

## Technologies Used

React, Vite, Tailwind CSS, React To Print.

## Potential Portfolio Highlights

Structured form state, live preview, reusable layouts, and printable output.

## Missing Pieces

Add persistence, import/export, stronger validation, accessible form labeling, automated tests, and a dedicated PDF workflow.

## Suggested Screenshots

- Editor and live preview
- Alternate layouts
- Color customization
- Print preview

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/CV-Application
- Live Demo: https://mohamedmosilhy.github.io/CV-Application/
- Documentation: Repository README

## Confidence

High
