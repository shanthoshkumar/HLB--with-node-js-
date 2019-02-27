import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { BinaryService } from "../service/binary.service";
import swal from 'sweetalert';
import { NgxSpinnerService } from "ngx-spinner";
import Web3 from "web3";
import { SidenavComponent } from "../sidenav/sidenav.component";
import { UserService } from "../shared/user.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-bet',
  templateUrl: './create-bet.component.html',
  styleUrls: ['./create-bet.component.css']
})
export class CreateBetComponent implements OnInit {
  public _web3;
  public sidenav;
  constructor(private binary:BinaryService,private spinner:NgxSpinnerService,private userService:UserService,private http:HttpClient,private route:Router) {
    this._web3 = new Web3();
    this.sidenav = new SidenavComponent(http,route,binary);
  }
  serverErrorMessages
  onSubmit(form : NgForm){
    
  
    var meta = this;
    var temp1=form.value;
    var t=new Date(temp1['starttime']).getTime() / 1000
    var a:any = Math.round(t)
    var startTime:number = parseInt(a)
    var t1=new Date(temp1['endtime']).getTime() / 1000
    var a1:any = Math.round(t1)
    var endTime:number = parseInt(a1)
    let minbet = meta._web3.utils.toWei(temp1['min']);
   let maxbet = meta._web3.utils.toWei(temp1['max']);
    if(temp1['selectTeam']==1){
      temp1['selectTeam']=temp1['team1']
    }
    else if (temp1['selectTeam']==2)
    {
      temp1['selectTeam']=temp1['team2']
    }
    meta.binary.currentTime().then(now_time => {
      // console.log("current",now_time);
 
      if((now_time<startTime)&&(startTime<endTime)&&(minbet<maxbet)){
         meta.spinner.show();
        meta.binary.createOption(startTime,endTime,minbet,maxbet).then(res => {

          (document.getElementById("team1") as HTMLInputElement).value = "";
          (document.getElementById("team2") as HTMLInputElement).value = "";
          (document.getElementById("tm1") as HTMLInputElement).checked = false;
          (document.getElementById("tm2") as HTMLInputElement).checked = false;
          (document.getElementById("min") as HTMLInputElement).value = "";
          (document.getElementById("max") as HTMLInputElement).value = "";
          (document.getElementById("starttime") as HTMLInputElement).value = "";
          (document.getElementById("endtime") as HTMLInputElement).value = "";

          meta.spinner.hide();
          if(res == 1) {
            // this.sidenav.fetch_balance();
            meta.userService.createbet(temp1).subscribe(
              res => {
                // alert('stored')
              },
              err => {
                meta.serverErrorMessages = err.error.message;
              }
            );
            swal("Bet Created !")
          }
          else if(res == 0) {
            swal("You Rejected this Transaction")
          }
          else if(res == 2) {
            swal("Transaction Failed")
          }
        })
      }
      else{
        swal("Enter Valid Details");
      }
    })
 
  }
  
  ngOnInit() {
  }

}
