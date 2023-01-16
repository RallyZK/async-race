import * as api from './api';
import { appState } from './state';
import { createElements, hideWinnerMessage } from './common';

const main = document.querySelector('main');
const toWinnersBtn: HTMLButtonElement | null = document.querySelector('.to-winners-btn');
if (toWinnersBtn) toWinnersBtn.addEventListener('click', () => {
  getWinnersPage(appState.winnersPage);
  hideWinnerMessage();
});
if (main) createElements('winners-section-container', 'div', main, '');

async function getWinnersPage(page: number) {
  const winnersContainer: HTMLElement | null = document.querySelector('.winners-section-container');
  if (main) {
    main.innerHTML = '';
    const { items: winners, count: winnersCount } = await api.getWinners(appState.carsPage, 10, 'time', 'DESC');
    createElements('', 'h2', main, `Winners (${winnersCount})`);
    createElements('', 'h3', main, `Page ${page} / ${Math.ceil(winnersCount / api.WINNERS_PER_PAGE)}`);
    const winnersListContainer = createElements('winners-list-container', 'ol', main, '');
    for (let i = 0; i < winners.length; i++) {
      createElements('', 'li', winnersListContainer, `${'car'}`);

    }
  }
}
