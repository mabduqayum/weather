export interface Weather {
  hourly?: Hourly[];
  daily?: Daily[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

export interface Hourly {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pop: number;
  pressure: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: Desc;
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface Desc {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: Temp;
  feels_like: object;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: object;
  clouds: number;
  pop: number;
  uvi: number;
}

export interface Temp {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}

// {
//   "lat": 38.5426,
//   "lon": 68.8152,
//   "timezone": "Asia/Dushanbe",
//   "timezone_offset": 18000,
//   "daily": [
//   {
//     "dt": 1694674800,
//     "sunrise": 1694653494,
//     "sunset": 1694698587,
//     "moonrise": 1694650020,
//     "moonset": 1694698320,
//     "moon_phase": 0.98,
//     "temp": {
//       "day": 32.68,
//       "min": 20.86,
//       "max": 33.61,
//       "night": 23.28,
//       "eve": 32.52,
//       "morn": 20.86
//     },
//     "feels_like": {
//       "day": 30.46,
//       "night": 22.5,
//       "eve": 30.47,
//       "morn": 19.94
//     },
//     "pressure": 1011,
//     "humidity": 17,
//     "dew_point": 3.61,
//     "wind_speed": 3.84,
//     "wind_deg": 255,
//     "wind_gust": 5.17,
//     "weather": [
//       {
//         "id": 800,
//         "main": "Clear",
//         "description": "clear sky",
//         "icon": "01d"
//       }
//     ],
//     "clouds": 0,
//     "pop": 0,
//     "uvi": 8.47
//   },
//   {
//     "dt": 1694761200,
//     "sunrise": 1694739946,
//     "sunset": 1694784891,
//     "moonrise": 1694739900,
//     "moonset": 1694785980,
//     "moon_phase": 0,
//     "temp": {
//       "day": 32.45,
//       "min": 20.8,
//       "max": 33.89,
//       "night": 23.2,
//       "eve": 29.93,
//       "morn": 20.8
//     },
//     "feels_like": {
//       "day": 30.25,
//       "night": 22.33,
//       "eve": 28.15,
//       "morn": 19.88
//     },
//     "pressure": 1013,
//     "humidity": 17,
//     "dew_point": 3.24,
//     "wind_speed": 4.97,
//     "wind_deg": 269,
//     "wind_gust": 4.69,
//     "weather": [
//       {
//         "id": 800,
//         "main": "Clear",
//         "description": "clear sky",
//         "icon": "01d"
//       }
//     ],
//     "clouds": 0,
//     "pop": 0,
//     "uvi": 8.24
//   },
//   {
//     "dt": 1694847600,
//     "sunrise": 1694826398,
//     "sunset": 1694871195,
//     "moonrise": 1694829900,
//     "moonset": 1694873640,
//     "moon_phase": 0.04,
//     "temp": {
//       "day": 32.07,
//       "min": 20.57,
//       "max": 33.38,
//       "night": 22.42,
//       "eve": 28.78,
//       "morn": 20.57
//     },
//     "feels_like": {
//       "day": 29.91,
//       "night": 21.47,
//       "eve": 27.3,
//       "morn": 19.57
//     },
//     "pressure": 1012,
//     "humidity": 17,
//     "dew_point": 2.47,
//     "wind_speed": 5.11,
//     "wind_deg": 281,
//     "wind_gust": 4.78,
//     "weather": [
//       {
//         "id": 800,
//         "main": "Clear",
//         "description": "clear sky",
//         "icon": "01d"
//       }
//     ],
//     "clouds": 0,
//     "pop": 0,
//     "uvi": 7.39
//   },
//   {
//     "dt": 1694934000,
//     "sunrise": 1694912850,
//     "sunset": 1694957498,
//     "moonrise": 1694919840,
//     "moonset": 1694961360,
//     "moon_phase": 0.07,
//     "temp": {
//       "day": 30.02,
//       "min": 20.11,
//       "max": 32.62,
//       "night": 21.43,
//       "eve": 30.78,
//       "morn": 20.11
//     },
//     "feels_like": {
//       "day": 28.2,
//       "night": 20.36,
//       "eve": 28.78,
//       "morn": 19.04
//     },
//     "pressure": 1011,
//     "humidity": 18,
//     "dew_point": 1.89,
//     "wind_speed": 4.75,
//     "wind_deg": 274,
//     "wind_gust": 4.41,
//     "weather": [
//       {
//         "id": 800,
//         "main": "Clear",
//         "description": "clear sky",
//         "icon": "01d"
//       }
//     ],
//     "clouds": 1,
//     "pop": 0,
//     "uvi": 7.49
//   },
//   {
//     "dt": 1695020400,
//     "sunrise": 1694999302,
//     "sunset": 1695043802,
//     "moonrise": 1695009900,
//     "moonset": 1695049140,
//     "moon_phase": 0.1,
//     "temp": {
//       "day": 29.53,
//       "min": 19.15,
//       "max": 32.05,
//       "night": 21.28,
//       "eve": 31.34,
//       "morn": 19.15
//     },
//     "feels_like": {
//       "day": 27.8,
//       "night": 20.19,
//       "eve": 29.23,
//       "morn": 17.96
//     },
//     "pressure": 1011,
//     "humidity": 17,
//     "dew_point": 0.44,
//     "wind_speed": 3.53,
//     "wind_deg": 265,
//     "wind_gust": 3.4,
//     "weather": [
//       {
//         "id": 800,
//         "main": "Clear",
//         "description": "clear sky",
//         "icon": "01d"
//       }
//     ],
//     "clouds": 0,
//     "pop": 0,
//     "uvi": 8.04
//   },
//   {
//     "dt": 1695106800,
//     "sunrise": 1695085754,
//     "sunset": 1695130106,
//     "moonrise": 1695100140,
//     "moonset": 1695137160,
//     "moon_phase": 0.13,
//     "temp": {
//       "day": 29.86,
//       "min": 19.14,
//       "max": 32.28,
//       "night": 21.05,
//       "eve": 30.66,
//       "morn": 19.14
//     },
//     "feels_like": {
//       "day": 28.04,
//       "night": 19.92,
//       "eve": 28.67,
//       "morn": 17.95
//     },
//     "pressure": 1013,
//     "humidity": 16,
//     "dew_point": 0.49,
//     "wind_speed": 4.99,
//     "wind_deg": 279,
//     "wind_gust": 4.84,
//     "weather": [
//       {
//         "id": 800,
//         "main": "Clear",
//         "description": "clear sky",
//         "icon": "01d"
//       }
//     ],
//     "clouds": 0,
//     "pop": 0,
//     "uvi": 9
//   },
//   {
//     "dt": 1695193200,
//     "sunrise": 1695172206,
//     "sunset": 1695216409,
//     "moonrise": 1695190560,
//     "moonset": 1695225540,
//     "moon_phase": 0.16,
//     "temp": {
//       "day": 26.27,
//       "min": 18.29,
//       "max": 27.91,
//       "night": 19.47,
//       "eve": 27.73,
//       "morn": 18.29
//     },
//     "feels_like": {
//       "day": 26.27,
//       "night": 18.31,
//       "eve": 26.51,
//       "morn": 16.98
//     },
//     "pressure": 1019,
//     "humidity": 18,
//     "dew_point": -1.13,
//     "wind_speed": 2.76,
//     "wind_deg": 176,
//     "wind_gust": 3.35,
//     "weather": [
//       {
//         "id": 803,
//         "main": "Clouds",
//         "description": "broken clouds",
//         "icon": "04d"
//       }
//     ],
//     "clouds": 74,
//     "pop": 0.15,
//     "uvi": 9
//   },
//   {
//     "dt": 1695279600,
//     "sunrise": 1695258658,
//     "sunset": 1695302713,
//     "moonrise": 1695280980,
//     "moonset": 1695314400,
//     "moon_phase": 0.2,
//     "temp": {
//       "day": 26.17,
//       "min": 17.42,
//       "max": 28.51,
//       "night": 18.28,
//       "eve": 27.2,
//       "morn": 17.42
//     },
//     "feels_like": {
//       "day": 26.17,
//       "night": 17.03,
//       "eve": 26.16,
//       "morn": 16.21
//     },
//     "pressure": 1019,
//     "humidity": 20,
//     "dew_point": 0.05,
//     "wind_speed": 4.57,
//     "wind_deg": 272,
//     "wind_gust": 3.96,
//     "weather": [
//       {
//         "id": 801,
//         "main": "Clouds",
//         "description": "few clouds",
//         "icon": "02d"
//       }
//     ],
//     "clouds": 11,
//     "pop": 0.01,
//     "uvi": 9
//   }
// ]
// }
