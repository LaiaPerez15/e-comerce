import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { CatalogComponent } from './features/catalog/catalog';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { PublicLayoutComponent } from './layouts/public/public';
import { Products } from './features/admin/products/products';
import { Orders } from './features/admin/orders/orders';
import { UserOrders } from './features/orders/user-orders/user-orders';
import { OrderDetail } from './features/orders/order-detail/order-detail';
import { Cart } from './features/cart/cart/cart';
import { Checkout } from './features/checkout/checkout/checkout';
import { ProductDetail } from './features/catalog/product-detail/product-detail';

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
            { path: 'admin/orders', component: Orders },
            { path: 'product/:slug', component: ProductDetail },
            { path: 'orders', component: UserOrders },
            { path: 'orders/:id', component: OrderDetail },
            { path: 'cart', component: Cart },
            { path: 'checkout', component: Checkout },
        ]
    }
];
