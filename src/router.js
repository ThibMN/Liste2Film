import ListController from './Controller/list-controller';
import LatestMoviesController from './Controller/latest-movies-controller';
import ControllerError404 from './Controller/error-404';

const Router = class Router {
  constructor(routes = []) {
    this.path = window.location.pathname;
    this.routes = routes;
    this.params = !window.location.search
      ? {}
      : Object.fromEntries(
        window.location.search
          .split('?')[1]
          .split('&')
          .map((param) => param.split('='))
      );

    this.run();
  }

  startController() {
    for (let i = 0; i < this.routes.length; i += 1) {
      const route = this.routes[i];

      if (route.url === this.path) {
        const Controller = route.controller;

        // Clear the app container before loading a new controller
        const appContainer = document.getElementById('app');
        if (appContainer) appContainer.innerHTML = '';

        new Controller(this.params);

        return;
      }
    }

    // Load 404 controller if no route matches
    new ControllerError404();
  }

  run() {
    this.startController();
  }
};

export default Router;
