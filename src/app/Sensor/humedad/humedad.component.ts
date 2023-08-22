import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface FeedData {
  id: string;
  value: string;
  feed_id: number;
  feed_key: string;
  created_at: string;
  created_epoch: number;
  expiration: string;
}

@Component({
  selector: 'app-humedad',
  templateUrl: './humedad.component.html',
  styleUrls: ['./humedad.component.scss'],
})
export class HumedadComponent implements OnInit {
  feedData: FeedData[] = [];
  feedDataFiltered: FeedData[] = [];

  selectedStartDate: string = '';
  selectedEndDate: string = '';
  showSameDateError: boolean = false;

  constructor(private http: HttpClient) {}

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
    fetch('http://localhost:8000/api/datos/humedad', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => response.json())
      .then((data: { status: string; datos: FeedData[] }) => {
        if (data.status === 'ok') {
          this.feedData = data.datos;
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
      return (
        (!this.selectedStartDate || dataDate >= startDate) &&
        (!this.selectedEndDate || dataDate <= endDate)
      );
    });
  }
  
}
