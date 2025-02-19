import React from 'react';

import { Monster } from '../../models/interfaces/monster.interface';
import {
  BattleMonsterCard,
  BattleMonsterTitle,
  MonsterImage,
  ProgressBar,
  StatsLabel,
  SeparatorLine,
} from './MonsterBattleCard.extended.styled';

type MonsterCardProps = {
  monster?: Monster | null;
  title?: string;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ monster, title }) => {
  const getBarPercentage = (statValue: number) =>
    Math.min((statValue / 100) * 100, 100);

  return (
    <BattleMonsterCard centralized={!monster}>
      {monster ? (
        <>
          <MonsterImage src={monster.imageUrl} alt={monster.name} />
          <BattleMonsterTitle style={{ fontSize: '22px' }}>
            {title || monster.name}
          </BattleMonsterTitle>
          <SeparatorLine />

          <StatsLabel>HP</StatsLabel>
          <ProgressBar
            variant="determinate"
            value={getBarPercentage(monster.hp)}
          />

          <StatsLabel>Attack</StatsLabel>
          <ProgressBar
            variant="determinate"
            value={getBarPercentage(monster.attack)}
          />

          <StatsLabel>Defense</StatsLabel>
          <ProgressBar
            variant="determinate"
            value={getBarPercentage(monster.defense)}
          />

          <StatsLabel>Speed</StatsLabel>
          <ProgressBar
            variant="determinate"
            value={getBarPercentage(monster.speed)}
          />
        </>
      ) : (
        <BattleMonsterTitle>{title}</BattleMonsterTitle>
      )}
    </BattleMonsterCard>
  );
};

export { MonsterBattleCard };
