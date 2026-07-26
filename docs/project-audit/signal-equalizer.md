# Signal Equalizer

## Overview

A desktop multi-mode signal equalizer with synchronized playback, spectrograms, and configurable frequency-window smoothing.

## Purpose

It lets users inspect and modify audio or biomedical signals while visualizing changes in time and frequency domains.

## Main Features

- Uniform, musical, animal-sound, and ECG modes
- Band sliders and rectangle, Hamming, Hanning, or Gaussian windows
- Linked input/output cine viewers
- Play, pause, speed, zoom, pan, and reset controls
- Live spectrogram comparison
- CSV, WAV, and MP3 loading
- Custom signal save/load

## Technology Stack

- Frontend: PyQt6, PyQtGraph, Matplotlib
- Backend: Python DSP/audio processing
- Database/Authentication/Deployment: Not applicable
- Storage: Local signal and configuration files
- Libraries: NumPy, Pandas, SciPy, librosa, sounddevice

## Architecture

The Qt controller coordinates a signal model, equalization calculations, graph playback, audio output, and spectrogram rendering.

## Folder Structure

Entry/UI modules, signal/audio utilities, assets, requirements, and documentation are stored at the root.

## Database

Not applicable.

## API

No network API.

## Engineering Decisions

Mode-specific bands match different signal domains, selectable windows expose smoothing tradeoffs, and synchronized viewers make changes directly comparable.

## Technologies Used

Python, PyQt6, NumPy, SciPy, PyQtGraph, Matplotlib, librosa, sounddevice.

## Potential Portfolio Highlights

Advanced DSP, audio playback, scientific visualization, multiple signal domains, and rich desktop controls.

## Missing Pieces

Add the imported `qdarkstyle` dependency, numerical/interaction tests, packaging, reproducible DSP validation, accessible shortcuts, and repository cleanup.

## Suggested Screenshots

- Uniform equalizer
- Musical/ECG modes
- Input/output spectrograms
- Window comparison

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Signal-Equalizer
- Live Demo: No web demo; README links a recorded demonstration
- Documentation: Repository README

## Confidence

High
