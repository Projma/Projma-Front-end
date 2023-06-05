import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import ThemeContext from '../context/theme';
import useTheme from './useTheme';

test('should use theme context value', () => {
  const testValue = 'test value';
  const wrapper = ({ children }) => (
    <ThemeContext.Provider value={testValue}>{children}</ThemeContext.Provider>
  );
  const { result } = renderHook(() => useTheme(), { wrapper });
  expect(result.current).toBe(testValue);
});
