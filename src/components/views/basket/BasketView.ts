import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";



interface IBasketView {
  productList: HTMLElement[];
  basketPrice: HTMLElement;
  isOrderAllowed: boolean;
}

export class BasketView extends Component<IBasketView> {
  protected basketListEl: HTMLElement;
  protected basketButtonEl: HTMLButtonElement;
  protected basketPriceEl: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.basketListEl = ensureElement<HTMLElement>('.basket__list', this.container);
    this.basketButtonEl = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.basketPriceEl = ensureElement<HTMLElement>('.basket__price', this.container);

    this.basketButtonEl.addEventListener('click', () => {
      this.events.emit('basket:submit');
    })
  }

  set productList(items: HTMLElement[]) {
    this.basketListEl.replaceChildren(...items);
  }

  set basketPrice(value: number) {
    this.basketPriceEl.textContent = `${value} синапсов`;
  }

  set isOrderAllowed(value: boolean) {
    ???
  }
}