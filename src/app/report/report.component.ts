import { Component, OnInit } from '@angular/core';

import { MaterialModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ReportService } from '../services/report.service';
import { Driver } from '../model/driver';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  topDrivers: any;
  selectedDriver: Driver;
  public allDrivers: any;
  lDrivers: any;
  display = 'block';
  barChartData:any[] = [{data: [12, 15, 9, 18, 3.75, 11.5, 6], label: 'avg'}];
  barChartInd:any[] = [];
  barChartLabels:any[] = [];
  barChartDistance:any[] = [];
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLegend:boolean = true;
  public barChartType:string = 'bar';
  public barChartColors = [{backgroundColor: ['#6f7784','#6f7784','#6f7784','#6f7784','#6f7784','#6f7784','#6f7784']}];

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.reportService.getTopDrivers()
            .subscribe(
            top => { this.topDrivers = top;
              //console.log('topInit: ', this.topDrivers);
            },
            error => console.log(error)
            );
    
    this.getDrivers();
    //console.log('allInit: ', this.getDrivers());
    //console.log(this.getDriversDate());
      
  }

  onSelect(selectedDriver){
    //console.log(d);
    this.selectedDriver = selectedDriver;
    //console.log(d.driver_id);
    let h = (selectedDriver.avg_distance).toFixed(2);
    //console.log(h);
    //console.log(this.barChartDistance);
    this.display = 'none';
    //Get Driver weekly data by ID
    /*var temp;
    var drvs = [];
    //this.barChartLabels.length = 0;
    var avg;
    this.reportService.getAllDrivers()
            .subscribe(
            drivers => { 
              temp = drivers;              
              console.log('allGetComp: ', temp);
              drvs = this.reportService.getDriverID(temp, d.driver_id);
              console.log('GetByID: ', drvs);
              for (var i=0; i<(this.barChartLabels.length); i++){
                console.log(i, this.barChartLabels[i]);
                for (var j = 0; j < drvs.length; j++) {
                  if (this.barChartLabels[i] == drvs[j].date) //{
                    this.barChartInd.push((drvs[j].distance).toFixed(2));
                  /*} else {
                    this.barChartInd.push(0.00);
                  }
                  break; //console.log(this.barChartLabels, this.barChartInd);
                }
                //this.barChartInd
                //if(drvs[i] == this.barChartLabels[i])
              }
              console.log(this.barChartLabels, this.barChartInd);
            },
            error => console.log(error)
            );*/
    this.barChartData = [{data:this.barChartDistance, label:'avg'},
                          {data:[h,0,0,0,0,0,0], label:selectedDriver.name}];
  }


  getDrivers(){
    //console.log('getDrivers called');
    var temp;
    var drvs = [];
    this.barChartLabels.length = 0;
    var lname;
    var avg;
    this.reportService.getAllDrivers()
            .subscribe(
            allDrivers => { 
              temp = allDrivers;              
              //console.log('allGetComp: ', temp);
              drvs = this.reportService.getDriversDate(temp);
              //console.log('GroupedByDate: ', drvs);

              for(var i = 0; i<drvs.length; i++){
                //console.log(i, ' labelITR: ', drvs[i].name);
                lname = drvs[i].name;
                this.barChartLabels.push(lname);
                //console.log('UpdatedLabel: ', this.barChartLabels);
                avg = (this.reportService.arrAvg(drvs[i].distance)).toFixed(2);
                //this.barChartData ;
                this.barChartDistance.push(avg);
                //console.log('UpdatedDistance: ', this.barChartDistance);
              }

              this.barChartData = [{data:this.barChartDistance, label:'avg'}];
              

              //console.log('BarChartLabel: ', this.barChartLabels);
            },
            error => console.log(error)
            );
  }

}