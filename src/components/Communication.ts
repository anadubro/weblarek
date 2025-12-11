import { IApi, IProduct, TProductListInfo, TOrderInfo } from "../types/index";

export class Communication {
  api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

   getProductList(): Promise<IProduct[]> {
    return this.api.get<TProductListInfo>('/product/')
      .then(response => response.items);
  }

  postOrderInfo(order: TOrderInfo): Promise<TOrderInfo> {
    return this.api.post<TOrderInfo>("/order/", order);
  }
}
