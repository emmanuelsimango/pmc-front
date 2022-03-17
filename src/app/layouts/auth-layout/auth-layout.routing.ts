import { HomeComponent } from './../../pages/landing/home/home.component';
import { LoginComponent } from './../../pages/login/login.component';
import { Routes } from '@angular/router';



export const AuthLayoutRoutes: Routes = [
  { path: 'home',          component:  HomeComponent},
    { path: 'login',          component:  LoginComponent},
];
