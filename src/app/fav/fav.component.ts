import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../core/services/wishlist/wishlist.service';
import { Ifav } from '../shared/interfaces/ifav';
import { TermtextPipe } from '../core/pipes/termtext.pipe';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-fav',
  imports: [TermtextPipe,TranslatePipe],
  templateUrl: './fav.component.html',
  styleUrl: './fav.component.scss'
})
export class FavComponent implements OnInit {

  private readonly wishlistService =inject(WishlistService)
  private readonly toastrService =inject(ToastrService)

  favDetails:Ifav={} as Ifav;




  ngOnInit(): void {
      this.getFavItem()
  }

  getFavItem():void{
    this.wishlistService.getFavCart().subscribe({
      next:(res) =>{
        console.log(res);
        this.favDetails = res;
      },
      error:(err) =>{
        console.log(err);
        
      }
    })
  }



  removeAddedFav(id:string):void{

    this.wishlistService.removeFav(id).subscribe({
      next:(res) =>{
        console.log(res);
        this.favDetails.data = this.favDetails.data.filter(item => item.id !== id);     
        // this.favDetails = res;
        if(res.status === 'success'){
          this.toastrService.success(res.message , 'shopping cart')
        }

      },
      error:(err) =>{
        console.log(err);
        
      }
    })
  }
}
