import { IBuyerErrors } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { BaseFormView, IBaseFormView } from "./BaseFormView";


export interface IContactsFormView extends IBaseFormView {
    email: string;
    phone: string;
}

export class ContactsFormView extends BaseFormView<IContactsFormView> {
    protected emailEl: HTMLInputElement;
    protected phoneEl: HTMLInputElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(events, container);

        this.emailEl = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneEl = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

        // обработчик отправки формы
        this.formEl.addEventListener('submit', (e) => {
            this.events.emit('contactsForm:submit');
            e.preventDefault();
            e.stopPropagation();
        });
    }

    set email(value: string) {
        this.emailEl.value = value;
    }

    set phone(value: string) {
        this.phoneEl.value = value;
    }

    set errors(value: IBuyerErrors) {
        const contactsErrors = [];
        if(value.email) {
            contactsErrors.push(value.email);
        }

        if(value.phone) {
            contactsErrors.push(value.phone);
        }

        this.errorsEl.textContent = contactsErrors.join(', ');
    }
}