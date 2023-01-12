import * as types from './types';
import * as api from './api';
import { createElements, getRandomNumber, renderCarOptions, getInputValue, body } from './common';
import { carsPage } from './state';

// , cars, carsCount, animation, view

const main = document.querySelector('main');
const toGarageBtn: HTMLButtonElement | null = document.querySelector('.to-garage-btn');
if (toGarageBtn) toGarageBtn.addEventListener('click', getGaragePage);

let createCarSelect: HTMLElement, createCarColor: HTMLElement, createCarBtn: HTMLElement;
let changeCarInputName: HTMLElement, changeCarColor: HTMLElement, changeCarBtn: HTMLElement;
let raceBtn: HTMLElement, reasetBtn: HTMLElement, generateCarsBtn: HTMLElement;

function getGarageControlSection() {
  if (main) {
    const conrtollersContainer = createElements('conrtollers-container', 'div', main, '');
    const conrtollersContainerRow1 = createElements('conrtollers-container__row', 'div', conrtollersContainer, '');
    createCarSelect = createElements('create-car-select', 'select', conrtollersContainerRow1, '');
    renderCarOptions(createCarSelect);
    if (createCarSelect) createCarSelect.addEventListener('change', () => body.name = getInputValue(createCarSelect));    
    createCarColor = createElements('create-car-color', 'input', conrtollersContainerRow1, '');
    (createCarColor as HTMLInputElement).type = 'color';
    if (createCarColor) createCarColor.addEventListener('change', () => body.color = getInputValue(createCarColor));
    createCarBtn = createElements('create-car-btn', 'button', conrtollersContainerRow1, 'Create');
    createCarBtn.addEventListener('click', async () => {
      await api.createCar(body);
      getCarsSection(carsPage);
    })
    const conrtollersContainerRow2 = createElements('conrtollers-container__row', 'div', conrtollersContainer, '');
    changeCarInputName = createElements('change-car-input-name', 'input', conrtollersContainerRow2, '');
    (changeCarInputName as HTMLInputElement).type = 'text';
    changeCarColor = createElements('change-car-color', 'input', conrtollersContainerRow2, '');
    (changeCarColor as HTMLInputElement).type = 'color';
    changeCarBtn = createElements('change-car-btn', 'button', conrtollersContainerRow2, 'Change');
    (changeCarBtn as HTMLButtonElement).disabled = true;

    const conrtollersContainerRow3 = createElements('conrtollers-container__row', 'div', conrtollersContainer, '');
    raceBtn = createElements('race-btn', 'button', conrtollersContainerRow3, 'Race');
    reasetBtn = createElements('reaset-btn', 'button', conrtollersContainerRow3, 'Reset');
    generateCarsBtn = createElements('generate-cars-btn', 'button', conrtollersContainerRow3, 'Generate cars');
    generateCarsBtn!.addEventListener('click', () => console.log(api.getCars(2, 7)));
    createElements('cars-section-container', 'div', main, '');
  }
}

