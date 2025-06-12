import { Product, Clothing, Appliance } from "../../data/products.js";


describe("test suite: check whether classes works", () => {
    it("check whether class Product works", () => {
        const product = new Product({
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            price: "100",
            keywords: [
                "socks",
                "sports",
                "apparel"
            ]
        })

        expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")

        expect(product.getStarsUrl()).toContain(`images/ratings/rating-${product.rating.stars * 10}.png`)
    })

    it("check whether class Clothing works", () => {
        const tshirt = new Clothing({
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
                stars: 4.5,
                count: 56
            },
            price: "700",
            keywords: [
                "tshirts",
                "apparel",
                "mens"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
        })

        expect(tshirt.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")

        expect(tshirt.extraInfoHtml()).toContain('<a href="images/clothing-size-chart.png" target="_blank">Size Chart</a>')
    })


    it("check whether class Appliance works",()=>{
        const toaster=new Appliance({
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
              stars: 5,
              count: 2197
            },
            price: "1,580",
            keywords: [
              "toaster",
              "kitchen",
              "appliances"
            ],
            type:"appliance",
            applianceInstructionsLink:"images/appliance-instructions.png",
            applianceWarrantyLink:"images/appliance-warranty.png"
          })

          expect(toaster.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add")
          expect(toaster.extraInfoHtml()).toContain('<a href="images/appliance-instructions.png" target="_blank">')
          expect('<a href="images/appliance-warranty.png" target="_blank">')
    })


})