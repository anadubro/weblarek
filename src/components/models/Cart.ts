import { IProduct } from '../../types/index';

export class Cart {
  protected productList:IProduct[] = [];

  constructor() {}

  getProducts(): IProduct[] {
    return this.productList;
  }

  addProduct(product: IProduct): void {
    this.productList.push(product);
  }

  removeProduct(product: IProduct): void {
    this.productList = this.productList.filter(p => p.id !== product.id);
  }

  clear(): void {
    this.productList = [];
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