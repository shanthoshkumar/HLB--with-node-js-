web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/Vr1GWcLG0XzcdrZHWMPu'));
var contract_Address = '0xfe3e358b8fb6d8336ddf06cd436bc510bbf2ffc0';
var abi_json =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_oID",
				"type": "uint256"
			},
			{
				"name": "_optionSelected",
				"type": "uint256"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "betting",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_oID",
				"type": "uint256"
			},
			{
				"name": "_optionSelected",
				"type": "uint256"
			}
		],
		"name": "changeBet",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_oID",
				"type": "uint256"
			}
		],
		"name": "claim",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_minbet",
				"type": "uint256"
			},
			{
				"name": "_maxbet",
				"type": "uint256"
			},
			{
				"name": "_starttime",
				"type": "uint256"
			},
			{
				"name": "_endtime",
				"type": "uint256"
			}
		],
		"name": "createOption",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_oID",
				"type": "uint256"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "decreaseBet",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "deposit",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_oID",
				"type": "uint256"
			}
		],
		"name": "exitBet",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_oID",
				"type": "uint256"
			}
		],
		"name": "finalizeOption",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_oID",
				"type": "uint256"
			},
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "increaseBet",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "optionID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "result",
				"type": "uint256"
			}
		],
		"name": "ResultPublished",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "optionID",
				"type": "uint256"
			}
		],
		"name": "OptionCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "beneficiary",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "optionID",
				"type": "uint256"
			}
		],
		"name": "OptionFinalized",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_oID",
				"type": "uint256"
			},
			{
				"name": "_result",
				"type": "uint256"
			}
		],
		"name": "setResult",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "accountbalance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_oID",
				"type": "uint256"
			}
		],
		"name": "betDetails",
		"outputs": [
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "selectedvalue",
				"type": "uint256"
			},
			{
				"name": "betid",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "optionDetails",
		"outputs": [
			{
				"name": "minbet",
				"type": "uint256"
			},
			{
				"name": "maxbet",
				"type": "uint256"
			},
			{
				"name": "result",
				"type": "uint256"
			},
			{
				"name": "finalized",
				"type": "uint256"
			},
			{
				"name": "totals",
				"type": "uint256[]"
			},
			{
				"name": "times",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "optionList",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

var binaryOption = new this.web3.eth.Contract(abi_json,contract_Address,{
	gasLimit: 3000000,
});



//   let Game =  import('../../routes/index');

// var Game = require('../../models/game');
function test(){
	console.log('459');
	$.getScript( "../../routes/index", function( data, textStatus, jqxhr ) {
		console.log( data ); // Data returned
		console.log( textStatus ); // Success
		console.log( jqxhr.status ); // 200
		console.log( "Load was performed." );
	  });
	
// $.ajax({
// 	url: 'http://localhost:4200/user/create_option',
// 	data: {"Team1" : team1,
// 			"Team2": team2,
// 		"Selected":selected},
// 	dataType: "jsonp",
// 	type: 'POST',
// 	cache: false,
// 	success: function(data) {
// 			// var
// 	},
// 	error: function(jqXHR, textStatus, errorThrown) {
// 		alert('error ' + textStatus + " " + errorThrown);
// 	},
// 	complete: function() {
// 		me.data('requestRunning', false);
// 	}
// 		 });
		}


function check(Team1,Team2,selected){
	var Teams = new Game();
	Game.find(function(errr,games){
		console.log(games.length);
		alert(games.length)
		Teams.optionid = games.length+1;
		Teams.team1 = Team1;
		Teams.team2 = Team2;
		Teams.selectTeam = selected;
		Teams.save(function(err,user){
			if(err){
			next(err);
			}
			res.end();
			})
			})
			
			}
			

var original_key;
var account;
function set_Private_key(key)
{
	let meta = this;
	original_key = key;
	const privatekeydetails = meta.web3.eth.accounts.privateKeyToAccount('0x'+original_key);	 
	account = privatekeydetails["address"];
	alert(original_key)
	// getUserBalance();

}

function change_ownership(){
	$('#target').load('change_ownership');  
	// balanceOf_func();
	// getUserBalance();
}

function create_option_page(){
	console.log("cretingoption")
	$('#target').load('create_option');  
}

function set_result_page(){
	$('#target').load('set_result_page'); 
	result_table();
}

function deposit_withdraw(){
	$('#target').load('deposit_withdraw');  
	balanceOf_func();
	getUserBalance();
}

function overall_bets(){
	$('#target').load('overall_bets');  
	table_options()
}

function my_bets(){
	$('#target').load('my_bets');  
	better_table();
}

function cricket()
{
	
	$("#target").load('cricket');  
	table_options()
	
}

function football()
{
    $("#target").load('football');  
}

function profile()
{
    $("#target").load('profile');  
}

function brokerpage(){	
	$("#target").load('brokerpage')
	
}

async function admin_address(){
	return new Promise((resolve,reject)=>{
		binaryOption.methods.owner().call(function(err,result) {
			$('#adminaddress').val(result);
			resolve (result);
		})
	})	
}

function pkey(){
	var meta=this;	
	// meta.getAccounts().then(current_address => {
		console.log("current"+prikey);
		meta.admin_address().then(owner_address => {
			
		console.log("owner"+owner_address);
	
		if(owner_address==pkey){
			meta.admin_address();
			meta.table_options();
			$("#target").load('brokerpage')
		}
		else if(owner_address!=pkey){
			meta.getAccounts();
			meta.balanceOf_func();
			meta.table_options();
			meta.better_table();
			$("#target").load('cricket');  
		}
	});
	// });

}

async function getUserBalance() {
    let instance = this;
    return new Promise((resolve, reject) => {
			instance.web3.eth.getBalance(account,function(err,result){
				if(err != null) {
				reject(err);
				}
				else{
					var bal = web3.utils.fromWei(result,'ether');
					document.getElementById("address_acc_balance").innerText=parseFloat(bal).toFixed(4)+" ether";
					resolve(web3.utils.fromWei(result,'ether'));
				}
			})
    })
}

// function getAccounts(){
// 	let meta = this;			
	
// }

async function balanceOf_func(){
	var meta= this;
	return new Promise((resolve,reject)=>{
		// meta.getAccounts().then(address=>{
			meta.binaryOption.methods.balanceOf().call({from:account},function(err,balance) {
				var bal = web3.utils.fromWei(balance,'ether');
				console.log("bal"+bal);
				
				document.getElementById("address_balance").innerText=parseFloat(bal).toFixed(4)+" ether";
				$("#address_balance").val(web3.utils.fromWei(balance));	
				resolve(balance);
			})				
		// })
	})
}

var publickey;
async function publickeyconvertion() {
	let meta = this;
	return new Promise((resolve,reject)=>{
	var temp = document.getElementById('private_key').value;
		const privatekeydetails = meta.web3.eth.accounts.privateKeyToAccount("0x"+temp,'hex');
	document.getElementById("demo").value=(privatekeydetails['address']);
			resolve (privatekeydetails['address']);
			alert(privatekeydetails['address'])
	})
	
}

async function optionDetails_function(ids){
	return new Promise((resolve,reject)=>{
	binaryOption.methods.optionDetails(ids).call(function(err,result) {
		resolve (result);
	})
})
}

function selected(){
	var t1=document.getElementById('t_m1').value;
	var t2=document.getElementById('t_m2').value;
	var gm;
		if ($('#s1').is(':checked')) {
			gm = 1;
			document.getElementById('t').value=t1
		}
		else if ($('#s2').is(':checked')) {
			gm = 2;
			document.getElementById('t').value=t2
		}
}


function create_option(){

	console.log("in option");
	return new Promise((resolve,reject)=>{

	alert(original_key)
	var team1 = document.getElementById("t_m1").value; 
	var team2 = document.getElementById("t_m2").value;

	if ($('#s1').is(':checked')) {
		var choice = team1;
      }
      else if ($('#s2').is(':checked')) {
		var choice = team2;
	  }
	  alert(choice)
	var _minbet = document.getElementById("min_bet").value;
	var _maxbet = document.getElementById("max_bet").value;
	var _start_time = document.getElementById("start_time").value;
	var _end_time = document.getElementById("end_time").value;
	var minbet=web3.utils.toWei(_minbet,'ether')
	var maxbet=web3.utils.toWei(_maxbet,'ether')

	var startTime = parseInt(Math.round(new Date(_start_time).getTime() / 1000))
	var endTime = parseInt(Math.round(new Date(_end_time).getTime() / 1000))
	alert(_minbet)
	alert(_maxbet)
	alert(startTime)
	alert(endTime)
	return
	console.log(_end_time)
	var meta=this;
	if(original_key.length==64){
if (($('#min_bet').val() != '') && ($('#max_bet').val() != '')){
// meta.getAccounts().then(current_address => { 
// var senderAddress = current_address;
try
{
web3.eth.getTransactionCount(account,function(err,result){
var  nonce = result.toString(16);

var privateKey = ethereumjs.Buffer.Buffer(original_key,'hex'); 
const object = meta.web3.eth.accounts.privateKeyToAccount("0x"+original_key,'hex');
var senderAddress = object['address']
console.log(minbet)
	console.log(maxbet);
console.log(startTime);
console.log(endTime);

var contractFunction =binaryOption.methods.createOption(minbet,maxbet,startTime,endTime);  
var functionAbi = contractFunction.encodeABI()
var  txParams  = {
 nonce: '0x' +nonce,
 gasPrice:  '0x4A817C800',
 gasLimit: 4000000,
 from :senderAddress,
 to: contract_Address,
 value: '0x00',
 data: functionAbi
}      
var tx = new ethereumjs.Tx(txParams);
tx.sign(privateKey);
const serializedTx = tx.serialize();
web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt =>{
console.log(receipt['transactionHash']);
hash_function(receipt['transactionHash']).then(res=>{	
	if(res == 0){
		$('#min_bet').val('');								
		$('#max_bet').val('');
		resolve(0)
alert("rejected")
	}
	else if(res == 1) {
		$('#min_bet').val('');								
		$('#max_bet').val('');
		meta.table_options();
		alert("success")
		resolve(1)
	}
	else if(res == 2) {
		$('#min_bet').val('');								
		$('#max_bet').val('');
		alert("Transaction Faild")
		resolve(2)
	}
});

})
})
}
catch(e)
{
console.log(e)
}
// })
}
 else
 {
		$('#min_bet').val('');								
		$('#max_bet').val('');	
		alert("Enter all Details Correctly");
		
	}
}
else{
	$('#min_bet').val('');								
		$('#max_bet').val('');	
		alert("Enter privatekey");
}
	})
}

//betting
async function optionIds(){
	return new Promise((resolve,reject)=>{ 
	binaryOption.methods.optionList().call(function(err,result) {
		resolve (result);
	})
})
}

async function bet_Details(id,address){
	return new Promise((resolve,reject)=>{
	binaryOption.methods.betDetails(id).call({from:address},function(err,result) {
		resolve (result);
	})
})
}

function bet(){
	
	var meta=this;
	alert('hello')
	// check("india","england","newzealand")
	var opid = parseInt(document.getElementById("optionid").value);
			var amout = document.getElementById("amount").value;
			var amt = parseInt(web3.utils.toWei(amout,'ether'));
			if(prikey.length==64){
		var gm;
		if ($('#g1').is(':checked')) {
			gm = 1;
		}
		else if ($('#g2').is(':checked')) {
			gm = 2;
		}
		var gf;
		gf=parseInt(gm)
		console.log(gf,opid,amt);
		
		if (($('#optionid').val() != '') && ($('#amount').val() != '') && (gm == 1 || gm==2)){
		// 	meta.getAccounts().then(current_address => {     
		// var senderAddress = current_address;
		// console.log(senderAddress);
		try
		{
		web3.eth.getTransactionCount(meta.prikey,function(err,result){
			
		console.log(result);
		
		var  nonce = result.toString(16);

		var privateKey = ethereumjs.Buffer.Buffer(prikey,'hex'); 
	 
		var contractFunction =binaryOption.methods.betting(opid,gf,amt);  
		var functionAbi = contractFunction.encodeABI()
		var  txParams  = {
		 nonce: '0x' +nonce,
		 gasPrice:  '0x4A817C800',
		 gasLimit: 4000000,
		 from :senderAddress,
		 to: contract_Address,
		 value: '0x00',
		 data: functionAbi
	 }      
	 var tx = new ethereumjs.Tx(txParams);
	 tx.sign(privateKey);
	 const serializedTx = tx.serialize();
	 web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt =>{
		console.log(receipt);
		console.log(receipt['transactionHash']);
		hash_function(receipt['transactionHash']).then(res=>{
			if(res == 0){
				$('#optionid').val('');	
				$('#amount').val('');								
				document.getElementById("g1").checked = null;
				 document.getElementById("g2").checked = null;
		alert("rejected")
			}
			else if(res == 1) {
				$('#optionid').val('');	
				$('#amount').val('');								
				document.getElementById("g1").checked = null;
				 document.getElementById("g2").checked = null;
				 meta.table_options();
				meta.better_table();
				alert("success")
			}
			else if(res == 2) {
				$('#optionid').val('');	
				$('#amount').val('');								
				document.getElementById("g1").checked = null;
				 document.getElementById("g2").checked = null;
				alert("Transaction Faild")
			}
		});
	 })
	})
 }
 catch(e)
 {
	 console.log(e)
 }
			// })
		}
		 else
		 {
			$('#optionid').val('');	
				$('#amount').val('');								
				document.getElementById("g1").checked = null;
				 document.getElementById("g2").checked = null;
				alert("Enter all Details Correctly");
				
			}	
		}
		else{
			$('#optionid').val('');	
			$('#amount').val('');								
			document.getElementById("g1").checked = null;
			 document.getElementById("g2").checked = null;
			alert("Enter PrivateKey");
		}	
}

function change_bet(){
	var meta=this;
	var opid = document.getElementById("change_optionid").value;
	if(prikey.length==64){
		var gm;
		if ($('#g3').is(':checked')) {
			gm = 1;
		}
		else if ($('#g4').is(':checked')) {
			gm = 2;
		}
		var gf;
		gf=parseInt(gm)
		console.log(gf,opid);
		
		if (($('#change_optionid').val() != '') && (gf == 1 || gf == 2)){
		// 	meta.getAccounts().then(current_address => {     
		// var senderAddress = current_address;
		// console.log(senderAddress);
		try
		{
		web3.eth.getTransactionCount(meta.prikey,function(err,result){
			
		console.log(result);
		
		var  nonce = result.toString(16);

		var privateKey = ethereumjs.Buffer.Buffer(prikey,'hex'); 
	 
		var contractFunction =binaryOption.methods.changeBet(opid,gf);  
		var functionAbi = contractFunction.encodeABI()
		var  txParams  = {
		 nonce: '0x' +nonce,
		 gasPrice:  '0x4A817C800',
		 gasLimit: 4000000,
		 from :senderAddress,
		 to: contract_Address,
		 value: '0x00',
		 data: functionAbi
	 }      
	 var tx = new ethereumjs.Tx(txParams);
	 tx.sign(privateKey);
	 const serializedTx = tx.serialize();
	 web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt =>{
		console.log(receipt);
		console.log(receipt['transactionHash']);
		hash_function(receipt['transactionHash']).then(res=>{
			if(res == 0){
				$('#change_optionid').val('');							
				document.getElementById("g1").checked = null;
				 document.getElementById("g2").checked = null;
		alert("rejected")
			}
			else if(res == 1) {
				$('#change_optionid').val('');							
				document.getElementById("g1").checked = null;
				 document.getElementById("g2").checked = null;
				alert("success")
			}
			else if(res == 2) {
				$('#change_optionid').val('');							
				document.getElementById("g1").checked = null;
				 document.getElementById("g2").checked = null;
				alert("Transaction Faild")
			}
		});
	 })
	})
 }
 catch
 {
	 console.log(error)
 }
			// })
		}
		 else
		 {
			$('#change_optionid').val('');							
				document.getElementById("g1").checked = null;
				 document.getElementById("g2").checked = null;
				alert("Enter all Details Correctly");
				
			}
	}
	else{
		$('#change_optionid').val('');							
		document.getElementById("g1").checked = null;
		 document.getElementById("g2").checked = null;
		alert("Enter PrivateKey");
	}		
}

