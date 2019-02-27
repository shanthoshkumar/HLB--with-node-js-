import { Component, OnInit } from '@angular/core';
import { BinaryService } from "../service/binary.service";
import swal from 'sweetalert';
import { NgxSpinnerService } from "ngx-spinner";
import Web3 from "web3";
import { SidenavComponent } from "../sidenav/sidenav.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  public _web3;

  constructor(private binary:BinaryService,private spinner:NgxSpinnerService,private http:HttpClient,private route:Router) { 
    this._web3 = new Web3();
  }
  
  deposit(amount:string){
    let sidenav = new SidenavComponent(this.http,this.route,this.binary)

    this.spinner.show();
    this.binary.deposit(this._web3.utils.toWei(amount,'ether')).then(res =>{
      (document.getElementById("id1") as HTMLInputElement).value = "";
      this.spinner.hide();
      sidenav.fetch_ethereum_balance();
      if(res == 1) {
        sidenav.fetch_contract_balance();
        swal("Amount Deposited to your Contract Account")
      }
      else if(res == 0) { 
        swal("You Rejected this Transaction")
      }
      else if(res == 2) {
        swal("Transaction Failed")
      }
    })
  }

  withdraw(amount:string){
    let sidenav = new SidenavComponent(this.http,this.route,this.binary)

    this.spinner.show();

    this.binary.withdraw(this._web3.utils.toWei(amount,'ether')).then(res =>{
      (document.getElementById("id2") as HTMLInputElement).value = "";
      this.spinner.hide();
      if(res == 1) {
        sidenav.fetch_contract_balance();
        sidenav.fetch_ethereum_balance();
        swal("Amount Added to Your Ethereum Account")
      }
      else if(res == 0) {
        swal("You Rejected this Transaction")
      }
      else if(res == 2) {
        swal("Transaction Failed")
      }
    })
  }

  ngOnInit() {
  }

}
