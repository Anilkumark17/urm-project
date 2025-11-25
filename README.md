# KBox UX Research Dashboard

A comprehensive statistical analysis dashboard for 15 survey questions with professional SaaS UI.

## Features

- **15 Survey Questions** analyzed across 4 sections
- **Statistical Tests**: Chi-square, T-test, Z-test, Wilcoxon, Entropy, Sentiment Index
- **Interactive Navigation**: Section-based UI with color coding
- **Professional Design**: Dark theme with gradient accents
- **Export Functionality**: Download dashboard as PNG

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Dashboard Sections

1. **Discovery Behavior** - How users find content (Q1-Q3)
2. **Saving & Fragmentation** - Storage patterns and methods (Q4-Q10)
3. **Retrieval Reality** - What happens to saved content (Q11-Q13)
4. **Product Opportunity** - User needs and feature prioritization (Q14-Q15)

## Statistical Analysis

Each question includes:
- Visualization (Bar, Horizontal Bar, etc.)
- Statistical test results (p-values, test statistics)
- UX insights and interpretations

## Tech Stack

- React + Vite
- Chart.js + react-chartjs-2
- Tailwind CSS
- PapaParse (CSV parsing)
- Custom statistical calculations

## Data

The dashboard loads from `public/sample-data.csv` with 100+ survey responses.

## Presentation Mode

Perfect for startup presentations with:
- Clean, professional UI
- Statistical validation
- Clear insights
- Export capability
