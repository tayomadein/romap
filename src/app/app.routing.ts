import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Layouts & Components
import { NavbarComponent } from './navbar/navbar.component'
import { ReportComponent } from './report/report.component';
import { ROMapComponent } from './ro-map/ro-map.component';

const appRoutes: Routes = [
  { path: 'map', component: ROMapComponent },
  { path: 'report', component: ReportComponent },
  { path: '',
    redirectTo: '/map',
    pathMatch: 'full' },
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule{ }