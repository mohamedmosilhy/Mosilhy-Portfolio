# Kidney Disease Prediction

## Overview

A notebook experiment comparing classifiers for chronic kidney disease prediction.

## Purpose

It explores tabular preprocessing, imbalance handling, hyperparameter search, and medical classification.

## Main Features

- Data cleaning and categorical encoding
- Feature scaling
- SMOTE resampling
- Grid search for decision tree, logistic regression, and SVM
- Classification metric comparison

## Technology Stack

- Frontend: Jupyter Notebook
- Backend: Python data-science workflow
- Database/Authentication/Storage/Deployment: Not applicable; dataset is not committed
- Libraries: Pandas, scikit-learn, imbalanced-learn

## Architecture

A single notebook performs preprocessing, resampling, model selection, and evaluation.

## Folder Structure

The repository contains a README and analysis notebook.

## Database

Not applicable.

## API

Not applicable.

## Engineering Decisions

SMOTE addresses class imbalance, standardized features support linear/kernel methods, and GridSearchCV compares parameter choices.

## Technologies Used

Python, Jupyter, Pandas, scikit-learn, imbalanced-learn.

## Potential Portfolio Highlights

Tabular ML workflow, imbalance awareness, and multi-model tuning.

## Missing Pieces

Provide data acquisition and dependencies, move resampling inside cross-validation pipelines to prevent leakage, report confidence intervals/ROC and calibration, validate externally, add seeds, and state that results are not clinical guidance.

## Suggested Screenshots

- Data/preprocessing summary
- Confusion matrices
- Cross-validation comparison
- Feature importance where supported

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/kidney_disease_prediction
- Live Demo: Not found
- Documentation: README and notebook

## Confidence

Medium
