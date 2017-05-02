import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Location } from '../model/location';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class LocationService {
  // Resolve HTTP using the constructor
  constructor(private http: Http) { }
  // private instance variable to hold base url
  private locationUrl = '#/search?q=';
  lat: number;
  long: number;
  // Observable string sources
  private addressString = new Subject<string>();
  // Observable string sources
  addressString$ = this.addressString.asObservable();

  //Function to get address
  getAddress(address: string) {
    this.addressString.next(address);
  }

  // Get Latitude and Longitude based on address search
  getLocation(body: string): Observable<Location> {
    
    const url = `${this.locationUrl}/${body}`  

    //let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.get(url, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch(this.handleError); //...errors if any

  }

  updateLatLong(lat, long) {
    lat = this.lat;
    long = this.long;
    console.log(lat,long);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}