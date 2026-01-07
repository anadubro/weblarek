import './scss/styles.scss';
import { Catalog } from './components/models/Catalog.ts';
import { Cart } from './components/models/Cart.ts';
import { Buyer } from './components/models/Buyer.ts';
import { Communication } from './components/Communication.ts';
import { Api } from './components/base/Api.ts';
import { API_URL } from "./utils/constants.ts";
import { IProduct, TOrderInfo, TPayment } from "./types/index";
import { EventEmitter } from './components/base/Events.ts';
import { CatalogView } from './components/views/productViews/CatalogView.ts';
import { cloneTemplate, ensureElement } from './utils/utils.ts';
import { ModalView } from './components/views/ModalView.ts';
import { CatalogProductItemView } from './components/views/productViews/CatalogProductItemView.ts';
import { ProductView } from './components/views/productViews/ProductView.ts';
import { HeaderView } from './components/views/HeaderView.ts';
import { CartView } from './components/views/cart/CartView.ts';
import { CartProductItemView } from './components/views/productViews/CartProductItemView.ts';
import { OrderFormView } from './components/views/forms/OrderFormView.ts';
import { ContactsFormView } from './components/views/forms/ContactsFormView.ts';
import { OrderSuccessView } from './components/views/OrderSuccessView.ts';
import { IBuyerFormData } from './components/views/forms/BaseFormView.ts';


 const communicationApi = new Communication(new Api(API_URL));


// брокер
const eventEmitter = new EventEmitter();

//
// Модели
//
const catalogModel = new Catalog(eventEmitter);
const cartModel = new Cart(eventEmitter);
const buyerModel = new Buyer(eventEmitter);


//
// Представления
//

// модалка
const modalContainer = ensureElement('#modal-container');
const modalView = new ModalView(eventEmitter, modalContainer);

// Header
const headerContainer = ensureElement('.header');
const headerView = new HeaderView(eventEmitter, headerContainer);

// корзина
const cartContainer = cloneTemplate<HTMLButtonElement>('#basket');
const cartView = new CartView(eventEmitter, cartContainer);

// каталог
const catalogContainer = ensureElement('.gallery');
const catalogView = new CatalogView(eventEmitter, catalogContainer);

// Форма1 оформления заказа
const orderFormContainer = cloneTemplate<HTMLButtonElement>('#order');
const orderFormView = new OrderFormView(eventEmitter, orderFormContainer);

// Форма2 оформления заказа
const contactsFormContainer = cloneTemplate<HTMLButtonElement>('#contacts');
const contactsFormView = new ContactsFormView(eventEmitter, contactsFormContainer);

// Сообщение об успешной оплате
const orderSuccessContainer = cloneTemplate<HTMLButtonElement>('#success');
const orderSuccessView = new OrderSuccessView(eventEmitter, orderSuccessContainer);


//
// Обработчики событий
//

// обработчик события 'catalogModel:changed': обновляет разметку списка товаров в каталоге после изменения модели каталога
eventEmitter.on('catalogModel:changed', () => {
  const catalogProductItemContainerList = catalogModel.getProducts().map((product) => {
    const container = cloneTemplate<HTMLButtonElement>('#card-catalog');
    const actions = {
      onClickOpen: () => {
        eventEmitter.emit('productView:selected', product);
      }
    }
    const productItemView =  new CatalogProductItemView(container, actions);
    return productItemView.render({
      title: product.title,
      price: product.price,
      category: product.category,
      image: product.image
    });
  });
  catalogView.render({catalog: catalogProductItemContainerList});
});


// обработчик события 'productView:selected': устанавливает выбранный товар в модели
eventEmitter.on('productView:selected', (product: IProduct) => {
  catalogModel.setSelectedProduct(product);
});


// обработчик события 'productModel:selected': открывает модальное окно с выбранным товаром
eventEmitter.on('productModel:selected', () => {
  const product = catalogModel.getSelectedProduct();
  if (!product) {
    return;
  }

  let hasProductById = cartModel.hasProductById(product.id);
  let onClickEventName = hasProductById ? 'cartView:removeProduct' : 'cartView:addProduct';
  let actions = {
    onClick: () => {
      eventEmitter.emit(onClickEventName, product);
      modalView.close();  // после обработки нажатия кнопки покупки/удаления товара закрываем модалку
    }
  }

  const container = cloneTemplate<HTMLElement>('#card-preview');
  const productView =  new ProductView(container, actions);

  let isDisabled, buttonText;
  if (product.price === null) {
    isDisabled = true;
    buttonText = 'Недоступно';
  } else {
    isDisabled = false;
    buttonText = hasProductById ? 'Удалить из корзины' : 'Купить';
  }

  const productContainer = productView.render({
      title: product.title,
      price: product.price,
      category: product.category,
      image: product.image,
      buttonText: buttonText,
      isDisabled: isDisabled
  },);
  // передаем разметку товара в рендер модального окна
  modalView.render({content: productContainer});
  modalView.open();
});


