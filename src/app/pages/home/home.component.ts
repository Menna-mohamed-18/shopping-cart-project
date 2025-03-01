import { BrandsService } from './../../core/services/brands/brands.service';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from './../../core/services/products/products.service';
// import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Icategory } from '../../shared/interfaces/icategory';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SalePipe } from '../../core/pipes/sale.pipe';
import {  CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe,CommonModule } from '@angular/common';
import { Component, computed, inject, input, InputSignal, OnInit, Signal, signal , WritableSignal} from '@angular/core';

import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Ibrands } from '../../shared/interfaces/ibrands';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatePipe } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule,CarouselModule ,RouterLink ,TermtextPipe,FormsModule ,TranslatePipe,CommonModule,SearchPipe], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly toastrService = inject(ToastrService);
private readonly categoriesService = inject(CategoriesService);
private readonly cartService = inject(CartService);
private readonly wishlistService = inject(WishlistService);
private readonly brandsService = inject(BrandsService);
private readonly route = inject(ActivatedRoute);
private readonly httpClient = inject(HttpClient);



text:string = " ";
 isLogin:InputSignal<boolean> = input<boolean>(true)

  countCart:Signal<number> = computed(()=>this.cartService.cartNumber())


  filteredProducts: any[] = [];
  Math = Math; 
  products: WritableSignal<Iproduct[]> = signal([]); 
  paginatedProducts: WritableSignal<Iproduct[]> = signal([]); 

  currentPage: number = 1; 
  itemsPerPage: number = 8; 
  productss: any[] = [];
  myToken:any= localStorage.getItem('userToken');


  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    
  
    nav: true
    
  }
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 4
      },
      400: {
        items: 4
      },
      740: {
        items: 6
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  



  

wishlist: string[] = [];
// products:Iproduct[]=[];
// products:WritableSignal<Iproduct[]> = signal([])
// categories:Icategory[]=[];
categories:WritableSignal<Icategory[]> = signal([])

brands:Ibrands[] =[];

  ngOnInit(): void {
    this.getProductsData();
    this.getProductsData();
  this.getCategoryData();
  this.getBrandsData()
  // this.loadProducts();

  const storedWishlist = localStorage.getItem('wishlist');
  if (storedWishlist) {
    this.wishlist = JSON.parse(storedWishlist);

    this.route.queryParams.subscribe(params => {
      const searchQuery = params['search'] ? params['search'].toLowerCase() : '';
      this.filteredProducts = this.products().filter(product =>
        product.title.toLowerCase().includes(searchQuery)
      );
    });
  }

  this.productsService.getAllProducts().subscribe({
    next: (res) => {
      this.products.set(res.data);
      this.filteredProducts = [...res.data]; 
    },
    error: (err) => {
      console.log(err);
    },
  });

  
  this.route.queryParams.subscribe(params => {
    const searchQuery = params['search'] ? params['search'].toLowerCase() : '';
    this.filteredProducts = this.products().filter(product =>
      product.title?.toLowerCase().includes(searchQuery)
    );
  });

}




  getCategoryData():void{
 
    this.categoriesService.getAllCategories().subscribe({
      next:(res) =>{
        console.log(res.data);
        this.categories.set(res.data)
  
  
      },
      error:(err) =>{
        console.log(err);
        
      },
    });
  }


  
  addCartItem(id: string, skipLoading: boolean = false): void {
    const headers = skipLoading ? { 'skip-loading': 'true' } : {}; // إضافة الهيدر إذا كان التخطي مطلوبًا
  
    this.cartService.addProductToCart(id, headers).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'SUCCESS');
          this.cartService.cartNumber.set(res.numOfCartItems);
          console.log(this.cartService.cartNumber());
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



  // addFavItem(id:string):void{
// this.wishlistService.addFavToCart(id).subscribe({
//   next:(res) =>{
//     console.log(res);
//     if(res.status === 'success'){

//       this.toastrService.success(res.message , 'shopping cart')
//     }
//   },
//   error:(err) =>{
//     console.log(err);
    
//   }
// })



toggleFavItem(id: string): void {
  if (this.wishlist.includes(id)) {
   
    this.wishlistService.removeFav(id).subscribe({
      next: (res) => {
        console.log(res);
        this.wishlist = this.wishlist.filter(itemId => itemId !== id);
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
      this.toastrService.success(res.message , 'wishlist')
       
      },
      error: (err) => {
        console.log(err);
      }
    });
  } else {

    this.wishlistService.addFavToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.wishlist.push(id);
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
       if(res.status === 'success'){

      this.toastrService.success(res.message , 'wishlist')
    }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}



getBrandsData():void{
  this.brandsService.getAllBrands().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.brands =res.data;
    },
    error:(err) =>{
      console.log(err);
      
    }
  })
}








 

getProductsData(): void {
  this.productsService.getAllProducts().subscribe({
    next: (res) => {
      this.products.set(res.data);
      console.log("All Products:", this.products()); 
      this.paginateProducts(); 
    },
    error: (err) => {
      console.log(err);
    }
  });
}

  paginateProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts.set(this.products().slice(startIndex, endIndex));
  
    console.log("Paginated Products:", this.paginatedProducts());
  }


  changePage(next: boolean): void {
    const totalPages = Math.ceil(this.products().length / this.itemsPerPage);
  
    if (next && this.currentPage < totalPages) {
      this.currentPage++;
    } else if (!next && this.currentPage > 1) {
      this.currentPage--;
    }
  
    console.log("Current Page:", this.currentPage);
    this.paginateProducts(); 
  }


  // loadProducts() {
  //   this.productsService.getAllProducts().subscribe((data) => {
  //     this.products = data;
  //     this.filteredProducts = [...this.productss]; // إظهار جميع المنتجات في البداية
  //   });
  // }
  
  // searchProducts() {
  //   if (this.text.trim() === "") {
  //     this.filteredProducts = [...this.products()]; // إظهار جميع المنتجات عند البحث الفارغ
  //   } else {
  //     this.filteredProducts = this.products().filter((product) =>
  //       product.title?.toLowerCase().includes(this.text.toLowerCase())
  //     );
  //   }
  // }
  
}