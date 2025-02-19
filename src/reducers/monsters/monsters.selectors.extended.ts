import { RootState } from '../../app/store';
import { Monster } from '../../models/interfaces/monster.interface';

export const selectMonsterWins = (
  state: RootState,
  monsterId: string,
): Monster | null => {
  return (
    state.monsters.monsters.find(
      (monster: Monster) => monster.id === monsterId,
    ) || null
  );
};

export const selectRandomMonster = (state: RootState): Monster | null => {
  const { monsters, selectedMonster } = state.monsters;

  const availableMonsters = monsters.filter(
    (monster: Monster) => monster.id !== selectedMonster?.id,
  );

  if (availableMonsters.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableMonsters.length);
    return availableMonsters[randomIndex];
  }

  return null;
};

export const selectAllMonsters = (state: RootState): Monster[] => {
  return state.monsters.monsters;
};
