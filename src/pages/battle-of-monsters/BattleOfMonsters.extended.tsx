import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { MonsterBattleCard } from '../../components/monster-battle-card/MonsterBattleCard.extended';
import { MonstersList } from '../../components/monsters-list/MonstersList.extended';
import { Title } from '../../components/title/Title';
import { fetchMonstersData } from '../../reducers/monsters/monsters.actions';
import { postBattle } from '../../reducers/monsters/monsters.actions.extended';
import {
  selectMonsters,
  selectSelectedMonster,
} from '../../reducers/monsters/monsters.selectors';
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
} from './BattleOfMonsters.extended.styled';
import { Monster } from '../../models/interfaces/monster.interface';
import { WinnerDisplay } from '../../components/winner-display/WinnerDisplay.extended';

const BattleOfMonsters: React.FC = () => {
  const dispatch = useAppDispatch();

  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);

  const [computerMonster, setComputerMonster] = useState<Monster | null>(null);
  const [winner, setWinner] = useState<Monster | null>(null);
  const [battleTie, setBattleTie] = useState(false);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, [dispatch]);

  useEffect(() => {
    if (selectedMonster) {
      const availableMonsters = monsters.filter(
        monster => monster.id !== selectedMonster.id,
      );

      setComputerMonster(
        availableMonsters.length
          ? availableMonsters[
              Math.floor(Math.random() * availableMonsters.length)
            ]
          : null,
      );
    }
  }, [selectedMonster, monsters]);

  const handleStartBattleClick = async () => {
    if (selectedMonster && computerMonster) {
      const response = await dispatch(
        postBattle({
          monster1Id: selectedMonster.id,
          monster2Id: computerMonster.id,
        }),
      );

      if (postBattle.fulfilled.match(response)) {
        const { tie, winner: battleWinner } = response.payload;
        setBattleTie(tie);
        setWinner(battleWinner || null);
      }
    }
  };

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />

      {winner && <WinnerDisplay text={winner.name} />}
      {battleTie && <WinnerDisplay text="It's a tie!" />}

      <BattleSection>
        <MonsterBattleCard
          title={selectedMonster?.name || 'Player'}
          monster={selectedMonster}
        />
        <StartBattleButton
          data-testid="start-battle-button"
          disabled={!selectedMonster || !computerMonster}
          onClick={handleStartBattleClick}>
          Start Battle
        </StartBattleButton>
        <MonsterBattleCard
          monster={computerMonster}
          title={computerMonster?.name || 'Computer'}
        />
      </BattleSection>
    </PageContainer>
  );
};

export { BattleOfMonsters };
