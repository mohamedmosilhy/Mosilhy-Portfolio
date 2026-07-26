# Battleship

## Overview

A browser implementation of Battleship with player and computer fleets, turn-based attacks, and win detection.

## Purpose

It demonstrates object-oriented game modeling, DOM orchestration, and unit-tested rules for casual browser players.

## Main Features

- 10×10 player and computer boards
- Horizontal or vertical ship placement with overlap and boundary validation
- Random legal computer fleet generation
- Hit, miss, sunk, duplicate-shot, and game-over handling

## Technology Stack

- Frontend: Vanilla JavaScript ES modules, HTML, CSS
- Backend/Database/Authentication: Not applicable
- Storage: Bundled local assets; no persisted game state
- Deployment: GitHub Pages
- Libraries: Webpack, Babel, Jest

## Architecture

Domain classes (`Ship`, `Gameboard`, and `Player`) are separated from DOM rendering, with the entry module coordinating gameplay.

## Folder Structure

`src` contains game models, DOM logic, styles, and the entry point; tests cover core domain objects; build configuration lives at the root.

## Database

Not applicable.

## API

Not applicable.

## Engineering Decisions

Placement validation is enforced before state mutation, computer fleets are generated from legal positions, and core rules are tested without the DOM.

## Technologies Used

JavaScript, HTML, CSS, Webpack, Babel, Jest.

## Potential Portfolio Highlights

Tested domain logic, clear separation of concerns, and nontrivial game-state validation.

## Missing Pieces

Improve computer strategy, touch-friendly orientation controls, keyboard access, status announcements, and continuous integration.

## Suggested Screenshots

- Fleet placement
- Mid-game hit/miss state
- Victory screen
- Mobile board

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Battleship
- Live Demo: https://mohamedmosilhy.github.io/Battleship/
- Documentation: Repository README

## Confidence

High
