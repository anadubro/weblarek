import { ensureElement } from "../../../utils/utils";
import { IProductBase, ProductBaseView } from "../productViews/ProductBaseView";

interface IBasketProductView extends IProductBase {
  index: number;
}

export interface IBasketProductActions {
  onClickDelete: () => void;
}

export class BasketProductView extends ProductBaseView<IBasketProductView> {
  protected buttonDelete: HTMLButtonElement;
  protected indexProduct: HTMLElement;

  constructor(container: HTMLElement, actions?: IBasketProductActions) {
    super(container);

    this.buttonDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
    this.indexProduct = ensureElement<HTMLElement>('.basket__item-index', this.container);

    if(actions?.onClickDelete) {
      this.buttonDelete.addEventListener('click', actions.onClickDelete);
    }
  }

  set index(value: number) {
    this.indexProduct.textContent = String(value);
  }
}