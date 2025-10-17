import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: #2d1810;
    background: linear-gradient(135deg, #fff8f0 0%, #fef3e2 100%);
    min-height: 100vh;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  // Praise Theme Color Variables
  :root {
    --primary-color: #d97706;
    --primary-dark: #b45309;
    --primary-light: #f59e0b;
    --secondary-color: #fbbf24;
    --accent-color: #fcd34d;
    --success-color: #059669;
    --error-color: #dc2626;
    --warning-color: #d97706;
    
    // Praise-inspired warm palette
    --praise-gold: #fbbf24;
    --praise-amber: #f59e0b;
    --praise-orange: #d97706;
    --praise-deep: #b45309;
    --praise-light: #fef3c7;
    --praise-cream: #fffbeb;
    --praise-warm: #fef7ed;
    
    // Neutral warm grays
    --gray-50: #fafaf9;
    --gray-100: #f5f5f4;
    --gray-200: #e7e5e4;
    --gray-300: #d6d3d1;
    --gray-400: #a8a29e;
    --gray-500: #78716c;
    --gray-600: #57534e;
    --gray-700: #44403c;
    --gray-800: #292524;
    --gray-900: #1c1917;
    --white: #ffffff;
    --black: #000000;
    
    // Text colors for praise theme
    --text-primary: #2d1810;
    --text-secondary: #44403c;
    --text-muted: #78716c;
  }

  // Typography
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.5rem;
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1rem; }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--primary-dark);
    }
  }

  // Buttons with Praise Theme
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    box-shadow: 0 4px 6px rgba(217, 119, 6, 0.15);

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(217, 119, 6, 0.25);
    }
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--praise-amber) 0%, var(--praise-orange) 100%);
    color: var(--white);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, var(--praise-orange) 0%, var(--praise-deep) 100%);
    }
  }

  .btn-secondary {
    background: linear-gradient(135deg, var(--praise-light) 0%, var(--praise-cream) 100%);
    color: var(--praise-deep);
    border: 2px solid var(--praise-amber);

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, var(--praise-cream) 0%, var(--praise-light) 100%);
      border-color: var(--praise-orange);
      color: var(--praise-orange);
    }
  }

  .btn-outline {
    background-color: transparent;
    color: var(--primary-color);
    border: 2px solid var(--praise-amber);

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, var(--praise-amber) 0%, var(--praise-orange) 100%);
      color: var(--white);
      border-color: var(--praise-orange);
    }
  }

  // Enhanced Form elements for Praise Theme
  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--text-primary);
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .form-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--gray-300);
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    &::placeholder {
      color: var(--gray-400);
    }
  }

  .form-textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--gray-300);
    border-radius: 0.5rem;
    font-size: 1rem;
    min-height: 100px;
    resize: vertical;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
  }

  .form-error {
    color: var(--error-color);
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }

  // Utility classes
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }

  .mb-0 { margin-bottom: 0; }
  .mb-1 { margin-bottom: 0.25rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mb-3 { margin-bottom: 0.75rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-5 { margin-bottom: 1.25rem; }
  .mb-6 { margin-bottom: 1.5rem; }

  .mt-0 { margin-top: 0; }
  .mt-1 { margin-top: 0.25rem; }
  .mt-2 { margin-top: 0.5rem; }
  .mt-3 { margin-top: 0.75rem; }
  .mt-4 { margin-top: 1rem; }
  .mt-5 { margin-top: 1.25rem; }
  .mt-6 { margin-top: 1.5rem; }

  .grid {
    display: grid;
    gap: 1rem;
  }

  .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

  @media (max-width: 768px) {
    .grid-cols-2,
    .grid-cols-3,
    .grid-cols-4 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }

  // Loading spinner
  .spinner {
    border: 3px solid var(--gray-200);
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  // Enhanced Card styles for Praise Theme
  .card {
    background: var(--white);
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(217, 119, 6, 0.05), 0 1px 3px rgba(217, 119, 6, 0.1);
    overflow: hidden;
    border: 1px solid var(--praise-light);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(217, 119, 6, 0.1), 0 4px 6px rgba(217, 119, 6, 0.15);
    }
  }

  .card-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--praise-light);
    background: linear-gradient(135deg, var(--praise-cream) 0%, var(--white) 100%);
  }

  .card-body {
    padding: 1.5rem;
  }

  .card-footer {
    padding: 1.5rem;
    border-top: 1px solid var(--praise-light);
    background: linear-gradient(135deg, var(--white) 0%, var(--praise-warm) 100%);
  }

  // Praise Theme Specific Enhancements
  .praise-gradient {
    background: linear-gradient(135deg, var(--praise-amber) 0%, var(--praise-orange) 100%);
  }

  .praise-glow {
    box-shadow: 0 0 20px rgba(217, 119, 6, 0.3);
  }

  .praise-text-gradient {
    background: linear-gradient(135deg, var(--praise-amber) 0%, var(--praise-orange) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  // Enhanced animations for Praise Theme
  @keyframes praiseGlow {
    0%, 100% { box-shadow: 0 0 5px rgba(217, 119, 6, 0.5); }
    50% { box-shadow: 0 0 20px rgba(217, 119, 6, 0.8); }
  }

  .praise-glow-animation {
    animation: praiseGlow 2s ease-in-out infinite;
  }
    border-top: 1px solid var(--gray-200);
    background-color: var(--gray-50);
  }
`;

export default GlobalStyle;
