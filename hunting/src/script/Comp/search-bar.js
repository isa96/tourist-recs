class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set submitEvent(event) {
    this._submitEvent = event;
    this.render();
  }

  get value() {
    return this.shadowDOM.querySelector('#searchElement').value;
  }

  render() {
    this.shadowDOM.innerHTML = `
      <link rel="stylesheet" href="./src/style/style.css" />
      <script src="https://kit.fontawesome.com/d6b1ffccb3.js" crossorigin="anonymous"></script>
     
      <div class="sticky-bg ">
        <a  class="backbutton" href="../index.html">WISHUNT</a>
        
        <form id="searchBar" class="search-container">
          <input placeholder="Search Place" id="searchElement" type="search">
          <button id="searchButtonElement" type="submit">Search</button>
          
        </form>
       </div>
       `;

    this.shadowDOM.querySelector('#searchBar').addEventListener('submit', this._submitEvent);
  }
}

customElements.define('search-bar', SearchBar);
