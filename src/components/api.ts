import * as types from './types';

const BASE_URL = 'http://127.0.0.1:3000';
const garage = `${BASE_URL}/garage`;
const engine = `${BASE_URL}/engine`;
const winners = `${BASE_URL}/winners`;

export const CARS_PER_PAGE = 7;
export const WINNERS_PER_PAGE = 10;

// garage

export async function getCars(page: number, limit: number = CARS_PER_PAGE): Promise<types.IGarsInGarage> {
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

export async function deleteCar(id: number): Promise<{}> {
  return (await fetch(`${garage}/${id}`, {
    method: 'DELETE',
  })).json();
}

export async function updateCar(id: number, body: types.ICarToCreate): Promise<types.ICarsItem> {
  return (await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    }
  })).json();
}

// drive

export async function startEngine(id: number): Promise<types.ICarStartedResp> {
  return (await fetch(`${engine}/?id=${id}&status=started`, {
    method: 'PATCH'
  })).json();
}

export async function stopEngine(id: number): Promise<types.ICarStartedResp> {
  return (await fetch(`${engine}/?id=${id}&status=stopped`, {
    method: 'PATCH'
  })).json();
}

export async function driveEngine(id: number): Promise<Boolean> {
  const responce = await fetch(`${engine}/?id=${id}&status=drive`, {
    method: 'PATCH'
  }).catch();
  if (responce.status === 200) return true;
  return false;
}

// winners

export async function getWinners(page: number, limit: number = WINNERS_PER_PAGE, sort: string = types.SortOptions.time, order: string = types.OrderOptions.ASC): Promise<types.IAllWinners> {
  const responce = await fetch(`${winners}/?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  const allWinners: types.IWinner[] = await responce.json();
  const winnersCount: number = await Number(responce.headers.get('X-Total-Count'));

  console.log('allWinners:::', allWinners);
  console.log('winnersCount:::', winnersCount);
  return {
    items: allWinners,
    count: winnersCount,
  };
}

export async function getWinner(id: number): Promise<types.IWinner>  {
  const responce = (await fetch(`${winners}/${id}`)).json();  
  return responce
}

export async function createWinner(body: types.IWinner) {
  const responce = (await fetch(winners, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    }
  })); 
  console.log(responce.status)
  return responce.status
}

export async function updateWinner(id: number, body: types.IWinnerToCreate) {
  const responce = (await fetch(`${winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    }
  }));
  console.log(responce.status);
  return responce;
}

export async function deleteWinner(id: number) {
  return await fetch(`${winners}/${id}`, {
    method: 'DELETE'
  });
}


const testBtn = document.querySelector('.test-btn');
//if (testBtn) testBtn.addEventListener('click', async () => console.log(await getWinner(7)));
//if (testBtn) testBtn.addEventListener('click', () => createWinner({id: 50, wins: 1, time: 2.5}));
//if (testBtn) testBtn.addEventListener('click', () => updateWinner(2, {wins: 40, time: 2.5}));
if (testBtn) testBtn.addEventListener('click', () => console.log(deleteWinner(5)));