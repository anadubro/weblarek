import { ensureElement } from '../../../utils/utils';
import {Component} from '../../base/Component';

type TPrice = number | null;

export interface IProductBase {
  title: string;
  price: TPrice;
}

export class ProductBaseView<T extends IProductBase> extends Component<T> {
  protected titleEl: HTMLElement;
  protected priceEl: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.titleEl = ensureElement('.card__title', this.container);
    this.priceEl = ensureElement('.card__price', this.container);
  }

  set title(value: string) {
    this.titleEl.textContent = value;
  }

  set price(value: TPrice) {
    this.priceEl.textContent = value ? `${value} синапсов` : 'Бесценно';
  }
}
