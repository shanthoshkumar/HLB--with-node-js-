import { Component, OnInit } from '@angular/core';
import { BinaryService } from "../service/binary.service";
import { UserService } from "../shared/user.service";
import swal from 'sweetalert';
import { NgxSpinnerService } from "ngx-spinner";
import Web3 from "web3";
import { SidenavComponent } from "../sidenav/sidenav.component";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import * as CanvasJS from './canvasjs.min';
@Component({
  selector: 'app-allbets',
  templateUrl: './allbets.component.html',
  styleUrls: ['./allbets.component.css']
})
export class AllbetsComponent implements OnInit {
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


  constructor(private binary:BinaryService, private user:UserService,private spinner:NgxSpinnerService,private http:HttpClient,private route:Router,private routeactive:ActivatedRoute) {
    this._web3 = new Web3();
    this.bet_button=false;
    this.bet_option=false;
    this.bet_increase=false;
    this.bet_decrease=false;
    
  }

  set(id)
  {
    let meta= this;

meta.bet_id = id;
var a=1;
//0 not bettted
//1 betted as Loss
//3 betted as win

meta.binary.currentTime().then(now_time => {
meta.binary.optionDetails(meta.bet_id).then(details => {
meta.binary.betDetails(meta.bet_id).then(selected=>{
meta.minimum_bet_amount = meta._web3.utils.fromWei(details[1],'ether');
meta.maximum_bet_amount = meta._web3.utils.fromWei(details[2],'ether');
meta.betted_amount = meta._web3.utils.fromWei(selected[0],'ether');

let temp = parseInt(details[4][0])+parseInt(details[4][1]);
meta.total_betted_amount =meta._web3.utils.fromWei(temp.toString(),'ether'); 
meta.Betted_on_loss= details[5][0];
 meta.Betted_on_win=details[5][1];
meta.piechart(details[5][0],details[5][1]);
  if(now_time>details[0][1])
  {
    // swal('Bet '+meta.bet_id+' was Expired');
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
    (document.getElementById('initial_bet_amount')as HTMLInputElement).disabled=true;
    (document.getElementById('g1') as HTMLInputElement).disabled=true;
    (document.getElementById('g2') as HTMLInputElement).disabled=true;
    (document.getElementById('bet_button')as HTMLButtonElement).disabled=true;
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
    (document.getElementById('initial_bet_amount')as HTMLInputElement).disabled=false;
    (document.getElementById('g1') as HTMLInputElement).disabled=false;
    (document.getElementById('g2') as HTMLInputElement).disabled=false;
    (document.getElementById('bet_button')as HTMLButtonElement).disabled=false;
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
    (document.getElementById('initial_bet_amount')as HTMLInputElement).disabled=true;
    (document.getElementById('g1') as HTMLInputElement).disabled=true;
    (document.getElementById('g2') as HTMLInputElement).disabled=true;
    (document.getElementById('bet_button')as HTMLButtonElement).disabled=true;
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
    (document.getElementById('abcd') as HTMLInputElement).hidden=true;
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
  allBetsTable(){
    let meta = this;
    meta.optionsDetailsArray.length = 0;
    meta.binary.currentTime().then(now_time => {
      meta.user.getoptiondetails().subscribe(betDetails=>{
        var array:any = betDetails;
        for(let i=0;i<array.length;i++) {
          meta.binary.optionDetails(betDetails[i]['optionid']).then(details => {
            
            
            // for(let a=0;a<10;a++)
            // {
            let obj={};
            obj['optionId']= betDetails[i]['optionid'];
            obj['selectTeam'] = betDetails[i]['selectTeam'];
            obj['team1']= betDetails[i]['team1'];
            obj['team2'] =betDetails[i]['team2'];
            // console.log(details[0]);
            let t1:any =details[0][0].toString();
            let time1:any = new Date(t1*1000);
            obj['startTime']=time1;
            let t2:any =details[0][1].toString()
            let time2:any = new Date(t2*1000);
            obj['endTime']=time2;
            // console.log(details[1])
            obj['minBet']=this._web3.utils.fromWei(details[1],'ether');
            // console.log(details[2])
            obj['maxBet']=this._web3.utils.fromWei(details[2],'ether');
            if(now_time<details[0][0]){
              obj['result']='Not started';  
              obj['bool']=false;

            }
            else if(now_time>details[0][1]){
              if(details[3]==0){
                 obj['result']='Result Pending';
                 obj['bool']=true;
                 }
              else if(details[3]==1){
                obj['result']='Loss';
                obj['bool']=true;
              }
              else if(details[3]==3){
                obj['result']='Won';
                obj['bool']=true;
              }else if(details[3]==2){
                obj['result']='Draw'; 
                obj['bool']=true;
              }

            }
            else if((now_time>details[0][0])&&(now_time<details[0][1])){
              obj['result']='Active Bet';
              obj['bool']=true;            }
              obj['lossAmount']=meta._web3.utils.fromWei(details[4][0],'ether');
              obj['winAmount']=meta._web3.utils.fromWei(details[4][1],'ether');
              obj['lossCount']=details[5][0];
              obj['winCount']=details[5][1];
              meta.optionsDetailsArray.push(obj);
          })
          
          // console.log(meta.optionsDetailsArray)
        }
      },
      error=>{console.log(error)})
    })
  }

  bet(){
    let meta = this;
    let sidenav = new SidenavComponent(meta.http,meta.route,meta.binary);
    var amount:any = ((document.getElementById('initial_bet_amount') as HTMLInputElement).value);

    let option;
    if ((document.getElementById("g1")as HTMLInputElement).checked) {
    //  alert(amount+''+'Low')
     option =1;
    }
    else if((document.getElementById("g2")as HTMLInputElement).checked) {
      // alert(amount+''+'High')
      option = 3;
    }
  // alert(meta.bet_id)
    if(amount>0) {
      
    meta.spinner.show();
      meta.binary.betting(meta.bet_id,option,meta._web3.utils.toWei(amount.toString(),'ether')).then(res => {
        (document.getElementById("initial_bet_amount") as HTMLInputElement).value = "";
        (document.getElementById("g1") as HTMLInputElement).checked = false;
        (document.getElementById("g2") as HTMLInputElement).checked = false;
        
        meta.spinner.hide();
        sidenav.fetch_ethereum_balance();
        if(res == 1) {
          meta.allBetsTable()
          sidenav.fetch_contract_balance();
          swal("Your Betting Was Successfully Recorded")
        }
        else if(res == 0) {
          swal("You Rejected this Transaction")
        }
        else if(res == 2) {
          swal("Transaction Failed")
        }
      })
    }
    else {
      swal('Enter Valid Detail')
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
  //      meta.spinner.hide();
  //     sidenav.fetch_ethereum_balance()
  //     if(res == 1) {
  //       meta.allBetsTable();
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
  //  let amount =parseInt((document.getElementById('amount_to_inceased_or_decreased') as HTMLInputElement).value);

     
  //   if(amount>0){
  //     meta.spinner.show();
  //     meta.binary.increaseBet(meta.bet_id,meta._web3.utils.toWei(amount.toString(),'ether')).then(res =>{
  //       (document.getElementById("amount_to_inceased_or_decreased") as HTMLInputElement).value = "";
  //        meta.spinner.hide();
  //       sidenav.fetch_ethereum_balance()
  //       if(res == 1) {
  //         meta.allBetsTable()
  //         sidenav.fetch_contract_balance();
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

    
  //   if(amount>0){
  //     // alert(meta.bet_id+''+meta._web3.utils.toWei(amount.toString(),'ether'))
  //     meta.spinner.show();
  //     meta.binary.decreaseBet(meta.bet_id,meta._web3.utils.toWei(amount.toString(),'ether')).then(res =>{
  //       (document.getElementById("amount_to_inceased_or_decreased") as HTMLInputElement).value = "";
  //       meta.spinner.hide();
  //       sidenav.fetch_ethereum_balance()
  //       if(res == 1) {
  //         sidenav.fetch_contract_balance();
  //         meta.allBetsTable()
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

  //    meta.spinner.show();
  //   meta.binary.exitBet(meta.bet_id).then(res => {
  //     meta.spinner.hide();
  //     sidenav.fetch_ethereum_balance();
  //     if(res == 1) {
  //       sidenav.fetch_contract_balance();
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

  claim(betId){
    let meta = this;
    let sidenav = new SidenavComponent(meta.http,meta.route,meta.binary)

    meta.spinner.show();
    
    meta.binary.claim(betId).then(res => {
    
      meta.spinner.hide();
     sidenav.fetch_ethereum_balance();
      if(res == 1) {
        sidenav.fetch_contract_balance();
        swal("Amount Claimed Successfully")
      }
      else if(res == 0) {
        swal("You Rejected this Transaction")
      }
      else if(res == 2) {
        swal("Transaction Failed")
      }
    })
  }

  triggered()
  {
   document.getElementById("openModalButton").click();
  }

  ngOnInit() {
    let meta = this;
    meta.allBetsTable();
    let win=300;
    let loss=450;
    let y
    (document.getElementById('abcd') as HTMLInputElement).hidden=true;
    
      }
}
