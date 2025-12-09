import { IProduct } from '../../types/index.ts';

/**
 * Каталог товаров
 */

export class Catalog {
  protected productList: IProduct[] = [];
  protected selectedProduct: IProduct | null = null;

  constructor() {}

  setProducts(products: IProduct[]): void {
    this.productList = products;
  }

  getProducts(): IProduct[] {
    return this.productList;
  }

  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }

  getProductById(productId: string): IProduct | null {
    const product = this.productList.find(p => p.id === productId) || null;
    return product;
  }
}


