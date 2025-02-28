import React, { useState, useEffect } from "react";
import { ArrowRight, Check, X } from "lucide-react";

// CSS-in-JS styles
const styles = {
  container: {
    padding: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "24px",
    textAlign: "center",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  formCard: {
    padding: "16px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
  },
  rangeContainer: {
    textAlign: "center",
  },
  buttonContainer: {
    marginBottom: "24px",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    padding: "8px 24px",
    backgroundColor: "#2563eb",
    color: "white",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  },
  buttonDisabled: {
    backgroundColor: "#93c5fd",
    cursor: "not-allowed",
  },
  resultsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "16px",
    paddingBottom: "8px",
    borderBottom: "1px solid #e5e7eb",
  },
  tokenGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
  },
  tokenSection: {
    marginBottom: "16px",
  },
  tokenTitle: {
    fontWeight: "500",
    marginBottom: "8px",
  },
  tokenContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  token1: {
    backgroundColor: "#dbeafe",
    padding: "4px 12px",
    borderRadius: "4px",
  },
  token2: {
    backgroundColor: "#dcfce7",
    padding: "4px 12px",
    borderRadius: "4px",
  },
  matchCard: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
    padding: "12px",
    backgroundColor: "#f9fafb",
    borderRadius: "4px",
    marginBottom: "12px",
  },
  scorePass: {
    color: "#16a34a",
    fontFamily: "monospace",
  },
  scoreFail: {
    color: "#dc2626",
    fontFamily: "monospace",
  },
  scoreContainer: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  summaryCard: {
    padding: "12px",
    backgroundColor: "#f9fafb",
    borderRadius: "4px",
  },
  summaryText: {
    fontWeight: "500",
  },
  summaryPassText: {
    fontWeight: "500",
    color: "#16a34a",
  },
  summaryFailText: {
    fontWeight: "500",
    color: "#dc2626",
  },
  soundexCard: {
    padding: "12px",
    backgroundColor: "#f9fafb",
    borderRadius: "4px",
    marginBottom: "12px",
  },
  soundexHeader: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "8px",
  },
  soundexGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "8px",
  },
  soundexLabel: {
    fontSize: "12px",
    color: "#6b7280",
  },
  soundexCode: {
    fontFamily: "monospace",
  },
  soundexSimilarity: {
    gridColumn: "span 2",
  },
  nameComparisonFlex: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    flexWrap: "wrap",
  },
  nameBox: {
    marginBottom: "4px",
  },
  nameToken: {
    padding: "4px 12px",
    borderRadius: "4px",
  },
  reconstructedToken: {
    backgroundColor: "#f3e8ff",
    padding: "4px 12px",
    borderRadius: "4px",
  },
  scoreCardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    marginBottom: "16px",
  },
  scoreCard: {
    padding: "16px",
    backgroundColor: "#f9fafb",
    borderRadius: "4px",
  },
  scoreTitle: {
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "8px",
  },
  scoreValue: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  scoreDetails: {
    fontSize: "14px",
    color: "#6b7280",
  },
  verdictCard: {
    padding: "16px",
    backgroundColor: "#f9fafb",
    borderRadius: "4px",
    textAlign: "center",
  },
  verdictTitle: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  verdictScore: {
    fontSize: "18px",
  },
};