function increase_bet(){
	console.log("inc");
	var meta=this;
	var opid = document.getElementById("increase_optionid").value;
			var am_t = document.getElementById("increase_amount").value;
			var amt = web3.utils.toWei(am_t,'ether')
			if(prikey.length==64){
		if (($('#increase_optionid').val() != '') && ($('#amt').val() != '')){
		// 	meta.getAccounts().then(current_address => { 
		// var senderAddress = current_address;
		// console.log(senderAddress);
		try
		{
		web3.eth.getTransactionCount(meta.prikey,function(err,result){
			
		console.log(result);
		
		var  nonce = result.toString(16);

		var privateKey = ethereumjs.Buffer.Buffer(prikey,'hex'); 
	 
		var contractFunction =binaryOption.methods.increaseBet(opid,amt);  
		var functionAbi = contractFunction.encodeABI()
		var  txParams  = {
		 nonce: '0x' +nonce,
		 gasPrice:  '0x4A817C800',
		 gasLimit: 4000000,
		 from :senderAddress,
		 to: contract_Address,
		 value: '0x00',
		 data: functionAbi
	 }      
	 var tx = new ethereumjs.Tx(txParams);
	 tx.sign(privateKey);
	 const serializedTx = tx.serialize();
	 web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt =>{
		console.log(receipt);
		console.log(receipt['transactionHash']);
		hash_function(receipt['transactionHash']).then(res=>{
			if(res == 0){
				$('#increase_optionid').val('');	
				$('#increase_amount').val('');	
		alert("rejected")
			}
			else if(res == 1) {
				$('#increase_optionid').val('');	
				$('#increase_amount').val('');	
				meta.table_options();
				meta.better_table();
				alert("success")
			}
			else if(res == 2) {
				$('#increase_optionid').val('');	
				$('#increase_amount').val('');	
				alert("Transaction Faild")
			}
		});
	 })
	})
 }
 catch
 {
	 console.log(error)
 }
			// })
		}
		 else
		 {
			$('#increase_optionid').val('');	
				$('#increase_amount').val('');								
				alert("Enter all Details Correctly");
				
			}	
		}
		else{
			$('#increase_optionid').val('');	
				$('#increase_amount').val('');								
				alert("Enter privatekey");
		}	
}

