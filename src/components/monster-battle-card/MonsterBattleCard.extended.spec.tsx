import React from 'react';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { MonsterBattleCard } from './MonsterBattleCard.extended';
import { Monster } from '../../models/interfaces/monster.interface';

describe('MonsterBattleCard', () => {
  it('renders the card with a title when no monster is provided', () => {
    render(<MonsterBattleCard title="No Monster" />);
    const titleElement = screen.getByText('No Monster');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the monster card with image and stats when monster is provided', () => {
    const monster: Monster = {
      id: '1',
      name: 'Dragon',
      imageUrl: 'http://example.com/dragon.png',
      hp: 80,
      attack: 70,
      type: 'Type',
      defense: 60,
      speed: 90,
    };

    render(<MonsterBattleCard monster={monster} />);

    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('Attack')).toBeInTheDocument();
    expect(screen.getByText('Defense')).toBeInTheDocument();
    expect(screen.getByText('Speed')).toBeInTheDocument();
  });
});
