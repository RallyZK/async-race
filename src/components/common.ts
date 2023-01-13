import * as types from './types';

export function createElements(className: string, tag: string, parentclassName: HTMLElement, inner: string): HTMLElement {
  const el: HTMLElement = document.createElement(tag);
  if (className) el.className = className;
  if (inner) el.innerHTML = inner;
  parentclassName.appendChild(el);
  return el;
}

function getRandomNumber(frm: number, to: number) {
  return ~~(Math.random() * (to - frm)) + frm;
}

export function getRandomColorRGB() {
  return `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)})`
}

export function shuffle(array: string[]): string[] {
  return array.sort(() => Math.random() - 0.5);
}

export const carsNamesArr = ['Audi', 'Acura', 'Alfa Romeo', 'Aston Martin', 'Bentley', 'Byd', 'BMW', 'Brilliance', 'Buick', 'Bugatti', 'Cadillac', 'Changan', 'Chevrolet', 'Chery', 'Chrysler', 'Citroen', 'Daewoo', 'Dacia', 'Daihatsu', 'Dodge', 'Faw', 'Ferrari', 'Fiat', 'Ford', 'Geely', 'Gmc', 'Great Wall', 'Honda', 'Hummer', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Lamborghini', 'Land Rover', 'Lancia', 'Lexus', 'Lifan', 'Lincoln', 'Lotus', 'Marussia', 'Maybach', 'Mazda', 'Mercedes', 'Maserati', 'Mini', 'Mclaren', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot', 'Porsche', 'Renault', 'Saab', 'Seat', 'Skoda', 'Subaru', 'Suzuki', 'Toyota', 'Pontiac', 'Rolls-Royce', 'Smart', 'Ssangyong', 'Tesla', 'Volvo', 'Volkswagen', 'Haval', 'Rover', 'Datsun', 'Gac', 'Genesis', 'Exeed', 'Ravon', 'Polestar'];

export function renderCarOptions(parentNode: HTMLElement) {
  const firtOption = createElements('', 'option', parentNode, 'Select car');
  (firtOption as HTMLSelectElement).value = '0';
  return carsNamesArr
    .sort(() => Math.random() - 0.5)
    .forEach(el => {
      const option = createElements('', 'option', parentNode, el);
      (option as HTMLOptionElement).value = el;
    });
}

export function getInputValue(input: HTMLElement) {
  return (input as HTMLInputElement).value
}