async function getCarsSection(page: number) {
  const carsSectionContainer: HTMLElement | null= document.querySelector('.cars-section-container');  
  if (carsSectionContainer) {
    carsSectionContainer.innerHTML = '';
    const { items: cars, count: carsCount } = await api.getCars(page);
    createElements('', 'h2', carsSectionContainer, `Garage: ${carsCount} cars`);
    createElements('', 'h3', carsSectionContainer, `Page #${page}`);
    const carsListContainer = createElements('cars-list-container', 'div', carsSectionContainer, '');
    for (let i = 0; i < cars.length; i++) {
      const roadContainer = createElements('road-container', 'div', carsListContainer, '');

      const firstButtonsRow = createElements('buttons-row', 'div', roadContainer, '');
      const selectButton = createElements('car-btn select-car-btn', 'button', firstButtonsRow, 'Select');
      selectButton.setAttribute('id', `${cars[i].id}`);
      const removeButton = createElements('car-btn remove-car-btn', 'button', firstButtonsRow, 'Remove');
      removeButton.setAttribute('id', `${cars[i].id}`);
      createElements('car-name', 'h4', firstButtonsRow, `${cars[i].name}`);

      const secondButtonsRow = createElements('buttons-row', 'div', roadContainer, '');
      const startButton = createElements('car-btn start-car-btn', 'button', secondButtonsRow, 'Start');
      startButton.setAttribute('id', `${cars[i].id}`);
      const stopButton = createElements('car-btn stop-car-btn', 'button', secondButtonsRow, 'Stop');
      stopButton.setAttribute('id', `${cars[i].id}`);
      (stopButton as HTMLButtonElement).disabled = true;

      const carContainer = createElements('road', 'div', roadContainer, '');
      const color: string = `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)})`;
      carContainer.innerHTML = `
      <svg class="car" fill="${cars[i].color}" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 1280 517"><path d="M468.7 49c-82.8 3.7-114 9-168.7 28.7-40.4 14.6-70.7 27.1-107.3 44.2-12 5.6-26.8 12.1-33 14.5C124 150.2 74.9 158.6 34 157.8l-17.5-.3-.6 4.5c-.3 2.5-1.7 6.7-3 9.5-3.3 7.2-3.1 17 .9 36 3 14.6 3.1 16.1 4.1 53.5 1.3 49.1 3.5 68.3 9.7 86.8 7 20.9 20 33.2 41.6 39.2 10.2 2.8 28.2 4.8 51.5 5.6 19.1.7 20.2.6 27.6-1.7l7.8-2.4-.5-3.5c-1.5-9.3-1.8-29.2-.6-37.1 6.7-46.2 43.7-83.2 89.9-89.9 12.4-1.9 31.3-.8 43.1 2.5 44.5 12.1 76.3 51.3 78.7 97 1.1 20.7-2.8 37.4-13.5 58.7-.2.5 142.7.8 317.6.8h318l-3.4-6.8c-9.5-18.9-13.2-41.3-10.1-61.7 3.5-22.1 12.4-40.7 27.3-56.4 37-39.3 96.3-44.2 139.6-11.6 20.6 15.5 34.5 38.1 39.4 64.2 1.2 6.6 1.5 12.2 1.1 22.8-.6 16.3-2.6 24.9-9.2 39.9-4.2 9.4-4.3 10-2.9 12.8.8 1.6 2.9 3.8 4.7 4.8 3 1.9 5.3 2 44.2 2 37 0 41.3-.2 44.5-1.8 2.5-1.2 3.6-2.5 3.8-4.4.2-1.6-1.3-10.1-3.4-19-2.6-11.8-3.8-19.5-4.1-27.8-.5-11.3-.4-11.9 4.6-31.1 5-19.4 5.1-19.9 5.1-34.7 0-16.5-1.3-28.4-3.7-34.5-3.7-9.2-25.7-23.2-58.8-37.4-58.3-25.1-98.1-33.3-232-47.8-23.1-2.5-43.3-5-45-5.5-3.9-1.1-10.5-1.8-30.5-3.1-18.8-1.2-28.5-2.9-38.5-6.8-4.4-1.7-18-10-36.5-22.3-47.5-31.4-102.2-65.2-116.9-72.1-11.4-5.4-39.7-14.8-59.1-19.6-17.1-4.3-38.3-7.2-68-9.1-22-1.4-88.8-2-112.3-1zm39.2 34.3c8.7 1.9 10.1 3.9 13.7 18.9l.6 2.8h-48.9c-26.9 0-70.8-.3-97.4-.7l-48.4-.7 9-2.8c29-9.2 65.5-15.4 113-19.2 11.3-.9 52.1.3 58.4 1.7zm72.6 2.2c37.3 3.5 69.6 8.3 85 12.5 11.9 3.3 36.3 13.5 35.2 14.7-.4.4-129.8-15.2-134.3-16.2-1.4-.3-2.5-2-3.7-5.8-.9-3-1.7-5.7-1.7-6 0-1 1.3-.9 19.5.8zm628 180.6c22.2 3.3 42.3 8.5 45.8 11.8 4.5 4.3 3.8 18.1-1.3 28.1-2 4-2.3 4.1-5.8 3.6-2-.3-13.1-1.3-24.7-2.2l-21-1.7-12.7-12.1c-7.1-6.6-12.8-12.6-12.8-13.2 0-.7-3.2-4.2-7.1-7.7l-7.2-6.6 3.4-.5c9.9-1.7 30.4-1.4 43.4.5z"/><path d="M239 262.9c-40.2 8.7-70.9 39.8-79.2 80.1-1.6 7.8-1.9 12.1-1.5 24 .6 17.7 2.6 26.1 10.2 41.5 13.1 26.8 36.6 46.1 66 54.2 8.9 2.5 11.7 2.8 25.5 2.7 12.7 0 17.1-.4 24.4-2.2 37.3-9.4 66-37.8 75.7-75 2.6-10 3.5-28.4 2-39.3-5-33.8-25.9-62.5-56.6-77.4-15.8-7.7-23.7-9.6-42.5-10.1-12.5-.3-17.2 0-24 1.5zm38.3 24.7c11.7 2.5 26.1 10.1 34.7 18.2l7.4 6.8-29 19.8-28.9 19.8-7-7.5c-3.8-4.1-14.7-15.5-24.2-25.4l-17.2-17.9 6.7-4.1c9.2-5.5 16.5-8.3 27.7-10.7 5.2-1 23.2-.5 29.8 1zm-46.8 47.3c18.1 26.4 18.7 27.4 16.9 29.1-1.1.9-12.4 11.8-25.3 24l-23.4 22.3-2-2.4c-3.6-4.3-10.5-20.2-12.2-28.2-2.7-12.3-1.8-29.6 2.2-40.9 3.5-10.1 10.1-21 17.2-28.8 4.4-4.7 5.3-5.2 6.5-4 .8.8 9.8 13.8 20.1 28.9zm97.3-9.8c8.7 15.1 12.2 35 9.2 51.5-2.7 15-11.3 31.4-21.3 41.2l-4.4 4.4-5.5-7.9c-3-4.3-11.9-17.2-19.8-28.7l-14.2-20.8 5.3-5.4c16.2-16 44.5-42.3 45.4-42.1.6.2 2.9 3.7 5.3 7.8zm-44.7 74.5c12.9 13.6 23.5 25 23.7 25.4.4 1.1-10.6 7.6-17.5 10.5-28.2 11.4-62.9 4.2-83.8-17.5-3.3-3.4-3.7-4.3-2.5-5 .8-.5 13.7-9.2 28.5-19.4 14.9-10.2 27.3-18.6 27.6-18.6.3 0 11.1 11.1 24 24.6zM1062.4 264.5c-23 4.1-41 13.8-56.6 30.4-32.4 34.5-36.4 85.6-9.8 125.2 5.5 8.1 17.7 20.3 25.5 25.6 35 23.6 78.4 23.9 112.9.9 15.3-10.2 27.1-23.9 35.1-40.8 7-14.8 9-24.3 9-42.8 0-17-1.6-25.4-7.5-39.2-17.8-41.7-64.6-67.3-108.6-59.3zm35.1 23.5c20.9 5.3 38.7 19.1 49.4 38.2l3.2 5.6-3.3 1.1c-1.8.5-16.3 5.1-32.3 10.2-15.9 5-29.5 9.4-30.2 9.6-1.1.5-32.9-61.4-32-62.3.2-.2 3.7-1.3 7.8-2.3 10.3-2.8 26.9-2.8 37.4-.1zm-39.7 37.6c5.7 18 10 33 9.5 33.5-2.2 2.2-60.6 31-61.3 30.3-1.9-2-4.2-12.6-4.7-21.9-1.3-23.2 7.7-45.3 25-61.1 6-5.5 17.9-13.4 20.2-13.4.5 0 5.6 14.7 11.3 32.6zm98.2 29.3c2 15-1.9 33.4-10.2 47.6-5.5 9.3-19.3 23.1-28.1 28-3.7 2-7 3.5-7.3 3.2-1.2-1.2-21-65.3-20.4-66 .4-.5 14.4-7.7 31.1-16.2l30.4-15.4 1.7 5.4c.9 3 2.2 9 2.8 13.4zm-65.7 50.1 15.7 31-2.7 1.1c-5.7 2.2-16.1 3.9-24.1 3.9-20.2 0-38.4-7.2-53.8-21.3-5.7-5.2-17.7-22.2-17.1-24.1.3-.9 62.2-21.4 65.2-21.5.6 0 8.1 13.9 16.8 30.9z"/></svg>
      `
    }
    const bottomBtnsContainer = createElements('bottom-btns-container', 'div', carsSectionContainer, '');
    createElements('prev-page-btn', 'button', bottomBtnsContainer, '&#9666; Prev');
    createElements('next-page-btn', 'button', bottomBtnsContainer, 'Next &#9656;');
  }
}



function getGaragePage() {
  if (main) main.innerHTML = '';
  getGarageControlSection();
  getCarsSection(1);
}
getGaragePage();

// function getNextPage () {
//   carsPage = carsPage + 1;
//   getCarsSection(carsPage);
// }




// const colorInput = document.querySelector('.car-color-select');

// colorInput.oninput = () => {
//   car.style.fill = `${colorInput.value}`;
// }
// let body = document.querySelector('body');

// function rand(frm, to) {
//   return ~~(Math.random() * (to - frm)) + frm;
// }



// // petItemWidth = document.querySelector('.pets-item').offsetWidth;

// // car.forEach(el => el.addEventListener('click', () => carDrive()))
// const car = document.querySelectorAll('.car');

// function carDrive() {
//   const windowWidth = window.innerWidth;
//   let carWidth;
//   car.forEach(el => {
//     windowWidth > 500 ? carWidth = 110 : carWidth = 80;
//     el.style.transform = `translateX(${Number(window.innerWidth) - carWidth}px)`;
//   })
// }

// document.addEventListener('click', carDrive)