function decrease_bet(){
	console.log("dec");
	
	var meta=this;
	var opid = document.getElementById("increase_optionid").value;
			var am_t = document.getElementById("increase_amount").value;
			var amt = web3.utils.toWei(am_t,'ether')
			if(prikey.length==64){
		if (($('#increase_optionid').val() != '') && ($('#increase_amount').val() != '')){
		// 	meta.getAccounts().then(current_address => { 
		// var senderAddress = current_address;
		// console.log(senderAddress);
		try
		{
		web3.eth.getTransactionCount(meta.prikey,function(err,result){
			
		console.log(result);
		
		var  nonce = result.toString(16);

		var privateKey = ethereumjs.Buffer.Buffer(prikey,'hex'); 
	 
		var contractFunction =binaryOption.methods.decreaseBet(opid,amt);  
		var functionAbi = contractFunction.encodeABI()
		var  txParams  = {
		 nonce: '0x' +nonce,
		 gasPrice:  '0x4A817C800',
		 gasLimit: 4000000,
		 from :senderAddress,
		 to: contract_Address,
		 value: '0x00',
		 data: functionAbi
	 }      
	 var tx = new ethereumjs.Tx(txParams);
	 tx.sign(privateKey);
	 const serializedTx = tx.serialize();
	 web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt =>{
		console.log(receipt);
		console.log(receipt['transactionHash']);
		hash_function(receipt['transactionHash']).then(res=>{
			if(res == 0){
				$('#increase_optionid').val('');	
				$('#increase_amount').val('');	
		alert("rejected")
			}
			else if(res == 1) {
				$('#increase_optionid').val('');	
				$('#increase_amount').val('');	
				meta.table_options();
				meta.better_table();
				alert("success")
			}
			else if(res == 2) {
				$('#increase_optionid').val('');	
				$('#increase_amount').val('');	
				alert("Transaction Faild")
			}
		});
	 })
	})
 }
 catch
 {
	 console.log(error)
 }
			// })
		}
		 else
		 {
			$('#increase_optionid').val('');	
				$('#decrease_amount').val('');								
				alert("Enter all Details Correctly");
				
			}	
		}
		else{
			$('#increase_optionid').val('');	
			$('#decrease_amount').val('');								
			alert("Enter Privatekey");
		}	
}

