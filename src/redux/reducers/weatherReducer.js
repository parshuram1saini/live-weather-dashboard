import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
} from "../actions/weatherActions";

const initialState = {
  currentWeather: null,
  forecast: null,
  loading: false,
  error: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return { ...state, loading: true };
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentWeather: action.payload.currentWeather,
        forecast: action.payload.forecast,
      };
    case FETCH_WEATHER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default weatherReducer;
