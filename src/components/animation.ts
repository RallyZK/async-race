import * as api from './api';
import { appState } from './state';
import { createElements, updateCarsBtns } from './common';

const START_TRANSLATE = 65;
const COEFF_M_TO_KM = 1000;
const MIN_WINDOW_WIDTH = 500;
const MAX_CAR_WIDTH = 150;
const MIN_CAR_WIDTH = 100;
const FLAG_COORDINATES = 110;
let counter = 0;
const CAR_ID = 'carID';

export async function stopCar(id: number | null, car: HTMLElement): Promise<void> {
  if (id) {    
    returnCarToGarage(car);
    api.stopEngine(id);
  }
}

export async function driveCar(id: number | null, car: HTMLElement, mode: 'race' | 'single'): Promise<void> {
  if (id) {
    const carWidth = window.innerWidth > MIN_WINDOW_WIDTH ? MAX_CAR_WIDTH : MIN_CAR_WIDTH;
    const startResponce = await api.startEngine(id);
    const fullAnimationTime = startResponce.distance / COEFF_M_TO_KM / startResponce.velocity;
    const distance = Number(window.innerWidth) - carWidth;
    if (mode === 'race') getCarWinner(id, car, distance - FLAG_COORDINATES); // eslint-disable-line no-use-before-define
    car.style.transform = `translateX(${distance}px)`;
    car.style.transitionDuration = `${Math.round(fullAnimationTime)}s`;
    const driveResponce = await api.driveEngine(id);
    if (!driveResponce) stopBrokenCar(id, car);
  }
}

function stopBrokenCar(id: number, car: HTMLElement): void {
  const carXCoordinate = car.getBoundingClientRect().x;
  car.style.transform = `translateX(${carXCoordinate}px)`;
  car.style.transitionDuration = '1s';
}

function showWinner(counter: number, name: string): void {
  appState.winnersArr.push(`Winner: ${name}<br>Time: ${(counter).toFixed(2)}s`);
  const body = document.querySelector('body');
  if (body) createElements<'h2', HTMLElement>('winner-message', 'h2', body, `${appState.winnersArr[0]}`);
  counter = 0;
}

function getCarWinner(id: number, car: HTMLElement, distance: number): void {
  counter = 0;
  const finishTime = setInterval(async () => {
    counter += 1;
    if (car.getBoundingClientRect().x >= distance) {
      const { name } = await api.getCar(id);
      if (appState.winnersArr.length === 0) {
        const winTime = (counter / 1000);
        showWinner(winTime, name);
        const responce = await api.createWinner({ id, wins: 1, time: +winTime.toFixed(2) });
        if (responce === 500) {
          const prevWinnerData = await api.getWinner(id);
          const winsCount = prevWinnerData.wins + 1;
          const bestTime = winTime < +prevWinnerData.time ? winTime : prevWinnerData.time;
          await api.updateWinner(id, { wins: winsCount, time: +bestTime.toFixed(2) });
        }
      }
      clearInterval(finishTime);
    }
  }, 1);
  if (appState.winnersArr.length > 0) {
    clearInterval(finishTime);
    counter = 0;
  }
}

function returnCarToGarage(car: HTMLElement): void {
  car.style.transform = `translateX(${START_TRANSLATE}px)`;
  car.style.transitionDuration = `${0}s`;
}

export function controlRace(type: string): void {
  const carsArr: NodeListOf<HTMLDivElement> | null = document.querySelectorAll('.car');
  const startBtns: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll('.start-car-btn');
  const stopBtns: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll('.stop-car-btn');
  const raceBtn: HTMLButtonElement | null = document.querySelector('race-btn');
  const reasetBtn: HTMLButtonElement | null = document.querySelector('reaset-btn');
  if (raceBtn && reasetBtn) updateCarsBtns(raceBtn, reasetBtn);

  if (type === 'race') {
    controlRace('reset');
    carsArr.forEach((el, index) => {
      if (el.getAttribute(CAR_ID)) {
        driveCar(Number(el.getAttribute(CAR_ID)), el, 'race');
        startBtns[index].disabled = true;
        stopBtns[index].disabled = false;
      }
    });
  } else if (type === 'reset') {
    removeWinnerMessage();
    carsArr.forEach((el, index) => {
      if (el.getAttribute(CAR_ID)) {
        stopCar(Number(el.getAttribute(CAR_ID)), el);
        startBtns[index].disabled = false;
        stopBtns[index].disabled = true;
      }
    });
  }
}

export function removeWinnerMessage(): void {
  appState.winnersArr = [];
  const body = document.querySelector('body');
  const winnerText = document.querySelector('.winner-message');
  if (body && winnerText) body.removeChild(winnerText);
}
