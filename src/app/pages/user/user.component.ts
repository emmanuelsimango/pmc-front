import { User } from 'src/app/models/user';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  currentUser:User
  constructor(private auth:AuthService) {
    this.currentUser = this.auth.getUser()
  }

  ngOnInit() {}
}
