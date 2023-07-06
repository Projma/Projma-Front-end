import React from 'react';
import { render } from '@testing-library/react';
import CardCover from './CardCover';

describe('CardCover', () => {
  it('renders the image correctly', () => {
    const src = 'test-image.jpg';
    const { getByAltText } = render(<CardCover src={src} />);
    expect(getByAltText('تصویر پس زمینه کارت')).toHaveAttribute('src', src);
  });
});
