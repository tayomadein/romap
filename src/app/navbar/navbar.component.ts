import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { Router } from '@angular/router';

import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //@Output() searchAddress = new EventEmitter();

  address: string = 'Abuja, Nigeria';
  logoURL = './images/logo.png';

  constructor(private locationService: LocationService, private router: Router) { }

  ngOnInit() {
  }

  searchAddress(){
    this.locationService.getAddress(this.address);
    this.router.navigate(['/map']);
  }

}
