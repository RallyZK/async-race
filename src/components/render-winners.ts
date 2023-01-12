import { createElements } from './common';

const main = document.querySelector('main');
const toWinnersBtn: HTMLButtonElement | null = document.querySelector('.to-winners-btn');
if (toWinnersBtn) toWinnersBtn.addEventListener('click', getWinnersPage);

function getWinnersPage(): void {
  if (main) {
    main.innerHTML = '';
    const winnersTitle = createElements('', 'h2', main, 'Winners (0)');
  }
}
