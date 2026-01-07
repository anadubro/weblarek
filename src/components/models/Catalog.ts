import { IProduct } from '../../types/index.ts';
import { IEvents } from '../base/Events.ts';

/**
 * Каталог товаров
 */

export class Catalog {
  protected productList: IProduct[] = [];
  protected selectedProduct: IProduct | null = null;

  constructor(protected events: IEvents) {}

  setProducts(products: IProduct[]): void {
    this.productList = products;
    this.events.emit('catalogModel:changed');
  }

  getProducts(): IProduct[] {
    return this.productList;
  }

  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
    this.events.emit('productModel:selected');
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }

  getProductById(productId: string): IProduct | null {
    const product = this.productList.find(p => p.id === productId) || null;
    return product;
  }
}


