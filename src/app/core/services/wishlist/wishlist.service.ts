import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  myToken:any = localStorage.getItem('userToken');

  constructor(private httpClient : HttpClient) { }

  addFavToCart(id:string):Observable<any>
  {

    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist' , 
      {
        "productId": id
    },

    {
      headers:{
        token:this.myToken,
      }
    }
    )
  }



  getFavCart():Observable<any>{
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist' , 
      {
        headers:{
          token:this.myToken,
        }
      }
    )
  }


  removeFav(id:string):Observable<any>{
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` ,
    {
      headers:{
        token:this.myToken
      }
    }
    )
  }
}
