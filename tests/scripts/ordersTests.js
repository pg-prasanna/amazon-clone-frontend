import { loadPage } from "../../scripts/orders.js"
import { loadFromStorage } from "../../data/orders.js"
import { cart } from "../../data/cart-class.js"
describe("test suite: display the orders page", () => {


    beforeEach(async ()=>{
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
                {
                    id: "586bd0e7-7b71-4500-8c1a-b3f5bfb40045",
                    orderTime: "2024-05-13T16:30:05",
                    products: [
                        {
                            estimatedDeliveryTime: "2024-05-16T16:30:05.906590",
                            id: "6469dbe9-a4ba-fee8-212c-be30142c6896",
                            productid: "bc2847e9-5323-403f-b7cf-57fde044a955",
                            quantity: 1,
                            variations: { Color: "Black", Size: "XL" }
                        }
                    ],
                    totalCost: "2,253"
                }
            ])
        })
        loadFromStorage()
        await loadPage()

    })

    afterAll(()=>{
        document.querySelector(".amazon-header").innerHTML=""
        document.querySelector(".order-grid").innerHTML=""
    })

    it("display orders", async () => {

        spyOn(localStorage, "setItem")
        
        
        expect(document.querySelectorAll(".order-container").length).toEqual(1)
        expect(document.querySelector(".js-test-order-id").innerHTML).toEqual("586bd0e7-7b71-4500-8c1a-b3f5bfb40045")
        expect(document.querySelector(".product-name").innerHTML).toEqual("Men's Full-Zip Hooded Fleece Sweatshirt")
    })

    it("check Buy it again button works", async ()=>{

        spyOn(localStorage,"setItem")
        cart.cartItems=[]
        document.querySelector(".js-product-buy-again-6469dbe9-a4ba-fee8-212c-be30142c6896").click()

        expect(cart.cartItems.length).toEqual(1)
        expect(cart.cartItems[0].productid).toEqual("bc2847e9-5323-403f-b7cf-57fde044a955")


    })
})





