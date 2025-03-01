import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { OrdersService } from '../core/services/orders/orders.service';
import { Iorder } from '../iorder';

import { CurrencyPipe, DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe,TranslatePipe,DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{

 private readonly ordersService = inject(OrdersService);
 private readonly activatedRoute = inject(ActivatedRoute);
  

 orderItemsinformaion: WritableSignal<Iorder[]> = signal([]);
 userId:string='';
 cartId:string='';
 ngOnInit(): void {

  this.userId=localStorage.getItem('userorders')!;
  this.getItem(this.userId);




 }



 
//  getAllOrdersData(cartId:string):void{
//   this.ordersService.getAllOrder(cartId).subscribe({

//     next:(res)=>{
//       console.log(res);
      
//     },
//     error:(err)=>{
//       console.log(err);
      
//     }
//   })
//  }




getItem(id:string):void{

  this.ordersService.getOrderAfterPyment(id).subscribe({
    next:(res)=>{
      if(this.userId){
        this. orderItemsinformaion.set(res)
        console.log(res);
        
      }
    }
  })
}
}
