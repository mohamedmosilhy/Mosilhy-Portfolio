# Sign-up Form

## Overview

A responsive account-registration form with native and custom client-side validation.

## Purpose

It demonstrates form composition, validation feedback, and responsive split-screen layout.

## Main Features

- First and last name minimum-length checks
- Optional native email validation
- Required 11-digit phone validation
- Password confirmation with custom validity

## Technology Stack

- Frontend: HTML, CSS, JavaScript
- Backend/Database/Authentication/Storage: Not implemented
- Deployment: GitHub Pages
- Libraries: None

## Architecture

A static form relies on browser validation APIs plus a small script for cross-field password validation.

## Folder Structure

Root HTML, stylesheet, script, fonts, and imagery form the project.

## Database

Not applicable.

## API

No registration endpoint exists; submission does not create an account.

## Engineering Decisions

Native constraints handle individual fields while `setCustomValidity` handles password equality.

## Technologies Used

HTML, CSS, JavaScript, Constraint Validation API.

## Potential Portfolio Highlights

Thoughtful client-side validation and responsive form styling.

## Missing Pieces

Add a secure server workflow, international phone handling, password requirements, accessible error summaries, and automated form tests.

## Suggested Screenshots

- Default form
- Validation errors
- Mobile view

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Sign-up-Form
- Live Demo: https://mohamedmosilhy.github.io/Sign-up-Form/
- Documentation: Repository README

## Confidence

High
