# Sampling Studio

## Overview

An interactive desktop signal-sampling and reconstruction application.

## Purpose

It teaches sampling theory by letting users compose or load signals, add noise, sample them, and compare sinc reconstruction errors.

## Main Features

- CSV/WAV loading
- Sinusoidal component composition by frequency, amplitude, and phase
- Mixed-signal generation
- Configurable SNR noise
- Custom or frequency-derived sample rate
- Sinc reconstruction and error visualization

## Technology Stack

- Frontend: PyQt6 and PyQtGraph
- Backend: Python numerical/signal processing
- Database/Authentication/Storage/Deployment: Not applicable; local files
- Libraries: NumPy, Pandas, SciPy

## Architecture

Qt controls coordinate separate signal and component models; graph widgets render original, sampled/reconstructed, and error views.

## Folder Structure

The root includes the entry point, `Signal` and `Components` classes, UI assets, requirements, and README/demo material.

## Database

Not applicable.

## API

No network API.

## Engineering Decisions

Analytic component composition provides controlled frequencies, sinc interpolation reconstructs samples, and SNR settings make noise impact observable.

## Technologies Used

Python, PyQt6, PyQtGraph, NumPy, Pandas, SciPy.

## Potential Portfolio Highlights

DSP math, scientific visualization, interactive data controls, and mixed file/synthetic inputs.

## Missing Pieces

Add numerical tests, packaging, clearer dependency formatting, aliasing/Nyquist examples, input validation documentation, accessibility/keyboard review, and remove cache artifacts.

## Suggested Screenshots

- Signal composer
- Sampling/reconstruction graphs
- Noise comparison
- Aliasing example

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Sampling-Studio
- Live Demo: No web demo; README links a recorded demonstration
- Documentation: Repository README

## Confidence

High