function exit_bet(){
	var meta=this;
	var opid = document.getElementById("increase_optionid").value;
	if(prikey.length==64){
		if (($('#increase_optionid').val() != '')){
		// 	meta.getAccounts().then(current_address => { 
		// var senderAddress = current_address;
		// console.log(senderAddress);
		try
		{
		web3.eth.getTransactionCount(meta.prikey,function(err,result){
			
		console.log(result);
		
		var  nonce = result.toString(16);

		var privateKey = ethereumjs.Buffer.Buffer(prikey,'hex'); 
	 
		var contractFunction =binaryOption.methods.exitBet(opid);  
		var functionAbi = contractFunction.encodeABI()
		var  txParams  = {
		 nonce: '0x' +nonce,
		 gasPrice:  '0x4A817C800',
		 gasLimit: 4000000,
		 from :senderAddress,
		 to: contract_Address,
		 value: '0x00',
		 data: functionAbi
	 }      
	 var tx = new ethereumjs.Tx(txParams);
	 tx.sign(privateKey);
	 const serializedTx = tx.serialize();
	 web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt =>{
		console.log(receipt);
		console.log(receipt['transactionHash']);
		hash_function(receipt['transactionHash']).then(res=>{
			if(res == 0){
				$('#exit_optionid').val('');
		alert("rejected")
			}
			else if(res == 1) {
				$('#exit_optionid').val('');
				meta.table_options();
				meta.better_table();
				alert("success")
			}
			else if(res == 2) {
				$('#exit_optionid').val('');
				alert("Transaction Faild")
			}
		});
	 })
	})
 }
 catch
 {
	 console.log(error)
 }
			// })
		}
		 else
		 {
			$('#exit_optionid').val('');									
				alert("Enter all Details Correctly");
				
			}	
		}
		else{
			$('#exit_optionid').val('');									
				alert("Enter Privatekey");
		}	
}

