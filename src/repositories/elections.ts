import { cities, locations, result, stateSummary } from '../../server/tse';
import { ApiError } from '../services/http';
import type { City, Office, Result, State, StateSummary } from '../types/election';

async function read<T>(work: Promise<T>): Promise<T> {
  try {
    return await work;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') throw error;
    throw new ApiError(error instanceof Error ? error.message : 'Não foi possível consultar os dados oficiais.', 503);
  }
}

export const elections = {
  result: (uf = 'br', city: string | null = null, office: Office = '1', _signal?: AbortSignal) => read(result(uf, city, office) as Promise<Result>),
  states: () => read(stateSummary() as Promise<StateSummary[]>),
  locations: () => read(locations() as Promise<{ states: State[]; cities: City[] }>),
  cities: (uf: string, office: Office = '1') => read(cities(uf, office) as Promise<City[]>),
};
