export interface ICarsItem {
  name: string;
  color: string;
  id: number | null;
}

export interface IGarsInGarage {
  items: ICarsItem[];
  count: number;
}

export interface ICarToCreate {
  name: string,
  color: string
}

export interface ICarStartedResp {
  velocity: number,
  distance: number,
}

export interface IWinner {
    id: number,
    wins: number,
    time: number  
}

export interface IAppState {
  carsPage: number,
  carBody: {
    name: string,
    color: string,
    id: null | number,
  },
  winnersPage: 1,
}

export enum SortOptions {
  id = 'id',
  wins = 'wins',
  time = 'time'
}

export enum OrderOptions {
  ASC = 'ASC',
  DESC = 'DESC'
}

enum carStatus {
  'started',
  'stopped',
  'drive'
}
