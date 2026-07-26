# Attribute Value Generation with VQA

## Overview

A modular visual-question-answering pipeline for generating product attribute values from images and optional text context.

## Purpose

It explores automating catalog enrichment by asking attribute-specific questions about product imagery.

## Main Features

- Dataset download and preprocessing scripts
- BLIP-based VQA inference
- Image-only, text-only, and combined input ablations
- Single-attribute or all-attribute generation
- YAML-driven configuration and command-line workflows

## Technology Stack

- Frontend: Command-line interface
- Backend: Python inference pipeline
- Database/Authentication/Storage/Deployment: Not applicable; local datasets/checkpoints
- Libraries: PyTorch, Hugging Face Transformers, PEFT, OpenCV, Pandas, Pillow, YAML

## Architecture

A configuration-driven ML codebase separates dataset handling, transforms, model/inference logic, and executable scripts.

## Folder Structure

`configs` holds experiment settings; `scripts` orchestrates data/inference tasks; `src` contains datasets, transforms, and model utilities.

## Database

Not applicable.

## API

No network API; scripts expose command-line arguments and configured model inputs.

## Engineering Decisions

Input ablations make modality contribution testable, shared configuration supports repeatable runs, and BLIP transfer learning avoids training a vision-language model from scratch.

## Technologies Used

Python, PyTorch, Transformers, BLIP, PEFT, OpenCV, Pandas, Pillow.

## Potential Portfolio Highlights

Multimodal ML, reproducible configuration, modular data pipelines, and practical catalog automation.

## Missing Pieces

Add a training workflow if intended, evaluation datasets/metrics, saved checkpoints, reproducible results, tests, a demonstrable example, and correct the misspelled dependency-file name.

## Suggested Screenshots

- Input product and generated attributes
- Modality-ablation comparison
- Evaluation table
- Pipeline diagram

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Attribute-Value-Generation-VQA
- Live Demo: Not found
- Documentation: Repository README

## Confidence

High
