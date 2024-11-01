import React from 'react';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { WinnerDisplay } from './WinnerDisplay.extended';

describe('WinnerDisplay', () => {
  it('renders the winner display with the correct text', () => {
    const winnerText = 'Dragon';

    render(<WinnerDisplay text={winnerText} />);

    const winnerElement = screen.getByText(`${winnerText} wins!`);
    expect(winnerElement).toBeInTheDocument();
  });

  it('renders the winner display with different winner text', () => {
    const winnerText = 'Phoenix';

    render(<WinnerDisplay text={winnerText} />);

    const winnerElement = screen.getByText(`${winnerText} wins!`);
    expect(winnerElement).toBeInTheDocument();
  });
});
