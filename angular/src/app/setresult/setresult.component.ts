import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BinaryService } from "../service/binary.service"
import { UserService } from "../shared/user.service"
import { AppComponent } from "../app.component";
import { NgxSpinnerService } from "ngx-spinner";
import Web3 from "web3";
@Component({
  selector: 'app-setresult',
  templateUrl: './setresult.component.html',
  styleUrls: ['./setresult.component.css']
})
export class SetresultComponent implements OnInit {
  public _web3;
  public optionsDetailsArray = [];
public op_id;
  constructor(private binary: BinaryService,private user:UserService,private spinner:NgxSpinnerService) {
    var ins = new AppComponent();
    ins.show();
    this._web3 = new Web3();
   }

   set_result(){
    var oID = document.getElementById('opid').innerText;
    var selected_value
    // console.log((document.getElementById("r1")as HTMLInputElement).checked)
    if ((document.getElementById('r1')as HTMLInputElement).checked) {
      selected_value = (document.getElementById('r1')as HTMLInputElement).value;
    }
    else if((document.getElementById('r2')as HTMLInputElement).checked){
      selected_value = (document.getElementById('r2')as HTMLInputElement).value;
    }
    else if((document.getElementById('r3')as HTMLInputElement).checked){
      selected_value = (document.getElementById('r3')as HTMLInputElement).value;
    }        
    let instance = this;
     instance.spinner.show();
    var a =oID.split(':')[1]
    instance.binary.setResult(a,selected_value).then(res => {

      (document.getElementById("r1") as HTMLInputElement).checked = false;
      (document.getElementById("r2") as HTMLInputElement).checked = false;
      (document.getElementById("r3") as HTMLInputElement).checked = false;

       instance.spinner.hide();
        if(res == 0){
          swal("You Rejected this Transaction")
        }
        else if(res == 1){
          this.allBetsTable()
          swal("Success...")
        }
        else if (res == 2){
          swal("Transaction Failed")
        }
      })
  }
  setoptionid(op_id){
   document.getElementById("opid").innerText='Bet Id:'+op_id; 
  }

  allBetsTable(){
    let meta = this;
    // let check;
    meta.optionsDetailsArray.length = 0;
    meta.binary.currentTime().then(now_time => {
      meta.user.getoptiondetails().subscribe(betDetails=>{
        var array:any = betDetails;
        for(let i=0;i<array.length;i++) {
          meta.binary.optionDetails(betDetails[i]['optionid']).then(details => {   let obj={};
            obj['optionId']= betDetails[i]['optionid'];
            obj['selectTeam'] = betDetails[i]['selectTeam'];
            obj['team1']= betDetails[i]['team1'];
            obj['team2'] =betDetails[i]['team2'];
            let t1:any =details[0][0]
            let time1:any = new Date(t1*1000);
            obj['startTime']=time1;
            let t2:any =details[0][1]
            let time2:any = new Date(t2*1000);
            obj['endTime']=time2;
            // console.log(details[1])
            obj['minBet']=this._web3.utils.fromWei(details[1],'ether');
            // console.log(details[2])
            obj['maxBet']=this._web3.utils.fromWei(details[2],'ether');
            if(now_time<details[0][0]){
              obj['result']='Soon';
            }
            else if(now_time>details[0][1]){
              if(details[3]==0){             
                obj['result']='Result Pending';
                obj['bool']=true;
              }
              else if(details[3]==1){           
                obj['result']='Loss';
                obj['bool']=false;
              }
              else if(details[3]==3){               
                obj['result']='Won';
                obj['bool']=false;
              }
              else if(details[3]==2){               
                obj['result']='Draw';
                obj['bool']=false;
              }
            }
            else if((now_time>details[0][0])&&(now_time<details[0][1])){
              obj['result']='Active Bet';
            }
            obj['winAmount']=this._web3.utils.fromWei(details[4][1],'ether');
            obj['lossAmount']=this._web3.utils.fromWei(details[4][0],'ether');
            obj['winCount']=details[5][1];
            obj['lossCount']=details[5][0];
            meta.optionsDetailsArray.push(obj);
          })
        }
      },
      error=>{console.log(error)})
    })
  }

  ngOnInit() {
    this.allBetsTable()
  }

}
