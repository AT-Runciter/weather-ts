// import axios from 'axios';
import axios, { AxiosResponse } from 'axios';

const API_KEY = '886bf02e9a9fe53f7420e20d212251a3';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
}

// Отримання посилань на HTML-елементи форми
const form = document.querySelector('form')!;
const input = document.querySelector('input')!;
const resultContainer = document.querySelector('#result') as HTMLElement;

// Обробка відправки форми
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Відміна відправки форми по замовчуванню
  const city = input.value.trim(); // Отримання введеної користувачем назви міста
  if (!city) return; // Якщо значення немає, нічого не відбувається
  try {
    const data = await getWeatherData(city); // Отримання інформації про погоду обраного міста
    renderResult(data); // Демонстрація результату на сторінці
    resultContainer.style.display = 'block'; // Показати елемент з результатами
  } catch (error) {
    console.error(error); // Раптом помилка - відобразиться в консолі
  }
});

async function getWeatherData(city: string): Promise<WeatherData> {
  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric'
    }
  });
  return response.data;
}

function renderResult(data: WeatherData): void {
  resultContainer.innerHTML = `
    <p>Температура: ${data.main.temp.toFixed(1)}°C</p>
    <p>Вологість: ${data.main.humidity}%</p>
    <p>Погода: ${data.weather[0].description}</p>
  `;
}
