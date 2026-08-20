---
title: Delivery Margin Distance Analysis
slug: lifepack-delivery-margin-analysis
summary: Analyzed delivery distance against net margin to identify where the existing delivery-price structure stopped covering operational cost.
evidenceType: Professional Experience
organization: Lifepack.id
industry: Healthcare / health-tech
role: Data Analyst
timeline: November 2024-April 2025
tools: [Python, PostgreSQL, Looker Studio, Google Sheets]
categories: [Commercial & Operations, Analytics & Automation]
featured: false
confidential: true
confidentialityNote: Published evidence excludes customer records, addresses, transaction identifiers, and internal pricing logic. Monetary values shown in the source chart are historical analytical outputs.
coverImage: /images/projects/lifepack-delivery-margin-analysis.svg
coverAlt: Editorial visualization of a seven-kilometer delivery margin threshold
outcomes:
  - Identified 7.17 km as the furthest observed distance associated with positive net delivery margin in the analyzed sample.
  - Converted transaction-level delivery economics into a decision-ready distance threshold.
relatedAssets:
  - { label: Source distance-to-margin analysis, type: image, href: /images/projects/lifepack/delivery-margin-distance.jpg, available: true }
  - { label: Delivery performance dashboard, type: image, href: /images/projects/lifepack/dashboard-delivery-performance.jpg, available: true }
---

## Context

Delivery pricing needed to be assessed against the actual distance between warehouse and customer. A flat operational view could show transaction count and fees, but it did not explain where delivery economics turned negative.

## Question

How far could an order travel while the observed net delivery margin remained positive under the pricing structure represented in the available data?

## Approach

I joined delivery distance with fee and cost components, calculated net margin for each observed delivery, and plotted distance against margin. A zero-margin reference line made loss-making observations visible, while the furthest positive observation provided a concrete threshold for discussion.

This was descriptive analysis rather than a universal pricing rule. Outliers, service area, vendor behavior, and changes in cost structure still required operational review.

## Decision support

The analysis reframed delivery performance from a dashboard total into a distance-sensitive unit-economics question. Stakeholders could use the threshold as an investigation point for delivery coverage, pricing bands, and exception handling rather than treating all delivery distances equally.

## Privacy boundary

Customer-level records, addresses, phone numbers, and transaction identifiers are not published. The public evidence retains only the analytical relationship needed to explain the method and finding.

## What I learned

A threshold becomes useful only when its assumptions remain visible. Operational decisions should pair the observed result with data-quality checks, outlier review, and clear ownership of pricing changes.
