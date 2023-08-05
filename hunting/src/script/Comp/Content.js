class Content extends HTMLElement {
  set place(data) {
    this._place = data;
    console.log(data);
    this.render();
  }

  render() {
    this.setAttribute('class', 'col-12 col-sm-6 col-md-6 col-lg-4');
    this.innerHTML = `
        <div class="card" style="width: 100%; margin-bottom :10px;">
          <img src="${this._place.Link}" class="card-img-top img-fluid" alt="${this._place.Place_Name}" style = "width: 100%; height : 18rem;object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title" >${this._place.Place_Name}</h5>
                <p class="card-text">${this._place.Category ? this._place.Category : '-'}</p>
                <a href="../../../../found/index.html" class="btn  btn-success">Go to Detail</a>
              </div>
          </div>`;
    this.addEventListener('click', (event) => {
      localStorage.setItem('place', JSON.stringify(this._place));
      let test = localStorage.getItem('place');
      console.log(test);
    });
  }
}
customElements.define('c-content', Content);
