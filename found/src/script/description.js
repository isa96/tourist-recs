class desc extends HTMLElement {
  set place(data) {
    this._place = data;
    this.render2();
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    
      <div class="container-fluid text-center jumbotron" style="background-image: url(https://cdn-2.tstatic.net/travel/foto/bank/images/pengunjung-seaworld-gambar.jpg);"">
        <div class="row">
          <div class="col-md-12">  
      <p class="fw-bold display-1">Sea world</p>
            <p class="fw-normal lead">Category : Taman Hiburan </p>
            <p class="fw-normal lead">Location : Jakarta </p>
      </div>
        </div>
          </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
         culpa qui officia deserunt mollit anim id est laborum.</p>
        <br>
        <p class = "fw-bold display-6"> Other users also like : </p>
      `;
  }
  render2() {
    this.innerHTML = `
    
      <div class="jumbotron bground" style="background-image: url(${this._place.Link});"">
        <p class="fw-bold display-1">${this._place.Place_Name}</p>
            <p class="fw-normal lead">Category : ${this._place.Category} </p>
            <p class="fw-normal lead">Location : ${this._place.City} </p>
        </div>
        <div class="container-lg">
        <p class = "Desc">${this._place.Description}</p>
        <br>
        <p class = "Desc"> <ins>Price : ${this._place.Price}</ins></p>
        <br>
        </div>
        
      `;
  }
}
customElements.define('desc-box', desc);
