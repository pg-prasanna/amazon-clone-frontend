import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../data/cart-class.js";
import { renderPaymentSummary } from "../../scripts/checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";



describe("test suite: display Order summary", () => {

    beforeAll((done) => {
        loadProductsFetch().then(() => {
            done()
        })

    })


    beforeEach(() => {

        document.querySelector(".js-test-ordersummary-container").innerHTML = `<div class="order-summary-container"></div>`

        spyOn(localStorage, "setItem")

        cart.cartItems = [
            {
                id: "42ff2606-3dc2-1f95-6d4e-4ba1d4238346",
                productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                variationDetails: {},
                deliveryOptionId: "1"
            },
            {
                id: "89326bc1-2fdc-74c6-4966-dd3d2ccf1184",
                productid: "bc2847e9-5323-403f-b7cf-57fde044a955",
                quantity: 1,
                variationDetails: { "Color": "Black", "Size": "XL" },
                deliveryOptionId: "1"
            }
        ]


        renderOrderSummary()
    })

    afterEach(() => {
        document.querySelector(".js-test-ordersummary-container").innerHTML = " "

        document.querySelector(".payment-summary-container").innerHTML = " "

        document.querySelector(".items").innerHTML = ""
    })

    it("display cart", () => {

        expect(document.querySelectorAll(".ordered-product-container").length).toEqual(2)

        console.log(cart.cartItems[0].quantity)

        expect(document.querySelector(`.quantity-${cart.cartItems[0].id}`).innerHTML).toContain("Quantity: 1")

        expect(document.querySelector(`.quantity-${cart.cartItems[1].id}`).innerHTML).toContain("Quantity: 1")



        expect(document.querySelector(`.js-cart-item-name-${cart.cartItems[0].id}`).innerHTML).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs")

        expect(document.querySelector(`.js-cart-item-name-${cart.cartItems[1].id}`).innerHTML).toEqual("Men's Full-Zip Hooded Fleece Sweatshirt")


        expect(document.querySelector(`.js-price-${cart.cartItems[0].id}`).innerHTML).toEqual("100")

        expect(document.querySelector(`.js-price-${cart.cartItems[1].id}`).innerHTML).toEqual("1,999")

    })

    it("remove a product", () => {

        document.querySelector(`.js-delete-btn-${cart.cartItems[0].id}`).click()

        expect(document.querySelectorAll(".ordered-product-container").length).toEqual(1)

        expect(document.querySelector(".ordered-product-container-42ff2606-3dc2-1f95-6d4e-4ba1d4238346")).toEqual(null)

        expect(document.querySelector(`.ordered-product-container-${cart.cartItems[0].id}`)).not.toEqual(null)

        expect(cart.cartItems.length).toEqual(1)
        expect(cart.cartItems[0].id).toEqual("89326bc1-2fdc-74c6-4966-dd3d2ccf1184")

        expect(document.querySelector(`.js-cart-item-name-${cart.cartItems[0].id}`).innerHTML).toEqual("Men's Full-Zip Hooded Fleece Sweatshirt")
        expect(document.querySelector(`.js-price-${cart.cartItems[0].id}`).innerHTML).toEqual("1,999")

    })

    it("updating delivery option", () => {
        console.log(document.querySelector(".order-summary-container"))

        document.querySelector(`.js-delivery-option-${cart.cartItems[0].id}-3`).click()

        expect(document.querySelector(`.js-delivery-option-${cart.cartItems[0].id}-3`).checked).toEqual(true)

        renderPaymentSummary()
        expect(cart.cartItems[0].deliveryOptionId).toEqual("3")

        expect(document.querySelector(".js-payment-summary-delivery-price").innerHTML).toEqual("90")
        expect(document.querySelector(".js-total-price").innerHTML).toEqual("2,408")
    })
})


