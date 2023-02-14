import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

describe('App Render', () => {
  test('renders without crash', () => {
    render(<App />);
  });
});