function set_Result(){
	var meta= this; 
	var opid = document.getElementById("resultbet_id").value;
	var gm;
		if ($('#g1').is(':checked')) {
			gm = 1;
		}
		else if ($('#g2').is(':checked')) {
			gm = 2;
		}
		else if ($('#g3').is(':checked')) {
			gm = 3;
		}
		console.log("id"+opid);
		
	if(prikey.length==64){
		if (gm == 1 || gm==2 || gm==3){
		// 	meta.getAccounts().then(current_address => { 
		// var senderAddress = current_address;
		// console.log(senderAddress);
		try
		{
		web3.eth.getTransactionCount(meta.prikey,function(err,result){
			
		console.log(result);
		
		var  nonce = result.toString(16);

		var privateKey = ethereumjs.Buffer.Buffer(prikey,'hex'); 
	 
		var contractFunction =binaryOption.methods.setResult(opid,gm);  
		var functionAbi = contractFunction.encodeABI()
		var  txParams  = {
		 nonce: '0x' +nonce,
		 gasPrice:  '0x4A817C800',
		 gasLimit: 4000000,
		 from :senderAddress,
		 to: contract_Address,
		 value: '0x00',
		 data: functionAbi
	 }      
	 var tx = new ethereumjs.Tx(txParams);
	 tx.sign(privateKey);
	 const serializedTx = tx.serialize();
	 web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt =>{
		console.log(receipt);
		console.log(receipt['transactionHash']);
		hash_function(receipt['transactionHash']).then(res=>{
			if(res == 0){
				$('#result_optionid').val('');									
			$('#result').val('');
		alert("rejected")
			}
			else if(res == 1) {
				$('#result_optionid').val('');									
			$('#result').val('');
			meta.finalize_Option(opid);
				alert("success")
			}
			else if(res == 2) {
				$('#result_optionid').val('');									
			$('#result').val('');
				alert("Transaction Faild")
			}
		});
	 })
	})
 }
 catch
 {
	 console.log(error)
 }
			// })
		}
		 else
		 {
			$('#result_optionid').val('');									
			$('#result').val('');		
				alert("Enter all Details Correctly");				
			}
		}
		else{
			$('#result_optionid').val('');									
			$('#result').val('');		
				alert("Enter Privatekey");
		}		
}

