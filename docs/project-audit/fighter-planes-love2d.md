# Fighter Planes Game

## Overview

A 2D arcade shooter built with LÖVE in which the player clears increasingly fast waves of enemy aircraft.

## Purpose

It demonstrates real-time game loops, collision handling, state transitions, and saved high scores.

## Main Features

- Ten-enemy levels with increasing speed
- Shooting, collision, score, and three-life systems
- Level progression and game-over flow
- Menu/game states
- Persisted best score
- Custom visual and audio assets

## Technology Stack

- Frontend/Backend: Lua on LÖVE2D
- Database/Authentication: Not applicable
- Storage: LÖVE save data
- Deployment: No downloadable release found
- Libraries: Lume

## Architecture

A state-driven game separates menu/game flow from reusable components and game objects under `src`.

## Folder Structure

Source directories group states, objects, and components; asset directories contain images/audio; the root contains LÖVE entry/config files.

## Database

Not applicable.

## API

No network API.

## Engineering Decisions

State separation controls menu/game transitions, per-level speed scaling raises difficulty, and save data preserves the best score.

## Technologies Used

Lua, LÖVE2D, Lume.

## Potential Portfolio Highlights

Real-time gameplay, collision/state logic, progression, persistence, and multimedia integration.

## Missing Pieces

Add tests for pure game rules, packaged releases, controls/options documentation, asset licensing/attribution, accessibility considerations, and architecture details in the README.

## Suggested Screenshots

- Main menu
- Active combat
- Later/faster level
- Game-over/high-score screen

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Fighter-planes-game-with-love-2d
- Live Demo: https://youtu.be/D4ClML7pg08 (video)
- Documentation: Repository README

## Confidence

High
