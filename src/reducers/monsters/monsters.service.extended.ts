import { API_URL } from '../../constants/env';
import { Battle, Players } from '../../models/interfaces/battle.interface';
import { Monster } from '../../models/interfaces/monster.interface';

const fetchData = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

const getAllMonsters = (): Promise<Monster[]> => {
  return fetchData<Monster[]>(`${API_URL}/monsters`);
};

const battle = (players: Players): Promise<Battle> => {
  return fetchData<Battle>(`${API_URL}/battle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(players),
  });
};

export const MonsterServiceExtended = {
  getAllMonsters,
  battle,
};
