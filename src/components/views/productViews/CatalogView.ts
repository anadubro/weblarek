import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";


interface ICatalogView {
  catalog: HTMLElement[];
}

export class CatalogView extends Component<ICatalogView> {
  protected catalogEl: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.catalogEl = this.container;
  }
  
  set catalog(items: HTMLElement[]) {
    // this.container.innerHTML = '';
    // items.forEach(item => {
    //   this.container.append(item);
    // });
    this.catalogEl.replaceChildren(...items);
  }
}