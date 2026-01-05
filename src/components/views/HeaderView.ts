import {Component} from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';


interface IHeaderView {
  counter: number;
}

export class HeaderView extends Component<IHeaderView> {
  protected basketButton: HTMLButtonElement;
  protected counterElement: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
    this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);

    this.basketButton.addEventListener('click', () => {
      this.events.emit('basket-modal:open');
    });
  }

  set counter(value:number) {
    this.counterElement.textContent = String(value);
  }
}