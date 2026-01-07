import { IBuyer, TPayment, IBuyerErrors } from '../../types/index';
import { IEvents } from '../base/Events';

export class Buyer {
  protected payment: TPayment = '';
  protected address: string = '';
  protected email: string = '';
  protected phone: string = '';

  constructor(protected events: IEvents, buyer?: IBuyer | undefined) {
    if(buyer !== undefined) {
      this.setPayment(buyer.payment);
      this.setAddress(buyer.address);
      this.setEmail(buyer.email);
      this.setPhone(buyer.phone);
    }
  }

  setPayment(payment: TPayment): void {
    this.payment = payment;
    this.events.emit('buyerModel:changed');
  }

  setAddress(address: string): void {
    this.address = address.trim();
    this.events.emit('buyerModel:changed');
  }

  setEmail(email: string): void {
    this.email = email.trim();
    this.events.emit('buyerModel:changed');
  }

  setPhone(phone: string): void {
    this.phone = phone.trim();
    this.events.emit('buyerModel:changed');
  }

  getData(): IBuyer {
    return {
    payment: this.payment,
    address: this.address,
    email: this.email,
    phone: this.phone,
    };
  }

  clear(): void {
    this.payment = '';
    this.address = '';
    this.email = '';
    this.phone = '';
    this.events.emit('buyerModel:changed');
  }

  validate(): IBuyerErrors {
    const errors: IBuyerErrors = {};

    if (!this.payment) {
      errors.payment = 'Не выбран способ оплаты';
    }

    if (!this.address) {
      errors.address = 'Укажите адрес';
    }

    if (!this.email) {
      errors.email = 'Укажите адрес электронной почты';
    }

    if (!this.phone) {
      errors.phone = 'укажите номер телефона';
    }
    return errors;
  }
}