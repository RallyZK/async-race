import * as types from './types';
import * as api from './api';
import { createElements, getRandomColorRGB, renderCarOptions, getInputValue, getCarImage, shuffle, carsNamesArr } from './common';
import { appState, clearAppStateCarBody } from './state';

// , cars, carsCount, animation, view

const CARS_PER_PAGE = 7;

const main = document.querySelector('main');
const toGarageBtn: HTMLButtonElement | null = document.querySelector('.to-garage-btn');
if (toGarageBtn) toGarageBtn.addEventListener('click', getGaragePage);

let createCarSelect: HTMLElement, createCarColor: HTMLElement, createCarBtn: HTMLElement;
let changeCarInputName: HTMLElement, changeCarColor: HTMLElement, changeCarBtn: HTMLElement;
let raceBtn: HTMLElement, reasetBtn: HTMLElement, generateCarsBtn: HTMLElement;
let prevPageBtn: HTMLElement, nextPageBtn: HTMLElement;

function getGarageControlSection() {
  if (main) {
    const conrtollersContainer = createElements('conrtollers-container', 'div', main, '');
    const conrtollersContainerRow1 = createElements('conrtollers-container__row', 'div', conrtollersContainer, '');
    createCarSelect = createElements('create-car-select', 'select', conrtollersContainerRow1, '');
    renderCarOptions(createCarSelect);
    if (createCarSelect) createCarSelect.addEventListener('change', () => appState.carBody.name = getInputValue(createCarSelect));
    createCarColor = createElements('create-car-color', 'input', conrtollersContainerRow1, '');
    (createCarColor as HTMLInputElement).type = 'color';
    if (createCarColor) createCarColor.addEventListener('change', () => appState.carBody.color = getInputValue(createCarColor));
    createCarBtn = createElements('create-car-btn', 'button', conrtollersContainerRow1, 'Create');
    createCarBtn.addEventListener('click', () => addNewCarToList());

    const conrtollersContainerRow2 = createElements('conrtollers-container__row', 'div', conrtollersContainer, '');
    changeCarInputName = createElements('change-car-input-name', 'input', conrtollersContainerRow2, '');
    (changeCarInputName as HTMLInputElement).type = 'text';
    if (changeCarInputName) changeCarInputName.addEventListener('change', () => appState.carBody.name = getInputValue(changeCarInputName));
    changeCarColor = createElements('change-car-color', 'input', conrtollersContainerRow2, '');
    (changeCarColor as HTMLInputElement).type = 'color';
    if (changeCarColor) changeCarColor.addEventListener('change', () => appState.carBody.color = getInputValue(changeCarColor));
    changeCarBtn = createElements('change-car-btn', 'button', conrtollersContainerRow2, 'Change');
    (changeCarBtn as HTMLButtonElement).disabled = true;
    if (changeCarBtn) changeCarBtn.addEventListener('click', () => changeCarSettings())

    const conrtollersContainerRow3 = createElements('conrtollers-container__row', 'div', conrtollersContainer, '');
    raceBtn = createElements('race-btn', 'button', conrtollersContainerRow3, 'Race');
    reasetBtn = createElements('reaset-btn', 'button', conrtollersContainerRow3, 'Reset');
    generateCarsBtn = createElements('generate-cars-btn', 'button', conrtollersContainerRow3, 'Generate cars');
    if (generateCarsBtn) generateCarsBtn.addEventListener('click', () => renderRandomCars());
    createElements('cars-section-container', 'div', main, '');
  }
}

