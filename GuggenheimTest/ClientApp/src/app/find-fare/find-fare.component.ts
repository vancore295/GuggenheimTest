import { Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../classes/trip';
import { DatePipe } from '@angular/common';
import { RouteInfo } from '../classes/routeInfo';

@Component({
  selector: 'app-find-fare',
  templateUrl: './find-fare.component.html',
  styleUrls: ['./find-fare.component.css'],
  providers: [DatePipe]
})

export class FindFareComponent implements OnInit, AfterViewInit {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private datepipe: DatePipe) { }
  trip = new FormGroup({
    date: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
    passengers: new FormControl()
  });

  title = 'angular-map';
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  directionsService;

  lat = 40.73061;
  lng = -73.935242;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
    this.directionsService = new google.maps.DirectionsService();
  }

  ngOnInit() {
  }

  calcTrip(tripData: FormGroup) {
    const body = tripData.value;
    body.date = this.datepipe.transform(body.date, 'M/d/yy, h:mm a');

     this.getLeg(body.start, body.end).then((value: RouteInfo) => {
      console.log(value);
      body.distance = value.distance;
      body.duration = value.duration;
      this.http.post<Trip>(this.baseUrl + 'Trip', body).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
     });
  }

  calcFare(body) {
    this.http.post<Trip>(this.baseUrl + 'Trip', body).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  async getLeg(org: string, des: string) {
    const routesRequest = {
      origin: org,
      destination: des,
      provideRouteAlternatives: false,
      travelMode: 'DRIVING',
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: 'pessimistic'
      },
      unitSystem: google.maps.UnitSystem.IMPERIAL
    };
    let leg = new RouteInfo;

    return new Promise(resolve => {
      this.directionsService.route(routesRequest, function(response, status) {
        if (status === 'OK') {
          leg.distance = response.routes[0].legs[0].distance.value;
          leg.duration = response.routes[0].legs[0].duration.value;
          console.log('leg', leg);
          resolve(leg);
        }
      });
    });
  }
}
