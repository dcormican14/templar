import React from 'react';

export interface SyntaxTheme {
  keyword: string;
  string: string;
  comment: string;
  number: string;
  operator: string;
  function: string;
  property: string;
  tag: string;
  attribute: string;
  punctuation: string;
}

export const createSyntaxTheme = (cssVars: any): SyntaxTheme => ({
  keyword: '#569cd6',      // Blue for keywords (function, const, let, etc.)
  string: '#ce9178',       // Orange for strings
  comment: '#6a9955',      // Green for comments
  number: '#b5cea8',       // Light green for numbers
  operator: '#d4d4d4',     // Light gray for operators
  function: '#dcdcaa',     // Yellow for function names
  property: '#9cdcfe',     // Light blue for properties
  tag: '#4ec9b0',          // Cyan for HTML/JSX tags
  attribute: '#92c5f8',    // Light blue for attributes
  punctuation: '#cccccc',  // Light gray for punctuation
});

export const getLanguagePatterns = (language: string) => {
  const basePatterns = {
    // Comments
    comment: [
      /\/\*[\s\S]*?\*\//g,        // Block comments
      /\/\/.*$/gm,                // Line comments
      /#.*$/gm,                   // Python/Shell comments
    ],
    // Strings
    string: [
      /"(?:[^"\\]|\\.)*"/g,       // Double quotes
      /'(?:[^'\\]|\\.)*'/g,       // Single quotes
      /`(?:[^`\\]|\\.|`)*`/g,     // Template literals
    ],
    // Numbers
    number: [
      /\b\d+\.?\d*\b/g,           // Numbers (int and float)
    ],
  };

  const languageSpecific: Record<string, any> = {
    javascript: {
      ...basePatterns,
      keyword: [
        /\b(const|let|var|function|class|extends|import|export|from|default|if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|new|this|super|async|await|yield|typeof|instanceof)\b/g
      ],
      operator: [
        /[+\-*/%=<>!&|^~?:]/g,
      ],
      function: [
        /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
      ],
      property: [
        /\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
      ],
    },
    typescript: {
      ...basePatterns,
      keyword: [
        /\b(const|let|var|function|class|extends|import|export|from|default|if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|new|this|super|async|await|yield|typeof|instanceof|interface|type|enum|namespace|declare|public|private|protected|readonly|static)\b/g
      ],
      operator: [
        /[+\-*/%=<>!&|^~?:]/g,
      ],
      function: [
        /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
      ],
      property: [
        /\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
      ],
    },
    tsx: {
      ...basePatterns,
      keyword: [
        /\b(const|let|var|function|class|extends|import|export|from|default|if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|new|this|super|async|await|yield|typeof|instanceof|interface|type|enum|namespace|declare|public|private|protected|readonly|static)\b/g
      ],
      operator: [
        /[+\-*/%=<>!&|^~?:]/g,
      ],
      function: [
        /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
      ],
      property: [
        /\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
      ],
      tag: [
        /<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s[^>]*)?\/?>/g,
      ],
      attribute: [
        /\b([a-zA-Z-]+)(?==)/g,
      ],
    },
    jsx: {
      ...basePatterns,
      keyword: [
        /\b(const|let|var|function|class|extends|import|export|from|default|if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|new|this|super|async|await|yield|typeof|instanceof)\b/g
      ],
      operator: [
        /[+\-*/%=<>!&|^~?:]/g,
      ],
      function: [
        /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
      ],
      property: [
        /\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
      ],
      tag: [
        /<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s[^>]*)?\/?>/g,
      ],
      attribute: [
        /\b([a-zA-Z-]+)(?==)/g,
      ],
    },
    css: {
      ...basePatterns,
      property: [
        /([a-zA-Z-]+)\s*:/g,
      ],
      keyword: [
        /\b(important|inherit|initial|unset|auto|none)\b/g,
      ],
      function: [
        /([a-zA-Z-]+)\(/g,
      ],
    },
    json: {
      string: [
        /"(?:[^"\\]|\\.)*"/g,
      ],
      number: [
        /\b\d+\.?\d*\b/g,
      ],
      keyword: [
        /\b(true|false|null)\b/g,
      ],
      property: [
        /"([^"]+)"\s*:/g,
      ],
    },
  };

  return languageSpecific[language.toLowerCase()] || basePatterns;
};

export const highlightSyntax = (code: string, language: string, theme: SyntaxTheme): React.ReactElement[] => {
  if (!language || language === 'text' || language === 'plain') {
    return [<span key={0}>{code}</span>];
  }

  const patterns = getLanguagePatterns(language);
  const tokens: Array<{ type: string; content: string; start: number; end: number }> = [];

  // Find all matches for each token type
  Object.entries(patterns).forEach(([type, regexes]) => {
    if (Array.isArray(regexes)) {
      regexes.forEach(regex => {
        let match;
        while ((match = regex.exec(code)) !== null) {
          tokens.push({
            type,
            content: match[0],
            start: match.index,
            end: match.index + match[0].length,
          });
        }
      });
    }
  });

  // Sort tokens by start position
  tokens.sort((a, b) => a.start - b.start);

  // Merge overlapping tokens (keep the first one)
  const mergedTokens: typeof tokens = [];
  let lastEnd = 0;

  tokens.forEach(token => {
    if (token.start >= lastEnd) {
      mergedTokens.push(token);
      lastEnd = token.end;
    }
  });

  // Create highlighted elements
  const elements: React.ReactElement[] = [];
  let currentIndex = 0;

  mergedTokens.forEach((token, index) => {
    // Add unhighlighted text before this token
    if (token.start > currentIndex) {
      const text = code.slice(currentIndex, token.start);
      elements.push(<span key={`text-${index}`}>{text}</span>);
    }

    // Add highlighted token
    const color = theme[token.type as keyof SyntaxTheme] || theme.punctuation;
    elements.push(
      <span key={`token-${index}`} style={{ color }}>
        {token.content}
      </span>
    );

    currentIndex = token.end;
  });

  // Add remaining unhighlighted text
  if (currentIndex < code.length) {
    const text = code.slice(currentIndex);
    elements.push(<span key="text-end">{text}</span>);
  }

  return elements.length > 0 ? elements : [<span key={0}>{code}</span>];
};
