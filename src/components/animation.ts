import * as types from './types';
import * as api from './api';
import { updateCarsBtns } from './common';

const START_TRANSLATE = 65;
const COEFF_M_TO_KM = 1000;
const MIN_WINDOW_WIDTH = 500;
const MAX_CAR_WIDTH = 130;
const MIN_CAR_WIDTH = 100;

export async function stopCar(id: number | null, car: HTMLElement) {
  if (id) {    
    returnCarToGarage(car);
    await api.stopEngine(id);
  }
}

export async function driveCar(id: number | null, car: HTMLElement) {
  if (id) {    
    const windowWidth = window.innerWidth;
    const carWidth = windowWidth > MIN_WINDOW_WIDTH ? MAX_CAR_WIDTH : MIN_CAR_WIDTH;
    const startResponce = await api.startEngine(id);
    let fullAnimationTime = (startResponce.distance / COEFF_M_TO_KM) / startResponce.velocity;
    const driveResponce = await api.driveEngine(id);
    car.style.transform = `translateX(${Number(window.innerWidth) - carWidth}px)`;
    car.style.transitionDuration = `${Math.round(fullAnimationTime)}s`;
    console.log(driveResponce);
    if (!driveResponce) stopBrokenCar(id, car);
  }
}

function stopBrokenCar(id: number, car: HTMLElement) {
  const duration = car.style.transform;
  console.log('duration:::', duration);
  car.style.transform = duration;
  car.style.transitionDuration = `2s`;
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
    carsArr.forEach((el, index) => {
      if (el.getAttribute('carID')) {
        driveCar(Number(el.getAttribute('carID')), el as HTMLElement);
        (startBtns[index] as HTMLButtonElement).disabled = true;
        (stopBtns[index] as HTMLButtonElement).disabled = false;
      }
    })

  } else if (type === 'reset') {
    carsArr.forEach((el, index) => {
      if (el.getAttribute('carID')) {
        stopCar(Number(el.getAttribute('carID')), el as HTMLElement);
        (startBtns[index] as HTMLButtonElement).disabled = false;
        (stopBtns[index] as HTMLButtonElement).disabled = true;
      }
    })
  }
}
