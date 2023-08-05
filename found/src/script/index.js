import './description.js';
import '../../../hunting/src/script/Comp/Content-list.js';
import TourismAPI from '../../../hunting/src/script/data/TourismData.js';

const main = () => {
  const tourElement = document.getElementById('tourism-content');
  const descElement = document.querySelector('desc-box');
  const idealElement = document.getElementById('ideal-content');
  let place = JSON.parse(localStorage.getItem('place'));
  console.log(place);
  if (place) {
    descElement.place = place;
  }
  const rendering = () => {
    console.log(place.Place_Name);
    fetch(TourismAPI.baseUrl + '/predict?Place_Name=' + place.Place_Name)
      .then((res) => res.json())
      .then((responseJson) => {
        console.log(responseJson);
        idealElement.tour = responseJson.data;
      })
      .catch((message) => {
        tourElement.renderError(message);
      });
    fetch(TourismAPI.baseUrl + '/predict2?Place_Name=' + place.Place_Name)
      .then((res) => res.json())
      .then((responseJson) => {
        console.log(responseJson);
        tourElement.tour = responseJson.data;
      })
      .catch((message) => {
        tourElement.renderError(message);
      });
  };

  rendering();
};
document.addEventListener('DOMContentLoaded', main);
