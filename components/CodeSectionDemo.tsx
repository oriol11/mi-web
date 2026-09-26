import React from 'react';
import CodeSection from '@/components/CodeSection';

const App = () => {
  const installationCommands = `
# Install dependencies
npm install framer-motion @react-syntax-highlighter/react-syntax-highlighter lucide-react

# Or with yarn
yarn add framer-motion @react-syntax-highlighter/react-syntax-highlighter lucide-react
`;

  const usageExample = `
import React from 'react';
import CodeSection from '@/components/CodeSection';

const CodeExample = () => {
  return (
    <CodeSection
      installationCommands={installationCommands}
      usageExample={usageExample}
    />
  );
};

export default CodeExample;