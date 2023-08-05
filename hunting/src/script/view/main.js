import '../Comp/Content-list.js';
import '../Comp/search-bar.js';
import TourismAPI from '../data/TourismData.js';
const main = () => {
  const searchElement = document.querySelector('search-bar');
  const FoodListElement = document.querySelector('content-list');
  const onButtonSearchSubmitted = (event) => {
    event.preventDefault();
    console.log('click');

    fetch(`${TourismAPI.baseUrl}?Place_Name=${searchElement.value}`)
      .then((res) => res.json())
      .then((responseJson) => {
        console.log(responseJson);
        renderResult(responseJson.data);
      })
      .catch((message) => {
        fallbackResult(`keyword ${searchElement.value} not found`);
      });
  };

  const renderResult = (results) => {
    FoodListElement.tour = results;
  };

  const fallbackResult = (message) => {
    FoodListElement.renderError(message);
  };

  const renderonLoad = () => {
    fetch(TourismAPI.baseUrl + '/showtwelve')
      .then((res) => res.json())
      .then((responseJson) => {
        console.log(responseJson);
        renderResult(responseJson.data);
      })
      .catch((message) => {
        fallbackResult(`keyword ${searchElement.value} not found`);
      });
  };

  searchElement.submitEvent = onButtonSearchSubmitted;
  renderonLoad();
};

export default main;