// обработчик события 'cartView:addProduct': добавляет товар в модель корзины
eventEmitter.on('cartView:addProduct', (product: IProduct) => {
  cartModel.addProduct(product);
});


// обработчик события 'cartView:removeProduct': удаляет товар из модели корзины
eventEmitter.on('cartView:removeProduct', (product: IProduct) => {
  cartModel.removeProduct(product);
});


function render_cart() {
  const cartProductItemContainerList = cartModel.getProducts().map((product, index) => {
    const container = cloneTemplate<HTMLButtonElement>('#card-basket');
    const actions = {
      onClickDelete: () => {
        eventEmitter.emit('cartView:removeProduct', product);
      }
    }
    const productItemView =  new CartProductItemView(container, actions);
    return productItemView.render({
      title: product.title,
      price: product.price,
      index: index + 1
    });
  });
  return cartView.render({
    productList: cartProductItemContainerList,
    cartPrice: cartModel.getTotalPrice(),
    isOrderDisabled: cartModel.getCount() === 0
  });
}

// обработчик события 'cartModel:changed': обновляет разметку корзины после изменения модели корзины
eventEmitter.on('cartModel:changed', () => {
  render_cart();
});


// обработчик события 'cartModel:changed': обновляет разметку хэдера (кол-во товаров в корзине) после изменения модели корзины
eventEmitter.on('cartModel:changed', () => {
  const cartCounter = cartModel.getCount()
  headerView.render({
    counter: cartCounter
  });
});


// обработчик события 'cart:open': открывает корзину в модальном окне
eventEmitter.on('cart:open', () => {
  modalView.render({content: render_cart()});
  modalView.open();
});


// обработчик события 'cartView:submit': подтвердить корзину и открыть первую форму оформления заказа в модальном окне
eventEmitter.on('cartView:submit', () => {


  modalView.render({content: orderFormView.render()});
  modalView.open();
});


// обработчик события 'orderOrContactsForm:changed': сохранить измененные поля формы (первой или второй) в модель покупателя
eventEmitter.on('orderOrContactsForm:changed', (formData: IBuyerFormData) => {
  if (formData?.payment !== undefined) {
    buyerModel.setPayment(formData.payment as TPayment)
  }
  if (formData?.address !== undefined) {
    buyerModel.setAddress(formData.address)
  }
  if (formData?.email !== undefined) {
    buyerModel.setEmail(formData.email)
  }
  if (formData?.phone !== undefined) {
    buyerModel.setPhone(formData.phone)
  }
});

// обработчик события 'buyerModel:changed': модель покупателя изменилась, перерендерим формы заказа
eventEmitter.on('buyerModel:changed', () => {
  const errors = buyerModel.validate();
  const buyerData = buyerModel.getData();

  orderFormView.render({
    payment: buyerData.payment,
    address: buyerData.address,
    errors: errors,
    isSubmitDisabled: Boolean(errors.payment || errors.address)
  });

  contactsFormView.render({
    email: buyerData.email,
    phone: buyerData.phone,
    errors: errors,
    isSubmitDisabled: Boolean(errors.email || errors.phone)
  });
});

// обработчик события 'orderForm:submit': открыть вторую форму заказа в модальном окне
eventEmitter.on('orderForm:submit', () => {
  const errors = buyerModel.validate();
  if (errors.payment || errors.address) {
    return;
  }
  modalView.close();
  modalView.render({content: contactsFormView.render()});
  modalView.open();
});

// обработчик события 'contactsForm:submit': отправить на сервер заказ и открыть сообщение о покупке в модальном окне
eventEmitter.on('contactsForm:submit', async () => {
  const errors = buyerModel.validate();
  if (errors.email || errors.phone) {
    return;
  }

  const order: TOrderInfo = {
    ...buyerModel.getData(),
    total: cartModel.getTotalPrice(),
    items: cartModel.getProducts().map(p => p.id)
  };

  try {
    let result = await communicationApi.postOrderInfo(order);
    modalView.close();
    modalView.render({content: orderSuccessView.render({
      orderPrice: result.total
    })});
    modalView.open();

    // очищаем модели покупателя и корзины
    buyerModel.clear();
    cartModel.clear();

  } catch (err) {
    console.error('Ошибка при отправке заказа:', err);
  }
});

// обработчик события 'orderSuccessView:close': закрыть модальное окно с сообщением о покупке
eventEmitter.on('orderSuccessView:close', () => {
  modalView.close();
});


//
// Init
//
catalogModel.setProducts(await communicationApi.getProductList());