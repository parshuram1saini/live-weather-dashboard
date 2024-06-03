import React from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Typography } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import WeatherSearch from "./WeatherSearch";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./style.css";

function WeatherDashboard() {
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  const { currentWeather, forecast, loading, error } = useSelector(
    (state) => state.weather || {}
  );

  return (
    <div className="weather-dashboard-container flex-col align-center justify-content">
      <Typography
        style={{ marginBottom: "30px" }}
        variant="h5"
        className="flex-row align-center justify-center"
      >
        Live Weather Information
      </Typography>
      <WeatherSearch />
      <Card
        className="weather-card"
        style={{ marginTop: "20px" }}
        variant="outlined"
        sx={{ minWidth: isSmallScreen ? "fit-content" : 450, maxWidth: isSmallScreen ? "fit-content" : 500 }}
      >
        <CardContent className="flex-col justify-center align-center">
          {loading && <CircularProgress />}
          {error && !currentWeather && <Typography color="error">{error}</Typography>}
          {currentWeather && (
            <div style={{width: "100%"}}>
              <Typography variant="h5">{currentWeather.name}</Typography>
              <Typography>
                {" "}
                <span style={{ fontWeight: "600" }}>Temperature:</span>{" "}
                {currentWeather.main.temp}°C
              </Typography>
              <Typography>
                {" "}
                <span style={{ fontWeight: "600" }}>Feels like:</span>{" "}
                {currentWeather.main.feels_like}°C
              </Typography>
              <Typography>
                <span style={{ fontWeight: "600" }}>Humidity:</span>{" "}
                {currentWeather.main.humidity}%
              </Typography>
              <Typography>
                <span style={{ fontWeight: "600" }}>Wind Speed:</span>{" "}
                {currentWeather.wind.speed}m/s
              </Typography>
            </div>
          )}
          {forecast && (
            <div style={{ marginTop: "15px", width:"100%" }}>
              <Typography variant="h5">Weather Forecast:</Typography>
              {forecast.list.slice(0, 5).map((forecastItem, index) => (
                <div key={index}>
                  <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    {new Date(forecastItem.dt * 1000).toLocaleString()}:{" "}
                    {forecastItem.main.temp}°C,{" "}
                    {forecastItem.weather[0].description}
                  </Typography>
                </div>
              ))}
            </div>
          )}
          {!loading && !error && !currentWeather && !forecast && (
            <Typography>No weather data available. Please search for a location.</Typography>
          )
          }
        </CardContent>
      </Card>
    </div>
  );
}

export default WeatherDashboard;
