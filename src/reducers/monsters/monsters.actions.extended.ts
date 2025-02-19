import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { MonsterServiceExtended } from './monsters.service.extended';
import { Players } from '../../models/interfaces/battle.interface';
import { Monster } from '../../models/interfaces/monster.interface';

export const postBattle = createAsyncThunk(
  'monsters/postBattle',
  async ({ monster1Id, monster2Id }: Players) => {
    const data = await MonsterServiceExtended.battle({
      monster1Id,
      monster2Id,
    });
    return data;
  },
);

export const fetchBattleWins = createAction('monsters/fetchBattleWins');

export const setRandomMonster = createAction<Monster>(
  'monsters/setRandomMonster',
);

export const setWinner = createAction<string>('monsters/setWinner');
