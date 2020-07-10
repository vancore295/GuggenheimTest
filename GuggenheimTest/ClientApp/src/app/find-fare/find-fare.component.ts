import { Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../classes/trip';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-find-fare',
  templateUrl: './find-fare.component.html',
  styleUrls: ['./find-fare.component.css'],
  providers: [DatePipe]
})

export class FindFareComponent implements OnInit, AfterViewInit {
  trip = new FormGroup({
    date: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
    passengers: new FormControl()
  });

  title = 'angular-map';
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;

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
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
    this.marker.setMap(this.map);
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private datepipe: DatePipe) { }

  ngOnInit() {
  }

  calcTrip(tripData: FormGroup) {
    const body = tripData.value;
    body.date = this.datepipe.transform(body.date, 'M/d/yy, h:mm a');
    this.http.post<Trip>(this.baseUrl + 'Trip', body).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
