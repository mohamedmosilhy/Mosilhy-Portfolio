# Image Classification of Stroke Blood Clot Origin

## Overview

A histopathology image-classification pipeline for distinguishing cardioembolic and large-artery atherosclerosis clot origins.

## Purpose

It investigates whether deep-learning models can assist research classification of stroke-clot imagery from the STRIP AI dataset.

## Main Features

- Background removal and Otsu-based preprocessing
- Patch splitting and augmentation
- PoolFormerV3 and Compact Convolutional Transformer models
- Transfer learning, scheduling, early stopping, and checkpoints
- Ensemble experimentation and reported class metrics

## Technology Stack

- Frontend: Jupyter notebooks/plots
- Backend: Python training pipeline
- Database/Authentication/Storage/Deployment: Not applicable; filesystem dataset/checkpoints
- Libraries: PyTorch, timm, scikit-learn, Pillow, Hugging Face tooling

## Architecture

Reusable `src` modules separate preprocessing, datasets, model definitions, loss/training behavior, and notebooks used for experiments.

## Folder Structure

`src` contains the ML pipeline; notebooks orchestrate experiments; supporting files contain figures/results documentation.

## Database

Not applicable.

## API

No network inference API is implemented.

## Engineering Decisions

Whole-slide imagery is converted into trainable patches, transfer learning reduces data requirements, and two model families provide complementary ensemble candidates.

## Technologies Used

Python, PyTorch, timm, scikit-learn, Pillow, Jupyter.

## Potential Portfolio Highlights

Medical computer vision, substantial preprocessing, modern model architectures, experiment management, and collaborative research.

## Missing Pieces

Add a locked environment, exact split/seed protocol, reproducible result artifacts, automated tests, model cards, external validation, dataset licensing guidance, and a strong non-clinical-use disclaimer.

## Suggested Screenshots

- Original versus preprocessed clot image
- Extracted patches
- Training curves/confusion matrix
- Model comparison
- Ensemble result

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Image-Classification-of-Stroke-Blood-Clot-Origin
- Live Demo: Not found
- Documentation: Repository README and notebooks

## Confidence

High
