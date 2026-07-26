# Members Only

## Overview

A members-only message board that progressively reveals author information and grants administrative moderation.

## Purpose

It demonstrates authentication, sessions, tiered permissions, and relational message ownership.

## Main Features

- Signup, login, and logout
- Public message viewing with hidden identity metadata
- Passcode-based membership upgrade
- Member message creation
- Admin message deletion
- PostgreSQL-backed sessions

## Technology Stack

- Frontend: EJS, CSS
- Backend: Node.js, Express 5
- Database: PostgreSQL with `pg`
- Authentication: Passport Local, bcryptjs, Express sessions
- Storage: PostgreSQL and connect-pg-simple
- Deployment: Previous Railway URL returns 404
- Libraries: Passport, connect-pg-simple

## Architecture

MVC-style route/controller/middleware layers apply authentication and role gates before database operations and view rendering.

## Folder Structure

Routes, controllers, authentication middleware, database setup/queries, EJS views, and public assets are separated.

## Database

Users have unique usernames plus membership/admin flags. Messages reference their author with cascade behavior. Session storage and useful username/message indexes are included.

## API

Server-rendered account, membership, and message routes use Passport sessions; middleware limits creation and deletion by role.

## Engineering Decisions

Identity visibility is permission-dependent, sessions persist in PostgreSQL, passwords are hashed, and database indexes target common lookup/order paths.

## Technologies Used

Express, EJS, PostgreSQL, Passport, bcryptjs, express-session, connect-pg-simple.

## Potential Portfolio Highlights

Layered authorization, durable sessions, relational ownership, and role-sensitive presentation.

## Missing Pieces

Replace weak demo credentials/passcode, add robust validation, CSRF protection, rate limiting, secure production cookies, migrations, tests, and a working deployment.

## Suggested Screenshots

- Public anonymous board
- Member-visible author details
- Join flow
- Admin moderation

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Members-Only
- Live Demo: No working deployment found; README recording is available
- Documentation: Repository README

## Confidence

High
