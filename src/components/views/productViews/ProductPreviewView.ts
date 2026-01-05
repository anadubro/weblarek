import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { IProductBase, ProductBaseView } from "./ProductBaseView";

type TCategoryKey = keyof typeof categoryMap;

interface IProductPreviewView extends IProductBase {
  category: HTMLElement;
  image: HTMLImageElement;
  description: HTMLElement;
  inBasket: boolean;
}

interface IProductPreviewActions {
  onClick: () => void;
}

export class ProductPreviewView extends ProductBaseView<IProductPreviewView> {
  protected categoryEl: HTMLElement;
  protected imageEl: HTMLImageElement;
  protected descriptionEl: HTMLElement;
  protected buttonEl: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: IProductPreviewActions) {
    super(container);
    
    this.categoryEl = ensureElement<HTMLElement>('.card__category', this.container);
    this.imageEl = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.descriptionEl = ensureElement<HTMLElement>('.card__text', this.container);
    this.buttonEl = ensureElement<HTMLButtonElement>('.card__button', this.container);

    if(actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
  }

  set category(value: string) {
    this.categoryEl.textContent = value;
    this.categoryEl.classList.add(categoryMap[value as TCategoryKey]);
  }

  set image(value: string) {
    this.imageEl.src = value;
  }

  set description(value: string) {
    this.descriptionEl.textContent = value;
  }

  set inBasket(value: boolean) {
    this.buttonEl.textContent = value ? 'Удалить из корзины' : 'В корзину';
  }
}