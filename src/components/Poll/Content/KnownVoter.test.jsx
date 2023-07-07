import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import KnownVoter from './KnownVoter';
import { baseUrl } from '../../../utilities/constants';

vi.mock("../../../hooks/useTheme.jsx", () => ({
  __esModule: true,
  default: () => ({
    theme: {
      name: "sun",
      mainBg: "#e5e5e5",
      minorBg: "#fff",
      secondary: "#f8981c",
      tertiary: "#f47922",
      hover: "#f4792280",
      primary: "#fdb713",
    },
    getColor: (bgColor) => "#000000",
  }),
}));

const voters = [
  { user__pk: 1 },
  { user__pk: 2 },
  { user__pk: 3 },
];

vi.mock('../../../utilities/axiosConfig', () => ({
  get: vi.fn(() => Promise.resolve({ data: [{ user: { id: 1, first_name: 'John', last_name: 'Doe', profile_pic: '/path/to/image.jpg' } }, { user: { id: 2, first_name: 'Jane', last_name: 'Doe', profile_pic: null } }] }))
}));

describe('KnownVoter', () => {
  test('renders "رای گیری شناس" when no voters are provided', async () => {
    render(<KnownVoter voters={[]} />);
    const textElement = screen.getByText('رای گیری شناس');
    expect(textElement).toBeInTheDocument();
  });
});
