import { Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../classes/trip';
import { DatePipe } from '@angular/common';
import { RouteInfo } from '../classes/routeInfo';
import { Step } from '../classes/steps';
import { StaticTrip } from '../classes/staticTrip';

@Component({
  selector: 'app-find-fare',
  templateUrl: './find-fare.component.html',
  styleUrls: ['./find-fare.component.css'],
  providers: [DatePipe]
})

export class FindFareComponent implements OnInit, AfterViewInit {
  staticTrip: FormGroup;
  build: FormBuilder;
  finalFare: Number;
  trip = new FormGroup({
    date: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl('')
  });

  title = 'angular-map';
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  // map: google.maps.Map;
  directionsService;

  lat = 40.73061;
  lng = -73.935242;

/*   coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  }); */


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
              private datepipe: DatePipe, @Inject(FormBuilder)private formBuilder: FormBuilder) {
                this.build = formBuilder;
                this.createForm();
  }

  createForm() {
    this.staticTrip = this.build.group({
      minAbove6: [Number, [Validators.required, Validators.min(1)]],
      milesUnder6: [Number, [Validators.required, Validators.min(1)]],
      date: [Date, Validators.required],
      time: ['', Validators.required]
    });
  }

  get minAbove6() {
    return this.staticTrip.get('minAbove6');
  }

  get milesUnder6() {
    return this.staticTrip.get('milesUnder6');
  }

  get date() {
    return this.staticTrip.get('date');
  }

  get time() {
    return this.staticTrip.get('time');
  }

  clacTripStatic(staticTrip: FormGroup) {
    this.http.post<Number>(this.baseUrl + 'Trip', this.staticTrip.value).subscribe(
      (response) => {
        console.log(response);
        this.finalFare = response;
      },
      (error) => console.log(error)
    );
  }



  ngAfterViewInit() {
    // this.mapInitializer();
  }



  ngOnInit() {
  }

/*   mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
    this.directionsService = new google.maps.DirectionsService();
  }

  calcTrip(tripData: FormGroup) {
    const body = tripData.value;
    body.date = this.datepipe.transform(body.date, 'M/d/yy, h:mm a');

     this.getLeg(body.start, body.end).then((value: RouteInfo) => {
      console.log(value);
      body.steps = value.steps;
      body.inNY = value.inNY;
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
          console.log(response);
          const steps: Step[] = [];

          if (response.routes[0].legs[0].start_address.includes('New York') || response.routes[0].legs[0].end_address.includes('New York')) {
            leg.inNY = true;
          } else {
            leg.inNY = false;
          }

          for (let i = 0; i < response.routes[0].legs[0].steps.length; i++) {
            const temp: Step = {
              duration: Number(response.routes[0].legs[0].steps[i].duration.text.split(' ', 1)[0]), // in mins
              distance: Number(response.routes[0].legs[0].steps[i].distance.text.split(' ', 1)[0]), // in miles
            };
            steps.push(temp);
          }

          leg.steps = steps;

          console.log('leg', leg);
          resolve(leg);
        }
      });
    });
  } */


}
