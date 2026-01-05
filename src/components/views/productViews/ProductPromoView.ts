import {ProductBaseView} from './ProductBaseView';
import {IProductBase} from './ProductBaseView';
import {ensureElement} from '../../../utils/utils'
import { categoryMap } from '../../../utils/constants';

interface IProductPromoView extends IProductBase {
  category: string;
  image: HTMLImageElement;
}

export interface IProductPromoActions {
  onClickOpen: () => void;
}

type TCategoryKey = keyof typeof categoryMap;

export class ProductPromoView extends ProductBaseView<IProductPromoView> {
  protected categoryEl: HTMLElement;
  protected imageEl: HTMLImageElement;
  protected buttonEl = this.container;

  constructor(container: HTMLElement, actions?: IProductPromoActions) {
    super(container);

    this.categoryEl = ensureElement<HTMLElement>('.card__category', this.container);
    this.imageEl = ensureElement<HTMLImageElement>('.card__image', this.container);
    if(actions?.onClickOpen) {
      this.container.addEventListener('click', actions.onClickOpen);
    }
  }

  set category(value: string) {
    this.categoryEl.textContent = value;
    this.categoryEl.classList.add(categoryMap[value as TCategoryKey]);
  }

  set image(value: string) {
    this.setImage(this.imageEl, value, this.title);
  }
}