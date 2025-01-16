import Router from './router';
import ListController from './Controller/list-controller';
import LatestMoviesController from './Controller/latest-movies-controller';

import './index.scss';

document.addEventListener('DOMContentLoaded', () => {
  new ListController();
});

const routes = [
  {
    url: '/',
    controller: ListController // Page d'accueil
  },
  {
    url: '/latest-movies',
    controller: LatestMoviesController // Page des derniers films
  }
];

new Router(routes);
