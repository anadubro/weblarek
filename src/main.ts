import './scss/styles.scss';
import { apiProducts } from './utils/data.ts';
import { Catalog } from './components/models/Catalog.ts';
import { Cart } from './components/models/Cart.ts';
import { Buyer } from './components/models/Buyer.ts';
import { Communication } from './components/Communication.ts';
import { Api } from './components/base/Api.ts';
import { API_URL } from "./utils/constants.ts";
import { TOrderInfo } from "./types/index";
import { cloneTemplate, ensureElement } from './utils/utils.ts';
import { EventEmitter } from './components/base/Events.ts';
import { ProductPromoView } from './components/views/productViews/ProductPromoView.ts';

 const communication = new Communication(new Api(API_URL));
 
function testCatalog() {
  const catalogModel = new Catalog();
  catalogModel.setProducts(apiProducts.items);
  console.log('Массив товаров из каталога: ', catalogModel.getProducts());

  catalogModel.setSelectedProduct(apiProducts.items[1]);
  console.log('Выбранный товар: ', catalogModel.getSelectedProduct());

  console.log('Выбранный товар по id', catalogModel.getProductById(apiProducts.items[1].id));
}
testCatalog();

function testCart() {
  const cartModel = new Cart();
  cartModel.addProduct(apiProducts.items[0]);
  cartModel.addProduct(apiProducts.items[1]);
  console.log('Массив товаров из корзины: ', cartModel.getProducts());

  console.log('Общая сумма товаров в корзине: ', cartModel.getTotalPrice());

  console.log('Общее количество товаров в корзине: ', cartModel.getCount());

  console.log('Наличие товара в корзине по id: ', cartModel.hasProductById(apiProducts.items[1].id));

  cartModel.removeProduct(apiProducts.items[0]);
  console.log('Массив товаров после удаления одного товара из корзины: ', cartModel.getProducts());

  cartModel.clear();
  console.log('Массив товаров после отчистки корзины: ', cartModel.getProducts());

  console.log('Наличие товара в корзине по id: ', cartModel.hasProductById(apiProducts.items[1].id));
}
testCart();

function testBuyer() {
  const buyerFilledModel = new Buyer({
    payment: 'card',
    address: 'Snayperskaya 10',
    email: 'example@mail.ru',
    phone: '8999999999'
  });

  console.log('Получение данных о покупателе: ', buyerFilledModel.getData());
  console.log('Валидация корректных данных о покупателе: ', buyerFilledModel.validate());

  buyerFilledModel.setAddress('');
  buyerFilledModel.setPhone('');
  console.log('Получение данных о покупателе с 2мя пустыми полями: ', buyerFilledModel.getData());
  console.log('Валидация данных о покупателе с 2мя пустыми полями: ', buyerFilledModel.validate());

  buyerFilledModel.clear();
  console.log('Получение данных о покупателе с 2мя пустыми полями: ', buyerFilledModel.getData());
}
testBuyer();

async function testServer() {
  try {
      const productList = await communication.getProductList();
      const catalogModel = new Catalog();
      catalogModel.setProducts(productList);
      console.log('Массив товаров каталога, загруженный с сервера: ', catalogModel.getProducts());
    } catch (error) {
      console.error('Ошибка при получении списка товаров:', error);
    }
}
testServer();

async function testOrder() {
  const cart = new Cart();
  cart.addProduct(apiProducts.items[0]);
  cart.addProduct(apiProducts.items[1]);

  const buyer = new Buyer({
    payment: 'card',
    address: 'Snayperskaya 10',
    email: 'example@mail.ru',
    phone: '8999999999'
  });

  const order: TOrderInfo = {
    ...buyer.getData(),
    total: cart.getTotalPrice(),
    items: cart.getProducts().map(p => p.id)
  };

  try {
    const result = await communication.postOrderInfo(order);
    console.log('Заказ успешно отправлен:', result);
  } catch (err) {
    console.error('Ошибка при отправке заказа:', err);
  }
}

testOrder();

// const eventEmitter = new EventEmitter();

// let productPromoContainer = cloneTemplate<HTMLButtonElement>('#card-catalog');
// let galleryElement = ensureElement('.gallery');

// const productPromoView = new ProductPromoView(eventEmitter, productPromoContainer);
// productPromoView.render({
//   id: '123',
//   title: 'Название',
//   price: 12,
//   category: 'дополнительное',
//   image: "./images/trash.svg"
// });

// galleryElement.append(productPromoContainer);




