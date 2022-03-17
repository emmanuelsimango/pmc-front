import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  isLogin: boolean = true;

  signUpForm: FormGroup;
  loginForm: FormGroup;
  loginSubmitted: boolean;
  signUpSubmitted: boolean;
  signUpErrors: string[];
  loginErrors: string[];
  loginErrorMessage: string;
  signUpErrorMessage: string;

  constructor(
    private signUpFormBuilder: FormBuilder,
    private loginFormBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.signUpFormBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      mobile: ["", Validators.required],
    });
    this.loginForm = this.loginFormBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  onSignUpSubmit() {
    this.signUpSubmitted = true;
    // alert("submitter")
    console.log(this.signUpForm);

    if (this.signUpForm.invalid) {
      return;
    }

    const user: User = {
      first_name: this.signUpForm.get("first_name").value,
      last_name: this.signUpForm.get("last_name").value,
      user_pass: this.signUpForm.get("password").value,
      email: this.signUpForm.get("email").value,
      mobile: this.signUpForm.get("mobile").value,
      user_type: 2,
      added_by: 0,
      token: ""
    };

    this.authService.signUp(user).subscribe(
      (response) => {
        console.log(response);

        this.toast.success(
          '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Account created successfully, you can now login',
          "",
          {
            disableTimeOut: true,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-" + "top" + "-" + "center",
          }
        );

        this.isLogin = true;
        this.signUpForm.reset();
      },
      (error) => {
        console.log(error);

        this.loginErrorMessage = error.error.message;
        this.loginErrors = Object.values(error.error.errors);

        this.toast.error(
          `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Operation failed :${this.loginErrors}`,
          "",
          {
            disableTimeOut: true,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-error alert-with-icon",
            positionClass: "toast-" + "top" + "-" + "center",
          }
        );
      }
    );
  }

  onLoginSubmit() {
    this.loginSubmitted = true;

    // // reset alerts on submit
    // this.alertService.clear();

    // stop hlere if form is invalid
    if (this.loginForm.invalid) {
      // console.log("pano");
      return;
    }

    const user: User = {
      email: this.loginForm.get("email").value,
      user_pass: this.loginForm.get("password").value,
      last_name: null,
      first_name: null,
      mobile: null,
      added_by: 0,
      user_type: 0,
      token: ""
    };

    console.log(user);


    this.authService.login(user).subscribe(response=>{
      console.log(response);

      this.router.navigateByUrl("dashboard");
      this.loginForm.reset();

    },(error=>{
      console.log(error);

      this.loginErrorMessage = error.error.error;


      this.toast.error(
        `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Operation failed :${this.loginErrorMessage}`,
        "",
        {
          disableTimeOut: true,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-error alert-with-icon",
          positionClass: "toast-" + "top" + "-" + "center",
        }
      );

    }))
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signUpForm.controls;
  }
  get g() {
    return this.loginForm.controls;
  }
}
