import { ensureElement } from "../../../utils/utils";
import { IProductBase, ProductBaseView } from "./ProductBaseView";

interface ICartProductItemView extends IProductBase {
  index: number;
}

export interface ICartProductItemActions {
  onClickDelete: () => void;
}

export class CartProductItemView extends ProductBaseView<ICartProductItemView> {
  protected buttonDelete: HTMLButtonElement;
  protected indexProduct: HTMLElement;

  constructor(container: HTMLElement, actions?: ICartProductItemActions) {
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