# Computer Vision Toolbox

## Overview

A collection of PyQt desktop applications implementing image processing, feature detection, segmentation, and face-analysis algorithms.

## Purpose

It gives students/users interactive visual tools for experimenting with classical computer-vision techniques.

## Main Features

- Noise, filters, histograms, normalization, edges, and hybrid images
- Hough shape detection and active contours
- Harris corners, SIFT, SSD, and normalized cross-correlation
- Local/global thresholding, region growing, and segmentation
- Face detection, recognition, and ROC visualization

## Technology Stack

- Frontend: PyQt5 desktop interfaces
- Backend: Python numerical/image-processing modules
- Database/Authentication/Storage/Deployment: Not applicable; local images and included dataset
- Libraries: OpenCV, NumPy, SciPy, Matplotlib, scikit-image

## Architecture

Five task-oriented desktop applications each combine UI initialization, image state, and algorithm classes. This is a suite, not one unified runtime.

## Folder Structure

Task directories contain their own entry point, UI files, algorithm/image classes, and assets; a face dataset and screenshots are included.

## Database

Not applicable.

## API

No network API; algorithms are invoked through desktop controls.

## Engineering Decisions

Algorithms are exposed through visual before/after workflows, and separate tasks isolate distinct course deliverables.

## Technologies Used

Python, PyQt5, OpenCV, NumPy, SciPy, Matplotlib, scikit-image.

## Potential Portfolio Highlights

Breadth of classical vision algorithms, desktop visualization, mathematical implementation, and team collaboration.

## Missing Pieces

Add a locked dependency manifest, unified launcher/setup guide, automated tests and benchmarks, quantitative results, dataset/asset licensing, and tighter repository hygiene.

## Suggested Screenshots

- Filter/hybrid-image tool
- Hough or contour detection
- SIFT matching
- Segmentation comparison
- Face ROC view

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Computer_Vision-Toolbox
- Live Demo: Not applicable; desktop application
- Documentation: README and included screenshots/citations

## Confidence

High
