import { IBuyerErrors } from "../../../types";
import { ensureAllElements, ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";


export interface IBaseFormView {
    isSubmitDisabled: boolean;
    errors: IBuyerErrors;
}

export interface IBuyerFormData {
    payment?: string;
    address?: string;
    email?: string;
    phone?: string;
}

export class BaseFormView<T extends IBaseFormView> extends Component<T> {
    protected formEl: HTMLFormElement;
    protected submitButtonEl: HTMLButtonElement;
    protected errorsEl: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.formEl = this.container as HTMLFormElement;
        this.submitButtonEl = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
        this.errorsEl = ensureElement<HTMLElement>('.form__errors', this.container);

        const textInputElList = ensureAllElements<HTMLInputElement>('input[type="text"]', this.container);
        textInputElList.forEach((inputEl) => {
            // инициируем событие изменения текстового поля по таймеру (если в течение секунды не было нажатий клавиш)
            let timer: number = 0;
            inputEl.addEventListener('input', () => {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    inputEl.dispatchEvent(new Event('change'));
                }, 1500);
            });
            
            // Устанавливаем обрабочик изменения на каждое текстовое поле
            inputEl.addEventListener('change', () => {
                let formData: IBuyerFormData = {};
                formData[inputEl.name as keyof IBuyerFormData] = inputEl.value;
                this.events.emit('orderOrContactsForm:changed', formData as IBuyerFormData);
            });
        });
    }

    set isSubmitDisabled(value: boolean) {
        this.submitButtonEl.disabled = value;
    }
}
