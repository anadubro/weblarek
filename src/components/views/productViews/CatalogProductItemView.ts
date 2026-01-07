import {ProductBaseView} from './ProductBaseView';
import {IProductBase} from './ProductBaseView';
import {ensureElement} from '../../../utils/utils'
import { categoryMap, CDN_URL } from '../../../utils/constants';
import { TCategoryKey } from '../../../types';

export interface ICatalogProductItemView extends IProductBase {
  category: string;
  image: string;
}

export interface ICatalogProductItemActions {
  onClickOpen: () => void;
}

export class CatalogProductItemView extends ProductBaseView<ICatalogProductItemView> {
  protected categoryEl: HTMLElement;
  protected imageEl: HTMLImageElement;
  protected buttonEl = this.container;

  constructor(container: HTMLElement, actions?: ICatalogProductItemActions) {
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
    this.setImage(this.imageEl, `${CDN_URL}${value}`, this.title);
  }
}