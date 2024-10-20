import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Ajoutez ceci

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component'; // Assurez-vous que cela est correct

@NgModule({
    declarations: [
        AppComponent,
        WeatherComponent
    ],
    imports: [
        BrowserModule,
        FormsModule // Ajoutez ceci
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
