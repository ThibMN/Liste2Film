class ControllerError404 {
  constructor() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="container mt-5 text-center">
          <h1 class="display-3">404</h1>
          <p class="lead">Page not found</p>
          <a href="/" class="btn btn-primary">Go Back to Home</a>
        </div>
      `;
  }
}

export default ControllerError404;
