# Mind Flip

## Overview

A Pokémon-themed memory game that challenges players to select each fetched character only once.

## Purpose

It turns API data and score state into a lightweight memory challenge for browser users.

## Main Features

- Multiple difficulty levels
- Random Pokémon names and official artwork
- Card reshuffling after selections
- Current and best score tracking
- Loading states and animated screen/card transitions

## Technology Stack

- Frontend: React 19, Vite 7, Tailwind CSS 4
- Backend/Database/Authentication: Not applicable
- Storage: In-memory state
- Deployment: Vercel
- Libraries: GSAP; PokéAPI via Fetch

## Architecture

React components render game screens while the top-level application coordinates fetched cards, selected IDs, difficulty, and scores.

## Folder Structure

`src` contains screens, game components, state orchestration, and styles; static branding is stored as assets.

## Database

Not applicable.

## API

The client requests Pokémon data and artwork from PokéAPI; no custom endpoint is present.

## Engineering Decisions

Stable Pokémon identifiers prevent duplicate scoring, while reshuffling changes position without changing the active set.

## Technologies Used

React, Vite, Tailwind CSS, GSAP, PokéAPI.

## Potential Portfolio Highlights

External API integration, clear game state, responsive interaction, and polished animation.

## Missing Pieces

Add retry/error recovery, request caching, persistent best scores, tests, reduced-motion support, and appropriate Pokémon attribution.

## Suggested Screenshots

- Difficulty selection
- Active card grid
- Score/game-over state
- Mobile layout

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Memory-Card
- Live Demo: https://memory-card-eosin-beta.vercel.app/
- Documentation: Repository README

## Confidence

High