function finalize_Option(op_id){
	var meta=this;
	// var opid = document.getElementById("finalize_optionid").value;
	if(prikey.length==64){
		if (op_id != ''){
		// 	meta.getAccounts().then(current_address => {  
		// var senderAddress = current_address;
		// console.log(senderAddress);
		try
		{
		web3.eth.getTransactionCount(meta.prikey,function(err,result){
			
		console.log(result);
		
		var  nonce = result.toString(16);

		var privateKey = ethereumjs.Buffer.Buffer(prikey,'hex'); 
	 
		var contractFunction =binaryOption.methods.finalizeOption(op_id);  
		var functionAbi = contractFunction.encodeABI()
		var  txParams  = {
		 nonce: '0x' +nonce,
		 gasPrice:  '0x4A817C800',
		 gasLimit: 4000000,
		 from :senderAddress,
		 to: contract_Address,
		 value: '0x00',
		 data: functionAbi
	 }      
	 var tx = new ethereumjs.Tx(txParams);
	 tx.sign(privateKey);
	 const serializedTx = tx.serialize();
	 web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt =>{
		console.log(receipt);
		console.log(receipt['transactionHash']);
		hash_function(receipt['transactionHash']).then(res=>{
			if(res == 0){
		$('#finalize_optionid').val('');
		alert("rejected")
			}
			else if(res == 1) {
				$('#finalize_optionid').val('');
				alert("success")
			}
			else if(res == 2) {
				$('#finalize_optionid').val('');
				alert("Transaction Faild")
			}
		});
	 })
	})	
 }
 catch
 {
	 console.log(error)
 }
			// })
		}
		 else
		 {
			$('#finalize_optionid').val('');									
				alert("Enter all Details Correctly");
				
			}	
	}
	else{
		$('#finalize_optionid').val('');									
		alert("Enter Privatekey");
	}
}

function claim_function(){
	var meta = this;
	var opid = document.getElementById("claim_optionid").value;
	if(prikey.length==64){
		if (($('#claim_optionid').val() != '')){
		// 	meta.getAccounts().then(current_address => {    
		// var senderAddress = current_address;
		// console.log(senderAddress);
		try
		{
		web3.eth.getTransactionCount(meta.prikey,function(err,result){
			
		console.log(result);
		
		var  nonce = result.toString(16);

		var privateKey = ethereumjs.Buffer.Buffer(prikey,'hex'); 
	 
		var contractFunction =binaryOption.methods.claim(opid);  
		var functionAbi = contractFunction.encodeABI()
		var  txParams  = {
		 nonce: '0x' +nonce,
		 gasPrice:  '0x4A817C800',
		 gasLimit: 4000000,
		 from :senderAddress,
		 to: contract_Address,
		 value: '0x00',
		 data: functionAbi
	 }      
	 var tx = new ethereumjs.Tx(txParams);
	 tx.sign(privateKey);
	 const serializedTx = tx.serialize();
	 web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt =>{
		console.log(receipt);
		console.log(receipt['transactionHash']);
		hash_function(receipt['transactionHash']).then(res=>{
			if(res == 0){
				$('#claim_optionid').val('');	
		alert("rejected")
			}
			else if(res == 1) {
				$('#claim_optionid').val('');	
				alert("success")
			}
			else if(res == 2) {
				$('#claim_optionid').val('');	
				alert("Transaction Faild")
			}
		});
	 })
	})
	document.getElementById("claim_optionid").value = null;
 }
 catch(e)
 {
	 console.log(e)
 }
			// })
		}
		 else
		 {
			$('#claim_optionid').val('');									
				alert("Enter all Details Correctly");
				
			}	
		}
		else{
			$('#claim_optionid').val('');									
				alert("Enter Privatekey");
		}	
}

