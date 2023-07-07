import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import KnownResult, { getPercent } from './KnownResult';

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

describe('KnownResult', () => {

  test('renders the button', () => {
    render(<KnownResult voters={[]} options={[]} question="" totalVotes={0} />);
    const buttonElement = screen.getByText(/نمایش نتیجه/i);
    expect(buttonElement).toBeInTheDocument();
  });

});