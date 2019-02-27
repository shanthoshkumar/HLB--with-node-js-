import { Component, OnInit } from '@angular/core';
import { UserService } from "../shared/user.service";
import { HttpClient } from '@angular/common/http';
import { BinaryService } from "../service/binary.service";
import { Router } from '@angular/router';
import Web3 from "web3";
import * as CanvasJS from './canvasjs.min';
import { NgxSpinnerService } from "ngx-spinner";
import { SidenavComponent } from "../sidenav/sidenav.component";

@Component({
  selector: 'app-mybets',
  templateUrl: './mybets.component.html',
  styleUrls: ['./mybets.component.css']
})
export class MybetsComponent implements OnInit {
  public myBetDetailsArray = [];
  public user;
  public _web3;
  public optionsDetailsArray = [];
  public bet_id;
  public Betted_on_win;
  public Betted_on_loss;
  public total_betted_amount;;
  public maximum_bet_amount;
  public minimum_bet_amount;
  public bet_button;
  public bet_option;
  public bet_increase;
  public bet_decrease;
  public betted_amount;
  constructor(private http:HttpClient,private route:Router,private binary:BinaryService,private spinner:NgxSpinnerService) {
    var meta = this;
    meta.user= new UserService(http);

    meta._web3 = new Web3();


   }

  myBetsTable(){
    // var thcheck:boolean;
    let meta = this;
    meta.myBetDetailsArray.length = 0;
    meta.binary.currentTime().then(now_time => {
      meta.user.getoptiondetails().subscribe(betDetails=>{
      var array:any = betDetails;
      for(let i=0;i<array.length;i++) {
        meta.binary.betDetails(betDetails[i]['optionid']).then(better_details => {
          if(better_details[1] != 0){
            
        // alert(better_details[1])
            meta.binary.optionDetails(betDetails[i]['optionid']).then(details => {
              let obj={};
              obj['yourAmount'] = better_details[0];
              obj['yourOption'] = better_details[1];
              obj['optionId']= betDetails[i]['optionid'];
              obj['selectTeam'] = betDetails[i]['selectTeam'];
              obj['team1']= betDetails[i]['team1'];
              obj['team2'] =betDetails[i]['team2'];
              let t1:any =details[0][0].toString();
              let time1:any = new Date(t1*1000);
              obj['startTime']=time1;
              let t2:any =details[0][1].toString()
              let time2:any = new Date(t2*1000);
              obj['endTime']=time2;
              if(better_details[1] == 1)
              {
              obj['selectedoption']='Loss';
              }
              else if(better_details[1] == 3)
            {
              obj['selectedoption']='Win';
            }
            if(now_time>details[0][1])
            {
              obj['status'] = 'View Bet'
              // console.log();
              
              if((details[3]==better_details[1])&&(better_details[2]==0)){
                obj['canClaim']=true;
                // thcheck=true;
                // console.log("true");
                
              }
            }
            else  if(now_time<details[0][1])
            {
              obj['status'] = 'View Bet'
            }
              
              if(details[3]==0)
                obj['result']='Result Pending';
              else if(details[3]==1)
                obj['result']='Loss';
              else if(details[3]==3)
                obj['result']='Won';
              else if(details[3]==2)
                obj['result']='Draw';
              // obj['winAmount']=details[4][0];
              // obj['lossAmount']=details[4][1];
              // obj['winCount']=details[5][0];
              // obj['lossCount']=details[5][1];
              meta.myBetDetailsArray.push(obj);
            })
          }
          else{
            // console.log('not betted');
            
          }
        })
      }
    },
    error=>{console.log(error)})
  })
  }

  claim(betId){
    let meta = this;
    let sidenav = new SidenavComponent(meta.http,meta.route,meta.binary)
//  alert(betId);
 
    meta.spinner.show();
    meta.binary.claim(betId).then(res => {
        meta.spinner.hide();
     sidenav.fetch_ethereum_balance();
     sidenav.fetch_contract_balance();
      if(res == 1) {
        swal("Amount Claimed Successfully")
        meta.myBetsTable();
      }
      else if(res == 0) {
        swal("You Rejected this Transaction")
      }
      else if(res == 2) {
        swal("Transaction Failed")
      }
    })
  }

