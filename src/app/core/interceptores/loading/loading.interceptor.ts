import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxSpinnerService = inject(NgxSpinnerService);

  // استثناء أي طلب يخص السلة (cart)
  if (!req.url.includes('/cart')) {
    ngxSpinnerService.show('loading-3');
  }

  return next(req).pipe(
    finalize(() => {
      if (!req.url.includes('/cart')) {
        ngxSpinnerService.hide('loading-3');
      }
    })
  );
};
