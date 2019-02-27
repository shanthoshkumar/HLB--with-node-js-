import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AppComponent } from "../app.component";
import { UserService } from '../shared/user.service';
import {BinaryService} from "../service/binary.service"
import swal from 'sweetalert';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private userService: UserService,private binary:BinaryService,private router : Router) { 
    var ins = new AppComponent();
    ins.hide();
  }
  model ={
    email :'',
    publickey:'',
    password:'',    
  };

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;


  onSubmit(form : NgForm){
    var meta = this;
    var temp1=form.value
    var pri_key = temp1['publickey'];
  meta.binary.setPrivateKey(pri_key).then(res=>{
    // alert(res)
if(res==true){
  temp1['publickey']=meta.binary._etherumAccountAddress;
    meta.userService.forgotpassword(temp1).subscribe(
      res => {
        swal("Password changed Successfully");
        meta.router.navigateByUrl('/login');
      },
      err => {
        meta.serverErrorMessages = err.error.message;
      }
    );      
  }
  else{
    swal('Enter valid privatekey')
  }
})

  }

  ngOnInit() {
  }

}
