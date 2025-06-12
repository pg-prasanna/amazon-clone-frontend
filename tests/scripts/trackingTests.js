/*import { loadFromStorage, orders } from "../../data/orders.js"
import { loadPage } from "../../scripts/orders.js"
import { loadPage as loadPageTracking } from "../../scripts/tracking.js"


describe("test suite: display tracking page",()=>{
    beforeEach(async ()=>{
        spyOn(localStorage, "setItem")
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
    it("display tracking",async(event)=>{
        

        document.querySelector(".js-track-package-btn").href=`../tracking.html?orderId=${orders[0].id}&productId=${orders[0].products[0].productid}&cartId=${orders[0].products[0].id}`


        
        document.querySelector(".js-track-package-btn").click()
        await loadPageTracking(orders)
        
        console.log(orders)
       

       
       

        
    })
   
})*/