import * as types from './types';
import * as api from './api';

const START_TRANSLATE = 65;

export async function stopCar(id: number | null, car: HTMLElement) {
  if (id) {    
    returnCarToGarage(car);
    await api.stopEngine(id);
  }
}

export async function driveCar(id: number | null, car: HTMLElement) {
  if (id) {    
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

export function updateCarsBtns(firstBtn: HTMLElement, secondBtn: HTMLElement) {
  if ((firstBtn as HTMLButtonElement).disabled === true) {
    (firstBtn as HTMLButtonElement).disabled = false;
    (secondBtn as HTMLButtonElement).disabled = true;
  } else if ((firstBtn as HTMLButtonElement).disabled === false) {
    (firstBtn as HTMLButtonElement).disabled = true;
    (secondBtn as HTMLButtonElement).disabled = false;
  }
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
