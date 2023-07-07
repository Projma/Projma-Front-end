import React from 'react';
import { render } from '@testing-library/react';
import CardFooter from './CardFooter';

describe('CardFooter', () => {
  vi.mock("../../../../../../hooks/useTheme.jsx", () => ({
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
  
  it('renders correctly', () => {
    const doers = [
      {
        first_name: 'John',
        last_name: 'Doe',
        profile_pic: 'https://example.com/john.jpg'
      },
      {
        first_name: 'Jane',
        last_name: 'Doe',
        profile_pic: 'https://example.com/jane.jpg'
      }
    ];
    const attachments_num = 2;
    const checklists_num = 3;
    const checked_checklists_num = 1;
    const comments_num = 4;

    const { container } = render(
      <CardFooter
        doers={doers}
        attachments_num={attachments_num}
        checklists_num={checklists_num}
        checked_checklists_num={checked_checklists_num}
        comments_num={comments_num}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
