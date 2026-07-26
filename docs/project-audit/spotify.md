# Spotify Flutter App

## Overview

A Spotify-inspired cross-platform music application with Firebase accounts, song playback, favorites, profiles, and persisted themes.

## Purpose

It demonstrates layered Flutter development and cloud-backed media-app workflows.

## Main Features

- Splash, onboarding, signup, and login
- Home feed, new releases, and playlist content
- Audio play/pause, seek, and duration
- Per-user favorites
- Profile and favorites views
- Persistent light/dark theme

## Technology Stack

- Frontend: Flutter, Dart
- Backend: Firebase
- Database: Cloud Firestore
- Authentication: Firebase Auth
- Storage: Remote song/artwork references represented in Firestore
- Deployment: No public build found
- Libraries: Bloc, Hydrated Bloc, get_it, dartz, just_audio, flutter_svg

## Architecture

Feature modules follow data/domain/presentation layering. Use cases depend on repository contracts, services are injected with get_it, and Bloc manages UI state.

## Folder Structure

`lib` separates core configuration, service location, and feature layers; assets contain SVG graphics and Satoshi fonts; platform targets are generated.

## Database

`Users` and `Songs` collections back accounts and catalog content. Each user has a nested `Favorites` collection.

## API

Firebase SDKs handle authentication and Firestore data; `just_audio` streams configured song sources.

## Engineering Decisions

Layered repositories isolate Firebase, favorites are scoped beneath users, and Hydrated Bloc persists theme preference.

## Technologies Used

Flutter, Dart, Firebase Auth, Cloud Firestore, Bloc, Hydrated Bloc, just_audio, get_it, dartz.

## Potential Portfolio Highlights

Clean layering, cloud authentication, streaming audio, user-specific data, and persistent theming.

## Missing Pieces

Add Firestore security rules/index documentation, meaningful tests, playback failure/offline states, release builds, sign-out/account controls, and music/asset licensing evidence.

## Suggested Screenshots

- Onboarding/authentication
- Home/new releases
- Player
- Favorites
- Profile
- Light/dark theme

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Spotify
- Live Demo: Not found
- Documentation: Repository README and screenshots

## Confidence

High
