import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface CartItem {
    id: string;
    size: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {

    private storageKey = 'cart_items';

    private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
    items$ = this.itemsSubject.asObservable();

    constructor() {}

    private loadCart(): CartItem[] {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    private saveCart(items: CartItem[]) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }

    getItems(): CartItem[] {
        return this.itemsSubject.value;
    }

    addItem(product: CartItem) {
        const items = this.getItems();
        const existing = items.find(i => i.id === product.id && i.size === product.size);

        if (existing) {
            existing.quantity += product.quantity;
        } else {
            items.push(product);
        }

        this.itemsSubject.next(items);
        this.saveCart(items);
    }

    updateQuantity(id: string, quantity: number) {
        const items = this.getItems().map(item =>
        item.id === id ? { ...item, quantity } : item
        );

        this.itemsSubject.next(items);
        this.saveCart(items);
    }

    removeItem(id: string) {
        const items = this.getItems().filter(item => item.id !== id);

        this.itemsSubject.next(items);
        this.saveCart(items);
    }

    clear() {
        this.itemsSubject.next([]);
        localStorage.removeItem(this.storageKey);
    }

    getSubtotal(): number {
        return this.getItems()
        .reduce((acc, item) => acc + item.price * item.quantity, 0);
    }

    getTotal(): number {
        return this.getSubtotal();
    }

    getTotalItems(): number {
        return this.getItems()
        .reduce((acc, item) => acc + item.quantity, 0);
    }
}
