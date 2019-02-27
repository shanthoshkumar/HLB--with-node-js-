import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from '../../shared/user.service'
import { BinaryService } from '../../service/binary.service'
import { AppComponent } from "../../app.component";
import swal from 'sweetalert';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
publickey_
  constructor(private userService: UserService,private binary:BinaryService,private router : Router) { 

    var ins = new AppComponent();
    ins.hide();
  }

  ngOnInit() {
  }

  privatekeyconvertion(privatekey)
{
  
  // var privatekey = (document.getElementById('keyid') as HTMLInputElement).value
  var meta = this;
  meta.binary.setPrivateKey(privatekey).then(res=>{
    
if(res==true){
(document.getElementById('keyid') as HTMLInputElement).value =meta.binary._etherumAccountAddress;
}
else if(res== false){
  swal('Enter valid privatekey')
}
  })

}

  onSubmit(form: NgForm) {
    var meta = this;
    var temp1=form.value
    var pri_key = temp1['publickey'];
  meta.binary.setPrivateKey(pri_key).then(res=>{
    
if(res==true){
  temp1['publickey']=meta.binary._etherumAccountAddress;
  this.userService.postUser(temp1).subscribe(
    res => {
      this.showSucessMessage = true;
      setTimeout(() => this.showSucessMessage = false, 4000);
      this.resetForm(form);
      this.router.navigateByUrl('/login');
    },
    err => {
      if (err.status === 422) {
        this.serverErrorMessages = err.error.join('<br/>');
      }
      else
        this.serverErrorMessages = 'Something went wrong.Please contact admin.';
    }
  );
}
else if(res== false){
  swal('Enter valid privatekey')
}
  })    
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: '',
      publickey: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
