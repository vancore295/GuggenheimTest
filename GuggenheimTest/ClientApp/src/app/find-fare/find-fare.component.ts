import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../classes/trip';
import { TripServiceService } from '../services/trip-service.service';

@Component({
  selector: 'app-find-fare',
  templateUrl: './find-fare.component.html',
  styleUrls: ['./find-fare.component.css']
})
export class FindFareComponent implements OnInit {
  trip = new FormGroup({
    date: new FormControl(''),
    time: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl('')
  });

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
  }

  calcTrip(tripData: FormGroup) {
    this.http.post(this.baseUrl + 'Trip', tripData.value).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
      );
  }

}
