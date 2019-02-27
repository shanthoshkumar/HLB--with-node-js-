import { Component, OnInit } from '@angular/core';
import { BinaryService } from "../service/binary.service";
import swal from 'sweetalert';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-changeowner',
  templateUrl: './changeowner.component.html',
  styleUrls: ['./changeowner.component.css']
})
export class ChangeownerComponent implements OnInit {

  constructor(private binary:BinaryService,private spinner:NgxSpinnerService) { }

  transferOwnership(){
    this.spinner.show();
     var newOwner=(document.getElementById("addressid") as HTMLInputElement).value;
     alert('addressid');
    this.binary.transferOwnership(newOwner).then(res =>{
      (document.getElementById("addressid") as HTMLInputElement).value = "";
      this.spinner.hide();
      if(res == 1) {
        swal("Ownership Transfered")
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
