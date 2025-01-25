const Error404 = class Error404 {
    constructor() {
      this.el = document.querySelector('#app');
  
      this.run();
    }
  
    render() {
      return `
        <div class="container-fluid">
          <h1 class="display-3">Error 404</h1>
        </div>
      `;
    }
  
    run() {
      this.el.innerHTML = this.render();
    }
  };
  
export default Error404;  