async function getCarsSection(page: number) {
  const carsSectionContainer: HTMLElement | null = document.querySelector('.cars-section-container');
  if (carsSectionContainer) {
    carsSectionContainer.innerHTML = '';
    const { items: cars, count: carsCount } = await api.getCars(page);
    createElements('', 'h2', carsSectionContainer, `Garage: ${carsCount} cars`);
    createElements('', 'h3', carsSectionContainer, `Page #${page} / ${Math.ceil(carsCount / CARS_PER_PAGE)}`);
    const carsListContainer = createElements('cars-list-container', 'div', carsSectionContainer, '');
    for (let i = 0; i < cars.length; i++) {
      const roadContainer = createElements('road-container', 'div', carsListContainer, '');

      const firstButtonsRow = createElements('buttons-row', 'div', roadContainer, '');
      const selectButton = createElements('car-btn select-car-btn', 'button', firstButtonsRow, 'Select');
      //selectButton.setAttribute('id', `${cars[i].id}`);
      if (selectButton) selectButton.addEventListener('click', () => selectCar({ name: cars[i].name, color: cars[i].color, id: cars[i].id }))
      const removeButton = createElements('car-btn remove-car-btn', 'button', firstButtonsRow, 'Remove');
      //removeButton.setAttribute('id', `${cars[i].id}`);
      if (removeButton) removeButton.addEventListener('click', () => removeCarFromList(cars[i].id));
      createElements('car-name', 'h4', firstButtonsRow, `${cars[i].name}`);

      const secondButtonsRow = createElements('buttons-row', 'div', roadContainer, '');
      const startButton = createElements('car-btn start-car-btn', 'button', secondButtonsRow, 'Start');
      //startButton.setAttribute('id', `${cars[i].id}`);
      const stopButton = createElements('car-btn stop-car-btn', 'button', secondButtonsRow, 'Stop');
      //stopButton.setAttribute('id', `${cars[i].id}`);
      (stopButton as HTMLButtonElement).disabled = true;

      const carContainer = createElements('road', 'div', roadContainer, '');
      //const color: string = getRandomColorRGB();
      carContainer.innerHTML = getCarImage(`${cars[i].color}`)
    }
    const bottomBtnsContainer = createElements('bottom-btns-container', 'div', carsSectionContainer, '');
    prevPageBtn = createElements('prev-page-btn', 'button', bottomBtnsContainer, '&#9666; Prev');
    (prevPageBtn as HTMLButtonElement).addEventListener('click', () => getPrevGaragePage());
    nextPageBtn = createElements('next-page-btn', 'button', bottomBtnsContainer, 'Next &#9656;');
    (nextPageBtn as HTMLButtonElement).addEventListener('click', () => getNextGaragePage(carsCount));
  }
}

function getGaragePage(): void {
  if (main) main.innerHTML = '';
  getGarageControlSection();
  getCarsSection(1);
}
getGaragePage();


// добавление машин

async function addNewCarToList(): Promise<void> {
  console.log(appState.carBody)
  await api.createCar({ name: appState.carBody.name, color: appState.carBody.color });
  getCarsSection(appState.carsPage);
  clearAppStateCarBody();
  clearCreateCarInputs();
}

function clearCreateCarInputs(): void {
  (createCarSelect as HTMLInputElement).value = '0';
  (createCarColor as HTMLInputElement).value = '#000000';
}

// изменение машин

async function changeCarSettings(): Promise<void> {
  console.log(appState.carBody);
  if (appState.carBody.id !== null) {
    await api.updateCar(appState.carBody.id, { name: appState.carBody.name, color: appState.carBody.color });
    getCarsSection(appState.carsPage);
    clearAppStateCarBody();
    clearChangeCarInputs();
  }
}

function selectCar(selectedCarBody: types.ICarsItem): void {
  console.log(appState.carBody);
  appState.carBody.name = selectedCarBody.name;
  appState.carBody.color = selectedCarBody.color;
  appState.carBody.id = selectedCarBody.id;
  (changeCarInputName as HTMLInputElement).value = selectedCarBody.name;
  (changeCarColor as HTMLInputElement).value = selectedCarBody.color;
  (changeCarBtn as HTMLButtonElement).disabled = false;
}

function clearChangeCarInputs(): void {
  (changeCarInputName as HTMLInputElement).value = '';
  (changeCarColor as HTMLInputElement).value = '#000000';
  (changeCarBtn as HTMLButtonElement).disabled = true;
}

// удаление машин

function removeCarFromList(id: number | null): void {
  if (id !== null) {
    api.deleteCar(id);
    getCarsSection(appState.carsPage);
  }
}

// генерация 100 случайных машин

async function renderRandomCars(): Promise<void> {
  for (let i = 0; i < 100; i++) {
    const randomNameCar = shuffle(carsNamesArr)[0];
    const randomColor = getRandomColorRGB();
    await api.createCar({ name: randomNameCar, color: randomColor });
  }
  getCarsSection(appState.carsPage);
}

// кнопки переключения страниц

function getNextGaragePage(carsCount: number): void {  
  if (appState.carsPage < Math.ceil(carsCount / CARS_PER_PAGE)) {
  appState.carsPage = appState.carsPage + 1;
  getCarsSection(appState.carsPage);
  }
}

function getPrevGaragePage(): void {  
  if (appState.carsPage > 1) {
    appState.carsPage = appState.carsPage - 1;
    getCarsSection(appState.carsPage);
  }
}

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
