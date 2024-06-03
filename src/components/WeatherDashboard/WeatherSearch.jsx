import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { fetchWeather } from '../../redux/actions/weatherActions';

function WeatherSearch() {
    const [location, setLocation] = useState('');
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(fetchWeather(location));
    };

    return (
        <div className='flex-row align-center justify-center'>
            <TextField className="search-textarea" label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <Button className="search-button" onClick={handleSearch}>Search</Button>
        </div>
    );
};

export default WeatherSearch;