//hash function
async function hash_function(hash) {
	var meta=this;
	return new Promise((resolve,reject)=>{

		web3.eth.getTransactionReceipt(hash, function (err, result) {
			var accountInterval = setInterval(function()
      {
        meta.web3.eth.getTransactionReceipt(hash,function(err,result){
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
		})	
})
}

//Accounts contract
function deposite_function(){
	var meta=this;
	var amount = document.getElementById("dep_amount").value;
	if(original_key.length==64){
	var amt= web3.utils.toWei(amount,'ether')
		// 	meta.getAccounts().then(current_address => {  
		// var senderAddress = current_address;
		// console.log(senderAddress);
		try
		{
		web3.eth.getTransactionCount(account,function(err,result){
		var  nonce = result.toString(16);
		var privateKey = ethereumjs.Buffer.Buffer(original_key,'hex'); 
		var contractFunction =binaryOption.methods.deposit();  
		var functionAbi = contractFunction.encodeABI()
		var  txParams  = {
		 nonce: '0x' +nonce,
		 gasPrice:  '0x4A817C800',
		 gasLimit: 4000000,
		 from :account,
		 to: contract_Address,
		 value: web3.utils.toHex(amt),
		 data: functionAbi
	 }      
	 var tx = new ethereumjs.Tx(txParams);
	 tx.sign(privateKey);
	 const serializedTx = tx.serialize();
	 web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt =>{
		console.log(receipt);
		console.log(receipt['transactionHash']);
		hash_function(receipt['transactionHash']).then(res=>{
			if(res == 0){
				$('#dep_amount').val('');		
		alert("rejected")
			}
			else if(res == 1) {
				$('#dep_amount').val('');
				meta.balanceOf_func();		
				alert("success")
			}
			else if(res == 2) {
				$('#dep_amount').val('');		
				alert("Transaction Faild")
			}
		});
	 })
	})
 }
 catch
 {
	 console.log(error)
 }
			// })	 
		}
		else{		
			$('#dep_amount').val('');									
				alert("Enter privatekey");
		}	
}

function withdraw_function(){
	var meta=this;
	var amount = document.getElementById("withdraw_amount").value;
	var amt= web3.utils.toWei(amount.toString(),'ether')
	if(original_key.length==64){
		// 	meta.getAccounts().then(current_address => {  
		// var senderAddress = current_address;
		// console.log(senderAddress);
		try
		{
			meta.web3.eth.getTransactionCount(account,function(err,result){
			
		console.log(result);
		
		var  nonce = result.toString(16);

		var privateKey = ethereumjs.Buffer.Buffer(original_key,'hex'); 
	 
		var contractFunction =meta.binaryOption.methods.withdraw(amt);  
		var functionAbi = contractFunction.encodeABI()
		var  txParams  = {
		 nonce: '0x' +nonce,
		 gasPrice:  '0x4A817C800',
		 gasLimit: 4000000,
		 from :account,
		 to: meta.contract_Address,
		 value: '0x00',
		 data: functionAbi
	 }      
	 var tx = new ethereumjs.Tx(txParams);
	 tx.sign(privateKey);
	 const serializedTx = tx.serialize();
	 meta.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt =>{
		console.log(receipt);
		console.log(receipt['transactionHash']);
		meta.hash_function(receipt['transactionHash']).then(res=>{
			document.getElementById("withdraw_amount").value='';
			if(res == 0){
		alert("rejected")
			}
			else if(res == 1) {
				meta.balanceOf_func();	
				meta.getUserBalance();
				alert("success")
			}
			else if(res == 2) {
				alert("Transaction Faild")
			}
		});
	 })
	})
 }
 catch
 {
	 console.log(error)
 }
			// })	 
		}
		else{		
			$('#dep_amount').val('');									
				alert("Enter privatekey");
		}	
}

//ownable contract
function transferOwnership_function(){
	var meta=this;
	var newowner = document.getElementById("new_owner_address").value;
	if(prikey.length==64){
		// 	meta.getAccounts().then(current_address => {  
		// var senderAddress = current_address;
		// console.log(senderAddress);
		try
		{
		web3.eth.getTransactionCount(meta.prikey,function(err,result){
			
		console.log(result);
		
		var  nonce = result.toString(16);

		var privateKey = ethereumjs.Buffer.Buffer(prikey,'hex'); 
	 
		var contractFunction =binaryOption.methods.transferOwnership(newowner);  
		var functionAbi = contractFunction.encodeABI()
		var  txParams  = {
		 nonce: '0x' +nonce,
		 gasPrice:  '0x4A817C800',
		 gasLimit: 4000000,
		 from :senderAddress,
		 to: contract_Address,
		 value: '0x00',
		 data: functionAbi
	 }      
	 var tx = new ethereumjs.Tx(txParams);
	 tx.sign(privateKey);
	 const serializedTx = tx.serialize();
	 console.log("success")
	//  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt =>{
	// 	console.log(receipt);
	// 	console.log(receipt['transactionHash']);
	// 	hash_function(receipt['transactionHash']).then(res=>{
	// 		if(res == 0){
	// 			$('#new_owner_address').val('');		
	// 	alert("rejected")
	// 		}
	// 		else if(res == 1) {
	// 			$('#new_owner_address').val('');		
	// 			alert("success")
	// 		}
	// 		else if(res == 2) {
	// 			$('#new_owner_address').val('');		
	// 			alert("Transaction Faild")
	// 		}
	// 	});
	//  })
	})
 }
 catch
 {
	 console.log(error)
 }
			// })	 
		}
		else{		
			$('#new_owner_address').val('');									
				alert("Enter privatekey");
		}	
}

(document).ready(function(){

	$("select").click(function(){
	$("option").click(function(){

		
		if($("#one").val() == "1")
		$("#secondname").show();
		$("#firstname").show();
		alert("1");

			if($("#two").val() == 2)
			$("#secondname").show();
			$("#firstname").show();
			alert("2");


				if($("#three").val() == 3)
				$("#secondname").show();
				alert("3");
	})
	$("select").click(function(){
		// $("option").click(function(){

			
			if($("#one").val() == 1)
			$("#secondname").show();
			$("#firstname").show();
			alert("1");
		})
		
	

	
	})

})

//tables
function table_options(){
	$("#body_option").html('');
	var meta =this;

	meta.optionIds().then(ids=>{		 		
		for (let i=1;i<=ids.length;i++){	
				  
	meta.optionDetails_function(i).then(option_records=>{

		if(option_records[3]==0 && option_records[2]==0){
			
			document.getElementById('wins').innerText=55;
			document.getElementById('loss').innerText=10;

			document.getElementById('total').innerText=parseInt(option_records[4][0])+parseInt(option_records[4][1])
			$("#body_option").append('<tr><td>'+i+'</td><td>'+web3.utils.fromWei(option_records[0])+'</td><td>'+web3.utils.fromWei(option_records[1])+'</td><td>'+"Pending"+'</td><td>'+web3.utils.fromWei(option_records[4][0])+'</td><td>'+web3.utils.fromWei(option_records[4][1])+'</td><td><button data-toggle="modal" class="btn btn-default dropdown-toggle" data-target="#myModal" type="button" onclick="setBetId('+i+','+0+')" aria-expanded="false"> Bet Details <span class="caret"></span> </td></button></tr>')

		}
		else if(option_records[3]==1){

			if(option_records[2]==1){

				$("#body_option").append('<tr><td>'+i+'</td><td>'+web3.utils.fromWei(option_records[0])+'</td><td>'+web3.utils.fromWei(option_records[1])+'</td><td>'+"LOW"+'</td><td>'+option_records[4][0]+'</td><td>'+option_records[4][1]+'</td><td><button data-toggle="modal" class="btn btn-default dropdown-toggle" data-target="#myModal" type="button" onclick="setBetId('+i+','+1+')" aria-expanded="false"> Bet Details <span class="caret"></span> </td></button></tr>')
			}
			else if(option_records[2]==2){

				$("#body_option").append('<tr><td>'+i+'</td><td>'+web3.utils.fromWei(option_records[0])+'</td><td>'+web3.utils.fromWei(option_records[1])+'</td><td>'+"HIGH"+'</td><td>'+option_records[4][0]+'</td><td>'+option_records[4][1]+'</td><td><button data-toggle="modal" class="btn btn-default dropdown-toggle" data-target="#myModal" type="button" onclick="setBetId('+i+','+2+')" aria-expanded="false"> Bet Details <span class="caret"></span> </td></button></tr>')
			}
		}
})		
		}
	})
// });
}

function result_table(){
	$("#result_body").html('');
	var meta =this;
	// meta.getAccounts().then(address=>{		
	meta.optionIds().then(ids=>{		 		
		for (let i=1;i<=ids.length;i++){			
	meta.optionDetails_function(i).then(option_records=>{
		if(option_records[3]==0 && option_records[2]==0){
			// var j=i;
			$("#result_body").append('<tr><td>'+i+'</td><td>'+web3.utils.fromWei(option_records[0])+'</td><td>'+web3.utils.fromWei(option_records[1])+'</td><td>'+"Pending"+'</td><td>'+web3.utils.fromWei(option_records[4][0])+'</td><td>'+web3.utils.fromWei(option_records[4][1])+'</td><td><button data-toggle="modal" class="btn btn-default dropdown-toggle" data-target="#myModal" type="button" onclick="setResultBetId('+i+')" aria-expanded="false"> Bet Details <span class="caret"></span> </td></button></tr>')
		}
		else if(option_records[3]==1){
			if(option_records[2]==1){
				$("#result_body").append('<tr><td>'+i+'</td><td>'+web3.utils.fromWei(option_records[0])+'</td><td>'+web3.utils.fromWei(option_records[1])+'</td><td>'+"LOW"+'</td><td>'+option_records[4][0]+'</td><td>'+option_records[4][1]+'</td></tr>')
			}
			else if(option_records[2]==2){
				$("#result_body").append('<tr><td>'+i+'</td><td>'+web3.utils.fromWei(option_records[0])+'</td><td>'+web3.utils.fromWei(option_records[1])+'</td><td>'+"HIGH"+'</td><td>'+option_records[4][0]+'</td><td>'+option_records[4][1]+'</td></tr>')
			}
		}
	})			
		}
	})
// });
}

function setResultBetId(betId){
	document.getElementById('resultbet_id').value =betId;
}

function setBetId(betId,state){
	
	$('#target2').hide(true)
	$('#target1').hide(true)

	document.getElementById('myModalLabel').innerText ="Bet ID: "+betId;

	binaryOption.methods.betDetails(betId).call({from:account},function(err,result) {
		
		console.log(result);
		if(result[2] != 0 && result[0] != 0)
		{
			//
		}

	if(state == 0)
	{

		$('#target1').show(true)
	}
	else if(state == 1 || state == 2)
	{
		$('#target_main').hide(true)
	    
	}	
})
}

function better_table(){
	$("#body_better").html('');
	var meta =this;
	// meta.getAccounts().then(address=>{
		meta.optionIds().then(ids=>{
			for (let i=1;i<=ids.length;i++){
				meta.bet_Details(i,account).then(betdetails=>{
					if(betdetails[1]!=0){
						if(betdetails[1]==1){
							$("#body_better").append('<tr><td>'+i+'</td><td>'+web3.utils.fromWei(betdetails[0],'ether')+'</td><td>'+"LOW"+'</td></tr>')
						}
						else if(betdetails[1]==2){
							$("#body_better").append('<tr><td>'+i+'</td><td>'+web3.utils.fromWei(betdetails[0],'ether')+'</td><td>'+"HIGH"+'</td></tr>')
						}
					}
				})
			}
		})
	// })
}