  retrieve(id)
  {
    let meta= this;

    meta.bet_id = id;
    
    meta.binary.currentTime().then(now_time => {
    meta.binary.optionDetails(meta.bet_id).then(details => {
      meta.binary.betDetails(meta.bet_id).then(selected=>{
    
    
    meta.minimum_bet_amount = meta._web3.utils.fromWei(details[1],'ether');
    meta.maximum_bet_amount = meta._web3.utils.fromWei(details[2],'ether');
    meta.betted_amount = meta._web3.utils.fromWei(selected[0],'ether');

    let temp = parseInt(details[4][0])+parseInt(details[4][1]);
    meta.total_betted_amount =meta._web3.utils.fromWei(temp.toString(),'ether'); 
    meta.Betted_on_loss = details[5][0];
    meta.Betted_on_win=details[5][1];
    meta.piechart(details[5][0],details[5][1]);
      if(now_time>details[0][1])
      {
        document.getElementById("myModalLabel").innerText= 'Bet '+meta.bet_id+' was Expired';
        let opted;
        if(selected[1]==1)
        {
          opted='Loss';
        }
        else if(selected[1]==3)
        {
          opted ='Win';
        }
        (document.getElementById('betted_option') as HTMLInputElement).disabled=true;
        (document.getElementById('change_bet_option')as HTMLButtonElement).disabled=true;
        (document.getElementById('amount_to_inceased_or_decreased') as HTMLInputElement).disabled=true;
        (document.getElementById('bet_increase')as HTMLButtonElement).disabled=true;
        (document.getElementById('bet_decrease')as HTMLButtonElement).disabled=true;
        (document.getElementById('exit_button')as HTMLButtonElement).disabled=true;
      }
      else if(now_time<details[0][1]) //active bet
      {
      // console.log(details[3],'res');  
      //  console.log(details[1])
       if(selected[1]==0)
      {
      
        (document.getElementById('betted_option') as HTMLInputElement).disabled=true;
        (document.getElementById('change_bet_option')as HTMLButtonElement).disabled=true;
        (document.getElementById('amount_to_inceased_or_decreased') as HTMLInputElement).disabled=true;
        (document.getElementById('bet_increase')as HTMLButtonElement).disabled=true;
        (document.getElementById('bet_decrease')as HTMLButtonElement).disabled=true;
        (document.getElementById('bet_decrease')as HTMLButtonElement).disabled=true;
        (document.getElementById('exit_button')as HTMLButtonElement).disabled=true;
       }
      else if(selected[1]==1 || selected[1]==3)
      {
        let opted;
        if(selected[1]==1)
        {
          opted='Loss';
        }
        else if(selected[1]==3)
        {
          opted ='Win';
        }
     
        (document.getElementById('betted_option') as HTMLInputElement).value=opted;
        (document.getElementById('change_bet_option')as HTMLButtonElement).disabled=false;
        (document.getElementById('amount_to_inceased_or_decreased') as HTMLInputElement).disabled=false;
        (document.getElementById('bet_increase')as HTMLButtonElement).disabled=false;
        (document.getElementById('bet_decrease')as HTMLButtonElement).disabled=false;
        (document.getElementById('bet_decrease')as HTMLButtonElement).disabled=false;
        (document.getElementById('exit_button')as HTMLButtonElement).disabled=false;
      }
      
      
    }
    })
    })
    })
    
  }

  piechart(losscount,wincount){
    if(wincount==0 && losscount ==0){
      // alert("fsdf");
      document.getElementById('chartContainer').hidden=true;
      document.getElementById('content').hidden=false;
      document.getElementById('content').innerText= "No data to represent";
    }
    else{
    document.getElementById('chartContainer').hidden=false;
    document.getElementById('content').hidden=true;
    let win=wincount;
    let loss=losscount;
    let y
    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
  
      animationEnabled: true,
      data: [{
        type: "pie",
        showInLegend: true,
        dataPoints: [           
          { y: win, name: "win" },
        { y: loss, name: "Loss" }
         ]
      }]
    });
  
