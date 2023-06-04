import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GroupAvatars from './GroupAvatars';

jest.mock('../../../../utilities/axiosConfig', () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          id: 1,
          user: {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            username: 'johndoe',
            password: 'password',
            email: 'johndoe@gmail.com'
          },
          birth_date: null,
          bio: null,
          phone: null,
          profile_pic: null,
          role: 'Member'
        },
        // Add more members for testing
      ]
    })
  )
}));

describe('GroupAvatars', () => {
  it('renders member avatars with tooltips', async () => {
    render(<GroupAvatars />);

    // Wait for the members to be fetched and rendered
    const avatarElements = await screen.findAllByRole('img');
    expect(avatarElements).toHaveLength(1); // Update the expected length based on the number of members

    // Check if the tooltip is rendered correctly
    const tooltipElement = screen.getByTitle('johndoe');
    expect(tooltipElement).toBeInTheDocument();
  });
});
