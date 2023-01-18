import * as api from './api';
import * as types from './types';
import { appState } from './state';
import { createElements, getCarImage, hideWinnerMessage } from './common';

const main: HTMLElement | null = document.querySelector('main');
const toWinnersBtn: HTMLButtonElement | null = document.querySelector('.to-winners-btn');
if (toWinnersBtn) {
  toWinnersBtn.addEventListener('click', () => {
    getWinnersPage(appState.winnersPage);
    hideWinnerMessage();
  });
}
if (main) createElements('winners-section-container', 'div', main, '');
let prevWinnersBtn: HTMLElement | null, nextWinnersBtn: HTMLElement | null;

async function getWinnersPage(
  page: number,
  sortBy: types.SortOptions = types.SortOptions.time,
  order: types.OrderOptions = types.OrderOptions.ASC
) {
  if (main) {
    main.innerHTML = '';
    const { items: winners, count: winnersCount } = await api.getWinners(appState.winnersPage, api.WINNERS_PER_PAGE, sortBy, order);
    createElements('', 'h2', main, `Winners (${winnersCount})`);
    createElements('', 'h3', main, `Page ${page} / ${Math.ceil(winnersCount / api.WINNERS_PER_PAGE)}`);
    const winnersListContainer = createElements('winners-list-container', 'ol', main, '');
    const li = createElements('winners-li title', 'li', winnersListContainer, '');
    createElements('car-in-winners__item', 'p', li, '№');
    createElements('car-in-winners', 'div', li, '');
    const tableName = createElements('car-in-winners__name table-name', 'p', li, 'Name &#8645;');
    tableName.addEventListener('click', sortByName);
    const tableWins = createElements('car-in-winners__item table-wins', 'p', li, 'Wins &#8645;');
    tableWins.addEventListener('click', sortByWins);
    const tableTime = createElements('car-in-winners__item table-time', 'p', li, 'Time &#8645;');
    tableTime.addEventListener('click', sortByTime);

    winners.forEach(async (el, index) => {
      const li = createElements('winners-li', 'li', winnersListContainer, '');
      if (page === 1) {
        createElements('car-in-winners__item', 'p', li, `${index + 1}`);
      } else {
        if (index === 9) createElements('car-in-winners__item', 'p', li, `${page}${0}`);
        else createElements('car-in-winners__item', 'p', li, `${(api.WINNERS_PER_PAGE * (page - 1)).toString()[0]}${index + 1}`);
      }
      createElements('car-in-winners', 'div', li, `${getCarImage((await api.getCar(el.id)).color)}`);
      createElements('car-in-winners__name', 'p', li, `${(await api.getCar(el.id)).name}`);
      createElements('car-in-winners__item', 'p', li, `${el.wins}`);
      createElements('car-in-winners__item', 'p', li, `${el.time}`);
    });
    const bottomBtnsContainer = createElements('bottom-btns-container', 'div', main, '');
    prevWinnersBtn = createElements('prev-page-btn', 'button', bottomBtnsContainer, '&#9666; Prev');
    (prevWinnersBtn as HTMLButtonElement).addEventListener('click', () => getPrevWinnerPage());
    nextWinnersBtn = createElements('next-page-btn', 'button', bottomBtnsContainer, ' Next &#9656;');
    (nextWinnersBtn as HTMLButtonElement).addEventListener('click', () => getNextWinnerPage(winnersCount));
  }
}

function getPrevWinnerPage(): void {
  if (appState.winnersPage > 1) {
    appState.winnersPage -= 1;
    getWinnersPage(appState.winnersPage);
  }
}

function getNextWinnerPage(winnersCount: number): void {
  if (appState.winnersPage < Math.ceil(winnersCount / api.WINNERS_PER_PAGE)) {
    appState.winnersPage += 1;
    getWinnersPage(appState.winnersPage);
  }
}

function sortByName(): void {
  appState.sortOptions = types.SortOptions.id;
  getWinnersPage(appState.winnersPage, appState.sortOptions, toggleSortOrder());
}

function sortByWins(): void {
  appState.sortOptions = types.SortOptions.wins;
  getWinnersPage(appState.winnersPage, appState.sortOptions, toggleSortOrder());
}

function sortByTime(): void {
  appState.sortOptions = types.SortOptions.time;
  getWinnersPage(appState.winnersPage, appState.sortOptions, toggleSortOrder());
}

function toggleSortOrder(): types.OrderOptions | undefined {
  let sortTag;
  if (appState.orderOptions === types.OrderOptions.ASC) {
    sortTag = types.OrderOptions.DESC;
    appState.orderOptions = sortTag;
  } else if (appState.orderOptions === types.OrderOptions.DESC) {
    sortTag = types.OrderOptions.ASC;
    appState.orderOptions = sortTag;
  }
  return sortTag;
}
