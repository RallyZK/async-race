import * as api from './api';
import { appState } from './state';
import { createElements, getCarImage, hideWinnerMessage } from './common';

const main = document.querySelector('main');
const toWinnersBtn: HTMLButtonElement | null = document.querySelector('.to-winners-btn');
if (toWinnersBtn) toWinnersBtn.addEventListener('click', () => {
  getWinnersPage(appState.winnersPage);
  hideWinnerMessage();
});
if (main) createElements('winners-section-container', 'div', main, '');
let prevWinnersBtn, nextWinnersBtn;

async function getWinnersPage(page: number) {
  const winnersContainer: HTMLElement | null = document.querySelector('.winners-section-container');
  if (main) {
    main.innerHTML = '';
    const { items: winners, count: winnersCount } = await api.getWinners(appState.winnersPage, 10, 'time', 'DESC');
    createElements('', 'h2', main, `Winners (${winnersCount})`);
    createElements('', 'h3', main, `Page ${page} / ${Math.ceil(winnersCount / api.WINNERS_PER_PAGE)}`);
    const winnersListContainer = createElements('winners-list-container', 'ol', main, '');
    const li = createElements('winners-li title', 'li', winnersListContainer, '');
    createElements('car-in-winners__item', 'p', li, '№');
    createElements('car-in-winners', 'div', li, '');
    createElements('car-in-winners__name', 'p', li, 'Name');
    createElements('car-in-winners__item', 'p', li, 'Wins');
    createElements('car-in-winners__item', 'p', li, 'Time');
    // for (let i = 0; i < winners.length; i++) {
    //   const li = createElements('winners-li', 'li', winnersListContainer, '');
    //   createElements('car-in-winners__item', 'p', li, `${i+1}`);
    //   const carImg = createElements('car-in-winners', 'div', li, `${getCarImage((await api.getCar(winners[i].id)).color)}`);
    //   const carName = createElements('car-in-winners__name', 'p', li, `${(await api.getCar(winners[i].id)).name}`);
    //   const winsCount = createElements('car-in-winners__item', 'p', li, `${winners[i].wins}`);
    //   const time = createElements('car-in-winners__item', 'p', li, `${winners[i].time}`);
    // }

    winners.forEach(async (el, index) => {
      const li = createElements('winners-li', 'li', winnersListContainer, '');
      if (page === 1) {
        createElements('car-in-winners__item', 'p', li, `${index + 1}`);
      } else {
        if (index === 9) createElements('car-in-winners__item', 'p', li, `${page}${0}`)
        else createElements('car-in-winners__item', 'p', li, `${(api.WINNERS_PER_PAGE*(page - 1)).toString()[0]}${index + 1}`);
      }
      
      const carImg = createElements('car-in-winners', 'div', li, `${getCarImage((await api.getCar(el.id)).color)}`);
      const carName = createElements('car-in-winners__name', 'p', li, `${(await api.getCar(el.id)).name}`);
      const winsCount = createElements('car-in-winners__item', 'p', li, `${el.wins}`);
      const time = createElements('car-in-winners__item', 'p', li, `${el.time}`);
    })



    const bottomBtnsContainer = createElements('bottom-btns-container', 'div', main, '');
    prevWinnersBtn = createElements('prev-page-btn', 'button', bottomBtnsContainer, '&#9666; Prev');
    (prevWinnersBtn  as HTMLButtonElement).addEventListener('click', () => getPrevWinnerPage());
    nextWinnersBtn = createElements('next-page-btn', 'button', bottomBtnsContainer, ' Next &#9656;');
    (nextWinnersBtn as HTMLButtonElement).addEventListener('click', () => getNextWinnerPage(winnersCount));
  }
}

function getPrevWinnerPage() {
  console.log(appState.winnersPage)
  if (appState.winnersPage > 1) {
    appState.winnersPage -= 1;
    getWinnersPage(appState.winnersPage);
  }
}

function getNextWinnerPage(winnersCount: number): void {
  console.log(appState.winnersPage)
  if (appState.winnersPage < Math.ceil(winnersCount / api.WINNERS_PER_PAGE)) {
    appState.winnersPage += 1;
    console.log(appState.winnersPage)
    getWinnersPage(appState.winnersPage);
  }
}

