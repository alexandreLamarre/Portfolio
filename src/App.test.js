import { render } from '@testing-library/react'
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { test } from '@jest/globals';

test('renders learn react link', () => {
  render(<Provider store={store}><App /></Provider>)
});
