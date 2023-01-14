import * as types from './types';
import * as api from './api';

const START_TRANSLATE = 65;

// export async function startCar(id: number | null) {
//   if (id) {
//     const startResponce = await api.startEngine(id);
//     console.log(startResponce.velocity)
//     console.log(startResponce.distance)
//     const driveResponce = await api.driveEngine(id);
//     console.log(driveResponce)
//   }
// }

export async function stopCar(id: number | null, car: HTMLElement, startBtn: HTMLElement, stopBtn: HTMLElement) {
  if (id) {
    updateCarsBtns(startBtn, stopBtn);
    returnCarToGarage(car);
    await api.stopEngine(id);
  }
}

export async function driveCar(id: number | null, car: HTMLElement, startBtn: HTMLElement, stopBtn: HTMLElement) {
  if (id) {
    updateCarsBtns(startBtn, stopBtn);
    const windowWidth = window.innerWidth;
    const carWidth = windowWidth > 500 ? 130 : 100;

    const startResponce = await api.startEngine(id);
    let fullAnimationTime = (startResponce.distance / 1000) / startResponce.velocity;
    car.style.transform = `translateX(${Number(window.innerWidth) - carWidth}px)`;
    car.style.transitionDuration = `${Math.round(fullAnimationTime)}s`;

    const driveResponce = await api.driveEngine(id);
    //if (!driveResponce) stopBrokenCar(id, car);
    console.log(driveResponce);
  }
}

// function stopBrokenCar(id: number, car: HTMLElement) {
//   const duration = car;
//   console.log('duration:::', duration);
//   car.style.transform = `translateX(${duration}px)`;
//   car.style.transitionDuration = `20s`;
// }

function returnCarToGarage(car: HTMLElement) {
  car.style.transform = `translateX(${START_TRANSLATE}px)`;
  car.style.transitionDuration = `${0}s`;
}

function updateCarsBtns(startBtn: HTMLElement, stopBtn: HTMLElement) {
  if ((startBtn as HTMLButtonElement).disabled === true) {
    (startBtn as HTMLButtonElement).disabled = false;
    (stopBtn as HTMLButtonElement).disabled = true;
  } else if ((startBtn as HTMLButtonElement).disabled === false) {
    (startBtn as HTMLButtonElement).disabled = true;
    (stopBtn as HTMLButtonElement).disabled = false;
  }
}

export function startRace() {
  const carsArr = document.querySelectorAll('.car');
  const startBtns = document.querySelectorAll('.start-car-btn');
  const stopBtns = document.querySelectorAll('.stop-car-btn');
  carsArr.forEach((el, index) => {
    if (el.getAttribute('carID')) driveCar(Number(el.getAttribute('carID')), el as HTMLElement, startBtns[index] as HTMLElement, stopBtns[index] as HTMLElement)
  })
}

export function stopRace() {
  const carsArr = document.querySelectorAll('.car');
  const startBtns = document.querySelectorAll('.start-car-btn');
  const stopBtns = document.querySelectorAll('.stop-car-btn');
  carsArr.forEach((el, index) => {
    if (el.getAttribute('carID')) stopCar(Number(el.getAttribute('carID')), el as HTMLElement, startBtns[index] as HTMLElement, stopBtns[index] as HTMLElement)
  })
}
