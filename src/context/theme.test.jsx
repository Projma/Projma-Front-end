import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './theme';
import ThemeContext from './theme';

describe('ThemeProvider', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );
    expect(container).toBeInTheDocument();
  });

  it('changes theme when changeTheme is called', () => {
    const TestComponent = () => {
      const { theme, changeTheme } = React.useContext(ThemeContext);
      return (
        <>
          <div>{theme.name}</div>
          <button onClick={() => changeTheme('light')}>Change Theme</button>
        </>
      );
    };

    const { getByText } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByText('dark')).toBeInTheDocument();
    fireEvent.click(getByText('Change Theme'));
    expect(getByText('light')).toBeInTheDocument();
  });

  it('returns correct color when getColor is called', () => {
    const TestComponent = () => {
      const { getColor } = React.useContext(ThemeContext);
      return <div>{getColor('#fff')}</div>;
    };

    const { getByText } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByText('#2b2f33')).toBeInTheDocument();
  });
});
