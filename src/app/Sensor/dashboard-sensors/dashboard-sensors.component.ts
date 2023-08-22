import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface FeedData {
  name: string;
  last_value: string;
  created_at: string;
}

@Component({
  selector: 'app-dashboard-sensors',
  templateUrl: './dashboard-sensors.component.html',
  styleUrls: ['./dashboard-sensors.component.scss'],
})
export class DashboardSensorsComponent implements OnInit {
  feedData: FeedData[] = [];
  latestValues: { [key: string]: string } = {};
  latestValues2: { [key: string]: string } = {};
  latestValues3: { [key: string]: string } = {};
  latestValues4: { [key: string]: string } = {};
  interval: number = 30000; // Intervalo predeterminado de 30 segundos
  intervalId: any; // Para almacenar el ID del intervalo

  constructor(private http: HttpClient, private ngZone: NgZone) {}

  ngOnInit() {
    this.getDataFromApi();
    this.intervalId = setInterval(() => {
      this.getDataFromApi();
    }, this.interval);
  }

  isFeedData(value: any): value is FeedData {
    return 'last_value' in value && 'created_at' in value;
  }

  getDataFromApi() {
    fetch('http://localhost:8000/api/obtenerTodo', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => response.json())
      .then((data: FeedData[]) => {
        this.ngZone.run(() => {
          this.feedData = Object.values(data);
          console.log('Data from API:', data);
          this.updateLatestValues(); // Actualizar los últimos valores
        });
      })
      .catch((error) => {
        this.ngZone.run(() => {
          this.feedData = [];
        });
      });
  }

  updateLatestValues() {
    this.feedData.forEach((feed) => {
      if (feed.name === 'sensorvalue') {
        this.latestValues[feed.name] =
          feed.last_value >= '1' ? 'Movimiento' : 'Cerrada';
      } else if (feed.name === 'distancia') {
        this.latestValues2[feed.name] =
          feed.last_value >= '1' ? 'Movimiento' : 'Cerrada';
      } else if (feed.name === 'mq2') {
        this.latestValues3[feed.name] =
          feed.last_value >= '1' ? 'Bueno' : 'Peligro';
      } else if (feed.name === 'mq5') {
        this.latestValues4[feed.name] =
          feed.last_value >= '1' ? 'Bueno' : 'Peligro';
      } else {
        this.latestValues[feed.name] = feed.last_value;
      }
    });
  }
  changeInterval(newInterval: number) {
    clearInterval(this.intervalId); // Detener el intervalo actual
    this.interval = newInterval;
    this.getDataFromApi(); // Obtener datos inmediatamente
    this.intervalId = setInterval(() => {
      this.getDataFromApi(); // Obtener datos cada nuevo intervalo
    }, this.interval);
  }

  getLatestValue(feedName: string): string {
    return this.latestValues[feedName] || '...';
  }

  getLatestValue2(feedName: string): string {
    return this.latestValues2[feedName] || '...';
  }

  getLatestValue3(feedName: string): string {
    return this.latestValues3[feedName] || '...';
  }

  getLatestValue4(feedName: string): string {
    return this.latestValues4[feedName] || '...';
  }

  getDatoClass(sensor: string): string {
    const latestValue = this.getLatestValue(sensor);
    if (sensor === 'sensorvalue') {
      return latestValue === 'Cerrada' ? 'high-value' : 'low-value';
    } else {
      const numericValue = parseFloat(latestValue);
      if (!isNaN(numericValue) && numericValue > 50) {
        return 'high-value';
      } else {
        return 'low-value';
      }
    }
  }

  getDatoClassDistancia(sensor: string): string {
    const latestValue = this.getLatestValue2(sensor);
    if (sensor === 'distancia') {
      return latestValue === 'Cerrada' ? 'high-value' : 'low-value';
    } else {
      const numericValue = parseFloat(latestValue);
      if (!isNaN(numericValue) && numericValue > 50) {
        return 'high-value';
      } else {
        return 'low-value';
      }
    }
  }
  getDatoClassMq2(sensor: string): string {
    const latestValue = this.getLatestValue3(sensor);
    if (sensor === 'mq2') {
      return latestValue === 'Peligro' ? 'high-value' : 'low-value';
    } else {
      const numericValue = parseFloat(latestValue);
      if (!isNaN(numericValue) && numericValue > 50) {
        return 'high-value';
      } else {
        return 'low-value';
      }
    }
  }
  getDatoClassMq5(sensor: string): string {
    const latestValue = this.getLatestValue4(sensor);
    if (sensor === 'mq5') {
      return latestValue === 'Peligro' ? 'high-value' : 'low-value';
    } else {
      const numericValue = parseFloat(latestValue);
      if (!isNaN(numericValue) && numericValue > 50) {
        return 'high-value';
      } else {
        return 'low-value';
      }
    }
  }
}
