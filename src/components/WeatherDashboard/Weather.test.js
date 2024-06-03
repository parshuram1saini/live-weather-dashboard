import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import WeatherSearch from './WeatherSearch';

const mockStore = configureStore([]);

test('renders WeatherSearch component', () => {
  const store = mockStore({});
  render(
    <Provider store={store}>
      <WeatherSearch />
    </Provider>
  );

  expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
  expect(screen.getByText(/search/i)).toBeInTheDocument();
});

test('dispatches fetchWeather action on search', () => {
  const store = mockStore({});
  store.dispatch = jest.fn();

  render(
    <Provider store={store}>
      <WeatherSearch />
    </Provider>
  );

  fireEvent.change(screen.getByLabelText(/location/i), { target: { value: 'Delhi' } });
  fireEvent.click(screen.getByText(/search/i));

  expect(store.dispatch).toHaveBeenCalledTimes(1);
});
