'use client'
import React, { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

const WeatherComponent: React.FC = () => {
  const [clientIp, setClientIp] = useState<string | null>(null);
  const [latLong, setLatLong] = useState<[number, number] | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const apiKey = '2a9f673b0f8af5833999285ad515e0cf';

  useEffect(() => {
    const fetchClientIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) {
          throw new Error('Failed to fetch client IP');
        }
        const data = await response.json();
        setClientIp(data.ip);
      } catch (error) {
        console.error('Error fetching client IP:', error);
      }
    };

    fetchClientIp();
  }, []);

  useEffect(() => {
    if (clientIp) {
      const fetchLatLong = async () => {
        try {
          const response = await fetch(`https://ipapi.co/${clientIp}/json/`);
          if (!response.ok) {
            throw new Error('Failed to fetch latitude and longitude');
          }
          const data = await response.json();
          const { latitude, longitude } = data;
          setLatLong([latitude, longitude]);
        } catch (error) {
          console.error('Error fetching latitude and longitude:', error);
        }
      };

      fetchLatLong();
    }
  }, [clientIp]);

  useEffect(() => {
    if (latLong) {
      const fetchWeather = async () => {
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latLong[0]}&lon=${latLong[1]}&appid=${apiKey}`);
          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }
          const data = await response.json();
          setWeather(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };

      fetchWeather();
    }
  }, [latLong, apiKey]);

  if (!clientIp || !latLong || !weather) {
    return <p>Loading...</p>;
  }

  const temperature = weather.main.temp;
  const humidity = weather.main.humidity;
  const windSpeed = weather.wind.speed;
  const description = weather.weather[0].description;

  return (
    <div className="p-14 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 relative">
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
      >
        Logout
      </button>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">Current Weather</h2>
        <p className="text-gray-500">{weather.name}</p>
      </div>
      <div className="flex justify-between">
        <div className="text-gray-700">
          <p>IP Address: </p>
          <p>Latitude: </p>
          <p>Longitude: </p>
          <br />
          <p>Temperature:  </p>
          <p>Humidity: </p>
          <p>Wind Speed: </p>
          <p>Description: </p>
        </div>
        <div className="text-gray-900">
          <p>{clientIp}</p>
          <p>{latLong[0]}</p>
          <p>{latLong[1]}</p>
          <br />
          <p>{(temperature - 273.15).toFixed(2)} °C</p>
          <p>{humidity} %</p>
          <p>{(windSpeed * 3.6).toFixed(0)} km/h</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;
