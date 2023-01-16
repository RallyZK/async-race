import * as api from './api';
import * as types from './types';

export const appState: types.IAppState  = {
  carsPage: 1,
  carBody: {
    name: '',
    color: '',
    id: null,
  },  
}

export function clearAppStateCarBody(): void {
  appState.carBody.name = '';
  appState.carBody.color = '';
  appState.carBody.id = null;
}

// export default {
  
//   //cars,
//   //carsCount,
//   winnersPage: 1,
//   // winners,
//   // winnersCount,
//   animation: {},
//   view: 'garage',
//   sortBy: null,
//   sortOrder: null,
// };
