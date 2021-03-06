import 'whatwg-fetch';

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR';

export const FETCH_ALLERGIES = 'FETCH_ALLERGIES';
export const RECEIVE_ALLERGIES = 'RECEIVE_ALLERGIES';
export const FETCH_ALLERGIES_ERROR = 'FETCH_ALLERGIES_ERROR';

export const fetchWeather = () => dispatch => {
  dispatch({type: FETCH_WEATHER});

  return fetch('/ajax/weather')
    .then((response) => {
      const json = response.json();

      if (response.status === 200) {
        json.then((weather) => {
          return dispatch({
            type: RECEIVE_WEATHER,
            weather,
          });
        });
      }
      else {
        json.then(({error}) => {
          return dispatch({
            type: FETCH_WEATHER_ERROR,
            error: error.message,
          });
        });
      }
    })
    .catch((response) => {
      return dispatch({
          type: FETCH_WEATHER_ERROR,
          error: response.statusText,
        });
    });
}

export const fetchAllergies = () => dispatch => {
  dispatch({type: FETCH_ALLERGIES});

  return fetch('/ajax/allergies')
    .then((response) => {
      const json = response.json();

      if (response.status === 200) {
        json.then((allergies) => {
          return dispatch({
            type: RECEIVE_ALLERGIES,
            allergies,
          });
        });
      }
      else {
        json.then(({error}) => {
          return dispatch({
            type: FETCH_ALLERGIES_ERROR,
            error: error.message,
          });
        });
      }
    })
    .catch((response) => {
      return dispatch({
          type: FETCH_ALLERGIES_ERROR,
          error: response.statusText,
        });
    });
}
