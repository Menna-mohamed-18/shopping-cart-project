import { logedGuard } from './core/guards/loged.guard';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,canActivate:[logedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        title: 'Login'
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
        title: 'Register'
      },
      {
        path: 'logout',
        loadComponent: () => import('./logout/logout.component').then(m => m.LogoutComponent),
        title: 'Logout'
      },
      {
        path: 'forgotpassword',
        loadComponent: () => import('./components/forgotpassword/forgotpassword.component').then(m => m.ForgotpasswordComponent),
        title: 'forgotpassword',
        
      },
    ]
  },

  {
    path: '',
    component: BlankLayoutComponent, canActivate:[authGuard] ,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        title: 'Home',
        
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
        title: 'Cart',
        
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
        title: 'Products',
        
      },
      {
        path: 'brands',
        loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent),
        title: 'Brands',
        
      },
      {
        path: 'categories',
        loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent),
        title: 'Categories',
        
      },
      {
        path: 'checkout/:id',
        loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
        title: 'Checkout',
        
      },
      {
        path: 'shop',
        loadComponent: () => import('./shop/shop.component').then(m => m.ShopComponent),
        title: 'Shop',
        
      },
      {
        path: 'contact',
        loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent),
        title: 'Contact',
        
      },
      {
        path: 'blog',
        loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent),
        title: 'Blog',
        
      },
      {
        path: 'allorders',
        loadComponent: () => import('./allorders/allorders.component').then(m => m.AllordersComponent),
        title: 'allorders',
        
      },
      {
        path: 'fav',
        loadComponent: () => import('./fav/fav.component').then(m => m.FavComponent),
        title: 'fav',
        
      },
      {
        path: 'brands',
        loadComponent: () => import('./brands/brands.component').then(m => m.BrandsComponent),
        title: 'brands',
        
      },
      {
        path: 'categories',
        loadComponent: () => import('./categories/categories.component').then(m => m.CategoriesComponent),
        title: 'categories',
        
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./components/details/details.component').then(m => m.DetailsComponent),
        title: 'details',
        
      },
   
      

      { path: '**', component: NotfoundComponent }
    ]
  },


];
