import { cart } from '../../data/cart-class.js'
import { getProduct } from '../../data/products.js'
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js'
import { calculateDeliveryDate } from '../../data/deliveryOptions.js'
import { renderVariationHtml } from '../utils/variation.js'


export function renderOrderSummary() {
  let cartProductHtml = "";

  console.log(cart.cartItems)
  if (cart.cartItems.length !== 0) {
    cart.cartItems.forEach((cartItem) => {
      const productId = cartItem.productid




      let matchingProduct = getProduct(productId)
      let productImage = matchingProduct.createImageUrl(cartItem.variationDetails)


      const deliveryOptionId = cartItem.deliveryOptionId

      let deliveryOption = getDeliveryOption(deliveryOptionId)

      let dataString = calculateDeliveryDate(deliveryOption)


      cartProductHtml += `
  <div class="ordered-product-container js-cart-item  ordered-product-container-${cartItem.id}" data-cart-id="${cartItem.id}">
       <p class="delivery-date-final">Delivery date: ${dataString}</p>
     <div class="cart-item-details">
       <img class="cart-item" src="${productImage}">
       <div class="cart-item-name-price">
         <div class="cart-item-name js-cart-item-name-${cartItem.id}">${matchingProduct.name}</div>
         <div class="cart-item-price">
           <i class="fa-solid fa-indian-rupee-sign"></i>
           <p class="price js-price-${cartItem.id}">${matchingProduct.price}</p>
         </div>
         ${renderVariationHtml(cartItem.variationDetails)}
         <div class="cart-item-quantity">
           <div class="quantity quantity-${cartItem.id}">Quantity: ${cartItem.quantity}</div>
           <button class="update-btn js-update-btn js-update-btn-${cartItem.id}" data-cart-id="${cartItem.id}">Update</button>
           <input class="quantity-input js-quantity-input-${cartItem.id}" type="number">
           <button class="save-quantity-input js-save-quantity link-primary js-save-quantity-${cartItem.id}" data-cart-id="${cartItem.id}">Save</button> 
           <button class="delete-btn js-delete-btn js-delete-btn-${cartItem.id}" data-cart-id="${cartItem.id}">Delete</button>
         </div>
       </div>
       <div class="delivery-option" >
         <div class="delivery-option-heading">Choose Delivery Option:</div>
         ${deliveryOptionHtml(matchingProduct, cartItem)}
       </div>
     </div>
   </div>

   `
    })

    let orderSummaryContainer = document.querySelector(".order-summary-container")

    // console.log(orderSummaryContainer)
    orderSummaryContainer.innerHTML = cartProductHtml
  }
  else {
    document.querySelector(".order-summary-container").innerHTML = `
        <div>
          <div>Your cart is empty</div>
          <button class="view-product-btn js-view-product-btn">View products</button>
        </div>`
    console.log("oooo")
    document.querySelector(".js-view-product-btn").addEventListener("click", () => {
      console.log("view product")
      window.location.href = "index.html"

    })
  }





  function deliveryOptionHtml(matchingProduct, cartItem) {
    let html = ""
    deliveryOptions.forEach((deliveryOption) => {

      let dateString = calculateDeliveryDate(deliveryOption)
      const price = deliveryOption.price === 0 ? "Free" : deliveryOption.price

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId

      console.log(isChecked)


      if (price === "Free") {
        html += `<div class="delivery-charge-container js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
    <input class="delivery-charge-radio-btn js-delivery-option-input js-delivery-option-${cartItem.id}-${deliveryOption.id}" ${isChecked ? "checked" : " "} type="radio" data-delivery-option-id="${deliveryOption.id}" name="delivery-date-${cartItem.id}" value="${dateString}">
    <div>
      <p class="delivery-date">${dateString}</p>
      <div class="delivery-charge">
      <p class="delivery-charge-para">${price} Shipping</p>
      </div>
    </div>
  </div>`
      }
      else {
        html += `<div class="delivery-charge-container js-delivery-option"
    data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
    <input class="delivery-charge-radio-btn js-delivery-option-input js-delivery-option-${cartItem.id}-${deliveryOption.id}" ${isChecked ? "checked" : " "} type="radio" data-delivery-option-id="${deliveryOption.id}" name="delivery-date-${cartItem.id}" value="${dateString}">
    <div>
      <p class="delivery-date js-delivery-">${dateString}</p>
      <div class="delivery-charge">
      <i class="fa-solid fa-indian-rupee-sign"></i>
      <p class="delivery-charge-para">${price} - Shipping</p>
      </div>
    </div>
  </div>`
      }

    })

    return html

  }


  function updationCartQuantity() {
    let cartQuantity = cart.updateCartQuantity();
    document.querySelector(".items").innerHTML = `${cartQuantity} items`

  }


  document.querySelectorAll(".js-delete-btn").forEach((link) => {

    link.addEventListener("click", () => {
      let cartId = link.dataset.cartId
      cart.removeProductFromCart(cartId)
      let container = document.querySelector(`.ordered-product-container-${cartId}`)
      console.log(container)
      container.remove()
      renderOrderSummary()
      updationCartQuantity()
      renderPaymentSummary()

    })
  })

  updationCartQuantity()



  document.querySelectorAll(".js-update-btn").forEach((link) => {
    link.addEventListener("click", () => {
      let cartId = link.dataset.cartId
      let updateBtn = document.querySelector(`.js-update-btn-${cartId}`)


      let quantityInput = document.querySelector(`.js-quantity-input-${cartId}`)
      console.log(quantityInput)
      let saveQuantityInput = document.querySelector(`.js-save-quantity-${cartId}`)



      let quantityString=document.querySelector(`.quantity-${cartId}`).innerHTML.split(" ")
      console.log(quantityString[1])


      quantityInput.value=quantityString[1]
      quantityInput.style.display = "inline"
      saveQuantityInput.style.display = "inline"

      document.querySelector(`.quantity-${cartId}`).innerHTML = "Quantity: "
      updateBtn.style.display = "none"

    })

  })

  document.querySelectorAll(".js-save-quantity").forEach((link) => {

    link.addEventListener("click", () => {
      console.log(link);
      let cartId = link.dataset.cartId;
      let savequantity = document.querySelector(`.js-quantity-input-${cartId}`)
      console.log(savequantity)
      let newQuantity = Number(savequantity.value)

      if(newQuantity<1){
         alert("Not a Valid Quantity")
         return;
      }

      document.querySelector(`.quantity-${cartId}`).innerHTML = `Quantity: ${newQuantity}`
      let quantityInput = document.querySelector(`.js-quantity-input-${cartId}`)
      let saveQuantityInput = document.querySelector(`.js-save-quantity-${cartId}`)
      let updateBtn = document.querySelector(`.js-update-btn-${cartId}`)
      quantityInput.style.display = "none"
      saveQuantityInput.style.display = "none"
      updateBtn.style.display = "inline"
      cart.updateQuantity(cartId, newQuantity);
      cart.updateCartQuantity()
      updationCartQuantity()
      renderPaymentSummary()



    })

  })

  document.querySelectorAll(".js-delivery-option").forEach((element) => {

    element.addEventListener("click", () => {

      const producContainer=element.closest(".js-cart-item")
      const cartId=producContainer.getAttribute("data-cart-id")
      const deliveryOptionId=element.dataset.deliveryOptionId
      cart.updateDeliveryOption(cartId,deliveryOptionId)
      renderOrderSummary()
      renderPaymentSummary()
    })
  })

}
