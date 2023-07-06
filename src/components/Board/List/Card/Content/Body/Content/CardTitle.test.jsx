import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CardTitle from './CardTitle';

describe('CardTitle', () => {
  it('renders the title correctly', () => {
    const title = 'Test Title';
    const { getByDisplayValue } = render(<CardTitle title={title} />);
    expect(getByDisplayValue(title)).toBeInTheDocument();
  });

  it('updates the title on change', () => {
    const title = 'Test Title';
    const newTitle = 'New Title';
    const { getByDisplayValue } = render(<CardTitle title={title} />);
    fireEvent.change(getByDisplayValue(title), { target: { value: newTitle } });
    expect(getByDisplayValue(newTitle)).toBeInTheDocument();
  });

  it('converts numbers to Persian on change', () => {
    const title = 'Test Title';
    const newTitle = 'Test Title 123';
    const expectedTitle = 'Test Title ۱۲۳';
    const { getByDisplayValue } = render(<CardTitle title={title} />);
    fireEvent.change(getByDisplayValue(title), { target: { value: newTitle } });
    expect(getByDisplayValue(expectedTitle)).toBeInTheDocument();
  });

});
