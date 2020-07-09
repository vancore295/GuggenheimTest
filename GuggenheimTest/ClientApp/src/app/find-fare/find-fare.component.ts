import { Component, OnInit, Inject } from '@angular/core';
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
export class FindFareComponent implements OnInit {
  trip = new FormGroup({
    date: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl('')
  });

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
