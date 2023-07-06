import React from 'react';
import { render, screen } from '@testing-library/react';
import InvitePage from './InvitePage';
import { MemoryRouter } from 'react-router-dom';
import apiInstance from '../utilities/axiosConfig';

vi.mock('../utilities/axiosConfig');

describe('InvitePage', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <InvitePage />
      </MemoryRouter>
    );
  });

  it('displays success message when API call is successful', async () => {
    apiInstance.get.mockResolvedValueOnce({ data: {} });
    render(
      <MemoryRouter>
        <InvitePage />
      </MemoryRouter>
    );
    expect(await screen.findByText('😄')).toBeInTheDocument();
  });
});