const NameMatchingApp = () => {
  const [name1, setName1] = useState("Robert Johnson");
  const [name2, setName2] = useState("Bob Johnson");
  const [threshold, setThreshold] = useState(0.7);
  const [soundexThreshold, setSoundexThreshold] = useState(0.7);
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const runComparison = () => {
    setIsCalculating(true);

    // Use setTimeout to allow UI to update before heavy calculation
    setTimeout(() => {
      const result = compareNamesAdvanced(
        name1,
        name2,
        threshold,
        soundexThreshold,
      );
      setResults(result);
      setIsCalculating(false);
    }, 50);
  };

  useEffect(() => {
    runComparison();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Advanced Name Matching Algorithm</h1>

      <div style={styles.formGrid}>
        <div style={styles.formCard}>
          <label style={styles.label}>Name 1</label>
          <input
            type="text"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formCard}>
          <label style={styles.label}>Name 2</label>
          <input
            type="text"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.formCard}>
          <label style={styles.label}>DP Threshold</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            style={styles.input}
          />
          <div style={styles.rangeContainer}>{threshold}</div>
        </div>

        <div style={styles.formCard}>
          <label style={styles.label}>Soundex Threshold</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={soundexThreshold}
            onChange={(e) => setSoundexThreshold(parseFloat(e.target.value))}
            style={styles.input}
          />
          <div style={styles.rangeContainer}>{soundexThreshold}</div>
        </div>
      </div>

      <div style={styles.buttonContainer}>
        <button
          onClick={runComparison}
          disabled={isCalculating}
          style={{
            ...styles.button,
            ...(isCalculating ? styles.buttonDisabled : {}),
          }}
        >
          {isCalculating ? "Calculating..." : "Compare Names"}
        </button>
      </div>

      {results && (
        <div style={styles.resultsContainer}>
          <StepCard
            title="Step 1: Name Tokenization"
            content={
              <div style={styles.tokenGrid}>
                <div style={styles.tokenSection}>
                  <h3 style={styles.tokenTitle}>Name 1 Tokens</h3>
                  <div style={styles.tokenContainer}>
                    {results.tokens1.map((token, idx) => (
                      <span key={idx} style={styles.token1}>
                        {token}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={styles.tokenSection}>
                  <h3 style={styles.tokenTitle}>Name 2 Tokens</h3>
                  <div style={styles.tokenContainer}>
                    {results.tokens2.map((token, idx) => (
                      <span key={idx} style={styles.token2}>
                        {token}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            }
          />

          <StepCard
            title="Step 2: Initial DP Matching"
            content={
              <div>
                <h3 style={styles.tokenTitle}>Token Pair Matches</h3>
                <div>
                  {results.initialMatches.map((match, idx) => (
                    <TokenMatchCard
                      key={idx}
                      token1={match.token1}
                      token2={match.token2}
                      score={match.score}
                      threshold={threshold}
                    />
                  ))}
                </div>
                <div style={styles.summaryCard}>
                  <div style={styles.summaryText}>
                    Initial Minimum Score: {results.minInitialScore.toFixed(3)}
                  </div>
                  <div
                    style={
                      results.minInitialScore >= threshold
                        ? styles.summaryPassText
                        : styles.summaryFailText
                    }
                  >
                    {results.minInitialScore >= threshold
                      ? "Passed Initial Threshold"
                      : "Failed Initial Threshold - Using Soundex Fallback"}
                  </div>
                </div>
              </div>
            }
          />

          {results.soundexUsed && (
            <StepCard
              title="Step 3: Soundex Fallback"
              content={
                <div>
                  <h3 style={styles.tokenTitle}>
                    Low-Scoring Pairs with Soundex
                  </h3>
                  <div>
                    {results.soundexResults.map((result, idx) => (
                      <SoundexResultCard
                        key={idx}
                        result={result}
                        threshold={soundexThreshold}
                      />
                    ))}
                  </div>
                </div>
              }
            />
          )}

          <StepCard
            title="Step 4: Final Name Reconstruction"
            content={
              <div>
                <div style={styles.nameComparisonFlex}>
                  <div>
                    <div style={styles.nameBox}>Original Name 1:</div>
                    <div style={{ ...styles.nameToken, ...styles.token1 }}>
                      {name1}
                    </div>
                  </div>
                  <div>
                    <div style={styles.nameBox}>Original Name 2:</div>
                    <div style={{ ...styles.nameToken, ...styles.token2 }}>
                      {name2}
                    </div>
                  </div>
                  <div>
                    <div style={styles.nameBox}>Reconstructed Name 2:</div>
                    <div style={styles.reconstructedToken}>
                      {results.reconstructedName2}
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          <StepCard
            title="Step 5: Final Scores"
            content={
              <div>
                <div style={styles.scoreCardGrid}>
                  <ScoreCard
                    title="Geometric Mean of Token Scores"
                    score={results.geometricMean}
                    details="Calculated as the geometric mean of all individual token comparison scores"
                  />
                  <ScoreCard
                    title="Full String Comparison"
                    score={results.fullStringScore}
                    details="Calculated by comparing the complete strings with the DP algorithm"
                  />
                </div>
                <div style={styles.verdictCard}>
                  <div style={styles.verdictTitle}>
                    Final Verdict: {results.finalVerdict}
                  </div>
                  <div style={styles.verdictScore}>
                    {results.finalScore.toFixed(3)}{" "}
                    {results.finalScore >= threshold ? "✓" : "✗"}
                  </div>
                </div>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};

const StepCard = ({ title, content }) => (
  <div style={styles.card}>
    <h2 style={styles.cardTitle}>{title}</h2>
    {content}
  </div>
);

const TokenMatchCard = ({ token1, token2, score, threshold }) => (
  <div style={styles.matchCard}>
    <div style={styles.token1}>{token1}</div>
    <ArrowRight size={16} />
    <div style={styles.token2}>{token2}</div>
    <div style={styles.scoreContainer}>
      <div style={score >= threshold ? styles.scorePass : styles.scoreFail}>
        {score.toFixed(3)}
      </div>
      {score >= threshold ? (
        <Check size={16} style={{ color: "#16a34a" }} />
      ) : (
        <X size={16} style={{ color: "#dc2626" }} />
      )}
    </div>
  </div>
);

const SoundexResultCard = ({ result, threshold }) => (
  <div style={styles.soundexCard}>
    <div style={styles.soundexHeader}>
      <div style={styles.token1}>{result.token1}</div>
      <ArrowRight size={16} />
      <div style={styles.token2}>{result.token2}</div>
      <div style={{ marginLeft: "auto" }}>
        {result.isMatch ? (
          <Check size={16} style={{ color: "#16a34a" }} />
        ) : (
          <X size={16} style={{ color: "#dc2626" }} />
        )}
      </div>
    </div>
    <div style={styles.soundexGrid}>
      <div>
        <div style={styles.soundexLabel}>Soundex 1</div>
        <div style={styles.soundexCode}>{result.soundex1}</div>
      </div>
      <div>
        <div style={styles.soundexLabel}>Soundex 2</div>
        <div style={styles.soundexCode}>{result.soundex2}</div>
      </div>
      <div style={styles.soundexSimilarity}>
        <div style={styles.soundexLabel}>Similarity</div>
        <div
          style={
            result.similarityPercentage / 100 >= threshold
              ? styles.scorePass
              : styles.scoreFail
          }
        >
          {result.similarityPercentage.toFixed(1)}% (
          {result.similarityPercentage / 100 >= threshold ? "Pass" : "Fail"})
        </div>
      </div>
    </div>
  </div>
);

const ScoreCard = ({ title, score, details }) => (
  <div style={styles.scoreCard}>
    <div style={styles.scoreTitle}>{title}</div>
    <div style={styles.scoreValue}>{score.toFixed(3)}</div>
    <div style={styles.scoreDetails}>{details}</div>
  </div>
);

// ALGORITHM IMPLEMENTATION FUNCTIONS

// Soundex implementation from your code
function getSoundex(name) {
  if (!name || typeof name !== "string") {
    return "0000";
  }

  // Convert to uppercase and remove non-alphabetic characters
  name = name.toUpperCase().replace(/[^A-Z]/g, "");

  if (name.length === 0) {
    return "0000";
  }

  // Keep first letter
  const firstLetter = name.charAt(0);

  // Convert the rest using Soundex mapping
  const mapped = name
    .substring(1)
    .replace(/[BFPV]/g, "1")
    .replace(/[CGJKQSXZ]/g, "2")
    .replace(/[DT]/g, "3")
    .replace(/L/g, "4")
    .replace(/[MN]/g, "5")
    .replace(/R/g, "6")
    .replace(/[AEIOUHWY]/g, "0");

  // Remove adjacent duplicates and zeros
  let result = firstLetter;
  for (let i = 0; i < mapped.length; i++) {
    if (mapped[i] !== "0" && mapped[i] !== result[result.length - 1]) {
      result += mapped[i];
    }
  }

  // Pad with zeros and truncate to ensure 4 characters
  result = result.padEnd(4, "0").substring(0, 4);

  return result;
}

function compareSoundex(token1, token2) {
  // Get Soundex codes for both tokens
  const code1 = getSoundex(token1);
  const code2 = getSoundex(token2);

  // Calculate similarity score (4 = exact match, 0 = completely different)
  let similarityScore = 0;
  for (let i = 0; i < 4; i++) {
    if (code1[i] === code2[i]) {
      similarityScore++;
    }
  }

  return {
    token1,
    token2,
    soundex1: code1,
    soundex2: code2,
    similarityScore,
    similarityPercentage: (similarityScore / 4) * 100,
    isMatch: code1 === code2,
  };
}

// Simplified version of the DP algorithm for token comparison
function compareTokens(token1, token2) {
  const matrix = computeMatrix(token1, token2);
  const maxValue = findMaxValue(matrix);
  return (2 * maxValue) / (token1.length + token2.length);
}

function computeMatrix(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  const mismatchPenalty = 0.4;
  const gapPenalty = 0.4;

  // Initialize matrix with zeros
  const matrix = Array(len1 + 1)
    .fill()
    .map(() => Array(len2 + 1).fill(0));

  // Fill the matrix using dynamic programming
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      // Calculate character match score
      const charMatch =
        str1[i - 1].toUpperCase() === str2[j - 1].toUpperCase()
          ? 1
          : -mismatchPenalty;

      // Consider possibilities: match/mismatch, gap in str1, gap in str2, or no match
      matrix[i][j] = Math.max(
        matrix[i - 1][j - 1] + charMatch, // Match or mismatch
        matrix[i - 1][j] - gapPenalty, // Gap in str2
        matrix[i][j - 1] - gapPenalty, // Gap in str1
        0, // Reset to zero if score becomes negative
      );
    }
  }

  return matrix;
}

function findMaxValue(matrix) {
  let max = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      max = Math.max(max, matrix[i][j]);
    }
  }
  return max;
}

// Simplified full name comparison using DP
function compareFullStrings(name1, name2) {
  const matrix = computeMatrix(name1, name2);
  const maxValue = findMaxValue(matrix);
  return (2 * maxValue) / (name1.length + name2.length);
}

// Calculate geometric mean
function geometricMean(scores) {
  if (scores.length === 0) return 0;
  let product = 1;
  for (const score of scores) {
    product *= Math.max(0.01, score); // Avoid multiplying by zero
  }
  return Math.pow(product, 1 / scores.length);
}

// Main advanced comparison function
function compareNamesAdvanced(
  name1,
  name2,
  threshold = 0.7,
  soundexThreshold = 0.7,
) {
  // Step 1: Tokenize and sanitize names
  const tokens1 = name1
    .split(/[\s-]+/)
    .map((t) => t.trim().toUpperCase())
    .filter((t) => t.length > 0);
  const tokens2 = name2
    .split(/[\s-]+/)
    .map((t) => t.trim().toUpperCase())
    .filter((t) => t.length > 0);

  // Get original tokens with case preserved
  const originalTokens1 = name1
    .split(/[\s-]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  const originalTokens2 = name2
    .split(/[\s-]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  // Handle case where name1 has more tokens than name2
  if (tokens1.length > tokens2.length) {
    return {
      tokens1,
      tokens2,
      initialMatches: [],
      minInitialScore: 0,
      soundexUsed: false,
      soundexResults: [],
      reconstructedName2: name2,
      geometricMean: 0,
      fullStringScore: 0,
      finalScore: 0,
      finalVerdict: "NO MATCH - Name 1 has more tokens than Name 2",
    };
  }

  // Step 2: Initial matching with DP algorithm
  const availableTokens2 = [...tokens2];
  const initialMatches = [];
  const tokenScores = [];
  const matchedPositions = []; // Track which positions in tokens2 were matched

  for (let i = 0; i < tokens1.length; i++) {
    const token1 = tokens1[i];
    let bestMatchIndex = -1;
    let bestScore = -1;

    // Find best match for this token
    for (let j = 0; j < availableTokens2.length; j++) {
      const token2 = availableTokens2[j];
      const score = compareTokens(token1, token2);
      if (score > bestScore) {
        bestScore = score;
        bestMatchIndex = j;
      }
    }

    if (bestMatchIndex >= 0) {
      const matchedToken = availableTokens2[bestMatchIndex];
      // Find the original index in tokens2 (not in availableTokens2)
      const originalIndex = tokens2.findIndex((t, idx) => 
        t === matchedToken && !matchedPositions.includes(idx)
      );

      matchedPositions.push(originalIndex);

      initialMatches.push({
        token1,
        token2: matchedToken,
        score: bestScore,
        originalIndex, // Index in name2
        token1Index: i // Index in name1
      });

      tokenScores.push(bestScore);

      // Remove matched token from available tokens
      availableTokens2.splice(bestMatchIndex, 1);
    }
  }

  // Calculate minimum score from initial matches
  const minInitialScore = Math.min(...tokenScores);

  // Step 3: Apply Soundex for low-scoring pairs if needed
  const soundexResults = [];
  // Start with empty reconstructed tokens array
  let reconstructedTokens2 = new Array(tokens2.length);
  let soundexUsed = false;

  // First, map each token2 position to its matched token1 position
  const positionMap = new Array(tokens2.length).fill(-1);
  initialMatches.forEach(match => {
    positionMap[match.originalIndex] = match.token1Index;
  });

  // Now, reorder tokens2 based on the token1 order
  for (let i = 0; i < tokens2.length; i++) {
    const targetPos = positionMap[i];
    if (targetPos >= 0) {
      // This position matched - use it
      reconstructedTokens2[targetPos] = originalTokens2[i];
    } else {
      // This token wasn't matched - find a free spot for it
      for (let j = 0; j < reconstructedTokens2.length; j++) {
        if (!reconstructedTokens2[j]) {
          reconstructedTokens2[j] = originalTokens2[i];
          break;
        }
      }
    }
  }

  // Apply Soundex if needed
  if (minInitialScore < threshold) {
    soundexUsed = true;

    initialMatches.forEach((match, idx) => {
      if (match.score < threshold) {
        // Try Soundex for this low-scoring pair
        const soundexResult = compareSoundex(match.token1, match.token2);
        soundexResults.push(soundexResult);

        // If Soundex similarity is high enough, replace token in reconstructed name
        if (soundexResult.similarityPercentage / 100 >= soundexThreshold) {
          // Replace token with the corresponding token from name1
          reconstructedTokens2[match.token1Index] = originalTokens1[match.token1Index];
          tokenScores[idx] = 1.0; // Consider it a perfect match now
        }
      }
    });
  }

  // Fill any remaining empty slots (shouldn't happen, but just in case)
  reconstructedTokens2 = reconstructedTokens2.filter(t => t !== undefined);

  // Step 4: Reconstruct the modified name2
  const reconstructedName2 = reconstructedTokens2.join(" ");

  // Step 5: Calculate final scores
  const finalTokenScores = [...tokenScores]; // May have been modified by Soundex matches
  const geometricMeanScore = geometricMean(finalTokenScores);
  const fullStringScore = compareFullStrings(name1, reconstructedName2);

  // Calculate final score (average of both methods)
  const finalScore = (geometricMeanScore + fullStringScore) / 2;
  const finalVerdict = finalScore >= threshold ? "MATCH" : "NO MATCH";

  return {
    tokens1,
    tokens2: originalTokens2,
    initialMatches,
    minInitialScore,
    soundexUsed,
    soundexResults,
    reconstructedName2,
    geometricMean: geometricMeanScore,
    fullStringScore,
    finalScore,
    finalVerdict,
  };
}
export default NameMatchingApp;
