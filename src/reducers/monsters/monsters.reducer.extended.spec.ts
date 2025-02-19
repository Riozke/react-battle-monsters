import { monstersReducerExtended } from './monsters.reducer.extended';
import { postBattle, setRandomMonster } from './monsters.actions.extended';
import { Monster } from '../../models/interfaces/monster.interface';

describe('monstersReducerExtended', () => {
  const initialState = {
    selectedMonster: null,
    winner: null,
    tie: false,
  };

  it('should return the initial state when called with an undefined state', () => {
    const action = { type: undefined };
    const state = monstersReducerExtended(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should set the selected monster when setRandomMonster is dispatched', () => {
    const monster: Monster = {
      id: '1',
      name: 'Dragon',
      imageUrl: '',
      hp: 80,
      attack: 70,
      defense: 60,
      speed: 90,
      type: 'Fire',
    };
    const action = setRandomMonster(monster);

    const state = monstersReducerExtended(initialState, action);
    expect(state.selectedMonster).toEqual(monster);
  });

  it('should update the winner and tie state when postBattle.fulfilled is dispatched', () => {
    const battleResult = {
      winner: {
        id: '1',
        name: 'Dragon',
        imageUrl: '',
        hp: 80,
        attack: 70,
        defense: 60,
        speed: 90,
        type: 'Fire',
      },
      tie: false,
    };
    const action = postBattle.fulfilled(battleResult, '', {
      monster1Id: '1',
      monster2Id: '2',
    });

    const state = monstersReducerExtended(initialState, action);
    expect(state.winner).toEqual(battleResult.winner);
    expect(state.tie).toEqual(battleResult.tie);
  });
});
