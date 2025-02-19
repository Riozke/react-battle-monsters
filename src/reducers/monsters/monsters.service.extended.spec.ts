import { MonsterServiceExtended } from './monsters.service.extended';
import { API_URL } from '../../constants/env';
import { Monster } from '../../models/interfaces/monster.interface';
import { Battle, Players } from '../../models/interfaces/battle.interface';

describe('MonsterServiceExtended', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllMonsters', () => {
    it('should fetch all monsters and return them', async () => {
      const monsters: Monster[] = [
        {
          id: '1',
          name: 'Dragon',
          imageUrl: '',
          hp: 80,
          attack: 70,
          defense: 60,
          speed: 90,
          type: 'Fire',
        },
        {
          id: '2',
          name: 'Goblin',
          imageUrl: '',
          hp: 30,
          attack: 50,
          defense: 40,
          speed: 60,
          type: 'Earth',
        },
      ];

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(monsters),
        }),
      ) as jest.Mock;

      const result = await MonsterServiceExtended.getAllMonsters();

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/monsters`,
        undefined,
      );
      expect(result).toEqual(monsters);
    });

    it('should throw an error if the response is not ok', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found',
          json: () => Promise.resolve({}),
        }),
      ) as jest.Mock;

      await expect(MonsterServiceExtended.getAllMonsters()).rejects.toThrow(
        'Error 404: Not Found',
      );
    });
  });

  describe('battle', () => {
    it('should send a battle request and return the result', async () => {
      const players: Players = { monster1Id: '1', monster2Id: '2' };
      const battleResult: Battle = {
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

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(battleResult),
        }),
      ) as jest.Mock;

      const result = await MonsterServiceExtended.battle(players);

      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/battle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(players),
      });
      expect(result).toEqual(battleResult);
    });

    it('should throw an error if the response is not ok', async () => {
      const players: Players = { monster1Id: '1', monster2Id: '2' };
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
          json: () => Promise.resolve({}),
        }),
      ) as jest.Mock;

      await expect(MonsterServiceExtended.battle(players)).rejects.toThrow(
        'Error 500: Internal Server Error',
      );
    });
  });
});
