import { ToastrService } from 'ngx-toastr';
import { OrdersService } from './../../core/services/orders/orders.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly ordersService = inject(OrdersService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  checkOutForm!: FormGroup;
  cartId: string = '';
  success: string = ' ';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }

  initForm(): void {
    this.checkOutForm = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: [null, [Validators.required]],
    });
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartId = param.get('id')!;
      },
    });
  }

  onSubmitcard(): void {
    console.log(this.checkOutForm.value);

    this.ordersService.getorder(this.cartId, this.checkOutForm.value).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          setTimeout(() => {
            this.success = res.status;
            
              window.open(res.session.url, '_self'); 
            
          }, 300);
          console.log(res);
        }
        this.isLoading = false;

        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmitCash(): void {
    if (this.checkOutForm.valid) {
      this.ordersService.getOrderCash(this.cartId, this.checkOutForm.value).subscribe({
        next: (res) => {
          if (res.status == 'success') {
            setTimeout(() => {
              this.success = res.status;
              this.toastrService.success('Payment successful', 'Success');
              this.router.navigate(['./allorders']);
            }, 300);

            if (isPlatformBrowser(this.platformId)){
              // localStorage.setItem('userorders', res.data.user);

            }
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
