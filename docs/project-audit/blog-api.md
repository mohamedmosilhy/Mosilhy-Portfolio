# Blog API

## Overview

A three-application blogging system comprising an Express API, an author dashboard, and a public reader client.

## Purpose

It gives authors controlled publishing tools while letting readers browse posts and participate in comments.

## Main Features

- Registration and login
- Author post CRUD, draft/publish workflow, and ownership enforcement
- Public published-post feed with pagination
- Comment creation, editing, deletion, and author moderation
- Separate responsive author and reader applications
- Rate limits for sensitive flows

## Technology Stack

- Frontend: React 19, Vite, Tailwind CSS 4, React Router, Axios
- Backend: Node.js, Express 5
- Database: PostgreSQL through Prisma 7
- Authentication: JWT and bcrypt; `AUTHOR`/`USER` roles
- Storage: PostgreSQL
- Deployment: No verified public deployment found
- Libraries: express-rate-limit

## Architecture

A client/API separation with route and controller layers around Prisma. Admin and reader clients independently consume the same REST API.

## Folder Structure

`api` contains routes, controllers, middleware, Prisma schema, and seed logic; `admin` and `client` are separate Vite applications.

## Database

`User` authors posts and comments. `Post` owns publication state and timestamps. `Comment` belongs to both a user and post and records edits.

## API

Routes group authentication, posts, and comments. JWT middleware protects author and ownership operations; controller-level checks enforce permissions.

## Engineering Decisions

Role and ownership checks limit mutation, draft publication is explicit, paginated reads constrain feed size, and rate limiting protects authentication/comment traffic.

## Technologies Used

React, Express, Prisma, PostgreSQL, JWT, bcrypt, Tailwind CSS, Axios.

## Potential Portfolio Highlights

Multi-client architecture, publishing lifecycle, authorization rules, relational modeling, pagination, and moderation.

## Missing Pieces

Add automated API/UI tests, schema-based request validation, refresh-token or secure-cookie strategy, production deployment documentation, and fully synchronized endpoint docs.

## Suggested Screenshots

- Public feed and post detail
- Author dashboard
- Post editor/publish state
- Comment moderation
- Mobile client

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Blog-API
- Live Demo: No verified live URL; README links a recorded demo
- Documentation: README includes setup and API documentation

## Confidence

High
