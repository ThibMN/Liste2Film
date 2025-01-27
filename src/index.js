/**
 * Main application entry point
 * Sets up routing and initializes the application
 */

import Router from './router';
import ListController from './Controller/list-controller';
import LatestMoviesController from './Controller/latest-movies-controller';

// Import global styles
import './index.scss';

/**
 * Application routes configuration
 * Maps URLs to their corresponding controllers
 * @type {Array<{url: string, controller: Function}>}
 */
const routes = [
  {
    url: '/',
    controller: ListController // Home page with watchlists
  },
  {
    url: '/latest-movies',
    controller: LatestMoviesController // Latest movies browsing page
  }
];

/**
 * Initialize the application when DOM is fully loaded
 * Creates a new router instance with configured routes
 */
document.addEventListener('DOMContentLoaded', () => {
  new Router(routes);
});
