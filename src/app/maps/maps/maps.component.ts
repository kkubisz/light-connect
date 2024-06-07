import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ClientsService } from '../../clients/data-access/clients.service';
import { Client } from '../../clients/model/Client';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { NgFor } from '@angular/common';

interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  };
}

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [GoogleMap, MapMarker, MapInfoWindow, NgFor],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss',
})
export class MapsComponent {
  private clientService = inject(ClientsService);

  clients: Client[] = [];

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;

  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    minZoom: 8,
  };
  markers = [{}];
  infoContent = '';

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()));
  }

  markerss: MarkerProperties[] = [
    { position: { lat: 48.8584, lng: 2.2945 } },
    { position: { lat: 48.8606, lng: 2.3376 } },
    { position: { lat: 48.853, lng: 2.3499 } },
  ];

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });

    console.log(this.markers);
  }

  openInfo(marker: MapMarker, content: any) {
    this.infoContent = content;
    this.info.open(marker);
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
    this.clientService.getAll(['1', '2', '3']).subscribe({
      next: (response) => {
        if (response.ok) {
          if (Array.isArray(response.body)) {
            this.clients = response.body;
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
