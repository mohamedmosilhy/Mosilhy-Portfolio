# Flutter Blog App

## Overview

A cross-platform blogging application using Clean Architecture, Supabase, Bloc, local caching, and network-aware repositories.

## Purpose

It lets users authenticate, publish image-led articles, and read a cached feed across mobile platforms.

## Main Features

- Email signup/login and persistent session
- Profile handling
- Blog creation with title, content, topics, and cover upload
- Feed with author and estimated read time
- Hive-backed offline reading cache
- Connectivity-aware data selection

## Technology Stack

- Frontend: Flutter, Dart
- Backend: Supabase
- Database: Supabase PostgreSQL
- Authentication: Supabase Auth
- Storage: Supabase Storage and Hive
- Deployment: No public build found
- Libraries: flutter_bloc, get_it, fpdart, image_picker, internet_connection_checker

## Architecture

Clean Architecture within a blog feature: data sources/models/repositories implement domain contracts/use cases, while Bloc/Cubit and pages own presentation. `core` supplies shared infrastructure.

## Folder Structure

`lib/core` contains common concerns; `lib/features/auth` and `lib/features/blog` are divided into data, domain, and presentation layers; platform folders are generated Flutter targets.

## Database

Profiles and blogs are stored in Supabase; cover images use a `blog_images` bucket. Executable schema/RLS migrations are not present.

## API

Supabase SDK calls provide authentication, record queries, and object uploads. Repositories select remote or cached data based on connectivity.

## Engineering Decisions

Dependency inversion isolates Supabase, functional result types make failure explicit, Bloc controls state, and Hive enables offline reads.

## Technologies Used

Flutter, Dart, Supabase, Bloc, Hive, get_it, fpdart.

## Potential Portfolio Highlights

Clean Architecture, dependency injection, authentication, cloud storage, offline cache, and cross-platform delivery.

## Missing Pieces

Add database/RLS migrations, meaningful unit/widget/integration tests, offline write synchronization, edit/delete flows, secret/configuration guidance, and distributable builds.

## Suggested Screenshots

- Authentication
- Feed
- Article detail
- Create blog/upload
- Offline state
- Profile

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Blog-App
- Live Demo: Not found
- Documentation: Repository README and included screenshots

## Confidence

High
