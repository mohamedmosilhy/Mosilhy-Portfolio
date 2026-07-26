# Basic Informational Site

## Overview

A small Express server that serves static informational pages and a custom not-found response.

## Purpose

It demonstrates foundational Node.js routing and static-file delivery.

## Main Features

- Home, About, and Contact Us routes
- Static CSS delivery
- Custom 404 page with the correct response status

## Technology Stack

- Frontend: Static HTML and CSS
- Backend: Node.js, Express 5
- Database/Authentication/Storage: Not applicable
- Deployment: No public deployment found
- Libraries: Express

## Architecture

A minimal server-rendering shell maps named routes to static HTML files.

## Folder Structure

The server entry point defines routing; public/static directories hold pages and styles.

## Database

Not applicable.

## API

`GET /`, `GET /about`, and `GET /contact-us` serve documents; unmatched routes return the custom 404 document.

## Engineering Decisions

The fallback explicitly returns a 404 status rather than only rendering an error page.

## Technologies Used

Node.js, Express, HTML, CSS.

## Potential Portfolio Highlights

Correct basic HTTP routing and error status handling.

## Missing Pieces

Add tests, security headers, structured logging, deployment, and a clearer distinction between static serving and templating.

## Suggested Screenshots

- Home
- About
- Custom 404

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Basic-Informational-Site
- Live Demo: Not found; README includes a local demo recording
- Documentation: Repository README

## Confidence

High
