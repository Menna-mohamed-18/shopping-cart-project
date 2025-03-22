import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  imports: [CarouselModule,CurrencyPipe ,TranslatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

detailsProduct:Iproduct|null = null ;


  ngOnInit(): void {

    console.log("helloo");
    
   this.activatedRoute.paramMap.subscribe( {
    next:( res )=>{
   let idProduct =  res.get('id');
      this.productsService.getSpecificProducts(idProduct).subscribe({
        next:(res) =>{
 console.log(res.data);

 this.detailsProduct=res.data;
console.log(this.detailsProduct?.images);

        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    },
    error:(err)=>{
      console.log(err);
      
    }
   })   
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 4
      },
      400: {
        items: 4
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: false
  }


  

}
