import { Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { DatePipe } from '@angular/common';


import { TripService } from '../services/trip/trip.service';

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

  constructor( @Inject(FormBuilder) private formBuilder: FormBuilder, private tripService: TripService) {
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

    this.tripService.clacTripStatic(this.staticTrip.value).subscribe(
      (response) => {
        console.log(response);
        this.finalFare = response;
      },
      (error) => console.log(error)
    );
  }



  ngAfterViewInit() { }



  ngOnInit() { }
}
