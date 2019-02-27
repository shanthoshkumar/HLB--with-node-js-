import { Injectable } from '@angular/core';
import Web3 from "web3";
import * as Tx from 'ethereumjs-tx';
import { Buffer } from "buffer";
// let Buffer = require('buffer/').buffer;
import { Router } from '@angular/router';
declare let require:any;

let contractAbi= require('./binary.json');
 
@Injectable({
  providedIn: 'root'
})

export class BinaryService {

  public _etherumAccountAddress: string = null; 
  // public _contractAccountBalance:number = 0; 
  public _privateKey: string; 

  public  _web3: any;
  public _binaryContractAddress: string = "0x55bdf654127ea54877edbc1aa84e389f18f702b2";
  public _binaryContract: any;
public BET;
id1
  constructor(private router:Router) {

    this._web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/Vr1GWcLG0XzcdrZHWMPu'));
    this._binaryContract = new this._web3.eth.Contract(contractAbi,this._binaryContractAddress,{gaslimit:3000000});
    this.owner().then(console.log);
    //testingthis.own
    // this.setPrivateKey("060e7bb5ad2b21b0ecf1777447060a3395439f28408bc2b5f504196f89dfacfc").then(console.log)
    var meta = this;
    meta.id1 = setInterval(function() {
      console.log(meta._privateKey);
       
    if(typeof(meta._privateKey)!=undefined){
console.log("OK");
meta.destroy();
// clearInterval();
    }
    else{
      // var router = new Router();
meta.router.navigate(["/login"])
meta.destroy();
    }
     }, 200);
  } 
destroy(){
  var meta = this;
  if (meta.id1) { 
    clearInterval(meta.id1);
  }  
}
  public async setPrivateKey(privateKey): Promise<boolean> {                                       
    let instance = this;
    instance._privateKey=privateKey;
    return new Promise((resolve, reject) => {
      // if(privateKey.length != 64){
      //   instance._privateKey=null;
      //   resolve(false);
      // }
      // else if(privateKey.length == 64){
        // instance._privateKey=privateKey;
        let obj = instance._web3.eth.accounts.privateKeyToAccount('0x'+privateKey);
        instance._etherumAccountAddress=obj["address"];
        // alert("ADDRESS"+instance._etherumAccountAddress)
        resolve(true);
      // }
    }) as Promise<boolean>;
  }
  
  public async getEtherumAccountBalance(): Promise<number> {
    let instance = this;

    // alert('SERVICE'+instance._etherumAccountAddress)
    return new Promise((resolve, reject) => {
      instance._web3.eth.getBalance(instance._etherumAccountAddress,function(err,result){
        if(err != null) {
          reject(err);
        }
        else{
          resolve(instance._web3.utils.fromWei(result,'ether'));
        }
      })
    }) as Promise<number>;
  }
  
