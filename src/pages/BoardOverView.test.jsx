import React from 'react';
import { render } from '@testing-library/react';
import BoardOverView from './BoardOverView';
import { MemoryRouter } from 'react-router-dom';

describe('BoardOverView', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <BoardOverView />
      </MemoryRouter>
    );
  });
});
