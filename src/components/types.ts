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

enum carStatus {
  'started',
  'stopped',
  'drive'
}
