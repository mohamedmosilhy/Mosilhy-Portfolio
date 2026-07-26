# Inventory Application

## Overview

A server-rendered inventory manager for musical instruments and their categories.

## Purpose

It allows inventory staff to maintain product and category records through browser forms.

## Main Features

- Instrument and category lists/details
- Create, update, and delete workflows
- Price and stock tracking
- Server-side form validation
- Seeded PostgreSQL data

## Technology Stack

- Frontend: EJS templates, CSS
- Backend: Node.js, Express 5
- Database: PostgreSQL with `pg`
- Authentication: Not implemented
- Storage: PostgreSQL
- Deployment: No public deployment found
- Libraries: express-validator

## Architecture

An MVC-style server application separates routers, controllers, database queries, views, and public assets.

## Folder Structure

Route modules map requests to controllers; database modules issue queries; `views` contains EJS templates; `public` contains styles/assets.

## Database

Categories have many instruments. Instruments store name, description, manufacturer, price, stock, and category reference.

## API

Browser-oriented CRUD routes render HTML. Validation runs before write controllers, and database calls use parameterized queries.

## Engineering Decisions

SQL is isolated from templates, parameter binding reduces injection risk, and validation errors return to server-rendered forms.

## Technologies Used

Node.js, Express, EJS, PostgreSQL, node-postgres, express-validator.

## Potential Portfolio Highlights

Complete relational CRUD, MVC separation, validation, and safe SQL parameters.

## Missing Pieces

Add authentication/authorization, tests, pagination/search, deployment, migrations, and explicit handling of category deletion constraints.

## Suggested Screenshots

- Instrument list
- Instrument detail/edit
- Category management
- Validation errors

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Inventory-Application
- Live Demo: Not found; README includes a recorded demo
- Documentation: Repository README

## Confidence

High
