import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';

export interface FeedData {
  id: string;
  value: string;
  feed_id: number;
  feed_key: string;
  created_at: string;
  created_epoch: number;
  expiration: string; // Dejar esta propiedad para la tabla
}
@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.scss'],
})
export class TemperaturaComponent implements OnInit {
  feedData: FeedData[] = [];
  feedDataFiltered: FeedData[] = [];

  selectedStartDate: string = ''; // Agrega esta línea
  selectedEndDate: string = '';
  uniqueCreationDates: string[] = [];
  showSameDateError: boolean = false;

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  ngOnInit() {
    this.getDataFromApi();
    setInterval(() => {
      this.getDataFromApi();
    }, 7000);
  }

  isFeedData2(value: any): value is FeedData {
    return (
      'value' in value &&
      'feed_key' in value &&
      'created_at' in value &&
      'expiration' in value
    );
  }

  getDataFromApi() {
    fetch('http://localhost:8000/api/datos/temperatura', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => response.json())
      .then((data: { status: string; datos: FeedData[] }) => {
        if (data.status === 'ok') {
          this.feedData = data.datos;
          this.getUniqueDates(); // Actualizar fechas únicas
          this.applyFilters();
        } else {
          // Manejar algún tipo de error si la respuesta no es 'ok'
        }
      })
      .catch((error) => {
        // Manejar errores en la solicitud
      });
  }

  applyFilters() {
    console.log('Selected Start Date:', this.selectedStartDate);
    console.log('Selected End Date:', this.selectedEndDate);

    const startDate = new Date(this.selectedStartDate);
    const endDate = new Date(this.selectedEndDate);

    if (
      this.selectedStartDate &&
      this.selectedEndDate &&
      startDate.getTime() === endDate.getTime()
    ) {
      this.showSameDateError = true;
      return;
    }

    this.showSameDateError = false;

    this.feedDataFiltered = this.feedData.filter((data) => {
      const dataDate = new Date(data.created_at);

      if (this.selectedStartDate && dataDate < startDate) {
        return false;
      }
      if (this.selectedEndDate && dataDate > endDate) {
        return false;
      }
      return true;
    });
  }

  getUniqueDates() {
    const uniqueCreationDates = new Set<string>();
    for (const data of this.feedData) {
      uniqueCreationDates.add(data.created_at);
    }
    this.uniqueCreationDates = Array.from(uniqueCreationDates);
  }

  getDatoClass(sensor: string): string {
    const latestValue = this.getLatestValue(sensor);
    if (latestValue > 50) {
      return 'high-value';
    } else {
      return 'low-value';
    }
  }

  getLatestValue(sensor: string): number {
    const filteredData = this.feedDataFiltered
      .filter(data => data.feed_key === sensor)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    if (filteredData.length > 0) {
      return +filteredData[0].value; // Convierte el valor a número
    } else {
      return 0; // Valor por defecto si no hay datos
    }
  }
}
