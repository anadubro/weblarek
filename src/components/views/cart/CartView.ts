import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";



interface ICartView {
  productList: HTMLElement[];
  cartPrice: number;
  isOrderDisabled: boolean;
}

export class CartView extends Component<ICartView> {
  protected cartListEl: HTMLElement;
  protected cartSubmitEl: HTMLButtonElement;
  protected cartPriceEl: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.cartListEl = ensureElement<HTMLElement>('.basket__list', this.container);
    this.cartSubmitEl = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.cartPriceEl = ensureElement<HTMLElement>('.basket__price', this.container);

    this.cartSubmitEl.addEventListener('click', () => {
      this.events.emit('cartView:submit');
    })
  }

  set productList(items: HTMLElement[]) {
    this.cartListEl.replaceChildren(...items);
  }

  set cartPrice(value: number) {
    this.cartPriceEl.textContent = `${value} синапсов`;
  }

  set isOrderDisabled(value: boolean) {
    this.cartSubmitEl.disabled = value;
  }
}