import { CartService } from './../../core/services/cart/cart.service';
import { CheckoutComponent } from './../../pages/checkout/checkout.component';
import { MyTranslateService } from './../../core/services/myTranslate/my-translate.service';
import { Component, computed, inject, input, InputSignal, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { ProductsService } from './../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive,FormsModule,TranslatePipe ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {


  readonly authService= inject(AuthService)
 private readonly myTranslateService= inject(MyTranslateService)
 private readonly translateService= inject(TranslateService)
 private readonly cartService= inject(CartService)
 private readonly productsService= inject(ProductsService)
 private readonly router= inject(Router)

  isLogin:InputSignal<boolean> = input<boolean>(true)
  text = signal<string>('');
  // searchText: string = '';
  countCart:Signal<number> = computed(()=>this.cartService.cartNumber())
 products: WritableSignal<Iproduct[]> = signal([]);  
 




 searchText: string = '';

 
 @Output() searchEvent = new EventEmitter<string>();

 onSearch() {
   this.searchEvent.emit(this.searchText);
 }

  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
      this.cartService.cartNumber.set(res.numOfCartItems)

      }
    })


    this.getProductsData();
    this.getProductsData();
  }

  change(lang:string):void{

    this.myTranslateService.changeLangTranslate(lang);
  }


  currentLang(lang:string):boolean{
  return this.translateService.currentLang === lang
  }


  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products.set(res.data); 
        console.log("All Products:", this.products()); 
        // this.paginateProducts(); 
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

//   get filteredProducts() {
//     return computed(() => this.products().filter(product => 
//       product.title.toLowerCase().includes(this.text().toLowerCase())
//     ));
//   }
  



//   onSearch() {
//   this.router.navigate(['/home'], { queryParams: { search: this.searchText } });
// }
}