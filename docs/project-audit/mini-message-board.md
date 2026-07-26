# Mini Message Board

## Overview

A compact server-rendered message board backed by PostgreSQL.

## Purpose

It lets visitors post and inspect short messages while demonstrating Express, validation, and relational persistence.

## Main Features

- Chronological message feed
- Message detail page
- New-message form
- Server-side validation and error display
- Responsive styling

## Technology Stack

- Frontend: EJS, CSS
- Backend: Node.js, Express
- Database: PostgreSQL with `pg`
- Authentication: Not implemented
- Storage: PostgreSQL
- Deployment: No public deployment found
- Libraries: express-validator

## Architecture

Routers dispatch to controllers, controllers call focused database queries, and EJS templates render the result.

## Folder Structure

The application separates controllers, routes, database code, views, and public assets.

## Database

Messages store author, body, and creation time; the feed orders them chronologically.

## API

HTML routes provide feed, detail, and create flows. Validation middleware blocks malformed submissions.

## Engineering Decisions

Parameterized SQL protects queries and server validation keeps persisted message data within defined constraints.

## Technologies Used

Node.js, Express, EJS, PostgreSQL, node-postgres, express-validator.

## Potential Portfolio Highlights

Clean small-scale server architecture, persistence, and validated forms.

## Missing Pieces

Add authentication, edit/delete permissions, pagination, spam/rate-limit controls, tests, migrations, and deployment.

## Suggested Screenshots

- Message feed
- New-message validation
- Message detail

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Mini-Message-Board
- Live Demo: Not found; README includes screenshots/recording
- Documentation: Repository README

## Confidence

High
