// 'use client'
// import requestIp from 'request-ip'
// import React, { useEffect, useState } from 'react';

// const WeatherPage: React.FC = () => {
//   const [clientIp, setClientIp] = useState<string | null>(null);
//   const [latLong, setLatLong] = useState<[number, number] | null>(null);
//   const [location, setLocation] = useState<[string, string] | null>(null);
//   const [weather, setWeather] = useState<any>(null);
//   const apiKey = '2a9f673b0f8af5833999285ad515e0cf';

//   useEffect(() => {
//     const fetchClientIp = async () => {
//       try {
//         const response = await fetch('https://api.ipify.org?format=json');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setClientIp(data.ip);
//       } catch (error) {
//         console.error('Error fetching client IP:', error);
//       }
//     };

//     fetchClientIp();
//   }, []);

//   useEffect(() => {
//     if (clientIp) {
//       const fetchLatLong = async () => {
//         try {
//           const response = await fetch(`https://ipapi.co/${clientIp}/json/`);
//           const data = await response.json();
//           const { latitude, longitude, city, region } = data;
//           setLatLong([latitude, longitude]);
//           setLocation([city, region]);
//           console.log('Latitude and Longitude:', [latitude, longitude]);
//           console.log('City and region:', [city, region])
//         } catch (error) {
//           console.error('Error fetching latitude and longitude:', error);
//         }
//       };

//       fetchLatLong();
//     }
//   }, [clientIp]);

//   useEffect(() => {
//     if (latLong) {
//       const fetchWeather = async () => {
//         try {
//           const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latLong[0]}&lon=${latLong[1]}&appid=${apiKey}`);
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           const data = await response.json();
//           setWeather(data);
//         } catch (error) {
//           console.error('Error fetching weather:', error);
//         }
//       };

//       fetchWeather();
//     }
//   }, [latLong, apiKey]);

//   if (!clientIp) {
//     return <p>Loading client IP...</p>;
//   }

//   if (!latLong) {
//     return <p>Loading coordinates...</p>;
//   }

//   if (!weather) {
//     return <p>Loading weather...</p>;
//   }

//   const temperature = weather.main.temp;
//   const humidity = weather.main.humidity;
//   const windSpeed = weather.wind.speed;
//   const description = weather.weather[0].description;

//   return (
//     <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
//       <div className="text-center">
//         <h2 className="text-xl font-semibold text-gray-900">Current Weather</h2>
//         <p className="text-gray-500">{weather.name}</p>
//       </div>
//       <div className="flex justify-between">
//         <div className="text-gray-700">
//           <p>IP Address:</p>
//           <p>Latitude:</p>
//           <p>Longitude:</p>
//           <br />
//           <p>Temperature:</p>
//           <p>Humidity:</p>
//           <p>Wind Speed:</p>
//           <p>Description:</p>
//         </div>
//         <div className="text-gray-900">
//           <p>{clientIp}</p>
//           <p>{latLong[0]}</p>
//           <p>{latLong[1]}</p>
//           <br />
//           <p>{(temperature - 273.15).toFixed(2)} °C</p> {/* Convert from Kelvin to Celsius */}
//           <p>{humidity} %</p>
//           <p>{(windSpeed * 3.6).toFixed(0)} km/h</p>
//           <p>{description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeatherPage;
"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Updated import
import WeatherComponent from '../components/WeatherComponent';
import { useEffect } from 'react';

const WeatherPage = () => {
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!session && status !== "loading") {
  //     router.push('/auth/signin');
  //   }
  // }, [session, status, router]);

  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }

  // if (!session) {
  //   return null; // You can return a loading spinner or any other indicator
  // }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <WeatherComponent />
    </div>
  );
};

export default WeatherPage;

