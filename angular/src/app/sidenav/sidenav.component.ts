import { Component, OnInit,OnDestroy } from '@angular/core';
import { BinaryService } from "../service/binary.service";
import { UserService } from "../shared/user.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit ,OnDestroy {
  // public binary;
  public etherumAccountAddress='';
  public userDetails;
  public userService;
  public id;
  public username;
  public canshow:boolean;

  constructor(private http:HttpClient,private route:Router,private binary:BinaryService) { 
    var ins =this;
    ins.userService = new UserService(http)
  //  ins.binary = new BinaryService()
  //  ins.fetch_ethereum_balance();
   ins.fetch_contract_balance();
   
  }
  // fetch_time(){
  //   let meta =this;
  //   meta.binary.currentTime().then(now_time => {
  //     let currenttime =now_time;
  //     setInterval(function() {
  //       let t1:any =currenttime.toString();
  //       let time1:any =new Date(t1*1000).toLocaleTimeString();
  //       document.getElementById("now_time_show").innerText = time1;
  //       currenttime++;
  //     }, 1000);
  //   })
  // }

  adminnav(){
    (document.getElementById('adminnav')as HTMLInputElement).hidden=false;    
    (document.getElementById('usernav')as HTMLInputElement).hidden=true;
    (document.getElementById('userShow')as HTMLInputElement).hidden=true;
   }
   usernav(){
    (document.getElementById('adminnav')as HTMLInputElement).hidden=true;    
    (document.getElementById('usernav')as HTMLInputElement).hidden=false;
    (document.getElementById('userShow')as HTMLInputElement).hidden=false;
   }
   

  fetch_ethereum_balance(){
    // let biny = new BinaryService()
    this.binary.getEtherumAccountBalance().then(res=>
    {
      (document.getElementById('address_acc_balance') as HTMLInputElement).innerText = parseFloat(res.toString()).toFixed(4)+" ether";
    })
  }

  fetch_address(){
    this.etherumAccountAddress=this.binary._etherumAccountAddress;
  }

  fetch_contract_balance(){
    this.binary.balanceOf().then(balance=>{
      (document.getElementById('address_balance') as HTMLInputElement).innerText = parseFloat(balance.toString()).toFixed(4)+" ether";
    })
  }
  onLogout(){
    this.binary._privateKey = null;
    this.binary._etherumAccountAddress = null;
    this.userService.deleteToken();
    this.route.navigate(['/login']);
  }

  get_name()
  {
    let meta=this;
    meta.userService.getUserProfile().subscribe(
      res => {
        meta.userDetails = res['user'];
       let username = res['user']['fullName'];
        // console.log( res['user'] );
        (document.getElementById('username') as HTMLInputElement).innerText=username
        // alert( meta.username )
      },
      err => { 
        console.log(err);
        
      }
    );
  }



toggleClicked(event: MouseEvent)
    {
      this.canshow = !this.canshow;
        var target = event.srcElement.id;
        var body = $('body');
        var menu = $('#sidebar-menu');
        
        // toggle small or large menu
        if (body.hasClass('nav-md')) {
          // console.log("1");
          
            menu.find('li.active ul').hide();
            menu.find('li.active').addClass('active-sm').removeClass('active');
        } else {

          // console.log("2");
            menu.find('li.active-sm ul').show();
            menu.find('li.active-sm').addClass('active').removeClass('active-sm');
        }
        body.toggleClass('nav-md nav-sm');

    }

 
 
    Clickevent(event: MouseEvent)
    {
      this.canshow = !this.canshow;
        var target = event.srcElement.id;
        var body = $('body');
        var menu = $('#sidebar-menu');
        
        // toggle small or large menu
        if (body.hasClass('nav-sm')) {
          // console.log("1");
          
            menu.find('li.active ul').hide();
            menu.find('li.active').addClass('active-sm').removeClass('active');
            body.toggleClass('nav-md nav-sm');
        } 
       
    } 
 
    ngOnInit() {
      // this.fetch_time();
    var meta = this;
    meta.get_name()
    meta.userService.getUserProfile().subscribe(
      res => {
        meta.userDetails = res['user'];
        meta.username = res['user']['fullName']
        // console.log( res['user'] );
      },
      err => { 
        console.log(err);
        
      })
   };
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }


}
