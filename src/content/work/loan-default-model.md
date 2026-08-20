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
evidenceStatus: PUBLIC PROJECT
evidenceNote: Non-confidential project materials publish model evaluation results, but no verified public repository URL is available.
assumptionsConstraints:
  - The analysis uses a provided historical project dataset with more than 70 borrower and loan attributes.
  - Reported AUC and KS values apply only to the project dataset.
  - The model was not deployed; real use would require out-of-time validation, fairness testing, calibration, monitoring, and governance.
decisionLog:
  - decision: Engineer debt-to-income, repayment-to-income, and tenure features.
    why: The high-dimensional source data required prepared predictors for repayment-risk analysis.
  - decision: Compare Logistic Regression, Decision Tree, and Random Forest using stratified cross-validation and grid search.
    why: Model selection required reproducible comparison under class-discrimination requirements.
  - decision: Select the optimized Random Forest.
    why: It was the chosen model among the compared families based on project evaluation.
dictionary:
  - term: AUC
    definition: Area under the ROC curve used to evaluate class discrimination.
  - term: KS statistic
    definition: Kolmogorov-Smirnov statistic used to measure separation between outcome classes.
  - term: Stratified k-fold cross-validation
    definition: Validation approach preserving class proportions across folds.
  - term: Calibration
    definition: Alignment between predicted probabilities and observed outcomes.
coverImage: /images/projects/loan-default/model-results.png
coverAlt: Loan default model results showing ROC and Kolmogorov-Smirnov evaluation charts
outcomes: [Random Forest AUC of 0.857 on the project dataset, KS statistic of 0.5675 in the project report, Compared three model families]
keyContributions:
  - Prepared missing values, outliers, and derived features including debt-to-income and repayment ratios.
  - Compared model families using exploratory analysis and a reproducible evaluation workflow.
  - Applied stratified cross-validation and grid search, then evaluated the Random Forest with AUC and KS.
relatedAssets:
  - { label: Random Forest model results, type: image, href: /images/projects/loan-default/model-results.png, available: true }
  - { label: Model training and evaluation workflow, type: image, href: /images/projects/loan-default/model-evaluation.png, available: true }
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
