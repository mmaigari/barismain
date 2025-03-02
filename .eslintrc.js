module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn', // Downgrade unused imports to warnings
    'react/no-unescaped-entities': 'off', // Turn off unescaped entities errors
  }
};