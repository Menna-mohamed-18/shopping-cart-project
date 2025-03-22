import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient) { }

  myToken:any = localStorage.getItem('userToken');

  getorder(id:string , data:object):Observable<any>{

    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${window.location.origin}` , 
      {
        shippingAddress: data
    },

    {
      headers:{

        token:this.myToken
      }
    }
    )
  }




  getOrderCash(id: string, data: any): Observable<any> {
    return this.httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${id}`,

      {
        shippingAddress: data,
      }
    );
  }




  getOrderAfterPyment(id:string):Observable<any>{
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  }
}
