import './Content.js';

class ContentList extends HTMLElement {
  set tour(data) {
    this._tour = data;
    this.render();
  }

  renderError(message) {
    this.innerHTML = `
        <style>
            .placeholder {
                font-weight: lighter;
                color: rgba(0,0,0,0.5);
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                text-align: center;
                aling-items: center;
                justify-content: center;
                display: flex;
            }
        </style>`;
    this.innerHTML += `
    <h2 class="placeholder">${message}</h2>
    `;
  }

  render() {
    this.innerHTML = '';

    this.setAttribute('class', 'row');
    this._tour.forEach((item) => {
      const receipeItemElement = document.createElement('c-content');
      receipeItemElement.place = item;
      this.appendChild(receipeItemElement);
    });
  }
}

customElements.define('content-list', ContentList);
