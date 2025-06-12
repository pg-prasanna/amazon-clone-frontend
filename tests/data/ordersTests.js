import { addOrders, orders ,loadFromStorage} from "../../data/orders.js"

describe("test suite: add the orders",()=>{
    it("check order is added",()=>{
        spyOn(localStorage,"setItem")
        spyOn(localStorage,"getItem").and.callFake(()=>{
            return JSON.stringify([]);
        })
        loadFromStorage()
        addOrders({id:"586bd0e7-7b71-4500-8c1a-b3f5bfb40045",orderTime:"2024-05-13T16:30:05",products:[{estimatedDeliveryTime:"2024-05-16T16:30:05.906590",id:"6469dbe9-a4ba-fee8-212c-be30142c6896",productid:"bc2847e9-5323-403f-b7cf-57fde044a955",quantity:1,variations:{Color:"Black",Size:"XL"}}],totalCost:"2,253"})

        expect(orders.length).toEqual(1)
        expect(orders[0].id).toEqual("586bd0e7-7b71-4500-8c1a-b3f5bfb40045")

    
    })

})













// {"id":"586bd0e7-7b71-4500-8c1a-b3f5bfb40045","orderTime":"2024-05-13T16:30:05","products":[{"estimatedDeliveryTime":"2024-05-16T16:30:05.906590","id":"6469dbe9-a4ba-fee8-212c-be30142c6896","productid":"bc2847e9-5323-403f-b7cf-57fde044a955","quantity":1,"variations":{"Color":"Black","Size":"XL"}}],"totalCost":"2,253"}