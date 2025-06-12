import { cart } from "../../data/cart-class.js";
import { loadFromStorage } from "../../data/cart.js";
import { removeProductFromCart } from "../../data/cart.js"




describe("test suite: add to cart", () => {

    beforeEach(() => {
        spyOn(localStorage, "setItem")
        document.querySelector(".select-class").innerHTML = `<select class="js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <select class="js-quantity-selector-15b6fc6f-327a-4ec4-896f-486349e85a3d">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>`
    })

    afterEach(() => {
        document.querySelector(".js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6").remove()
        document.querySelector(".js-quantity-selector-15b6fc6f-327a-4ec4-896f-486349e85a3d").remove()
    })

    it("add a existing product to cart", () => {


        cart.cartItems = [
            {
                id: "89326bc1-2fdc-74c6-4966-dd3d2ccf1184",
                productid: "bc2847e9-5323-403f-b7cf-57fde044a955",
                quantity: 1,
                variationDetails: { "Color": "Black", "Size": "XL" },
                deliveryOptionId: "1"
            },
            {
                id: "42ff2606-3dc2-1f95-6d4e-4ba1d4238346",
                productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                variationDetails: {},
                deliveryOptionId: "1"
            }
        ]

        loadFromStorage()

        console.log(cart[0])

        cart.addToCart("bc2847e9-5323-403f-b7cf-57fde044a955", 1, { "Color": "Black", "Size": "XL" })
        expect(cart.cartItems[0].quantity).toEqual(2)

        expect(localStorage.setItem).toHaveBeenCalledWith("cartproduct-oop", JSON.stringify([{
            id: "89326bc1-2fdc-74c6-4966-dd3d2ccf1184",
            productid: "bc2847e9-5323-403f-b7cf-57fde044a955",
            quantity: 2,
            variationDetails: { "Color": "Black", "Size": "XL" },
            deliveryOptionId: "1"

        },
        {
            id: "42ff2606-3dc2-1f95-6d4e-4ba1d4238346",
            productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            variationDetails: {},
            deliveryOptionId: "1"
        }
        ]))
    })




    it("add a new product to cart", () => {


        cart.cartItems = []



        console.log(localStorage.getItem("cart"))

        cart.addToCart("bc2847e9-5323-403f-b7cf-57fde044a955", 2, { "Color": "Black", "Size": "XL" })


        expect(cart.cartItems[0].productid).toEqual("bc2847e9-5323-403f-b7cf-57fde044a955")
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart.cartItems.length).toEqual(1)

        // expect(localStorage.setItem).toHaveBeenCalledWith("cartproduct-oop", JSON.stringify([
        //     {
        //         id:"6d744f44-37d3-57af-14b2-1a2dcf8963d2",
        //         productid:"bc2847e9-5323-403f-b7cf-57fde044a955",
        //         quantity:1,
        //         variationDetails:{"Color":"Black","Size":"XL"},
        //         deliveryOptionId:"1"
        //     }
        //     ]))
    })


})


describe("test suite: remove from the cart", () => {

    beforeEach(() => {
        spyOn(localStorage, "setItem")
        cart.cartItems = [

            {
                id: "89326bc1-2fdc-74c6-4966-dd3d2ccf1184",
                productid: "bc2847e9-5323-403f-b7cf-57fde044a955",
                quantity: 1,
                variationDetails: { "Color": "Black", "Size": "XL" },
                deliveryOptionId: "1"
            },
            {
                id: "42ff2606-3dc2-1f95-6d4e-4ba1d4238346",
                productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                variationDetails: {},
                deliveryOptionId: "1"
            }

        ]
    })
    it("remove the product in the cart", () => {

        cart.removeProductFromCart(cart.cartItems[0].id)

        console.log(cart)

        expect(cart.cartItems.length).toEqual(1)
        expect(cart.cartItems[0].id).toEqual("42ff2606-3dc2-1f95-6d4e-4ba1d4238346")

        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith("cartproduct-oop", JSON.stringify([{
            id: "42ff2606-3dc2-1f95-6d4e-4ba1d4238346",
            productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            variationDetails: {},
            deliveryOptionId: "1"

        }]))


    })

    it("does nothing if product not in cart", () => {

        cart.removeProductFromCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")

        expect(cart.cartItems.length).toEqual(2)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith("cartproduct-oop", JSON.stringify([
            {
                id: "89326bc1-2fdc-74c6-4966-dd3d2ccf1184",
                productid: "bc2847e9-5323-403f-b7cf-57fde044a955",
                quantity: 1,
                variationDetails: { "Color": "Black", "Size": "XL" },
                deliveryOptionId: "1"
            },
            {
                id: "42ff2606-3dc2-1f95-6d4e-4ba1d4238346",
                productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                variationDetails: {},
                deliveryOptionId: "1"
            }


        ]))

    })
})

describe("test suite: update delivery option", () => {


    beforeEach(() => {

        spyOn(localStorage, "setItem")
        cart.cartItems = [
            {
                id: "89326bc1-2fdc-74c6-4966-dd3d2ccf1184",
                productid: "bc2847e9-5323-403f-b7cf-57fde044a955",
                quantity: 1,
                variationDetails: { "Color": "Black", "Size": "XL" },
                deliveryOptionId: "1"
            },
            {
                id: "42ff2606-3dc2-1f95-6d4e-4ba1d4238346",
                productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                variationDetails: {},
                deliveryOptionId: "1"
            }
        ]

    })

    it("update delivery option for product in the cart", () => {

        cart.updateDeliveryOption(cart.cartItems[0].id, "3")
        expect(cart.cartItems[0].deliveryOptionId).toEqual("3")
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith("cartproduct-oop", JSON.stringify([
            {
                id: "89326bc1-2fdc-74c6-4966-dd3d2ccf1184",
                productid: "bc2847e9-5323-403f-b7cf-57fde044a955",
                quantity: 1,
                variationDetails: { "Color": "Black", "Size": "XL" },
                deliveryOptionId: "3"
            },
            {
                id: "42ff2606-3dc2-1f95-6d4e-4ba1d4238346",
                productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                variationDetails: {},
                deliveryOptionId: "1"
            }
        ]))
    })


    it("does nothing if the product is not in the cart", () => {
        cart.updateDeliveryOption("83d4ca15-0f35-48f5-b7a3-1ea210004f2e", "3")

        expect(cart.cartItems[0].deliveryOptionId).toEqual("1")
        expect(cart.cartItems[1].deliveryOptionId).toEqual("1")


        expect(localStorage.setItem).toHaveBeenCalledTimes(0)
    })


    it("does nothing if the delivery option does not exist", () => {
        cart.updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "4")

        expect(cart.cartItems[0].deliveryOptionId).toEqual("1")
        expect(cart.cartItems[1].deliveryOptionId).toEqual("1")


        expect(localStorage.setItem).toHaveBeenCalledTimes(0)
    })


})


