# CardioMatic Clinic

## Overview

A React clinic-management prototype backed by a local JSON server, with an additional Prisma schema documenting a broader intended domain.

## Purpose

It explores patient, physician, appointment, and clinical-record workflows for clinic staff.

## Main Features

- Public landing content
- Patient and physician directories with CRUD-style flows
- Appointments, medical records, prescriptions, and statistics
- Login/signup screens

## Technology Stack

- Frontend: React 18 (Create React App), React Router, Material UI, Material Tailwind
- Backend: JSON Server development API
- Database: JSON fixture at runtime; separate PostgreSQL Prisma schema is not integrated
- Authentication: Screens exist; production authentication is not evidenced
- Storage: Local JSON fixture
- Deployment: No verified deployment found
- Libraries: MUI Charts, React Toastify

## Architecture

A component/page-oriented SPA consumes JSON Server. A separate Prisma schema represents future or related backend modeling but is not the running data layer.

## Folder Structure

`src` contains pages, components, assets, and the JSON data fixture; Prisma artifacts sit separately at the repository root.

## Database

The schema models users, patients, physicians, appointments, medical records, prescriptions, diagnoses, tests, treatments, invoices, and posts. Runtime screens currently use JSON Server instead.

## API

CRUD requests target JSON Server resources. No integrated authenticated production API is present.

## Engineering Decisions

Material component libraries accelerate dense clinic interfaces, while the schema expresses relationships beyond the mock service.

## Technologies Used

React, Material UI, JSON Server, Prisma, PostgreSQL schema, React Router.

## Potential Portfolio Highlights

Broad healthcare domain modeling, many operational screens, charts, and a substantial commit history.

## Missing Pieces

Integrate a secure backend, implement real role-based authentication, provide migrations and tests, resolve lint/accessibility issues, and document privacy, audit, and healthcare-security controls.

## Suggested Screenshots

- Clinic dashboard
- Patient directory/detail
- Appointments
- Medical record/prescription
- Mobile layout

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/CardioMaticClinic
- Live Demo: Not found
- Documentation: README; related backend repository is linked there

## Confidence

High
