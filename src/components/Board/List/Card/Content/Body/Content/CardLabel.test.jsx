import React from 'react';
import { render } from '@testing-library/react';
import CardLabel from './CardLabel';

describe('CardLabel', () => {
  vi.mock("../../../../../../../hooks/useTheme.jsx", () => ({
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
  it('renders the label correctly', () => {
    const label = [
      { title: 'Test Label', color: '#FF0000' }
    ];
    const { getByText } = render(<CardLabel label={label} />);
    expect(getByText('Test Label')).toBeInTheDocument();
  });
});
