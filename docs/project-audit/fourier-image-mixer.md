# Fourier Image Mixer

## Overview

A PyQt desktop application for inspecting Fourier components and mixing two images in the frequency domain.

## Purpose

It teaches how magnitude, phase, real, and imaginary components contribute to image reconstruction.

## Main Features

- Dual image loading and grayscale processing
- Fourier component visualization
- Weighted component mixing
- Inner/outer region selection
- Mouse-driven brightness/contrast adjustment
- Validation feedback and logging

## Technology Stack

- Frontend: PyQt6
- Backend: Python numerical processing
- Database/Authentication/Storage/Deployment: Not applicable; local image files
- Libraries: NumPy, SciPy FFT, Pillow

## Architecture

The Qt entry/UI layer delegates image state and Fourier calculations to an `Image` class.

## Folder Structure

`main.py`, `Image.py`, Qt UI assets, dependency metadata, and documentation/demo links make up the project.

## Database

Not applicable.

## API

No network API.

## Engineering Decisions

Fourier representations are retained per image, mixing weights remain interactive, and region masks let users compare low/high-frequency contributions.

## Technologies Used

Python, PyQt6, NumPy, SciPy, Pillow, FFT.

## Potential Portfolio Highlights

Signal-processing fundamentals, interactive scientific visualization, and desktop UI work.

## Missing Pieces

Add Pillow to the dependency manifest, tests for reconstruction/mixing, packaging, bundled sample outputs, precise region-method documentation, and remove generated cache artifacts.

## Suggested Screenshots

- Input images and Fourier components
- Mixed output
- Inner versus outer region comparison
- Brightness/contrast interaction

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Fourier-Image-Mixer
- Live Demo: No web demo; README links a recorded demonstration
- Documentation: Repository README

## Confidence

High
