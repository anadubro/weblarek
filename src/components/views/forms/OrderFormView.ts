import { IBuyerErrors, TPayment } from "../../../types";
import { ensureAllElements, ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { BaseFormView, IBaseFormView, IBuyerFormData } from "./BaseFormView";


export interface IOrderFormView extends IBaseFormView {
    payment: TPayment;
    address: string;
}

export class OrderFormView extends BaseFormView<IOrderFormView> {
    protected paymentButtonElList: HTMLButtonElement[];
    protected addressEl: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(events, container);

        this.paymentButtonElList = ensureAllElements<HTMLButtonElement>('.order__buttons .button', this.container);
        this.addressEl = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

        // обработчики кнопок способа оплаты
        this.paymentButtonElList.forEach((button) => {
            button.addEventListener('click', () => {
                this.events.emit('orderOrContactsForm:changed', {
                    payment: button.name as TPayment
                } as IBuyerFormData);
            });
        });

        // обработчик отправки формы
        this.formEl.addEventListener('submit', (e) => {
            this.events.emit('orderForm:submit');
            e.preventDefault();
            e.stopPropagation();
        });
    }

    set payment(value: TPayment) {
        this.paymentButtonElList.forEach((element) => {
            if (element.name === value) {
                element.classList.add('button_alt-active');
            } else {
                element.classList.remove('button_alt-active');
            }
        })
    }

    set address(value: string) {
        this.addressEl.value = value;
    }

    set errors(value: IBuyerErrors) {
        const orderErrors = [];
        if(value.payment) {
            orderErrors.push(value.payment);
        }

        if(value.address) {
            orderErrors.push(value.address);
        }

        this.errorsEl.textContent = orderErrors.join(', ');
    }
}