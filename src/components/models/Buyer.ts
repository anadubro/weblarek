import { IBuyer, TPayment, IBuyerErrors } from '../../types/index';

export class Buyer {
  protected payment: TPayment = '';
  protected address: string = '';
  protected email: string = '';
  protected phone: string = '';

  constructor(buyer?: IBuyer | undefined) {
    if(buyer !== undefined) {
      this.setPayment(buyer.payment);
      this.setAddress(buyer.address);
      this.setEmail(buyer.email);
      this.setPhone(buyer.phone);
    }
  }

  setPayment(payment: TPayment): void {
    this.payment = payment;
  }

  setAddress(address: string): void {
    this.address = address.trim();
  }

  setEmail(email: string): void {
    this.email = email.trim();
  }

  setPhone(phone: string): void {
    this.phone = phone.trim();
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