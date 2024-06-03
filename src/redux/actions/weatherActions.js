import axios from "axios";

export const FETCH_WEATHER_REQUEST = "FETCH_WEATHER_REQUEST";
export const FETCH_WEATHER_SUCCESS = "FETCH_WEATHER_SUCCESS";
export const FETCH_WEATHER_FAILURE = "FETCH_WEATHER_FAILURE";
const weather_Api_Key = "bdf3dedb6f54efb8574b16847a090392";
const unit_type = "metric"

export const fetchWeather = (location) => async (dispatch) => {
  dispatch({ type: FETCH_WEATHER_REQUEST });
  try {
    const currentWeatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit_type}&appid=${weather_Api_Key}`
    );
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${unit_type}&appid=${weather_Api_Key}`
    );
 
    dispatch({
      type: FETCH_WEATHER_SUCCESS,
      payload: {
        currentWeather: currentWeatherResponse.data,
        forecast: forecastResponse.data,
      },
    });
  } catch (error) {
    dispatch({ type: FETCH_WEATHER_FAILURE, payload: error.message });
  }
};
