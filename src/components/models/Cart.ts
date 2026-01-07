import { IProduct } from '../../types/index';
import { IEvents } from '../base/Events';

export class Cart {
  protected productList:IProduct[] = [];

  constructor(protected events: IEvents) {}

  getProducts(): IProduct[] {
    return this.productList;
  }

  addProduct(product: IProduct): void {
    this.productList.push(product);
    this.events.emit('cartModel:changed');
  }

  removeProduct(product: IProduct): void {
    this.productList = this.productList.filter(p => p.id !== product.id);
    this.events.emit('cartModel:changed');
  }

  clear(): void {
    this.productList = [];
    this.events.emit('cartModel:changed');
  }

  getTotalPrice(): number {
    return this.productList.reduce((acc, p) => acc + (p.price ?? 0), 0);
  }

  getCount(): number {
    return this.productList.length;
  }

  hasProductById(productId: string): boolean {
    return this.productList.some(p => p.id === productId);
  }
}