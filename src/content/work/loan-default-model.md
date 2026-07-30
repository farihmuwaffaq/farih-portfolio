---
title: Loan Default Prediction
slug: loan-default-model
summary: Developed and evaluated a Random Forest model for loan-default prediction, achieving an AUC of 0.857 and KS statistic of 0.5675 on the project dataset.
evidenceType: Project-Based Internship
organization: ID/X Partners x Rakamin Academy
industry: Financial services
role: Data Scientist project participant
timeline: Project-based internship
tools: [Python, Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, Jupyter Notebook]
categories: [Machine Learning]
featured: true
confidential: false
coverImage: /images/projects/loan-default-model.svg
coverAlt: Abstract model evaluation chart for a loan default training project
outcomes: [Random Forest AUC of 0.857 on the project dataset, KS statistic of 0.5675 in the project report, Compared three model families]
relatedAssets:
  - { label: Repository, type: repository, available: false, note: No verified public repository URL was supplied. }
---
## Snapshot

This project-based internship used a provided historical dataset to explore loan repayment risk across more than 70 borrower and loan attributes.

## The situation

The exercise required a reproducible classification workflow for a high-dimensional lending dataset.

## The problem

Missing values, inconsistent fields, outliers, and class-discrimination requirements had to be addressed before comparing model performance.

## My responsibility

I prepared the data, explored distributions and relationships, engineered features, compared models, tuned the selected approach, and evaluated discrimination.

## Approach

- Engineered debt-to-income, repayment-to-income, and tenure features.
- Compared Logistic Regression, Decision Tree, and Random Forest.
- Used stratified k-fold cross-validation and grid search.
- Evaluated AUC and KS.

## Solution

The optimized Random Forest was selected from the compared model families and documented with the evaluation reported by the project.

## Outcome

The project report recorded AUC 0.857 and KS 0.5675 on the project dataset.

> **Limitation:** This was not a production lending deployment. Real-world use would require out-of-time validation, bias and fairness testing, calibration, monitoring, and governance.

## What I learned

Model discrimination is only one layer of lending risk. Validation design, fairness, explainability, calibration, and operating governance determine whether a model is usable.
