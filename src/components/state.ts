import * as types from './types';

export const appState: types.IAppState = {
  carsPage: 1,
  carBody: {
    name: '',
    color: '',
    id: null,
  },
  winnersPage: 1,
  winnersArr: [],
  sortOptions: types.SortOptions.time,
  orderOptions: types.OrderOptions.ASC,
};

export function clearAppStateCarBody(): void {
  appState.carBody.name = '';
  appState.carBody.color = '';
  appState.carBody.id = null;
}
