# Where’s Waldo

## Overview

A full-stack visual search game with server-validated coordinates, timed sessions, scene-specific leaderboards, and an authoring calibration tool.

## Purpose

It lets players locate characters in responsive scenes while protecting answer coordinates from client exposure.

## Main Features

- Scene selection and responsive gameplay
- Server-side character-hit validation
- Completion timer and player-name submission
- Per-scene leaderboards
- Calibration interface for normalized target centers/radii

## Technology Stack

- Frontend: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4
- Backend: Next.js Server Actions
- Database: PostgreSQL through Prisma 7
- Authentication: Not implemented
- Storage: PostgreSQL and static scene images
- Deployment: Vercel
- Libraries: Zustand

## Architecture

A feature-based Next.js monolith groups game, scene, leaderboard, and calibration concerns. Server Actions keep validation and persistence on the server.

## Folder Structure

`app` defines home, scene, and calibration routes; feature modules own UI and domain logic; Prisma defines images, targets, and scores.

## Database

`Image` scenes connect to `Character` records through `ImageCharacter`, which stores normalized center coordinates and radius. `Score` records scene completion.

## API

Server Actions fetch scenes, validate guesses, and submit scores. Character coordinates are checked server-side rather than shipped as answer data.

## Engineering Decisions

Normalized coordinates keep hit areas stable across responsive sizes, a join entity supports per-scene target geometry, and score boards remain scene-specific.

## Technologies Used

Next.js, React, TypeScript, Prisma, PostgreSQL, Tailwind CSS, Zustand.

## Potential Portfolio Highlights

Secure game validation, coordinate math, full-stack feature organization, calibration tooling, and public deployment.

## Missing Pieces

Add tests, rate limiting and stronger timer/score integrity, admin-protected scene creation, improved found-character feedback, and optional user/global progression only if needed.

## Suggested Screenshots

- Scene selection
- Active target selection
- Completed scene
- Leaderboard
- Calibration tool
- Mobile gameplay

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/where-s-waldo
- Live Demo: https://where-s-waldo-pj64.vercel.app/
- Documentation: Repository README

## Confidence

High
