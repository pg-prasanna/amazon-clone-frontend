import { getOrders, orders,getProductFromOrders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { getProduct } from '../data/products.js'
import { loadProductsFetch } from '../data/products.js'
import { cart } from '../data/cart-class.js'
import { renderHeaderHtml } from "./shared/amazon-header.js";
import { renderVariationHtml } from "./utils/variation.js";



renderHeaderHtml()
export async function loadPage() {

    await loadProductsFetch()



    let cartQuantity = cart.updateCartQuantity();
    document.querySelector(".order-num").innerHTML = cartQuantity


    let ordersHtml = ""


    orders.forEach((order) => {
        console.log(`orderTime ${order.orderTime}`)
        
        dayjs.extend(dayjsPluginUTC.default)
        let orderDate=dayjs(order.orderTime).utcOffset('+05:30')
        console.log(orderDate)

         orderDate = dayjs(order.orderTime).format
        ("MMMM D")

        console.log(orderDate)
        console.log(order.totalCost)

        ordersHtml += `
        <div class="order-container">
                <div class="order-header">
                    <div class="left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div >${orderDate}</div>
                        </div>
                        <div class="order-total-orders">
                            <div
                            class="order-header-label">Total:</div>
                            <div class="order-total-value-container">
                                <i class="fa-solid fa-indian-rupee-sign"></i>
                                <div class="order-total-value">${order.totalCost}</div>
                            </div>
                        </div>
                    </div>

                    <div class="right-section">
                        <div class="order-header-label">Order Id:</div>
                        <div class="js-test-order-id">${order.id}</div>
                    </div>
                </div>
                <div class="order-details">
                    ${orderProductsListHtml(order)}
               </div>
        </div>`

    })




    function orderProductsListHtml(order) {
        let innerOrderHtml = ""
        order.products.forEach((orderProduct) => {


            console.log(orderProduct.productid)
            let product = getProduct(orderProduct.productid)
            let productImage=product.createImageUrl(orderProduct.variations)
            let arrivingDate = dayjs(orderProduct.estimatedDeliveryTime).format("MMM D")
            console.log(arrivingDate)

            innerOrderHtml += `
        <div class="product-image-container">
            <img src="${productImage}">
        </div>
        <div class="poroduct-name-details">
            <div class="product-name">${product.name}</div>
            <div class="product-arriving-date">Arriving on: ${arrivingDate}</div>
            ${renderVariationHtml(orderProduct.variations)}
            <div class="product-quantity">Quantity: ${orderProduct.quantity}</div>
            <button class="product-buy-again js-product-buy-again js-product-buy-again-${orderProduct.id}" data-product-id="${orderProduct.productid}" data-cart-id="${orderProduct.id}" data-order-id="${order.id}">
                <img src="images/icons/buy-again.png">
                <span class="product-buy-again-text">Buy it again </span>
            </button>
        </div>

        <div class="track-package-container">
          <a class="js-track-package-btn" href="tracking.html?orderId=${order.id}&productId=${orderProduct.productid}&cartId=${orderProduct.id}">
            <button  class="track-package-button">Track Package</button>
          </a>  
        </div>`





        })
        return innerOrderHtml

    }

    let orderGrid= document.querySelector(".order-grid")
    // document.querySelector(".order-grid").innerHTML = ordersHtml
    orderGrid.innerHTML=ordersHtml

    document.querySelectorAll(".js-product-buy-again").forEach((element) => {

        element.addEventListener("click", () => {

            let orderId=element.dataset.orderId
            console.log(orderId)
            let productId = element.dataset.productId
            let cartId=element.dataset.cartId
            let order=getOrders(orderId)
            let productFromCart=getProductFromOrders(order,cartId)
            let variationDetails=productFromCart.variations

            console.log(order)
            
            cart.addToCart(productId,1,variationDetails)
            let cartQuantity = cart.updateCartQuantity();
            document.querySelector(".order-num").innerHTML = cartQuantity
           
            element.innerHTML="added"

            setTimeout(()=>{
                element.innerHTML=`<img src="images/icons/buy-again.png">
                <span class="product-buy-again-text">Buy it again </span>`
            },2000)
        })

    })


    

    
}

loadPage()
