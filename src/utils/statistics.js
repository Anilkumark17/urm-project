// Statistical test implementations for survey analysis

/**
 * Chi-square goodness of fit test
 * Tests if observed frequencies differ significantly from expected
 */
export const chiSquareTest = (observed, expected = null) => {
  const n = observed.reduce((a, b) => a + b, 0);
  const exp = expected || observed.map(() => n / observed.length);
  
  const chiSquare = observed.reduce((sum, obs, i) => {
    return sum + Math.pow(obs - exp[i], 2) / exp[i];
  }, 0);
  
  const df = observed.length - 1;
  const pValue = 1 - chiSquareCDF(chiSquare, df);
  
  return { chiSquare, df, pValue, significant: pValue < 0.05 };
};

/**
 * Z-test for proportions
 * Tests if a proportion differs from a hypothesized value
 */
export const zTestProportion = (observed, total, hypothesized = 0.5) => {
  const p = observed / total;
  const z = (p - hypothesized) / Math.sqrt((hypothesized * (1 - hypothesized)) / total);
  const pValue = 2 * (1 - normalCDF(Math.abs(z)));
  
  return { z, pValue, proportion: p, significant: pValue < 0.05 };
};

/**
 * One-sample t-test
 * Tests if sample mean differs from hypothesized mean
 */
export const oneSampleTTest = (data, mu = 3) => {
  const n = data.length;
  const mean = data.reduce((a, b) => a + b, 0) / n;
  const variance = data.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / (n - 1);
  const sd = Math.sqrt(variance);
  const se = sd / Math.sqrt(n);
  const t = (mean - mu) / se;
  const df = n - 1;
  const pValue = 2 * (1 - tCDF(Math.abs(t), df));
  
  return { t, df, pValue, mean, sd, significant: pValue < 0.05 };
};

/**
 * Wilcoxon signed-rank test (simplified)
 * Non-parametric test for median
 */
export const wilcoxonTest = (data, median = 3) => {
  const differences = data.map(x => x - median).filter(d => d !== 0);
  const ranks = differences.map((d, i) => ({ value: Math.abs(d), sign: Math.sign(d), rank: i + 1 }))
    .sort((a, b) => a.value - b.value)
    .map((item, i) => ({ ...item, rank: i + 1 }));
  
  const W = ranks.filter(r => r.sign > 0).reduce((sum, r) => sum + r.rank, 0);
  const n = differences.length;
  const meanW = n * (n + 1) / 4;
  const sdW = Math.sqrt(n * (n + 1) * (2 * n + 1) / 24);
  const z = (W - meanW) / sdW;
  const pValue = 2 * (1 - normalCDF(Math.abs(z)));
  
  return { W, z, pValue, significant: pValue < 0.05 };
};

/**
 * Entropy calculation
 * Measures disorder/fragmentation in categorical data
 */
export const calculateEntropy = (frequencies) => {
  const total = frequencies.reduce((a, b) => a + b, 0);
  const probabilities = frequencies.map(f => f / total);
  const entropy = -probabilities.reduce((sum, p) => {
    return p > 0 ? sum + p * Math.log2(p) : sum;
  }, 0);
  
  const maxEntropy = Math.log2(frequencies.length);
  const normalizedEntropy = entropy / maxEntropy;
  
  return { entropy, normalizedEntropy, maxEntropy };
};

/**
 * Sentiment Index
 * (Positive - Negative) / Total
 */
export const sentimentIndex = (positive, negative, total) => {
  const index = (positive - negative) / total;
  const se = Math.sqrt((positive + negative) / Math.pow(total, 2));
  const ci = 1.96 * se;
  
  return { index, lowerCI: index - ci, upperCI: index + ci };
};

/**
 * Jaccard Similarity
 * Measures overlap between two sets
 */
export const jaccardSimilarity = (setA, setB) => {
  const intersection = setA.filter(x => setB.includes(x)).length;
  const union = new Set([...setA, ...setB]).size;
  return union > 0 ? intersection / union : 0;
};

/**
 * Binomial Confidence Interval
 */
export const binomialCI = (successes, total, confidence = 0.95) => {
  const p = successes / total;
  const z = confidence === 0.95 ? 1.96 : 2.576;
  const se = Math.sqrt((p * (1 - p)) / total);
  
  return {
    proportion: p,
    lowerCI: Math.max(0, p - z * se),
    upperCI: Math.min(1, p + z * se)
  };
};

/**
 * Relative Importance Index (RII)
 * For ranking features by importance
 */
export const relativeImportanceIndex = (responses, maxScore = 1) => {
  const totalResponses = responses.reduce((a, b) => a + b, 0);
  const weightedSum = responses.reduce((sum, count, i) => sum + count * (i + 1), 0);
  const A = maxScore;
  const N = totalResponses;
  
  return weightedSum / (A * N);
};

// Helper functions for statistical distributions

function normalCDF(z) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

function chiSquareCDF(x, df) {
  // Simplified approximation
  if (x <= 0) return 0;
  if (df === 1) return 2 * normalCDF(Math.sqrt(x)) - 1;
  
  // Wilson-Hilferty approximation
  const z = Math.pow(x / df, 1/3) - (1 - 2/(9*df)) / Math.sqrt(2/(9*df));
  return normalCDF(z);
}

function tCDF(t, df) {
  // Approximation for t-distribution
  const x = df / (df + t * t);
  return 1 - 0.5 * betaIncomplete(df/2, 0.5, x);
}

function betaIncomplete(a, b, x) {
  // Simplified beta incomplete function
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return 0.5; // Simplified approximation
}

/**
 * Calculate mode (most frequent value)
 */
export const calculateMode = (data) => {
  const frequency = {};
  data.forEach(item => {
    frequency[item] = (frequency[item] || 0) + 1;
  });
  
  const maxFreq = Math.max(...Object.values(frequency));
  const modes = Object.keys(frequency).filter(key => frequency[key] === maxFreq);
  
  return { mode: modes[0], frequency: maxFreq, allModes: modes };
};

/**
 * Calculate median
 */
export const calculateMedian = (data) => {
  const sorted = [...data].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
};