export function getCarImage(color: string): string {
  const carTypes = {
    // обычшая машинка:
    type1: `
        <svg class="car" fill="${color}" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 1280 517"><path d="M468.7 49c-82.8 3.7-114 9-168.7 28.7-40.4 14.6-70.7 27.1-107.3 44.2-12 5.6-26.8 12.1-33 14.5C124 150.2 74.9 158.6 34 157.8l-17.5-.3-.6 4.5c-.3 2.5-1.7 6.7-3 9.5-3.3 7.2-3.1 17 .9 36 3 14.6 3.1 16.1 4.1 53.5 1.3 49.1 3.5 68.3 9.7 86.8 7 20.9 20 33.2 41.6 39.2 10.2 2.8 28.2 4.8 51.5 5.6 19.1.7 20.2.6 27.6-1.7l7.8-2.4-.5-3.5c-1.5-9.3-1.8-29.2-.6-37.1 6.7-46.2 43.7-83.2 89.9-89.9 12.4-1.9 31.3-.8 43.1 2.5 44.5 12.1 76.3 51.3 78.7 97 1.1 20.7-2.8 37.4-13.5 58.7-.2.5 142.7.8 317.6.8h318l-3.4-6.8c-9.5-18.9-13.2-41.3-10.1-61.7 3.5-22.1 12.4-40.7 27.3-56.4 37-39.3 96.3-44.2 139.6-11.6 20.6 15.5 34.5 38.1 39.4 64.2 1.2 6.6 1.5 12.2 1.1 22.8-.6 16.3-2.6 24.9-9.2 39.9-4.2 9.4-4.3 10-2.9 12.8.8 1.6 2.9 3.8 4.7 4.8 3 1.9 5.3 2 44.2 2 37 0 41.3-.2 44.5-1.8 2.5-1.2 3.6-2.5 3.8-4.4.2-1.6-1.3-10.1-3.4-19-2.6-11.8-3.8-19.5-4.1-27.8-.5-11.3-.4-11.9 4.6-31.1 5-19.4 5.1-19.9 5.1-34.7 0-16.5-1.3-28.4-3.7-34.5-3.7-9.2-25.7-23.2-58.8-37.4-58.3-25.1-98.1-33.3-232-47.8-23.1-2.5-43.3-5-45-5.5-3.9-1.1-10.5-1.8-30.5-3.1-18.8-1.2-28.5-2.9-38.5-6.8-4.4-1.7-18-10-36.5-22.3-47.5-31.4-102.2-65.2-116.9-72.1-11.4-5.4-39.7-14.8-59.1-19.6-17.1-4.3-38.3-7.2-68-9.1-22-1.4-88.8-2-112.3-1zm39.2 34.3c8.7 1.9 10.1 3.9 13.7 18.9l.6 2.8h-48.9c-26.9 0-70.8-.3-97.4-.7l-48.4-.7 9-2.8c29-9.2 65.5-15.4 113-19.2 11.3-.9 52.1.3 58.4 1.7zm72.6 2.2c37.3 3.5 69.6 8.3 85 12.5 11.9 3.3 36.3 13.5 35.2 14.7-.4.4-129.8-15.2-134.3-16.2-1.4-.3-2.5-2-3.7-5.8-.9-3-1.7-5.7-1.7-6 0-1 1.3-.9 19.5.8zm628 180.6c22.2 3.3 42.3 8.5 45.8 11.8 4.5 4.3 3.8 18.1-1.3 28.1-2 4-2.3 4.1-5.8 3.6-2-.3-13.1-1.3-24.7-2.2l-21-1.7-12.7-12.1c-7.1-6.6-12.8-12.6-12.8-13.2 0-.7-3.2-4.2-7.1-7.7l-7.2-6.6 3.4-.5c9.9-1.7 30.4-1.4 43.4.5z"/><path d="M239 262.9c-40.2 8.7-70.9 39.8-79.2 80.1-1.6 7.8-1.9 12.1-1.5 24 .6 17.7 2.6 26.1 10.2 41.5 13.1 26.8 36.6 46.1 66 54.2 8.9 2.5 11.7 2.8 25.5 2.7 12.7 0 17.1-.4 24.4-2.2 37.3-9.4 66-37.8 75.7-75 2.6-10 3.5-28.4 2-39.3-5-33.8-25.9-62.5-56.6-77.4-15.8-7.7-23.7-9.6-42.5-10.1-12.5-.3-17.2 0-24 1.5zm38.3 24.7c11.7 2.5 26.1 10.1 34.7 18.2l7.4 6.8-29 19.8-28.9 19.8-7-7.5c-3.8-4.1-14.7-15.5-24.2-25.4l-17.2-17.9 6.7-4.1c9.2-5.5 16.5-8.3 27.7-10.7 5.2-1 23.2-.5 29.8 1zm-46.8 47.3c18.1 26.4 18.7 27.4 16.9 29.1-1.1.9-12.4 11.8-25.3 24l-23.4 22.3-2-2.4c-3.6-4.3-10.5-20.2-12.2-28.2-2.7-12.3-1.8-29.6 2.2-40.9 3.5-10.1 10.1-21 17.2-28.8 4.4-4.7 5.3-5.2 6.5-4 .8.8 9.8 13.8 20.1 28.9zm97.3-9.8c8.7 15.1 12.2 35 9.2 51.5-2.7 15-11.3 31.4-21.3 41.2l-4.4 4.4-5.5-7.9c-3-4.3-11.9-17.2-19.8-28.7l-14.2-20.8 5.3-5.4c16.2-16 44.5-42.3 45.4-42.1.6.2 2.9 3.7 5.3 7.8zm-44.7 74.5c12.9 13.6 23.5 25 23.7 25.4.4 1.1-10.6 7.6-17.5 10.5-28.2 11.4-62.9 4.2-83.8-17.5-3.3-3.4-3.7-4.3-2.5-5 .8-.5 13.7-9.2 28.5-19.4 14.9-10.2 27.3-18.6 27.6-18.6.3 0 11.1 11.1 24 24.6zM1062.4 264.5c-23 4.1-41 13.8-56.6 30.4-32.4 34.5-36.4 85.6-9.8 125.2 5.5 8.1 17.7 20.3 25.5 25.6 35 23.6 78.4 23.9 112.9.9 15.3-10.2 27.1-23.9 35.1-40.8 7-14.8 9-24.3 9-42.8 0-17-1.6-25.4-7.5-39.2-17.8-41.7-64.6-67.3-108.6-59.3zm35.1 23.5c20.9 5.3 38.7 19.1 49.4 38.2l3.2 5.6-3.3 1.1c-1.8.5-16.3 5.1-32.3 10.2-15.9 5-29.5 9.4-30.2 9.6-1.1.5-32.9-61.4-32-62.3.2-.2 3.7-1.3 7.8-2.3 10.3-2.8 26.9-2.8 37.4-.1zm-39.7 37.6c5.7 18 10 33 9.5 33.5-2.2 2.2-60.6 31-61.3 30.3-1.9-2-4.2-12.6-4.7-21.9-1.3-23.2 7.7-45.3 25-61.1 6-5.5 17.9-13.4 20.2-13.4.5 0 5.6 14.7 11.3 32.6zm98.2 29.3c2 15-1.9 33.4-10.2 47.6-5.5 9.3-19.3 23.1-28.1 28-3.7 2-7 3.5-7.3 3.2-1.2-1.2-21-65.3-20.4-66 .4-.5 14.4-7.7 31.1-16.2l30.4-15.4 1.7 5.4c.9 3 2.2 9 2.8 13.4zm-65.7 50.1 15.7 31-2.7 1.1c-5.7 2.2-16.1 3.9-24.1 3.9-20.2 0-38.4-7.2-53.8-21.3-5.7-5.2-17.7-22.2-17.1-24.1.3-.9 62.2-21.4 65.2-21.5.6 0 8.1 13.9 16.8 30.9z"/></svg>
        `,
    // маленькая машинка
    type2: `
        <svg class="car" fill="${color}" xmlns="http://www.w3.org/2000/svg" width="1706.667" height="853.333" version="1.0" viewBox="0 0 1280 640"><path d="M356.5 106.4c-10.6 3-10.1 2.6-10.8 11.1-.4 4.2-.9 8-1.2 8.5-.6 1-24.6 10.5-59 23.4-44.8 16.7-105.2 41.5-117.3 48.3-7.8 4.3-19.3 9.1-25 10.4-2.3.5-9.8 1.4-16.5 1.9-6.7.6-16.7 1.9-22.2 3-15.4 3.1-34 4.9-56.3 5.7l-20.3.6-4.3 6.6c-5.9 9.1-6 9.5-2.6 13 3.7 3.7 3.8 6.5.3 15-2.5 6.2-2.7 7.8-3.1 25.6l-.4 19-3.8 3.2C4.9 309.5.7 322.6.6 343.5c0 19.4 1.1 39.6 2.6 48.2 1.3 7.1 1.4 7.4 7.2 12.2 6.9 5.8 13 12.9 15.8 18.4 6.4 12.6 53.4 21.1 138.4 25l9.2.4-.6-11.9c-.6-14.2.8-25.6 4.9-38.3 11.2-35.2 39.4-62.2 75.6-72.2 9-2.6 11.2-2.8 27.8-2.8 16.5 0 18.8.2 27.8 2.7 20.1 5.6 36.1 15.2 50.4 30.2 14 14.5 22.2 29.3 27.4 49.2 2.1 7.9 2.4 10.9 2.3 27.9-.1 12.7-.6 21.4-1.6 26.3l-1.5 7.3 300.6-.7c165.3-.4 300.7-.8 300.9-.9.1-.1-.8-3.7-2-8.1-1.9-6.7-2.2-10.5-2.2-25.9-.1-16.6.1-18.7 2.7-27.9 11.7-42.1 46.7-73.6 88.5-79.7 11.9-1.7 32.5-.7 43.2 2.1 23.9 6.3 45.3 20.5 60.1 39.9 7 9.2 15.4 26.7 18.5 38.6 2.4 8.8 2.7 11.9 2.7 26 .1 11.6-.4 18.1-1.6 23.4-1 4.1-1.6 7.5-1.5 7.6.2.1 6.2-.2 13.3-.6 26.6-1.6 45.8-4.5 52.5-7.9 4.8-2.4 9.7-8.1 12.7-14.6l2.4-5.2-1.6-15.7c-1.5-15.2-1.5-16.3.4-28.4 6.3-38.8 5-68-3.5-80.2-13.4-19.3-52.6-33.6-142.9-51.9-73.7-14.9-132.2-20.9-203.3-21-22.8 0-22.6 0-34.7-8.5-18.7-13.1-104.5-60.7-147.1-81.5-38.3-18.7-78.8-28.1-143.9-33.2-20.8-1.7-110.6-1.6-140 0-12.1.7-31.4 1.9-43 2.7-30.2 2.2-28.6 2.2-34.1-1-14-8.1-18.7-9.4-26.9-7.1zM545 139.7c.6 3.7 3.8 23.8 7.1 44.6 3.2 20.9 6.6 42.2 7.5 47.4.9 5.2 1.5 9.6 1.3 9.7-1.1.9-169.9-2.9-195.1-4.4-20.6-1.3-41.7-3.6-48.5-5.4-9.8-2.6-19.8-11.9-24.9-23.1-3.5-7.5-3.6-17.2-.5-25.5 1.7-4.5 3-6.1 6.8-8.6 8.3-5.4 13.5-8 25.3-12.7 34.1-13.6 85.8-23 146-26.7 26.9-1.6 27-1.6 51.1-1.8l22.7-.2 1.2 6.7zm63-4.7c26.4 1.8 77.7 11 102.9 18.6 18.6 5.6 44.5 18.8 75.6 38.7 21.1 13.4 27.4 18.1 25 18.5-7.5 1.2-13.3 5-16.2 10.6-1.9 3.5-2.1 13.6-.4 17.9l1.1 2.7-90.7-.2-90.6-.3-5.9-16c-11-30.2-29.8-87.8-29.8-91.6 0-.6 9.5-.2 29 1.1z"/><path d="M263.3 327.5c-22.3 4-41 14.1-56.8 30.6-13.2 13.8-21.3 28.3-26.2 46.7-2.2 8.3-2.6 11.9-2.6 24.7-.1 16.9 1 23.6 6.5 38.2 8.7 23 27.1 43.6 49.3 55.1 8.5 4.4 17.8 7.8 27.1 9.8 10.7 2.3 31.2 2.3 41.9-.1 39.2-8.4 69.9-37.5 80.2-76.1 2.3-8.6 2.6-12 2.7-25.4.1-15.8-.5-19.9-4.6-33-9.8-31-35.5-56.7-66.8-66.9-15-5-35.4-6.4-50.7-3.6zm35 30.1c24.9 5.6 45.7 24.7 54.3 49.9 2.5 7.2 2.8 9.5 2.8 22 .1 15.3-1.5 22.8-7.4 34.5-9.4 18.6-28.3 33.7-48.5 38.6-9.6 2.4-26.8 2.4-36 0-32-8.4-54.4-35.5-56.2-68.1-2-35.9 20.9-67.3 55.8-76.5 9.4-2.4 25.3-2.6 35.2-.4z"/><path d="M260 370.3c-3.6 1.3-8.5 3.6-10.9 5.1l-4.4 2.8 11.6 11.5c8.1 8.2 12 11.4 13.1 11 1.4-.6 1.6-2.9 1.6-16.7 0-18.6.6-17.8-11-13.7zM292 383.9c0 13.9.2 16.2 1.6 16.8 1.1.4 5-2.8 13-10.8l11.5-11.4-2.8-2.2c-3.4-2.8-13.8-7-19.3-7.9l-4-.7v16.2zM228.2 395.2c-2.8 3.6-9.2 19.1-9.2 22.5 0 1 3.4 1.3 16.5 1.3 15.1 0 16.5-.1 16.5-1.8 0-1.5-20.6-23.2-22.1-23.2-.4 0-1.1.6-1.7 1.2zM322.2 404.9c-6.2 5.9-11.2 11.5-11.2 12.4 0 1.5 1.7 1.7 16.5 1.7 13.1 0 16.5-.3 16.5-1.3 0-4-6.9-20.5-9.5-22.7-.7-.6-4.8 2.7-12.3 9.9zM278.1 406.8c-1.2 2.2 1.1 6.2 3.4 6.2.8 0 2.1-1 2.9-2.2 2-2.8.4-5.8-2.9-5.8-1.3 0-2.9.8-3.4 1.8zM274.9 423.9c-3.2 3.3-3.7 6.7-1.4 11 2.9 5.7 10.4 6.4 15.1 1.4 5.3-5.7.9-15.3-7.1-15.3-2.7 0-4.4.8-6.6 2.9zM257 427.5c-2.6 3.2 1.3 8.1 4.8 5.9 2.4-1.6 2.7-4.5.6-6.1-2.3-1.7-3.9-1.6-5.4.2zM300.6 427.6c-2 1.9-2 3.8-.2 5.4 2.3 1.9 6.1.8 6.4-1.8.7-4.4-3.2-6.7-6.2-3.6zM219 442.5c0 2.9 4.1 14 7.2 19.4l3.1 5.3 11.7-11.7c7.1-7.1 11.6-12.3 11.3-13.1-.4-1.1-4-1.4-16.9-1.4-14.1 0-16.4.2-16.4 1.5zM311 442.8c0 .9 5.1 6.8 11.4 13.1l11.4 11.4 3.1-5.4c3-5.1 7.1-16.5 7.1-19.5 0-1.1-3.1-1.4-16.5-1.4-15.1 0-16.5.1-16.5 1.8zM278 449.9c-.7 1.5-.5 2.4.8 4.1 3.2 4 8.5.4 6.2-4.1-1.4-2.5-5.6-2.5-7 0zM256.2 470.3c-6.1 6.2-11.2 11.5-11.2 11.9 0 1.8 20.8 10.8 24.9 10.8.7 0 1.1-5.4 1.1-16.4 0-14-.2-16.5-1.6-17-.9-.3-1.6-.6-1.7-.6-.1 0-5.3 5.1-11.5 11.3zM293.3 459.7c-1.5.6-1.9 33.3-.4 33.3 4.6 0 25.1-8.8 25.1-10.8 0-.9-22.3-23.2-23-23.1-.3 0-1.1.3-1.7.6zM1070 328.1c-39 8.4-69.6 37.6-79.7 75.9-3.1 11.7-4.1 29.2-2.4 41.1 3.3 22.7 15 45.3 31.8 60.9 26.7 25 64.3 34.4 99.3 24.9 11.7-3.2 28.3-11.8 38-19.6 48.7-39.6 51.8-112.8 6.7-156-9.7-9.3-16.6-14-29-19.8-13.7-6.4-23.5-8.6-40.7-9.1-12-.3-16.2 0-24 1.7zm44.5 31.3c23.8 8.1 40.9 25.8 48.6 50.6 3 9.6 3.3 28.9.5 38.8-11 40-51.3 63.7-91.1 53.6-14.9-3.8-31.3-14.7-40.2-26.7-17.6-23.8-20.3-53.3-7.1-79.7 3.4-6.9 6-10.3 13.8-18 7.7-7.8 11.1-10.4 18.1-13.9 12.9-6.5 20.7-8.1 36.4-7.7 10.9.3 14.3.7 21 3z"/><path d="M1070.3 370c-5.4 1.9-15.3 7.1-15.3 8 0 .3 5.1 5.7 11.4 11.9 8 8 11.9 11.2 13 10.8 1.4-.5 1.6-2.9 1.6-16.7v-16l-2.7.1c-1.6 0-5.2.9-8 1.9zM1102 383.9c0 13.9.2 16.2 1.6 16.8 2.2.8 24.7-21.6 23.4-23.2-1.7-2-16.3-8.4-20.7-9.1l-4.3-.7v16.2zM1036.6 397.6c-2.9 4.4-7.6 16.5-7.6 19.4 0 1.9.7 2 16.5 2 12.6 0 16.5-.3 16.5-1.3 0-.7-5.1-6.3-11.4-12.6l-11.4-11.4-2.6 3.9zM1131.3 405.2c-6.1 6.2-10.9 11.9-10.6 12.5.6 1.5 33.3 1.9 33.3.4 0-4.5-8.8-24.1-10.8-24.1-.4 0-5.7 5.1-11.9 11.2zM1088.2 406.2c-1.7 1.7-1.5 3.2.7 5.2 1.6 1.4 2.3 1.5 4.1.6 3.1-1.7 2.4-6.4-1-6.8-1.4-.2-3.1.3-3.8 1zM1084.6 424.1c-6.8 8.1 1.7 19.4 11 14.4 8.9-4.8 5.6-17.5-4.6-17.5-3 0-4.4.6-6.4 3.1zM1067 427.4c-1.9 2.3-.8 6.1 1.8 6.4 4.4.7 6.7-3.2 3.6-6.2-1.9-2-3.8-2-5.4-.2zM1110.6 427.3c-2.1 1.6-1.8 4.5.7 6.1 3.7 2.3 7.7-3.5 4.1-6.1-1-.7-2.1-1.3-2.4-1.3-.3 0-1.4.6-2.4 1.3zM1029 443c0 2.9 4.3 14.1 7.4 19.5l2.8 4.8 11.6-11.6c8.1-8.1 11.3-12 10.9-13.1-.6-1.4-2.9-1.6-16.7-1.6-15.2 0-16 .1-16 2zM1120.7 442.2c-.3.7 4.7 6.6 11.1 13l11.6 11.8 2.7-4.3c2.7-4.4 7.9-17.7 7.9-20.3 0-1.2-2.8-1.4-16.4-1.4-12.2 0-16.6.3-16.9 1.2zM1088.1 449.9c-1.4 2.5-.5 4.8 2 5.6 2.7.9 5.1-1.3 4.7-4.4-.4-3.4-5.1-4.3-6.7-1.2zM1066.2 470.3c-6.1 6.2-11.2 11.5-11.2 11.9 0 2 20.1 10.8 24.7 10.8 1 0 1.3-3.4 1.3-16.4 0-14-.2-16.5-1.6-17-.9-.3-1.6-.6-1.7-.6-.1 0-5.3 5.1-11.5 11.3zM1103.3 459.7c-1 .3-1.3 4.7-1.3 16.9 0 9 .4 16.4.8 16.4 3.6 0 18.6-6.1 23.9-9.8 1.6-1-21.6-24.2-23.4-23.5z"/></svg>
        `,
    // машинка с большими окнами
    type3: `
         <svg class="car" fill="${color}" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 167.83 55.332"><path fill-rule="evenodd" d="M2.01 28.78c-.09-8.41.63-14.12 2.92-14.62l11.85-1.54C25.16 8.75 33.89 3.94 41.55 2 47.43.83 53.65.12 60.32 0c13.43.22 28.36-.7 37.85 2.47 9.04 4.17 17.95 8.62 26.46 13.84 11.48.79 34.91 3.98 38.32 7.7 1.69 2.28 3.05 4.73 3.69 7.54 1.49.61 1.38 2.82.77 5.53l-.16 5.54-5.69 2.31-11.23 1.39-2.92.77c-4.24 9.94-19.98 8.71-24.31-.47l-3.54.62-63.09-.62-.77 1.08-4.92-.15c-3.3 10.15-22.17 11.08-25.08-1.39h-2.46l-7.39-1.07-11.23-1.54C1.56 41.73.28 40.36 0 39.24l.77-1.08-.61-6.15c.41-2.09.79-2.76 1.85-3.23zM70.17 2.41c-6.77.01-13.39.26-19.34 1.57l1.39 11.78 20.9.72c.86-.18 1.76-.32 1.59-1.79L72.53 2.41c-.79-.01-1.57 0-2.36 0zm-20.34 1.8c-4.01.97-7.7 2.47-10.9 4.74-1.27.85-1.73 1.85-1.68 2.97.59 2.54 2.09 3.57 4.26 3.47l9.71.33-1.39-11.51zm27.26-1.7 4.46 12.68c.56.92 1.38 1.61 2.88 1.69l21.7.89c-3.09-2.11-.55-6 2.58-5.15-5.87-4.89-12.24-7.99-19.13-9.22-4.05-.65-8.26-.79-12.49-.89zM5.21 15.09c-1.78.64-2.21 5.18-2.29 10.75l5.83-.05c.22-1.95.26-3.9.02-5.85-.57-3.41-2.17-3.83-3.56-4.85zm38.65 5.22h5.51c.43 0 .79.36.79.79 0 .44-.36.79-.79.79h-5.51c-.44 0-.79-.35-.79-.79 0-.43.35-.79.79-.79zm38 .91h5.51c.44 0 .79.35.79.79s-.35.79-.79.79h-5.51c-.44 0-.79-.35-.79-.79s.35-.79.79-.79zM47.61 42.44c0 5.04-4.09 9.13-9.13 9.13s-9.13-4.09-9.13-9.13 4.09-9.13 9.13-9.13 9.13 4.09 9.13 9.13zm97.44-1.16c0 5.04-4.09 9.13-9.13 9.13s-9.13-4.09-9.13-9.13 4.09-9.13 9.13-9.13 9.13 4.09 9.13 9.13zm7.63-11.03 11.79.08c-.91-1.96-2.08-3.7-3.91-5.12l-4.56.35c-.84.13-1.19.5-1.5.89l-1.82 3.8z"/></svg>
         `,
  };
  return carTypes.type1;
}



