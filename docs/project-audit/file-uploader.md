# File Uploader

## Overview

An authenticated cloud file manager with user-owned nested folders and upload/download/delete workflows.

## Purpose

It gives users a private browser interface for organizing files in Supabase Storage.

## Main Features

- Signup, login, and logout
- User-scoped file and folder access
- Nested folders
- In-memory multipart upload with a 50 MB limit
- Download and delete operations
- Flash feedback

## Technology Stack

- Frontend: EJS, CSS
- Backend: Node.js, Express
- Database: PostgreSQL through Prisma 7
- Authentication: Passport Local, bcrypt, PostgreSQL-backed sessions
- Storage: Supabase Storage; Prisma session store
- Deployment: No public deployment found
- Libraries: Multer, connect-flash

## Architecture

An MVC-style Express application separates routes, controller behavior, Prisma persistence, authentication middleware, and EJS views.

## Folder Structure

Routes and controllers implement browser flows; `prisma` defines/migrates data; views render pages; public files provide presentation.

## Database

Users own files and folders. Folders self-reference for parent/child nesting, and files optionally reference a folder while storing remote-path and size metadata.

## API

Authenticated browser routes cover account, folder, upload, download, and delete actions. Multer buffers uploaded files before forwarding them to Supabase.

## Engineering Decisions

Ownership constraints scope every resource, folder self-relations support arbitrary nesting, cloud object storage is separate from metadata, and sessions persist through Prisma.

## Technologies Used

Express, EJS, Prisma, PostgreSQL, Passport, bcrypt, Supabase Storage, Multer.

## Potential Portfolio Highlights

Authentication, cloud storage, nested relational modeling, and resource-level access control.

## Missing Pieces

Add tests, CSRF/rate limiting, file-type and filename validation, malware scanning, storage quotas, signed-access review, and compensating transactions for database/storage partial failures.

## Suggested Screenshots

- Login/signup
- Nested folder browser
- Upload feedback
- File detail/download

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/file-uploader
- Live Demo: Not found; README includes screenshots/recording
- Documentation: Repository README

## Confidence

High
