import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/packages",
    title: "Mobile Packages",
    rtlTitle: "الرموز",
    icon: "icon-atom",
    class: ""
  },
  // {
  //   path: "/icons",
  //   title: "Icons",
  //   rtlTitle: "الرموز",
  //   icon: "icon-atom",
  //   class: ""
  // },
  // {
  //   path: "/maps",
  //   title: "Maps",
  //   rtlTitle: "خرائط",
  //   icon: "icon-pin",
  //   class: "" },
  // {
  //   path: "/notifications",
  //   title: "Notifications",
  //   rtlTitle: "إخطارات",
  //   icon: "icon-bell-55",
  //   class: ""
  // },
  {
    path: "/zesa",
    title: "Buy Zesa Tokens",
    rtlTitle: "ار تي ال",
    icon: "icon-world",
    class: ""
  },

  {
    path: "/user",
    title: "User Profile",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-single-02",
    class: ""
  },
  // {
  //   path: "/tables",
  //   title: "Table List",
  //   rtlTitle: "قائمة الجدول",
  //   icon: "icon-puzzle-10",
  //   class: ""
  // },
  // {
  //   path: "/typography",
  //   title: "Typography",
  //   rtlTitle: "طباعة",
  //   icon: "icon-align-center",
  //   class: ""
  // },

];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    if(this.authService.getUser().user_type==1){
    this.menuItems.push({
      path: "/exchange-rates",
      title: "Exchange-Rates",
      rtlTitle: "ملف تعريفي للمستخدم",
      icon: "icon-single-02",
      class: ""
    })
  }
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
