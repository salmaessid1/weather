import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '624c5b8347da6f11b9e6c9d63b1ee371'; 
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor() { }

  async getWeather(city: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo', error);
      throw error; 
    }
  }

  async getHourlyForecast(city: string): Promise<any> {
    try {
      const response = await axios.get(`${this.forecastUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
      return response.data.list.slice(0, 8); // Renvoie les prévisions pour les prochaines 24 heures (8 x 3 heures)
    } catch (error) {
      console.error('Erreur lors de la récupération des prévisions horaires', error);
      throw error;
    }
  }

  async getDailyForecast(city: string): Promise<any> {
    try {
      const response = await axios.get(`${this.forecastUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
      const dailyForecast = response.data.list.filter((item: any) => item.dt_txt.includes('12:00:00')); // Obtenir les données à midi pour chaque jour
      return dailyForecast;
    } catch (error) {
      console.error('Erreur lors de la récupération des prévisions quotidiennes', error);
      throw error;
    }
  }
}