    chart.render();
  }
  }

  // change_bet(){
  //   let meta = this;
  //   let sidenav = new SidenavComponent(meta.http,meta.route,meta.binary)
  //   let option;
  //   meta.binary.betDetails(meta.bet_id).then(selected=>{
  //     if(selected[1]==1)//loss
  //     {
  //       option = 3;
  //     }
  //     else if(selected[1]==3)//win
  //     {
  //       option = 1;
  //     }
  //     meta.spinner.show();
  //   meta.binary.changeBet(meta.bet_id,option).then(res =>{
  //     meta.spinner.hide();
  //     sidenav.fetch_contract_balance();
  //     sidenav.fetch_ethereum_balance()
  //     if(res == 1) {
  //       meta.myBetsTable();
  //       swal("Betted Option Successfully changed")
  //     }
  //     else if(res == 0) {
  //       swal("You Rejected this Transaction")
  //     }
  //     else if(res == 2) {
  //       swal("Transaction Failed")
  //     }
  //   })
  // })
  // }

  // increase_bet(){
  //   let meta = this;
  //   let sidenav = new SidenavComponent(meta.http,meta.route,meta.binary);
  //  let amount =(document.getElementById('amount_to_inceased_or_decreased') as HTMLInputElement).value;

  //    meta.spinner.show();
  //   if(Number(amount)>0){
  //     meta.binary.increaseBet(meta.bet_id,meta._web3.utils.toWei(amount.toString(),'ether')).then(res =>{
  //       (document.getElementById("amount_to_inceased_or_decreased") as HTMLInputElement).value = "";
  //        meta.spinner.hide();
  //       sidenav.fetch_contract_balance();
  //       sidenav.fetch_ethereum_balance()
  //       if(res == 1) {
  //         meta.myBetsTable()
  //         swal("Bet Amount Increased Successfuly")
  //       }
  //       else if(res == 0) {
  //         swal("You Rejected this Transaction")
  //       }
  //       else if(res == 2) {
  //         swal("Transaction Failed")
  //       }
  //     })
  //   }
  //   else{
  //     swal("Enter Valid Detail")
  //   }
  // }

  // decrease_bet(){
  //   let meta = this;
  //   let sidenav = new SidenavComponent(meta.http,meta.route,meta.binary);
    
  //  let amount:any =((document.getElementById('amount_to_inceased_or_decreased') as HTMLInputElement).value);

  //   meta.spinner.show();
  //   if(amount>0){
  //     meta.binary.decreaseBet(meta.bet_id,meta._web3.utils.toWei(amount.toString(),'ether')).then(res =>{
  //       (document.getElementById("amount_to_inceased_or_decreased") as HTMLInputElement).value = "";
  //       meta.spinner.hide();
  //       sidenav.fetch_ethereum_balance()
  //       sidenav.fetch_contract_balance();
  //       if(res == 1) {
  //         meta.myBetsTable()
  //         swal("Bet Amount Decreased Successfuly")
  //       }
  //       else if(res == 0) {
  //         swal("You Rejected this Transaction")
  //       }
  //       else if(res == 2) {
  //         swal("Transaction Failed")
  //       }
  //     })
  //   }
  //   else{
  //     swal("Enter Valid Detail")
  //   }
  // }

  // exit_bet(){
  //   let meta = this;
  //   let sidenav = new SidenavComponent(meta.http,meta.route,meta.binary)

  //    meta.spinner.show
  //   meta.binary.exitBet(meta.bet_id).then(res => {
  //      meta.spinner.hide();
  //     sidenav.fetch_ethereum_balance();
  //     sidenav.fetch_contract_balance();
  //     if(res == 1) {
  //       meta.myBetsTable();
  //       swal("Bet Exited Successfuly")
  //     }
  //     else if(res == 0) {
  //       swal("You Rejected this Transaction")
  //     } 
  //     else if(res == 2) {
  //       swal("Transaction Failed")
  //     }
  //   })
  // }

  ngOnInit() {
    this.myBetsTable()
  }

}