# ResonanceM Radiology Lab Management

## Overview

A radiology operations dashboard that manages patients, physicians, scans, reports, and visual analytics through Supabase.

## Purpose

It is designed for lab staff to track scan workflows and longitudinal patient information.

## Main Features

- Dashboard analytics and charts
- Patient/subject and doctor management
- Scan list and new-scan workflow
- Scan detail, status, diagnosis, and report views
- Search and demographic/type/activity summaries

## Technology Stack

- Frontend: Next.js 13 Pages Router, React 18, Tailwind CSS, Material Tailwind, Headless UI
- Backend: Supabase client services
- Database: Supabase PostgreSQL; schema migration not included
- Authentication: No implemented authenticated route flow was found
- Storage: Supabase
- Deployment: No verified deployment found
- Libraries: React Hook Form, Recharts

## Architecture

A page/component Next.js application centralizes Supabase data access in a data-manager utility.

## Folder Structure

`pages` defines dashboard and entity views; `src` contains components and data utilities; public/assets contain diagrams and images.

## Database

Patient, doctor, and scan relationships are evident from the UI and ER/class diagrams, but an executable schema or migration set is not present.

## API

The browser uses the Supabase client through `dataManager.js`; no custom Next.js API layer is implemented.

## Engineering Decisions

Shared data-access methods reduce direct Supabase calls in views, and charts derive operational summaries from persisted records.

## Technologies Used

Next.js, React, Supabase, Tailwind CSS, Material Tailwind, React Hook Form, Recharts.

## Potential Portfolio Highlights

Healthcare workflow breadth, dashboard analytics, forms, and data-backed entity views.

## Missing Pieces

Add schema migrations and RLS policies, authentication/roles, audit logging, privacy/security documentation, tests, dependency modernization, and a verified deployment.

## Suggested Screenshots

- Dashboard analytics
- Scan list
- New scan
- Patient history
- Scan diagnosis/report

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/radiology-lab-management-software
- Live Demo: Not found
- Documentation: README and ER/class diagrams

## Confidence

Medium
