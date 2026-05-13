import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { CatalogComponent } from './features/catalog/catalog';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { PublicLayoutComponent } from './layouts/public/public';
import { Products } from './features/admin/products/products';
import { Orders } from './features/admin/orders/orders';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'catalog', component: CatalogComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'admin/products', component: Products },
            { path: 'admin/orders', component: Orders }
        ]
    }
];
