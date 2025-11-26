import Papa from 'papaparse';
import {
  chiSquareTest,
  zTestProportion,
  oneSampleTTest,
  wilcoxonTest,
  calculateEntropy,
  sentimentIndex,
  jaccardSimilarity,
  binomialCI,
  calculateMode,
  calculateMedian
} from './statistics';

export const parseCSV = (input) => {
  return new Promise((resolve, reject) => {
    // If input is a string (from fetch), parse it directly
    if (typeof input === 'string') {
      Papa.parse(input, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(processData(results.data));
        },
        error: (error) => {
          reject(error);
        },
      });
    } else {
      // Handle File object (legacy support or if needed)
      Papa.parse(input, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(processData(results.data));
        },
        error: (error) => {
          reject(error);
        },
      });
    }
  });
};

const processData = (data) => {
  // Helper to split multi-select fields
  const splitMulti = (str) => str ? str.split(',').map(s => s.trim()) : [];

  // Column mapping
  const Q1 = 'How often do you come across online content that feels useful or interesting to your studies or interests?';
  const Q2 = 'Q2. Which platforms show you the most useful content? ';
  const Q3 = 'When you see something valuable online, what do you usually do first?\n';
  const Q4 = 'How do you usually save content that you want to keep? (Select all that apply)';
  const Q5 = 'On average, how many new items do you save in a week?\n';
  const Q6 = 'Q6. How often do you open the section where your saved content is stored?';
  const Q7 = 'When you open your saved section, what is your usual reason? (Select all that apply)';
  const Q8 = 'How easy is it for you to find a specific item you\'ve saved before?';
  const Q9 = 'Where do you store most of your saved items?';
  const Q10 = 'How would you describe your collection of saved items?';
  const Q11 = 'When you look at your saved list, what best describes your reaction?';
  const Q12 = 'When do you usually look through older content?';
  const Q13 = ' What usually happens to the content you save over time?';
  const Q14 = 'How helpful do you feel your current way of managing saved content is?';
  const Q15 = 'What kind of feature would make it easier to handle saved items? (Select all that apply)';

  // Initialize data structures
  const q1Freq = {};
  const q2Platforms = {};
  const q3Actions = {};
  const q4Methods = {};
  const q5Weekly = {};
  const q6Revisit = {};
  const q7Reasons = {};
  const q8Ease = {};
  const q9Storage = {};
  const q10Description = {};
  const q11Reaction = {};
  const q12Timing = {};
  const q13Fate = {};
  const q14Helpfulness = {};
  const q15Features = {};

  // Likert mappings
  const easeMap = { 'Very easy': 5, 'Somewhat easy': 4, 'Neutral': 3, 'Somewhat difficult': 2, 'Very difficult': 1 };
  const helpMap = { 'Very helpful': 5, 'Somewhat helpful': 4, 'Neutral': 3, 'Not helpful': 2, 'Very unhelpful': 1 };

  const q8Scores = [];
  const q14Scores = [];

  data.forEach(row => {
    // Q1: Discovery frequency
    const q1 = row[Q1];
    if (q1) q1Freq[q1] = (q1Freq[q1] || 0) + 1;

    // Q2: Platforms (multi-select)
    const q2 = splitMulti(row[Q2]);
    q2.forEach(p => q2Platforms[p] = (q2Platforms[p] || 0) + 1);

    // Q3: First action (with label normalization)
    let q3 = row[Q3];
    // Normalize the label
    if (q3 && q3.toLowerCase().includes('optionwatch')) {
      q3 = 'Read it right away';
    }
    if (q3) q3Actions[q3] = (q3Actions[q3] || 0) + 1;

    // Q4: Saving methods (multi-select)
    const q4 = splitMulti(row[Q4]);
    q4.forEach(m => q4Methods[m] = (q4Methods[m] || 0) + 1);

    // Q5: Weekly saved items
    const q5 = row[Q5];
    if (q5) q5Weekly[q5] = (q5Weekly[q5] || 0) + 1;

    // Q6: Revisit frequency
    const q6 = row[Q6];
    if (q6) q6Revisit[q6] = (q6Revisit[q6] || 0) + 1;

    // Q7: Revisit reasons (multi-select)
    const q7 = splitMulti(row[Q7]);
    q7.forEach(r => q7Reasons[r] = (q7Reasons[r] || 0) + 1);

    // Q8: Ease of finding (Likert)
    const q8 = row[Q8];
    if (q8 && easeMap[q8]) {
      q8Ease[q8] = (q8Ease[q8] || 0) + 1;
      q8Scores.push(easeMap[q8]);
    }

    // Q9: Storage location
    const q9 = row[Q9];
    if (q9) q9Storage[q9] = (q9Storage[q9] || 0) + 1;

    // Q10: Collection description
    const q10 = row[Q10];
    if (q10) q10Description[q10] = (q10Description[q10] || 0) + 1;

    // Q11: Emotional reaction
    const q11 = row[Q11];
    if (q11) q11Reaction[q11] = (q11Reaction[q11] || 0) + 1;

    // Q12: Review timing
    const q12 = row[Q12];
    if (q12) q12Timing[q12] = (q12Timing[q12] || 0) + 1;

    // Q13: Content fate
    const q13 = row[Q13];
    if (q13) q13Fate[q13] = (q13Fate[q13] || 0) + 1;

    // Q14: Helpfulness (Likert)
    const q14 = row[Q14];
    if (q14 && helpMap[q14]) {
      q14Helpfulness[q14] = (q14Helpfulness[q14] || 0) + 1;
      q14Scores.push(helpMap[q14]);
    }

    // Q15: Feature preferences (multi-select)
    const q15 = splitMulti(row[Q15]);
    q15.forEach(f => q15Features[f] = (q15Features[f] || 0) + 1);
  });

  // Statistical calculations
  const totalRespondents = data.length;

  // Q1: Mode and chi-square
  const q1Stats = calculateMode(Object.keys(q1Freq).map(k => ({ key: k, count: q1Freq[k] })).flatMap(item => Array(item.count).fill(item.key)));
  const q1ChiSquare = chiSquareTest(Object.values(q1Freq));

  // Q2: Chi-square test
  const q2ChiSquare = chiSquareTest(Object.values(q2Platforms));

  // Q3: Chi-square test
  const q3ChiSquare = chiSquareTest(Object.values(q3Actions));

  // Q6: Trend test (simplified - checking if "Hardly ever" dominates)
  const hardlyEver = q6Revisit['Hardly ever'] || 0;
  const q6ZTest = zTestProportion(hardlyEver, totalRespondents, 0.25);

  // Q8: Wilcoxon test against neutral (3)
  const q8Wilcoxon = q8Scores.length > 0 ? wilcoxonTest(q8Scores, 3) : null;

  // Q9: Entropy calculation
  const q9Entropy = calculateEntropy(Object.values(q9Storage));

  // Q10: Sentiment index (positive vs negative descriptions)
  const positiveDescriptions = ['Well organized', 'Somewhat organized'].reduce((sum, key) => sum + (q10Description[key] || 0), 0);
  const negativeDescriptions = ['Hard to manage', 'Unorganized but manageable'].reduce((sum, key) => sum + (q10Description[key] || 0), 0);
  const q10Sentiment = sentimentIndex(positiveDescriptions, negativeDescriptions, totalRespondents);

  // Q11: Sentiment index
  const positiveReactions = ['I find useful things to check again'].reduce((sum, key) => sum + (q11Reaction[key] || 0), 0);
  const negativeReactions = ['I rarely open it', 'I feel like I have too many items'].reduce((sum, key) => sum + (q11Reaction[key] || 0), 0);
  const q11Sentiment = sentimentIndex(positiveReactions, negativeReactions, totalRespondents);

  // Q12: Proportion test for "Rarely"
  const rarely = q12Timing['Rarely do so'] || 0;
  const q12ZTest = zTestProportion(rarely, totalRespondents, 0.25);

  // Q13: Binomial test for "unused/forgotten"
  const unused = (q13Fate['It stays unused'] || 0) + (q13Fate['I forget about it'] || 0);
  const q13Binomial = binomialCI(unused, totalRespondents);

  // Q14: One-sample t-test against neutral (3)
  const q14TTest = q14Scores.length > 0 ? oneSampleTTest(q14Scores, 3) : null;

  return {
    totalRespondents,
    
    // Section 1: Discovery
    q1: { data: q1Freq, stats: q1Stats, chiSquare: q1ChiSquare },
    q2: { data: q2Platforms, chiSquare: q2ChiSquare },
    q3: { data: q3Actions, chiSquare: q3ChiSquare },
    
    // Section 2: Saving
    q4: { data: q4Methods },
    q5: { data: q5Weekly },
    q6: { data: q6Revisit, zTest: q6ZTest },
    q7: { data: q7Reasons },
    q8: { data: q8Ease, scores: q8Scores, wilcoxon: q8Wilcoxon },
    q9: { data: q9Storage, entropy: q9Entropy },
    q10: { data: q10Description, sentiment: q10Sentiment },
    
    // Section 3: Retrieval
    q11: { data: q11Reaction, sentiment: q11Sentiment },
    q12: { data: q12Timing, zTest: q12ZTest },
    q13: { data: q13Fate, binomial: q13Binomial },
    
    // Section 4: Product
    q14: { data: q14Helpfulness, scores: q14Scores, tTest: q14TTest },
    q15: { data: q15Features }
  };
};
