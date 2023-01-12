import * as types from './types';

export function createElements(className: string, tag: string, parentclassName: HTMLElement, inner: string): HTMLElement {
  const el: HTMLElement = document.createElement(tag);
  if (className) el.className = className;
  if (inner) el.innerHTML = inner;
  parentclassName.appendChild(el);
  return el;
}

export function getRandomNumber(frm: number, to: number) {
  return ~~(Math.random() * (to - frm)) + frm;
}

// function shuffle(array: string[]): string[] {
//   return array.sort(() => Math.random() - 0.5);
// }

const carsNamesArr = ['Audi', 'Acura', 'Alfa Romeo', 'Aston Martin', 'Bentley', 'Byd', 'BMW', 'Brilliance', 'Buick', 'Bugatti', 'Cadillac', 'Changan', 'Chevrolet', 'Chery', 'Chrysler', 'Citroen', 'Daewoo', 'Dacia', 'Daihatsu', 'Dodge', 'Faw', 'Ferrari', 'Fiat', 'Ford', 'Geely', 'Gmc', 'Great Wall', 'Honda', 'Hummer', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Lamborghini', 'Land Rover', 'Lancia', 'Lexus', 'Lifan', 'Lincoln', 'Lotus', 'Marussia', 'Maybach', 'Mazda', 'Mercedes', 'Maserati', 'Mini', 'Mclaren', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot', 'Porsche', 'Renault', 'Saab', 'Seat', 'Skoda', 'Subaru', 'Suzuki', 'Toyota', 'Pontiac', 'Rolls-Royce', 'Smart', 'Ssangyong', 'Tesla', 'Volvo', 'Volkswagen', 'Haval', 'Rover', 'Datsun', 'Gac', 'Genesis', 'Exeed', 'Ravon', 'Polestar'];

export function renderCarOptions(parentNode: HTMLElement) {
  createElements('', 'option', parentNode, 'Select car')
  return carsNamesArr
    .sort(() => Math.random() - 0.5)
    .forEach(el => {
      const option = createElements('', 'option', parentNode, el);
      (option as HTMLOptionElement).value = el;
    });
}


export const body: types.ICarToCreate = {
  name: '',
  color: ''
}

export function getInputValue(input: HTMLElement) {  
  console.log(body)
  return (input as HTMLInputElement).value
}

