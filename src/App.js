import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import WeatherDashboard from './components/WeatherDashboard';
import "./App.css"

function App() {

  return (
    <Provider store={store}>
      <Routes>
        <Route exact path="/weather" element={<WeatherDashboard />} />
        <Route path="*" element={<WeatherDashboard />} />
      </Routes>
    </Provider>
  );
}

export default App;
