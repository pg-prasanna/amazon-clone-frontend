import { MoneyToNumericFormat } from "../../scripts/utils/money.js";



describe("test suite: currency Numeric format",()=>{
    it("convert currency to numeric format for (ten)  10",()=>{
        expect(MoneyToNumericFormat(10)).toEqual("10");
    })

    it("convert currency to numeric format for (thousands) 1000",()=>{
        expect(MoneyToNumericFormat(1000)).toEqual("1,000")
    })

    it("convert currency to numeric format for (ten thousands) 10000",()=>{
        expect(MoneyToNumericFormat(10000)).toEqual("10,000")
    })

    it("convert currency to numeric format for (lakhs) 100000",()=>{
        expect(MoneyToNumericFormat(100000)).toEqual("1,00,000")
    })

    it("convert currency to numeric format for (crores) 10000000 ",()=>{
        expect(MoneyToNumericFormat(10000000)).toEqual("1,00,00,000")
    })
})