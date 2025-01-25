import './index.scss';
import Router from './Router';
import ControllerError404 from './Controllers/error-404';
import ControllerLatestFilm from './Controllers/latest-film';

const routes = [
  { url: '/latest-film', controller: ControllerLatestFilm },
];

const router = new Router(routes);

export default router;