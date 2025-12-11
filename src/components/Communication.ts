import { IApi, IProduct,IBuyer, TProductListInfo, TOrderInfo } from "../types/index";
import { Cart } from "./models/Cart";

export class Communication {
  api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

   getProductList(): Promise<IProduct[]> {
    return this.api.get<TProductListInfo>('/product/')
      .then(response => response.items);
  }

  postOrderInfo(buyer: IBuyer, cart: Cart): Promise<TOrderInfo> {
  const order: TOrderInfo = {
    ...buyer,
    total: cart.getTotalPrice(),
    items: cart.getProducts().map(p => p.id)
  };

  return this.api.post<TOrderInfo>('/order/', order);
}
}
