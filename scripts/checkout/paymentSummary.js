import { cart } from '../../data/cart-class.js';
import { getProduct } from '../../data/products.js'
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { MoneyToNumericFormat } from '../utils/money.js';
import { addOrders } from '../../data/orders.js';

export let orders1=[]
export function renderPaymentSummary() {
  let productPrice = 0;
  let stringProductPrice = 0
  let deliveryPrice = 0
  let renderPaymentSummaryHtml = ""
  cart.cartItems.forEach((cartItem) => {
    const product = getProduct(cartItem.productid)

    console.log(product)
    console.log(cartItem)

    console.log(product.price, cartItem.quantity)
    let stringPrice = product.price
    stringPrice = stringPrice.replace(",", "")
    let intPrice = parseInt(stringPrice)
    console.log(intPrice, typeof intPrice)
    productPrice += intPrice * cartItem.quantity

    console.log(productPrice)
    stringProductPrice = MoneyToNumericFormat(productPrice)

    const deliveryOptionId = cartItem.deliveryOptionId

    let deliveryOption = getDeliveryOption(deliveryOptionId)
    console.log(deliveryOption)

    deliveryPrice += deliveryOption.price
  })

  console.log(stringProductPrice)
  console.log(deliveryPrice)
  let totalBeforeTax = productPrice + deliveryPrice

  let stringTotalBeforeTax = MoneyToNumericFormat(totalBeforeTax)
  console.log(stringTotalBeforeTax)

  let tax = Math.round(totalBeforeTax * 0.1)
  let stringTax = MoneyToNumericFormat(tax)
  console.log(stringTax)

  let orderTotal = tax + totalBeforeTax
  orderTotal = MoneyToNumericFormat(orderTotal)
  let orderTotalBackEnd = orderTotal
  let cartQuantity = cart.updateCartQuantity()
  console.log(cart.cartItems.length)
  let disabled=`${cart.cartItems.length===0 ? "disabled": " "}`
  // <div>Item (${cartQuantity}):</div>

  renderPaymentSummaryHtml += `<div class="payment-summary-heading">Order Summary</div>
    <div class="payment-summary-row">
      <div>Item (<span class="order-num">${cartQuantity}</span>):</div>
      <div>
        <div class="payment-summary-price">
          <i  class="fa-solid fa-indian-rupee-sign icon-payment"></i>
          <p class="payment-price">${stringProductPrice}</p>
        </div>
      </div>
    </div>
    <div class="payment-summary-row">
      <div>Shipping & Handling:</div>
      <div>
        <div class="payment-summary-price">
          <i class="fa-solid fa-indian-rupee-sign"></i>
          <p class="payment-price js-payment-summary-delivery-price">${deliveryPrice}</p>
        </div>
      </div>
    </div>
    <div class="payment-summary-row total-before-tax">
      <div>Total before tax:</div>
      <div class="total-before-tax-right">
        <div class="payment-summary-price">
          <i class="fa-solid fa-indian-rupee-sign"></i>
          <p class="payment-price">${stringTotalBeforeTax}</p>
        </div>
      </div>
    </div>

    <div class="payment-summary-row estimated-tax">
      <div>Estimated tax (10%)</div>
      <div>
        <div class="payment-summary-price">
          <i class="fa-solid fa-indian-rupee-sign"></i>
          <p class="payment-price">${stringTax}</p>
        </div>
      </div>
    </div>

    <div class="payment-summary-row order-total">
      <div class="order-total">Order total:</div>
      <div>
        <div class="payment-summary-price order-total">
          <i class="fa-solid fa-indian-rupee-sign"></i>
          <p class="payment-price order-total-price js-total-price">${orderTotal}</p>
        </div>
      </div>
    </div>
    <button ${disabled}  class="place-order-btn js-place-order-btn">Place your order</button>`


  document.querySelector(".payment-summary-container").innerHTML = renderPaymentSummaryHtml


  

  // console.log("payment summary")

  
  document.querySelector(".js-place-order-btn").addEventListener("click", async () => {
    try {
      const response = await fetch("https://amazonbackend-80aa.onrender.com/order", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          cart: cart,
          orderTotal: orderTotalBackEnd
        })
      })

      const orders = await response.json()
      console.log(orders)
      addOrders(orders)
      localStorage.removeItem("cartproduct-oop")
    }
    catch (error) {
      console.log(error)

    }

    window.location.href = "orders.html"

  })


}

