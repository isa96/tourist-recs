class Nav extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav class="navbar navbar-light bg-secondary fixed-top">
      <div class="container ">
        <a class="navbar-brand" href="#">
            <span class="text-dark">Back</span>
        </a>
      </div>
    </nav>
      `;
  }
}
customElements.define('nav-bar', Nav);
