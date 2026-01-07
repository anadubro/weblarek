import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModalView {
  content: HTMLElement;
}

export class ModalView extends Component<IModalView> {
  protected modalEl: HTMLElement;
  protected closeButtonEl: HTMLButtonElement;
  protected contentEl: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.modalEl = this.container;
    this.closeButtonEl = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.contentEl = ensureElement<HTMLElement>('.modal__content', this.container);

    this.closeButtonEl.addEventListener('click', () => {
      this.close();
    });

    const extModalAreaEl = this.container;
    extModalAreaEl.addEventListener('click', (event) => {
      if (event.target == extModalAreaEl) {
        this.close();
      } 
    });
  }

  open() {
    this.modalEl.classList.add('modal_active');
  }

  close() {
    this.modalEl.classList.remove('modal_active');
    this.clear();
  }

  set content(elem: HTMLElement) {
    this.contentEl.replaceChildren(elem);
  }

  clear() {
    this.contentEl.replaceChildren();
  }
}