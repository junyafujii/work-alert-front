import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder,FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

var url = 'http://localhost:8888/';
// var url = 'http://192.168.1.241:8888/';
//var url = 'http://localhost:4200/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public res: any = {};

  loginForm:FormGroup;
  sessid:string;

  constructor(
      private cookieService: CookieService,
      private fb: FormBuilder,
      private router: Router,
      private http: HttpClient
    ) {
    this.loginForm = this.fb.group({
      userid:"",
      password:"",
    });
  }

  ngOnInit() {
  }

  signIn():void {
    this.http.post(url + "signin",JSON.stringify(this.loginForm.value)).subscribe(
      response => {
          if (this.judge(response)) {
            this.router.navigateByUrl("/work-page");
          } else {
            alert("ID、またはパスワードが間違っています。")
          }
        }
      );
  }

  judge(response: any):boolean {
      let res = response;
console.log(res);
      this.cookieService.set('UserId', res.UserID);
      this.sessid = res.UserID;

      if (res.usercnt === 1){
        return true;
      }else{
        return false;
      }
  }

  clearControl():void {
    this.loginForm.controls.userid.reset("");
    this.loginForm.controls.password.reset("");
  }
}