  public async set_id(betid): Promise<boolean> {
    
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.BET =betid;
      // alert('Bet Id Setted '+instance.BET)
      resolve(true)
    }) as Promise<boolean>;
  }
  public async owner(): Promise<string> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._binaryContract.methods.owner().call(function(error, result){  
        if(error != null) {
          reject(error);
        }
        else {
          resolve(result)
        }
      });
    }) as Promise<string>;
  }

  public async transferOwnership(newOwner):Promise<number>{
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
        var nonce = result.toString(16);
        const private_key =Buffer.from(instance._privateKey,'hex');
        var contract_function = instance._binaryContract.methods.transferOwnership(newOwner);
        var contract_function_abi = contract_function.encodeABI();
        var txParams = {
          nonce: '0x'+nonce,
          gasPrice: '0x4A817C800',
          gasLimit: 4000000,
          from: instance._etherumAccountAddress,
          to: instance._binaryContractAddress,
          value: '0x00',
          data: contract_function_abi
        }
        var tx = new Tx(txParams);
        tx.sign(private_key);
        const serializedtx = tx.serialize();
        instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
          if(err != null){
            console.log("err")
            resolve(0)
          }
          else{
            instance.hash(result).then(res =>{
              if(res == 0){
                resolve(0)
              }
              else if(res == 1) {
                resolve(1)
              }
              else if(res == 2) {
                resolve(2)
              }
            })
          }
        })
      })
    }) as Promise<number>;
  }

  public async deposit(amount_in_wei):Promise<number>{
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
        var nonce = result.toString(16);
        const private_key = Buffer.from(instance._privateKey,'hex');
        var contract_function = instance._binaryContract.methods.deposit();
        var contract_function_abi = contract_function.encodeABI();
        var txParams = {
          nonce: '0x'+nonce,
          gasPrice: '0x4A817C800',
          gasLimit: 4000000,
          from: instance._etherumAccountAddress,
          to: instance._binaryContractAddress,
          value: instance._web3.utils.toHex(amount_in_wei),
          data: contract_function_abi
        }
        var tx = new Tx(txParams);
        tx.sign(private_key);
        const serializedtx = tx.serialize();
        instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
          if(err != null){
            console.log("err")
            resolve(0)
          }
          else{
            instance.hash(result).then(res =>{
              if(res == 0){
                resolve(0)
              }
              else if(res == 1) {
                resolve(1)
              }
              else if(res == 2) {
                resolve(2)
              }
            })
          }
        })
      })
    }) as Promise<number>;
  }

  public async withdraw(amount_in_wei):Promise<number>{
    let instance = this;
    console.log(amount_in_wei);
    console.log(instance._etherumAccountAddress);
    console.log(instance._binaryContractAddress);
    
    
    
    return new Promise((resolve, reject) => {
      instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
        var nonce = result.toString(16);
        const private_key =Buffer.from(instance._privateKey,'hex');
        var contract_function = instance._binaryContract.methods.withdraw(amount_in_wei);
        var contract_function_abi = contract_function.encodeABI();
        var txParams = {
          nonce: '0x'+nonce,
          gasPrice: '0x4A817C800',
          gasLimit: 4000000,
          from: instance._etherumAccountAddress,
          to: instance._binaryContractAddress,
          value:'0x0',
          data: contract_function_abi
        }
        var tx = new Tx(txParams);
        tx.sign(private_key);
        const serializedtx = tx.serialize();
        instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
          if(err != null){
            console.log("err")
            resolve(0)
          }
          else{
            instance.hash(result).then(res =>{
              if(res == 0){
                resolve(0)
              }
              else if(res == 1) {
                resolve(1)
              }
              else if(res == 2) {
                resolve(2)
              }
            })
          }
        })
      })
    }) as Promise<number>;
  }
  
  public async balanceOf(): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._binaryContract.methods.balanceOf().call({from:instance._etherumAccountAddress},function(error, result){  
        if(error != null) {
          reject(error);
        }
        else {
          resolve(instance._web3.utils.fromWei(result,'ether'))
        }
      });
    }) as Promise<number>;
  } 

  public async currentTime(): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._binaryContract.methods.currentTime().call(function(error, result){  
        if(error != null) {
          reject(error);
        }
        else {
          resolve(result)
        }
      });
    }) as Promise<number>;
  } 

  public async createOption(_starttime,_endtime,_minbet,_maxbet):Promise<number>{
    let instance = this;
    return new Promise((resolve, reject) => {
      console.log(instance._etherumAccountAddress);      
      instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
        var nonce = result.toString(16);
        const private_key =Buffer.from(instance._privateKey,'hex');
        var contract_function = instance._binaryContract.methods.createOption(_starttime,_endtime,_minbet,_maxbet);
        var contract_function_abi = contract_function.encodeABI();
        var txParams = {
          nonce: '0x'+nonce,
          gasPrice: '0x4A817C800',
          gasLimit: 4000000,
          from: instance._etherumAccountAddress,
          to: instance._binaryContractAddress,
          value:'0x0',
          data: contract_function_abi
        }
        var tx = new Tx(txParams);
        tx.sign(private_key);
        const serializedtx = tx.serialize();
        instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
          if(err != null){
            console.log("err")
            resolve(0)
          }
          else{
            instance.hash(result).then(res =>{
              if(res == 0){
                resolve(0)
              }
              else if(res == 1) {
                resolve(1)
              }
              else if(res == 2) {
                resolve(2)
              }
            })
          }
        })
      })
    }) as Promise<number>;
  }
  
  public async optionDetails(id): Promise<object> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._binaryContract.methods.optionDetails(id).call(function(error, result){  
        if(error != null) {
          reject(error);
        }
        else {
          resolve(result)
        }
      });
    }) as Promise<object>;
  }

  public async betDetails(_oID): Promise<object> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      console.log(instance._etherumAccountAddress);
      
      instance._binaryContract.methods.betDetails(_oID).call({from:instance._etherumAccountAddress},function(error, result){  
        if(error != null) {
          reject(error);
        }
        else {
          resolve(result)
        }
      });
    }) as Promise<object>;
  }

  public async optionList(): Promise<number[]> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._binaryContract.methods.optionList().call(function(error, result){  
        if(error != null) {
          reject(error);
        }
        else {
          resolve(result)
        }
      });
    }) as Promise<number[]>;
  }
  
  public async betting(_betid,_optionSelected,amount):Promise<number>{
    
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
        var nonce = result.toString(16);
        const private_key =Buffer.from(instance._privateKey,'hex');
    //     alert('Bet'+(_betid))
    // alert('Option'+(_optionSelected))
    // alert('Amount'+(amount))
    // alert('acc'+instance._etherumAccountAddress)
    // alert('contract'+instance._binaryContractAddress)
        var contract_function = instance._binaryContract.methods.betting(_betid,_optionSelected,amount);
        var contract_function_abi = contract_function.encodeABI();
        var txParams = {
          nonce: '0x'+nonce,
          gasPrice: '0x4A817C800',
          gasLimit: 4000000,
          from: instance._etherumAccountAddress,
          to: instance._binaryContractAddress,
          value:'0x0',
          data: contract_function_abi
        }
        var tx = new Tx(txParams);
        tx.sign(private_key);
        const serializedtx = tx.serialize();
        instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
          if(err != null){
            console.log("err")
            resolve(0)
          }
          else{
            instance.hash(result).then(res =>{
              if(res == 0){
                resolve(0)
              }
              else if(res == 1) {
                resolve(1)
              }
              else if(res == 2) {
                resolve(2)
              }
            })
          }
        })
      })
    }) as Promise<number>;
  }

  public async changeBet(_oID,_optionSelected):Promise<number>{
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
        var nonce = result.toString(16);
        const private_key =Buffer.from(instance._privateKey,'hex');
        var contract_function = instance._binaryContract.methods.changeBet(_oID,_optionSelected);
        var contract_function_abi = contract_function.encodeABI();
        var txParams = {
          nonce: '0x'+nonce,
          gasPrice: '0x4A817C800',
          gasLimit: 4000000,
          from: instance._etherumAccountAddress,
          to: instance._binaryContractAddress,
          value:'0x0',
          data: contract_function_abi
        }
        var tx = new Tx(txParams);
        tx.sign(private_key);
        const serializedtx = tx.serialize();
        instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
          if(err != null){
            console.log("err")
            resolve(0)
          }
          else{
            instance.hash(result).then(res =>{
              if(res == 0){
                resolve(0)
              }
              else if(res == 1) {
                resolve(1)
              }
              else if(res == 2) {
                resolve(2)
              }
            })
          }
        })
      })
    }) as Promise<number>;
  } 

  public async increaseBet(_oID,_amount):Promise<number>{
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
        var nonce = result.toString(16);
        const private_key =Buffer.from(instance._privateKey,'hex');
        var contract_function = instance._binaryContract.methods.increaseBet(_oID,_amount);
        var contract_function_abi = contract_function.encodeABI();
        var txParams = {
          nonce: '0x'+nonce,
          gasPrice: '0x4A817C800',
          gasLimit: 4000000,
          from: instance._etherumAccountAddress,
          to: instance._binaryContractAddress,
          value:'0x0',
          data: contract_function_abi
        }
        var tx = new Tx(txParams);
        tx.sign(private_key);
        const serializedtx = tx.serialize();
        instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
          if(err != null){
            console.log("err")
            resolve(0)
          }
          else{
            instance.hash(result).then(res =>{
              if(res == 0){
                resolve(0)
              }
              else if(res == 1) {
                resolve(1)
              }
              else if(res == 2) {
                resolve(2)
              }
            })
          }
        })
      })
    }) as Promise<number>;
  }

  public async decreaseBet(_oID,_value):Promise<number>{
    let instance = this;
    return new Promise((resolve, reject) => {
      // alert('ETH'+''+instance._etherumAccountAddress)
      // alert('PRI'+instance._privateKey)
      instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
        var nonce = result.toString(16);
        const private_key =Buffer.from(instance._privateKey,'hex');
        var contract_function = instance._binaryContract.methods.decreaseBet(_oID,_value);
        var contract_function_abi = contract_function.encodeABI();
        var txParams = {
          nonce: '0x'+nonce,
          gasPrice: '0x4A817C800',
          gasLimit: 4000000,
          from: instance._etherumAccountAddress,
          to: instance._binaryContractAddress,
          value:'0x0',
          data: contract_function_abi
        }
        var tx = new Tx(txParams);
        tx.sign(private_key);
        const serializedtx = tx.serialize();
        instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
          if(err != null){
            console.log("err")
            resolve(0)
          }
          else{
            instance.hash(result).then(res =>{
              if(res == 0){
                resolve(0)
              }
              else if(res == 1) {
                resolve(1)
              }
              else if(res == 2) {
                resolve(2)
              }
            })
          }
        })
      })
    }) as Promise<number>;
  }

  public async exitBet(_oID):Promise<number>{
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
        var nonce = result.toString(16);
        const private_key =Buffer.from(instance._privateKey,'hex');
        var contract_function = instance._binaryContract.methods.exitBet(_oID);
        var contract_function_abi = contract_function.encodeABI();
        var txParams = {
          nonce: '0x'+nonce,
          gasPrice: '0x4A817C800',
          gasLimit: 4000000,
          from: instance._etherumAccountAddress,
          to: instance._binaryContractAddress,
          value:'0x0',
          data: contract_function_abi
        }
        var tx = new Tx(txParams);
        tx.sign(private_key);
        const serializedtx = tx.serialize();
        instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
          if(err != null){
            console.log("err")
            resolve(0)
          }
          else{
            instance.hash(result).then(res =>{
              if(res == 0){
                resolve(0)
              }
              else if(res == 1) {
                resolve(1)
              }
              else if(res == 2) {
                resolve(2)
              }
            })
          }
        })
      })
    }) as Promise<number>;
  }
  
  public async setResult(_oID,_result):Promise<number>{
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
        var nonce = result.toString(16);
        const private_key =Buffer.from(instance._privateKey,'hex');
        var contract_function = instance._binaryContract.methods.setResult(_oID,_result);
        var contract_function_abi = contract_function.encodeABI();
        var txParams = {
          nonce: '0x'+nonce,
          gasPrice: '0x4A817C800',
          gasLimit: 4000000,
          from: instance._etherumAccountAddress,
          to: instance._binaryContractAddress,
          value:'0x0',
          data: contract_function_abi
        }
        var tx = new Tx(txParams);
        tx.sign(private_key);
        const serializedtx = tx.serialize();
        instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
          if(err != null){
            console.log("err")
            resolve(0)
          }
          else{
            instance.hash(result).then(res =>{
              if(res == 0){
                resolve(0)
              }
              else if(res == 1) {
                resolve(1)
              }
              else if(res == 2) {
                resolve(2)
              }
            })
          }
        })
      })
    }) as Promise<number>;
  }

  // public async finalizeOption(_oID):Promise<number>{
  //   let instance = this;
  //   return new Promise((resolve, reject) => {
  //     instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
  //       var nonce = result.toString(16);
  //       const private_key =Buffer.from(instance._privateKey,'hex');
  //       var contract_function = instance._binaryContract.methods.finalizeOption(_oID);
  //       var contract_function_abi = contract_function.encodeABI();
  //       var txParams = {
  //         nonce: '0x'+nonce,
  //         gasPrice: '0x4A817C800',
  //         gasLimit: 4000000,
  //         from: instance._etherumAccountAddress,
  //         to: instance._binaryContractAddress,
  //         value:'0x0',
  //         data: contract_function_abi
  //       }
  //       var tx = new Tx(txParams);
  //       tx.sign(private_key);
  //       const serializedtx = tx.serialize();
  //       instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
  //         if(err != null){
  //           console.log("err")
  //           resolve(0)
  //         }
  //         else{
  //           instance.hash(result).then(res =>{
  //             if(res == 0){
  //               resolve(0)
  //             }
  //             else if(res == 1) {
  //               resolve(1)
  //             }
  //             else if(res == 2) {
  //               resolve(2)
  //             }
  //           })
  //         }
  //       })
  //     })
  //   }) as Promise<number>;
  // } 

  public async claim(_oID):Promise<number>{
    let instance = this;
    return new Promise((resolve, reject) => {
      instance._web3.eth.getTransactionCount(instance._etherumAccountAddress,function(err,result){
        var nonce = result.toString(16);
        const private_key =Buffer.from(instance._privateKey,'hex');
        var contract_function = instance._binaryContract.methods.claim(_oID);
        var contract_function_abi = contract_function.encodeABI();
        var txParams = {
          nonce: '0x'+nonce,
          gasPrice: '0x4A817C800',
          gasLimit: 4000000,
          from: instance._etherumAccountAddress,
          to: instance._binaryContractAddress,
          value:'0x0',
          data: contract_function_abi
        }
        var tx = new Tx(txParams);
        tx.sign(private_key);
        const serializedtx = tx.serialize();
        instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
          if(err != null){
            console.log("err")
            resolve(0)
          }
          else{
            instance.hash(result).then(res =>{
              if(res == 0){
                resolve(0)
              }
              else if(res == 1) {
                resolve(1)
              }
              else if(res == 2) {
                resolve(2)
              }
            })
          }
        })
      })
    }) as Promise<number>;
  }

  public async hash(a): Promise<number> {
    let meta = this;
    return new Promise((resolve, reject) => {
      var accountInterval = setInterval(function()
      {
        meta._web3.eth.getTransactionReceipt(a,function(err,result){
          if(err != null) {
            console.log("hash err");
            resolve(0);
          }
          if(result !== null)
          {
            clearInterval(accountInterval);
            if(result.status == 0x1)
            {
              console.log("hash result.status == 0x1");
              resolve(1);
            }
            else
            {           
              console.log("hash result.status == else");
              resolve(2);
            }
          }
        })
      },100)
    }) as Promise<number>;
  }

}