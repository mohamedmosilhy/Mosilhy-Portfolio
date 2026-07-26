# Real-Time Signal Monitoring

## Overview

A PyQt desktop viewer for loading, arranging, and monitoring multiple signal channels with synchronized playback and PDF reporting.

## Purpose

It supports interactive review of biomedical or generic time-series recordings.

## Main Features

- WFDB and CSV loading
- Multi-port, multi-channel viewers
- Link/unlink, play/pause, speed, color, and channel movement controls
- Light and dark interfaces
- PDF report export

## Technology Stack

- Frontend: PyQt6, PyQtGraph
- Backend: Python signal/file processing
- Database/Authentication/Deployment: Not applicable
- Storage: Local datasets and exported PDFs
- Libraries: WFDB, NumPy, fpdf2, qdarkstyle (imported)

## Architecture

Desktop controllers manage multiple graph viewers, channel state, file loading, and report generation. Parallel light/dark entry implementations contain duplicated behavior.

## Folder Structure

Entry-point variants, signal/viewer logic, Qt assets, included datasets, requirements, and README are stored together.

## Database

Not applicable.

## API

No network API.

## Engineering Decisions

Viewer linking synchronizes review, channel reassignment supports flexible layouts, and PyQtGraph exporters feed generated PDF reports.

## Technologies Used

Python, PyQt6, PyQtGraph, WFDB, NumPy, fpdf2.

## Potential Portfolio Highlights

Multi-channel state coordination, biomedical formats, interactive visualization, and report generation.

## Missing Pieces

Consolidate duplicate theme entry points, add `qdarkstyle` to requirements, tests, packaging, privacy guidance, clearer setup/features documentation, and repository cleanup.

## Suggested Screenshots

- Multiple active viewers
- Linked channel playback
- Light/dark comparison
- Generated report

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/real-time-monitoring
- Live Demo: No web demo; README links a recorded demonstration
- Documentation: Repository README is present but sparse

## Confidence

High
