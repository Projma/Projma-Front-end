import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from './board';

describe('Provider component', () => {
  it('renders children', () => {
    render(
      <Provider boardId={1} workspaceId={1}>
        <div>Test Child</div>
      </Provider>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});

