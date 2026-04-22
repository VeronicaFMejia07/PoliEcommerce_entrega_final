import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "home",
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: "products",
    loadComponent: () => import('./pages/products/products').then(m => m.Products)
  },
  {
    path: "product/:id",
    loadComponent: () => import('./pages/products-detail/products-detail').then(m => m.ProductsDetail)
  },
  {
    path: "contact",
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact)
  },
  {
    path: "contact-success",
    loadComponent: () => import('./pages/contact-success/contact-success').then(m => m.ContactSuccess)
  },
  {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
