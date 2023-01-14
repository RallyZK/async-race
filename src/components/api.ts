import * as types from './types';

const BASE_URL = 'http://127.0.0.1:3000';
const garage = `${BASE_URL}/garage`;
const engine = `${BASE_URL}/engine`;
const winners = `${BASE_URL}/winners`;

// гараж

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
  return (await fetch(`${garage}/${id}`)).json();
}

export async function createCar(body: types.ICarToCreate): Promise<types.ICarsItem> {
  return (await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  })).json();
}

export async function deleteCar(id: number) {
  return (await fetch(`${garage}/${id}`, {
    method: 'DELETE',
  })).json();
}

export async function updateCar(id: number, body: types.ICarToCreate) {
  return (await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    }
  }))
}

// движение

export async function startEngine(id: number) {
  return (await fetch(`${engine}/?id=${id}&status=started`, {
    method: 'PATCH'
  })).json();
}

export async function stopEngine(id: number) {
  return (await fetch(`${engine}/?id=${id}&status=stopped`, {
    method: 'PATCH'
  })).json();
}

export async function driveEngine(id: number) {
  const responce = await fetch(`${engine}/?id=${id}&status=drive`, {
    method: 'PATCH'
  }).catch();
  if (responce.status === 200) return true;
  return false;
}
