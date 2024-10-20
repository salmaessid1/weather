import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import axios from 'axios';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = '';
  weatherData: any = null;
  hourlyData: any = [];
  dailyData: any = [];
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  async getWeather() {
    this.errorMessage = '';
    this.weatherData = null;
    this.hourlyData = [];
    this.dailyData = [];

    if (!this.city) {
      this.errorMessage = 'Veuillez entrer le nom d\'une ville.';
      return;
    }

    try {
      this.weatherData = await this.weatherService.getWeather(this.city);
      this.hourlyData = await this.weatherService.getHourlyForecast(this.city);
      this.dailyData = await this.weatherService.getDailyForecast(this.city);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        this.errorMessage = 'Erreur lors de la récupération des données météo : ' + (error.response?.data?.message || error.message);
      } else {
        this.errorMessage = 'Une erreur inattendue est survenue.';
      }
    }
  }
  
}
