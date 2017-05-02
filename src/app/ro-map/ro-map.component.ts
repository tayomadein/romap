import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MaterialModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { LocationService } from '../services/location.service';
//import { Location } from '../model/location';

@Component({
    selector: 'ro-map',
    templateUrl: './ro-map.component.html',
    styleUrls: ['./ro-map.component.css']
})
export class ROMapComponent implements OnInit {
    //Initial Marker Position
    lat: number = 9.0765;
    lng: number = 7.3986;
    zoom: number = 15;
    mH: number = 300;
    address: string = 'Abuja, Nigeria';
    location: any;

    constructor(private locationService: LocationService) { }

    ngOnInit(){
        this.locationService.addressString$.subscribe(address => {
            //console.log(address);
            this.address = address;
            this.locationService.getLocation(this.address)
            .subscribe(
            loc => {this.location = loc;
                console.log(this.location);
                this.lat = this.location[0].centroid[0];
                this.lng = this.location[0].centroid[1];
                //console.log (this.lat,this.lng);
                //console.log(loc);
                },
            error => console.log(error)
            );
        });

        this.mH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.mH = this.mH - 40;
        //console.log(this.mH);
    }

    onResize(event) {
        this.mH = Math.max(document.documentElement.clientHeight, event.target.innerHeight || 0);
        this.mH -= 40;
        //console.log('Update: ', this.mH);
    }

    /*searchAddress() {
        //console.log(this.address);
        this.locationService.getLocation(this.address)
            .subscribe(
            loc => {this.location = loc;
                this.lat = this.location[0].centroid[0];
                this.lng = this.location[0].centroid[1];
                //return (this.lat,this.lng);
                //console.log(loc);
                },
            error => console.log(error)
            );
    }*/
}