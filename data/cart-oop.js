import { getDeliveryOption } from "./deliveryOptions.js";
function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,
        

        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey))
            if (!this.cartItems) {
                this.cartItems = [{
                    productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: "1"
                },
            {
                    productid: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                    quantity: 1,
                    deliveryOptionId: "1"
            }]
            }
        },

        addCartToLocalStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems))
        },
        addToCart(productid) {
            //   adding product to the cart

            let quantity = parseInt(document.querySelector(`.js-quantity-selector-${productid}`).value)
            console.log(quantity)
            let matchingitem;
            cart.forEach((cartItem) => {
                // console.log(`${productname}===${item.productname}`)
                if (productid === cartItem.productid) {
                    matchingitem = cartItem
                }
            })

            if (matchingitem) {
                matchingitem.quantity += quantity
            }

            else {
                cart.push({
                    // productid:productid
                    productid,
                    // quantity:quantity
                    quantity,
                    deliveryOptionId: "1"
                })

            }
            this.addCartToLocalStorage()

        },

        removeProductFromCart(productId) {
            const newCart = []
            console.log(newCart)
            cart.forEach((cartItem) => {

                if (cartItem.productid !== productId) {

                    newCart.push(cartItem)

                }
            })
            console.log(cart)
            cart = newCart
            console.log(cart)


            this.addCartToLocalStorage()


        },

        updateCartQuantity() {
            let num_quantity = 0;
            cart.forEach((cartItem) => {
                num_quantity += cartItem.quantity
                // addNumQuantityToLocalStorage()
                // localStorage.setItem("num_quantity",JSON.stringify(num_quantity))

            })

            return num_quantity
        },

        updateQuantity(productId, newQuantity) {
            let matchingItem;

            cart.forEach((cartItem) => {
                if (productId === cartItem.productid) {
                    matchingItem = cartItem;
                }
            });

            matchingItem.quantity = newQuantity;

            this.addCartToLocalStorage()
        },

        updateDeliveryOption(productId, deliveryOptionId) {

            let matchingProduct

            let deliveryOption = getDeliveryOption(deliveryOptionId)
            cart.forEach((cartItem) => {
                if (productId === cartItem.productid) {
                    matchingProduct = cartItem
                }


            })

            if (!matchingProduct) {
                return;
            }

            if (!deliveryOption) {
                return;
            }

            matchingProduct.deliveryOptionId = deliveryOptionId

            this.addCartToLocalStorage()
        }
    }

    return cart;
}


const cart=Cart("cartproduct-oop");
const businessCart=Cart();

cart.loadFromStorage("cartproduct-bussiness")
businessCart.loadFromStorage()
console.log(cart)
console.log(businessCart)