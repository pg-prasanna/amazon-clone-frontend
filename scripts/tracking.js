import { getOrders, getProductFromOrders } from "../data/orders.js"
import { getProduct } from "../data/products.js"
import { loadProductsFetch } from "../data/products.js"
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { renderHeaderHtml } from "./shared/amazon-header.js"
import { renderVariationHtml } from "./utils/variation.js"

renderHeaderHtml()

export async function loadPage() {
  await loadProductsFetch()
  const url = new URL(window.location.href)
  let order = getOrders(url.searchParams.get("orderId"))
  let product = getProduct(url.searchParams.get("productId"))
  let productFromOrders = getProductFromOrders(order, url.searchParams.get("cartId"))
  console.log(productFromOrders)

  // let ProductFromOrders
  // order.products.forEach((productInner) => {
  //    if (productInner.productid === product.id) {
  //       ProductFromOrders = productInner
  //    }
  // })

  console.log(getProductFromOrders)

  console.log(order)
  console.log(product)

  let productImage = product.createImageUrl(productFromOrders.variations)

  dayjs.extend(dayjsPluginUTC.default)
  console.log(productFromOrders.estimatedDeliveryTime)
  let arrivingDate = dayjs(productFromOrders.estimatedDeliveryTime).format
    ("dddd, MMMM D")
  console.log(arrivingDate)

  const today = dayjs().utcOffset('+05:30');
  console.log(`today ${today.format('ddd, DD MMM YYYY HH:mm:ss [GMT]')}`);
  const orderTime = dayjs(order.orderTime).utcOffset('+05:30');
  console.log(`orderTime ${orderTime.format('ddd, DD MMM YYYY HH:mm:ss [GMT]')}`);
  const deliveryTime = dayjs(productFromOrders.estimatedDeliveryTime).utcOffset('+05:30');
  console.log(`deliverytime ${deliveryTime.format('ddd, DD MMM YYYY HH:mm:ss [GMT]')}`)


  const timeElapsed = today.diff(orderTime, 'hour');
  console.log(timeElapsed)
  const totalDeliveryTime = deliveryTime.diff(orderTime, 'hour');
  console.log(totalDeliveryTime)
  const percentProgress = (timeElapsed / totalDeliveryTime) * 100;
  console.log(percentProgress)

  const deliveryMessage = today < deliveryTime ? "Arriving on" : "Delivered on"

  const trackingHtml = `<a class="tracking-orders-link" href="orders.html">view all orders</a>
    <div class="tracking-arriving-date ">${deliveryMessage} ${arrivingDate}</div>
    <div class="tracking-product-name">${product.name}</div>
    ${renderVariationHtml(productFromOrders.variations)}
    <div class="tracking-product-quantity">Quantity: ${productFromOrders.quantity}</div>
    <img class="tracking-product-image" src="${productImage}"></img>
    <div class="tracking-details-container">
      <div class="progress-label-${percentProgress < 50 ? "current-status" : " "}">Preparing</div>
      <div class="progress-label-${percentProgress > 50 && percentProgress <= 99 ? "current-status" : " "}">Shipped</div>
      <div class="progress-label-${percentProgress > 100 ? "current-status" : " "}">Delivered</div>
    </div>
    <div class="delivery-progress">
      <div class="delivery-progress-inner" style="width:${percentProgress}%"></div>
    </div>`

  document.querySelector(".tracking-main").innerHTML = trackingHtml

}

loadPage()

