import {Component} from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';


interface IHeaderView {
  counter: number;
}

export class HeaderView extends Component<IHeaderView> {
  protected cartButton: HTMLButtonElement;
  protected counterElement: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.cartButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
    this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);

    this.cartButton.addEventListener('click', () => {
      this.events.emit('cart:open');
    });
  }

  set counter(value:number) {
    this.counterElement.textContent = String(value);
  }
}