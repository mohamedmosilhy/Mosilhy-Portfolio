# Messaging App

## Overview

A feature-based direct-messaging application with authenticated user discovery, conversation creation, cursor pagination, and polling updates.

## Purpose

It enables registered users to find people, start direct conversations, and exchange persisted messages.

## Main Features

- Registration, login, logout, profiles, and settings
- User search
- Unique direct conversations
- First-message conversation creation
- Cursor-paginated history and polling refresh
- Server-side participation checks
- Block relationship model and seeded demo conversation

## Technology Stack

- Frontend: Next.js 16 App Router, React 19, TypeScript
- Backend: Next.js route handlers and feature services
- Database: PostgreSQL through Prisma 7
- Authentication: Auth.js and bcrypt
- Storage: PostgreSQL
- Deployment: No public deployment found
- Libraries: TanStack Query, Zod

## Architecture

A feature-based modular monolith separates authentication, users, and messaging into components, services, actions, hooks, schemas, and types.

## Folder Structure

`app` contains routes and API handlers; `features/auth`, `features/users`, and `features/messaging` contain domain behavior; Prisma owns schema/migrations/seed; `docs` records architectural decisions.

## Database

Users join conversations through a composite participation table. Messages belong to authors and conversations. A deterministic participant key enforces unique direct chats; last-message references and timestamps optimize lists. Blocking uses a composite relationship.

## API

Handlers cover registration, conversations, per-conversation messages, current user, and user search. Zod validates requests and services verify participation before reads/writes.

## Engineering Decisions

Cursor pagination avoids offset drift, polling provides MVP freshness, conversation creation and first message are combined, and indexed last-message metadata accelerates inbox ordering.

## Technologies Used

Next.js, React, TypeScript, Prisma, PostgreSQL, Auth.js, TanStack Query, Zod, bcrypt.

## Potential Portfolio Highlights

Strong feature boundaries, secure conversation authorization, thoughtful schema/index design, pagination, and documented architectural reasoning.

## Missing Pieces

Add automated tests, reconcile stale README claims with implemented profile editing, expose block controls if intended, add rate limiting/CSRF review, support media or true realtime only if product scope requires it, and deploy.

## Suggested Screenshots

- Login/register
- Conversation inbox
- Long paginated thread
- New conversation/user search
- Profile/settings
- Mobile messaging view

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/messaging_app
- Live Demo: Not found; seeded demo credentials are documented
- Documentation: README plus 11 architecture documents in Git history

## Confidence

High
