import { createReducer } from '@reduxjs/toolkit';
import { Battle } from '../../models/interfaces/battle.interface';
import { Monster } from '../../models/interfaces/monster.interface';
import { postBattle, setRandomMonster } from './monsters.actions.extended';

interface MonsterState {
  selectedMonster: Monster | null;
  winner: Monster | null;
  tie: boolean;
}

const initialState: MonsterState = {
  selectedMonster: null,
  winner: null,
  tie: false,
};

export const monstersReducerExtended = createReducer(initialState, builder => {
  builder
    .addCase(setRandomMonster, (state, action) => {
      state.selectedMonster = action.payload;
    })
    .addCase(postBattle.fulfilled, (state, action) => {
      const { winner, tie } = action.payload as Battle;
      state.winner = winner;
      state.tie = tie;
    });
});
