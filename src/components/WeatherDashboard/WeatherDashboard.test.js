import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import WeatherDashboard from '.';

const mockStore = configureStore([]);

const renderWithStore = (store) =>
  render(
    <Provider store={store}>
      <WeatherDashboard />
    </Provider>
  );

describe('WeatherDashboard', () => {
  test('displays loading spinner when loading', () => {
    const store = mockStore({
      weather: { loading: true, currentWeather: null, forecast: null, error: null },
    });

    renderWithStore(store);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('displays error message when there is an error', () => {
    const store = mockStore({
      weather: { loading: false, currentWeather: null, forecast: null, error: 'Error fetching data' },
    });

    renderWithStore(store);

    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });

  test('displays current weather data', () => {
    const store = mockStore({
      weather: {
        loading: false,
        currentWeather: {
          name: 'Noida',
          main: { temp: 25, feels_like: 24, humidity: 70 },
          wind: { speed: 5 },
        },
        forecast: null,
        error: null,
      },
    });

    renderWithStore(store);

    expect(screen.getByText(/Noida/i)).toBeInTheDocument();
    expect(screen.getByText(/Live Weather Information/i)).toBeInTheDocument();
    const weatherInfo = screen.getByText('Temperature:');
    expect(weatherInfo).toHaveTextContent('Temperature');
    const feels_like = screen.getByText('Feels like:');
    expect(feels_like).toHaveTextContent('Feels like');
  });

  test('displays weather forecast data', () => {
    const store = mockStore({
      weather: {
        loading: false,
        currentWeather: null,
        forecast: {
          list: [
            {
              dt: 1651234567,
              main: { temp: 20 },
              weather: [{ description: 'clear sky' }],
            },
            {
              dt: 1651238567,
              main: { temp: 22 },
              weather: [{ description: 'few clouds' }],
            },
          ],
        },
        error: null,
      },
    });

    renderWithStore(store);

    expect(screen.getByText('Weather Forecast:')).toBeInTheDocument();
    expect(screen.getByText(/clear sky/)).toBeInTheDocument();
    expect(screen.getByText(/few clouds/)).toBeInTheDocument();
  });

  test('displays no data message when no data is available', () => {
    const store = mockStore({
      weather: { loading: false, currentWeather: null, forecast: null, error: null },
    });

    renderWithStore(store);

    expect(screen.getByText('No weather data available. Please search for a location.')).toBeInTheDocument();
  });
});
