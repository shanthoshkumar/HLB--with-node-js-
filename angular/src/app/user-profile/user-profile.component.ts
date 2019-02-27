import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { AppComponent } from "../app.component";
import { SidenavComponent } from '../sidenav/sidenav.component';
import { BinaryService } from '../service/binary.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  emails;
  publickey;
  model ={
    email :'',
    passwordold:'',
    password:''
  };
  serverErrorMessages: string;
  public id;
  constructor(private userService: UserService, private router: Router,private http:HttpClient,private binary:BinaryService) { 
    
    var ins = new AppComponent();
    ins.show();
    
    var temp = new SidenavComponent(http,router,binary);
    temp.get_name()
    
    this.checkuser();
    
    
  }

  checkuser(){
    var meta = this;
        var temp = new SidenavComponent(this.http,this.router,this.binary);
    meta.binary.owner().then(owneraddress=>{
      if(owneraddress ===  meta.binary._etherumAccountAddress){
        temp.adminnav();
      }
      else if(owneraddress !=  meta.binary._etherumAccountAddress){
      temp.usernav();
      }
    })
  }
  

  onSubmit(form : NgForm){
    this.userService.createbet(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
  change(email1,oldpass,newpass){
    var meta = this;
    var temp1={}
    temp1['email']=email1;
    temp1['passwordold']=oldpass;
    temp1['password']=newpass;
    // console.log(temp1);
    // console.log(typeof(temp1));    
    this.userService.changepassword(temp1).subscribe(
      res => {
        this.userService.setToken(res['token']);
        document.getElementById("passwordmessage").style.color = "green";
        document.getElementById("passwordmessage").innerHTML = "Password changed Successfully";
        this.userService.deleteToken();
        meta.binary._privateKey=null;
        meta.binary._etherumAccountAddress=null;
        window.location.reload();     
      },
      err => {
        console.log(err.error.message)
      }
    );
}
passwordchange(newpass,confirmpass) {
  if(newpass==confirmpass){
  document.getElementById("passwordmessage").style.color = "green";
  document.getElementById("passwordmessage").innerHTML = "Ok";
  (document.getElementById("changebtn")as HTMLButtonElement).disabled=false
 }
 else{
  document.getElementById("passwordmessage").style.color = "red"  ;
 document.getElementById("passwordmessage").innerHTML = "New password miss match";
 }
 
 }

check_privatekey()
{
  var meta = this;
  meta.id = setInterval(function(){
    // console.log('Set Interval=>'+meta.binary._etherumAccountAddress);
    
    if(meta.binary._etherumAccountAddress == null)
    {
      meta.userService.deleteToken();
      meta.router.navigate(['login']);
    }
    else
    {
   
    }
  },1); 
}
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
  

  ngOnInit() {
    let instance = this;
    let ins = new SidenavComponent(instance.http,instance.router,instance.binary);

    instance.userService.getUserProfile().subscribe(
      res => {
        instance.userDetails = res['user']['fullName'];
        instance.emails = res['user']['email'];
        instance.publickey=res['user']['publickey'];
        // console.log( typeof(res) );
        
      },
      err => { 
        console.log(err);
        
      }
    );
    ins.fetch_ethereum_balance()
  }

}

