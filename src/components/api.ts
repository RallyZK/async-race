import * as types from './types';

const BASE_URL = 'http://127.0.0.1:3000';
const garage = `${BASE_URL}/garage`;
const engine = `${BASE_URL}/engine`;
const winners = `${BASE_URL}/winners`;

export async function getCars(page: number, limit: number = 7): Promise<types.IGarsInGarage> {
  const responce = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  const carItems: types.ICarsItem[] = await responce.json();
  const carsCount: number = await Number(responce.headers.get('X-Total-Count'));

  console.log('carItems:::', carItems);
  console.log('carsCount:::', carsCount);
  return {
    items: carItems,
    count: carsCount,
  };
}

export async function getCar(id: number): Promise<types.ICarsItem> {
  const car = (await fetch(`${garage}/${id}`)).json();  
  return car;
}

export async function createCar(body: types.ICarToCreate): Promise<types.ICarsItem> {
  const newCar = (await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  })).json();  
  return newCar;
}

export async function deleteCar(id: number) {
  const deletedCar = (await fetch(`${garage}/${id}`, {
    method: 'DELETE',
  })).json();
  return deletedCar;
}

export async function updateCar(id: number, body: types.ICarToCreate) {
  const updatedCar = (await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    }
  }))
}
