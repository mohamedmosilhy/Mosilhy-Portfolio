# Fraud Credit Card Transactions Detection

## Overview

A notebook-based comparison of classifiers for a heavily imbalanced credit-card fraud dataset.

## Purpose

It explores fraud identification and compares a custom probabilistic classifier with common supervised baselines.

## Main Features

- Data inspection and preprocessing
- Class undersampling
- Custom Naive Bayes implementation
- Gaussian Naive Bayes, decision tree, and logistic regression comparisons
- Accuracy, recall, precision, and F1 reporting

## Technology Stack

- Frontend: Jupyter Notebook
- Backend: Python data-science workflow
- Database/Authentication/Storage/Deployment: Not applicable; dataset is not committed
- Libraries: Pandas, NumPy, scikit-learn, Matplotlib/Seaborn as used in the notebook

## Architecture

A single exploratory notebook performs ingestion, preprocessing, training, evaluation, and visualization; a presentation summarizes results.

## Folder Structure

The repository contains a README, notebook, and presentation file.

## Database

Not applicable.

## API

Not applicable.

## Engineering Decisions

Stratified splitting preserves class proportions, undersampling addresses imbalance, and multiple metrics avoid relying on accuracy alone.

## Technologies Used

Python, Jupyter, Pandas, NumPy, scikit-learn.

## Potential Portfolio Highlights

Custom classifier implementation, imbalanced classification awareness, and model comparison.

## Missing Pieces

Add reproducible data acquisition and dependencies, cross-validation, PR-AUC/ROC analysis, leakage checks, stronger imbalance methods, experiment seeds, and deployable inference only if justified.

## Suggested Screenshots

- Class-imbalance visualization
- Confusion matrices
- Model-metric comparison
- Notebook pipeline summary

## Demo Information

- GitHub: https://github.com/mohamedmosilhy/Fraud-Credit-Card-Transactions-Detection
- Live Demo: Not found
- Documentation: README, notebook, and presentation

## Confidence

Medium
