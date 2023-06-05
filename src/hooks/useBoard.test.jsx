import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import BoardContext from '../context/board';
import useBoard from './useBoard';

test('should use board context value', () => {
  const testValue = 'test value';
  const wrapper = ({ children }) => (
    <BoardContext.Provider value={testValue}>{children}</BoardContext.Provider>
  );
  const { result } = renderHook(() => useBoard(), { wrapper });
  expect(result.current).toBe(testValue);
});
