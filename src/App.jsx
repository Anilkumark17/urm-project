import React, { useState, useRef, useEffect } from 'react';
import { parseCSV } from './utils/parseData';
import './utils/chartConfig';

// Question Components
import Q1DiscoveryFrequency from './components/Questions/Q1DiscoveryFrequency';
import Q2Platforms from './components/Questions/Q2Platforms';
import Q3FirstAction from './components/Questions/Q3FirstAction';
import Q5WeeklySaved from './components/Questions/Q5WeeklySaved';
import Q7RevisitReasons from './components/Questions/Q7RevisitReasons';
import Q11EmotionalReaction from './components/Questions/Q11EmotionalReaction';
import Q12ReviewTiming from './components/Questions/Q12ReviewTiming';
import Q13ContentFate from './components/Questions/Q13ContentFate';
import Q14Helpfulness from './components/Questions/Q14Helpfulness';
import Q15Features from './components/Questions/Q15Features';

// Legacy charts
import SavingMethodsChart from './components/Charts/SavingMethodsChart';
import RevisitChart from './components/Charts/RevisitChart';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('discovery');
  const dashboardRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/sample-data.csv');
        const text = await response.text();
        const parsedData = await parseCSV(text);
        setData(parsedData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownload = async () => {
    if (!dashboardRef.current) return;
    
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(dashboardRef.current, {
      backgroundColor: '#0f172a',
      scale: 2
    });
    
    const link = document.createElement('a');
    link.download = 'kbox-research-analysis.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const sections = [
    { id: 'discovery', name: 'Discovery Behavior', color: 'blue' },
    { id: 'saving', name: 'Saving & Fragmentation', color: 'green' },
    { id: 'retrieval', name: 'Retrieval Reality', color: 'orange' },
    { id: 'product', name: 'Product Opportunity', color: 'purple' }
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading Survey Analysis...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1 className="header-title gradient-text">
                KBox UX Research Dashboard
              </h1>
              <p className="header-subtitle">
                Statistical Analysis of 15 Survey Questions • <span className="highlight">{data?.totalRespondents}</span> Respondents
              </p>
            </div>
            
            {data && (
              <button onClick={handleDownload} className="export-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Export Report
              </button>
            )}
          </div>

          {/* Section Navigation */}
          <div className="nav-tabs">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`nav-tab ${activeSection === section.id ? `active ${section.color}` : ''}`}
              >
                {section.id === 'discovery' && (
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                )}
                {section.id === 'saving' && (
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M2 12h20"/>
                  </svg>
                )}
                {section.id === 'retrieval' && (
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="20" x2="12" y2="10"/>
                    <line x1="18" y1="20" x2="18" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="16"/>
                  </svg>
                )}
                {section.id === 'product' && (
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                )}
                <span>{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content" ref={dashboardRef}>
        <div className="container">
          {data && (
            <>
              {/* Section 1: Discovery Behavior */}
              <div className={`section ${activeSection === 'discovery' ? 'active' : ''}`}>
                <div className="section-header blue">
                  <h2 className="section-title">Section 1: Discovery Behavior</h2>
                  <p className="section-description">Understanding how users encounter and interact with useful content</p>
                </div>

                <div className="grid grid-2">
                  <div className="card">
                    <h3 className="card-title">Q1. Discovery Frequency</h3>
                    <div className="card-content">
                      <Q1DiscoveryFrequency data={data.q1} />
                    </div>
                  </div>
                  
                  <div className="card">
                    <h3 className="card-title">Q2. Platform Usage</h3>
                    <div className="card-content">
                      <Q2Platforms data={data.q2} totalRespondents={data.totalRespondents} />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-1">
                  <div className="card">
                    <h3 className="card-title">Q3. First Action After Discovery</h3>
                    <div className="card-content">
                      <Q3FirstAction data={data.q3} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Saving Behavior */}
              <div className={`section ${activeSection === 'saving' ? 'active' : ''}`}>
                <div className="section-header green">
                  <h2 className="section-title">Section 2: Saving Behavior & Fragmentation</h2>
                  <p className="section-description">Analyzing saving methods, frequency, and storage patterns</p>
                </div>

                <div className="grid grid-2">
                  <div className="card">
                    <h3 className="card-title">Q4. Saving Methods</h3>
                    <div className="card-content">
                      <SavingMethodsChart data={data.q4?.data} totalRespondents={data.totalRespondents} />
                    </div>
                  </div>
                  
                  <div className="card">
                    <h3 className="card-title">Q6. Revisit Frequency</h3>
                    <div className="card-content">
                      <RevisitChart data={data.q6?.data} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-2">
                  <Q5WeeklySaved data={data.q5} />
                  <Q7RevisitReasons data={data.q7} totalRespondents={data.totalRespondents} />
                </div>

                {data.q9?.entropy && (
                  <div className="entropy-card">
                    <h3>Storage Fragmentation Analysis</h3>
                    <div className="entropy-grid">
                      <div className="entropy-item">
                        <span>Entropy Score</span>
                        <div className="entropy-value">{data.q9.entropy.entropy.toFixed(3)}</div>
                      </div>
                      <div className="entropy-item">
                        <span>Normalized</span>
                        <div className="entropy-value">{(data.q9.entropy.normalizedEntropy * 100).toFixed(1)}%</div>
                      </div>
                      <div className="entropy-item">
                        <span>Interpretation</span>
                        <div className="entropy-description">
                          {data.q9.entropy.normalizedEntropy > 0.7 ? 'High fragmentation' : 'Moderate fragmentation'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3: Retrieval Reality */}
              <div className={`section ${activeSection === 'retrieval' ? 'active' : ''}`}>
                <div className="section-header orange">
                  <h2 className="section-title">Section 3: Retrieval Reality</h2>
                  <p className="section-description">What happens to saved content over time</p>
                </div>

                <div className="grid grid-2">
                  <div className="card">
                    <h3 className="card-title">Q11. Emotional Reaction</h3>
                    <div className="card-content">
                      <Q11EmotionalReaction data={data.q11} />
                    </div>
                  </div>
                  
                  <div className="card">
                    <h3 className="card-title">Q12. Review Timing</h3>
                    <div className="card-content">
                      <Q12ReviewTiming data={data.q12} />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-1">
                  <div className="card">
                    <h3 className="card-title">Q13. Content Fate Over Time</h3>
                    <div className="card-content">
                      <Q13ContentFate data={data.q13} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Product Opportunity */}
              <div className={`section ${activeSection === 'product' ? 'active' : ''}`}>
                <div className="section-header purple">
                  <h2 className="section-title">Section 4: Product Opportunity</h2>
                  <p className="section-description">User needs and feature prioritization</p>
                </div>

                <div className="grid grid-2">
                  <div className="card">
                    <h3 className="card-title">Q14. System Helpfulness Rating</h3>
                    <div className="card-content">
                      <Q14Helpfulness data={data.q14} />
                    </div>
                  </div>
                  
                  <div className="card">
                    <h3 className="card-title">Q15. Desired Features</h3>
                    <div className="card-content">
                      <Q15Features data={data.q15} totalRespondents={data.totalRespondents} />
                    </div>
                  </div>
                </div>

                {/* Key Takeaways */}
                <div className="key-takeaways">
                  <h3>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    Key Product Opportunities
                  </h3>
                  <ul>
                    <li>
                      <span className="arrow">→</span>
                      <span>Users discover content frequently but struggle with retrieval and organization</span>
                    </li>
                    <li>
                      <span className="arrow">→</span>
                      <span>High storage fragmentation (entropy) indicates need for unified solution</span>
                    </li>
                    <li>
                      <span className="arrow">→</span>
                      <span>Significant content loss rate validates KBox value proposition</span>
                    </li>
                    <li>
                      <span className="arrow">→</span>
                      <span>Feature demand clearly prioritized by statistical analysis</span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>Statistical Analysis Dashboard • Built with React + Chart.js • All tests at α = 0.05 significance level</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
