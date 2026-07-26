# TodoVoyage

## Overview

A browser task manager organized around user-created projects and date-based views.

## Purpose

It helps users group and review tasks while demonstrating persistent model/view/controller-style front-end state.

## Main Features

- Project and task CRUD
- Due dates, priorities, and detail dialog
- Today and current-week filters
- Responsive layout
- Browser persistence

## Technology Stack

- Frontend: JavaScript ES modules, HTML, CSS
- Backend/Database/Authentication: Not applicable
- Storage: `localStorage`
- Deployment: GitHub Pages
- Libraries: Webpack, date-fns

## Architecture

Model classes represent projects/tasks, a controller coordinates changes, a view renders the UI, and a storage module serializes and rehydrates instances.

## Folder Structure

`src` separates model, controller, view, persistence, styles, and entry modules; Webpack manages distribution.

## Database

Not applicable.

## API

Not applicable.

## Engineering Decisions

Crypto-generated identifiers support stable CRUD, persisted objects are rehydrated into model instances, and date-fns powers calendar filters.

## Technologies Used

JavaScript, Webpack, date-fns, localStorage, HTML, CSS.

## Potential Portfolio Highlights

Layered client architecture, persistent nested data, and date-aware filtering.

## Missing Pieces

Fix initialization when storage contains no project, then add tests, sorting/search, accessible dialog behavior, and import/export.

## Suggested Screenshots

- Project/task overview
- Task detail dialog
- Today/week view
- Mobile layout

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Todo-List
- Live Demo: https://mohamedmosilhy.github.io/Todo-List/
- Documentation: Repository README

## Confidence

High
