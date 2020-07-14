import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { RouteInfo } from '../../classes/routeInfo';
@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  clacTripStatic(staticTrip: any) {
    return this.http.post<Number>(this.baseUrl + 'api/Trip/StaticTrip', staticTrip);
  }

  clacTripDynamic(dynamicTrip: any) {
    return this.http.post<Number>(this.baseUrl + 'api/Trip/DynamicTrip', dynamicTrip);
  }
}
