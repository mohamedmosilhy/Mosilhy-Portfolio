# Tic Tac Toe

## Overview

A two-player browser game with round detection and session score tracking.

## Purpose

It demonstrates encapsulated JavaScript modules, factories, and DOM-state synchronization.

## Main Features

- Two-player turns
- Occupied-cell protection
- Win and draw detection
- Session score and automatic round reset
- New-game reset

## Technology Stack

- Frontend: HTML, CSS, JavaScript
- Backend/Database/Authentication/Storage: Not applicable
- Deployment: GitHub Pages
- Libraries: None

## Architecture

Factory functions model players and the board; controller modules coordinate rules and presentation.

## Folder Structure

The root holds the page, styles, script, and static assets.

## Database

Not applicable.

## API

Not applicable.

## Engineering Decisions

State is hidden behind factory/module closures, and the display controller is kept distinct from rule evaluation.

## Technologies Used

HTML, CSS, JavaScript.

## Potential Portfolio Highlights

Clear modular pattern for a small game and reliable round-state handling.

## Missing Pieces

Add configurable player names, computer play, keyboard support, tests, and persisted score settings.

## Suggested Screenshots

- Active game
- Win state
- Scoreboard

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Tic-Tac-Toe
- Live Demo: https://mohamedmosilhy.github.io/Tic-Tac-Toe/
- Documentation: Repository README

## Confidence

High
