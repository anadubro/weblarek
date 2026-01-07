import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";



export interface IOrderSuccess {
    orderPrice: number;
}

export class OrderSuccessView extends Component<IOrderSuccess> {
    protected orderPriceEl: HTMLElement;
    protected closeButtonEl: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.orderPriceEl = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.closeButtonEl = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        this.closeButtonEl.addEventListener('click', () => {
            this.events.emit('orderSuccessView:close');
        });
    }

    set orderPrice(value: number) {
        this.orderPriceEl.textContent = `Списано ${value} синапсов`;
    }
}
