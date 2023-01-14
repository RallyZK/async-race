import * as api from './api';

// const { items: cars, count: carsCount } = await api.getCars(1);
// const { items: winners, count: winnerCount } = await api.getWinners({page: 1});

export let carsPage: number = 1;

interface IAppState {
  carsPage: number,
  carBody: {
    name: string,
    color: string,
    id: null | number,
  }, 

}

export const appState:IAppState  = {
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
