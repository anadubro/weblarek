import { TCategoryKey } from "../../../types";
import { categoryMap, CDN_URL } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { IProductBase, ProductBaseView } from "./ProductBaseView";


interface IProductView extends IProductBase {
  category: TCategoryKey;
  image: string;
  description: string;
  buttonText: string;
  isDisabled: boolean;
}

interface IProductActions {
  onClick: () => void;
}

export class ProductView extends ProductBaseView<IProductView> {
  protected categoryEl: HTMLElement;
  protected imageEl: HTMLImageElement;
  protected descriptionEl: HTMLElement;
  protected buttonEl: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: IProductActions) {
    super(container);
    
    this.categoryEl = ensureElement<HTMLElement>('.card__category', this.container);
    this.imageEl = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.descriptionEl = ensureElement<HTMLElement>('.card__text', this.container);
    this.buttonEl = ensureElement<HTMLButtonElement>('.card__button', this.container);

    if(actions) {
      this.setActions(actions);
    }
  }

  setActions(actions: IProductActions) {
    if (actions.onClick) {
      this.buttonEl.onclick = actions.onClick;
    }
  }

  set category(value: string) {
    this.categoryEl.textContent = value;
    this.categoryEl.classList.add(categoryMap[value as TCategoryKey]);
  }

  set image(value: string) {
    this.setImage(this.imageEl, `${CDN_URL}${value}`, this.title);
  }

  set description(value: string) {
    this.descriptionEl.textContent = value;
  }

  set buttonText(value: string) {
    this.buttonEl.textContent = value;
  }

  set isDisabled(value: boolean) {
    this.buttonEl.disabled = value; 
  }
}