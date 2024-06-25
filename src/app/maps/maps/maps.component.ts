import {
  Component,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { ClientsService } from '../../clients/data-access/clients.service';
import { Client } from '../../clients/model/Client';
import {
  MapInfoWindow,
  MapMarker,
  GoogleMap,
  MapMarkerClusterer,
} from '@angular/google-maps';
import { DatePipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
interface MarkerProperties {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  location: string;
  name: string;
  title: string;
}

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [
    RouterLink,
    GoogleMap,
    MapMarker,
    MapInfoWindow,
    NgFor,
    MapMarkerClusterer,
    DatePipe,
  ],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss',
})
export class MapsComponent {
  private clientService = inject(ClientsService);

  clients: Client[] = [];

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;
  @ViewChildren(MapMarker) markerRefs!: QueryList<MapMarker>;
  selectedClientId: any;

  mapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dadada',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#c9c9c9',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
  ];

  zoom = 9;
  center: google.maps.LatLngLiteral = { lat: 49.617, lng: 20.715 };
  options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    styles: this.mapStyle,
  };
  infoContent = '';
  markerss: any[] = [];

  openInfo(marker: MapMarker, markerIcon: MarkerProperties) {
    this.infoContent = markerIcon.title;
    this.info.open(marker);
    this.selectedClientId = markerIcon.id;
  }

  overMarker(marker: MapMarker) {
    marker.marker?.setAnimation(google.maps.Animation.BOUNCE);
  }
  mouseLeave(marker: MapMarker) {
    marker.marker?.setAnimation(null);
  }

  generateMarkers() {
    const itemWithLocation = this.clients.filter(
      (client) => client.location2?.location
    );

    itemWithLocation.forEach((item) => {
      if (item.location2?.location) {
        this.markerss.push({
          id: item.id,
          position: item.location2.location,
          location: item.location2.address,
          name: item.bride_name + ' & ' + item.groom_name,
          type: item.client_type,
          date: item.date,
          title:
            '<p>' +
            item.bride_name +
            ' & ' +
            item.groom_name +
            '</p>' +
            '<p>' +
            item.location2.address +
            '</p>' +
            '<p>' +
            item.date +
            '</p>',
          options: {
            animation: google.maps.Animation.DROP,
            icon:
              item.client_type === '1'
                ? '../../../assets/icon-wedding.png'
                : '../../../assets/icon-other.png',
          },
        });
      }
    });
  }

  highlightMarker(marker: MarkerProperties) {
    const mapMarker = this.markerRefs.find(
      (ref) => ref.marker?.getTitle() === marker.title
    );

    this.center = marker.position;
    const bounds = new google.maps.LatLngBounds(marker.position);
    this.map.panToBounds(bounds);
    if (mapMarker) {
      mapMarker.marker?.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  unhighlightMarker(marker: MarkerProperties) {
    const mapMarker = this.markerRefs.find(
      (ref) => ref.marker?.getTitle() === marker.title
    );
    if (mapMarker) {
      mapMarker.marker?.setAnimation(null);
    }
    this.zoom = 9;
  }

  openMapInfoWindow(marker: MarkerProperties) {
    this.selectedClientId = marker.id;
    console.log(marker.id);

    const mapMarker = this.markerRefs.find(
      (ref) => ref.marker?.getTitle() === marker.title
    );

    if (mapMarker) {
      this.openInfo(mapMarker, marker);
    }
  }

  ngOnInit(): void {
    this.clientService.getAll().subscribe({
      next: (response) => {
        if (response.ok) {
          if (Array.isArray(response.body)) {
            const currentYear = new Date().getFullYear();

            this.clients = response.body.filter((client) => {
              const clientDate = new Date(client.date).getFullYear();

              return clientDate === currentYear;
            });

            this.generateMarkers();
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
