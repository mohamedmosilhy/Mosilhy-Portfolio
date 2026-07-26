# Weather App

## Overview

A browser weather search that retrieves current conditions and changes presentation based on the result.

## Purpose

It lets users check current weather by location and demonstrates external API consumption.

## Main Features

- Location search
- Current-condition display
- Celsius/Fahrenheit switching
- Loading and error states
- Condition-based backgrounds and responsive layout

## Technology Stack

- Frontend: HTML, CSS, JavaScript Fetch API
- Backend/Database/Authentication: Not applicable
- Storage: No persistent application storage
- Deployment: GitHub Pages
- Libraries: Visual Crossing Weather API

## Architecture

A static interface performs direct client-side API requests and maps the response into weather presentation state.

## Folder Structure

Root HTML, CSS, and JavaScript files are paired with condition imagery.

## Database

Not applicable.

## API

The browser calls Visual Crossing directly for current weather; the credential is exposed in client source.

## Engineering Decisions

Unit changes trigger refreshed data, explicit loading/error states cover network behavior, and conditions select page imagery.

## Technologies Used

HTML, CSS, JavaScript, Fetch API, Visual Crossing.

## Potential Portfolio Highlights

External API integration and clear asynchronous UI states.

## Missing Pieces

Move the API key behind a server proxy, add forecast data, caching, tests, accessible status announcements, and request throttling.

## Suggested Screenshots

- Successful city result
- Alternate condition background
- Error state
- Mobile view

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/weather-app
- Live Demo: https://mohamedmosilhy.github.io/weather-app/
- Documentation: Repository README

## Confidence

High
