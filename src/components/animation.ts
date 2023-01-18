import * as api from './api';
import * as types from './types';
import { appState } from './state';
import { createElements, updateCarsBtns } from './common';

const START_TRANSLATE = 65;
const COEFF_M_TO_KM = 1000;
const MIN_WINDOW_WIDTH = 500;
const MAX_CAR_WIDTH = 130;
const MIN_CAR_WIDTH = 100;
const FLAG_COORDINATES = 110;
let counter = 0;

export async function stopCar(id: number | null, car: HTMLElement) {
  if (id) {
    returnCarToGarage(car);
    await api.stopEngine(id);
  }
}

export async function driveCar(id: number | null, car: HTMLElement, mode: 'race' | 'single') {
  if (id) {
    const carWidth = window.innerWidth > MIN_WINDOW_WIDTH ? MAX_CAR_WIDTH : MIN_CAR_WIDTH;
    const startResponce = await api.startEngine(id);
    let fullAnimationTime = (startResponce.distance / COEFF_M_TO_KM) / startResponce.velocity;
    const distance = Number(window.innerWidth) - carWidth;
    if (mode === 'race') getCarWinner(id, car, (distance - FLAG_COORDINATES));
    car.style.transform = `translateX(${distance}px)`;
    car.style.transitionDuration = `${Math.round(fullAnimationTime)}s`;
    const driveResponce = await api.driveEngine(id);
    if (!driveResponce) stopBrokenCar(id, car);
  }
}

function stopBrokenCar(id: number, car: HTMLElement) {
  const carXCoordinate = car.getBoundingClientRect().x;  
  car.style.transform = `translateX(${carXCoordinate}px)`;
  car.style.transitionDuration = `1s`;
}

function showWinner(counter: number, name: string, id: number) {
  appState.winnersArr.push(`Winner: ${name}<br>Time: ${(counter).toFixed(2)}s`);
  const body = document.querySelector('body');
  if (body) createElements('winner-message', 'h2', body, `${appState.winnersArr[0]}`);
  counter = 0;
}

function getCarWinner(id: number, car: HTMLElement, distance: number) {
  counter = 0;
  const finishTime = setInterval(async () => {
    counter += 1;
    if (car.getBoundingClientRect().x >= distance) {
      const name = (await api.getCar(id)).name;
      if (appState.winnersArr.length === 0) {
        const winTime = (counter / 1000);
        showWinner(winTime, name, id)
        const responce = await api.createWinner({id: id, wins: 1, time: +winTime.toFixed(2)});
        //console.log('responce.status:::', responce);
        if (responce === 500) {
          const prevWinnerData = await api.getWinner(id);
          const winsCount = prevWinnerData.wins + 1;
          const bestTime = winTime < +prevWinnerData.time ? winTime : prevWinnerData.time;
          await api.updateWinner(id, {wins: winsCount, time: +bestTime.toFixed(2) });
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

function returnCarToGarage(car: HTMLElement) {
  car.style.transform = `translateX(${START_TRANSLATE}px)`;
  car.style.transitionDuration = `${0}s`;
}

export function controlRace(type: string) {
  const carsArr: NodeListOf<HTMLElement> | null = document.querySelectorAll('.car');
  const startBtns: NodeListOf<HTMLElement> | null = document.querySelectorAll('.start-car-btn');
  const stopBtns: NodeListOf<HTMLElement> | null = document.querySelectorAll('.stop-car-btn');
  const raceBtn: HTMLElement | null = document.querySelector('race-btn');
  const reasetBtn: HTMLElement | null = document.querySelector('reaset-btn');
  if (raceBtn && reasetBtn) updateCarsBtns(raceBtn, reasetBtn);

  if (type === 'race') {
    controlRace('reset');
    carsArr.forEach((el, index) => {
      if (el.getAttribute('carID')) {
        driveCar(Number(el.getAttribute('carID')), el as HTMLElement, 'race');
        (startBtns[index] as HTMLButtonElement).disabled = true;
        (stopBtns[index] as HTMLButtonElement).disabled = false;
      }
    })
  } else if (type === 'reset') {
    removeWinnerMessage();
    carsArr.forEach((el, index) => {
      if (el.getAttribute('carID')) {
        stopCar(Number(el.getAttribute('carID')), el as HTMLElement);
        (startBtns[index] as HTMLButtonElement).disabled = false;
        (stopBtns[index] as HTMLButtonElement).disabled = true;
      }
    });
  }
}

export function removeWinnerMessage() {
  appState.winnersArr = [];
  const body = document.querySelector('body');
  const winnerText = document.querySelector('.winner-message');
  if (body && winnerText) body.removeChild(winnerText);
}

