import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from '../../shared/user.service';
import { BinaryService } from '../../service/binary.service'
import { AppComponent } from "../../app.component";
import swal from 'sweetalert';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService,private binary:BinaryService,private router : Router) { 
      var ins = new AppComponent();
    ins.hide();
  }

  model ={
    email :'',
    password:'',
    publickey:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  ngOnInit() {
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/userprofile');
  }


  onSubmit(form : NgForm){
    var meta = this;
    var temp1=form.value
    var pri_key = temp1['publickey'];
  meta.binary.setPrivateKey(pri_key).then(res=>{
    // alert(res)
if(res==true){
  
  temp1['publickey']=meta.binary._etherumAccountAddress;
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userprofile');
        // alert("success");
      },
      err => {        
        meta.serverErrorMessages = err.error.message;
      }
    );
  }
else if(res== false){
  swal('Enter valid privatekey')
}
  })    
}

}
