import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Driver } from '../model/driver';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ReportService {

  constructor(private http: Http) { }

  private topUrl = './assets/structures/top.json';
  private allUrl = './assets/structures/driver.json';

  // Get topDrivers
  getTopDrivers(): Observable<Driver> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.get(this.topUrl, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch(this.handleError); //...errors if any

  }

  // Get all Drivers
  getAllDrivers(): Observable<Driver> {
    //console.log('all drivers service');
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.get(this.allUrl, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch(this.handleError); //...errors if any

  }

  arrAvg(distance) {
    return distance.reduce(function (p, c) {
      return p + c;
    }) / distance.length;
  }

  getDriversDate(arrDrivers) {

    //console.log('getDriversDate called');
    //console.log(arrDrivers.length);

    var groups = {};
    for (var i = 0; i < arrDrivers.length; i++) {
      var groupDate = arrDrivers[i]._date;
      if (!groups[groupDate]) {
        groups[groupDate] = [];
      }
      groups[groupDate].push(arrDrivers[i].distance);
    }
    //console.log(groups);
    arrDrivers = [];
    for (var group1 in groups) {
      //console.log(group1);
      arrDrivers.push({ name: group1, distance: groups[group1] });
    }

    //console.log(arrDrivers);
    return arrDrivers;
  }

  getDriverID(arrDrivers, id) {

    //console.log('getDriverID called');
    //console.log(id);
    //console.log(arrDrivers.length);

    var groups = [];
    for (var i = 0; i < arrDrivers.length; i++) {
      if (id == arrDrivers[i].driver_id)
        groups.push({ date: arrDrivers[i]._date, distance: arrDrivers[i].distance });
    }
    console.log(groups);
    return groups;
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}