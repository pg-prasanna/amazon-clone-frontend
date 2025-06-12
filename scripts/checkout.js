import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts,loadProductsFetch } from '../data/products.js';
import { loadCart,loadCartFetch } from '../data/cart.js';
// import "../data/backend-practice.js"




async function loadPage(){
   try{
    // throw "error"
    console.log("Async")
    await loadProductsFetch();
    await loadCartFetch();
    renderOrderSummary();
    renderPaymentSummary();
   }
   catch(error){
      console.log("unexpected error, please try again")
   }
    
    
    
}

loadPage().then(()=>{
    console.log("Async_1")
})



/*
Promise.all([
    loadProductsFetch(),
    loadCartFetch()
]).then((value)=>{
    console.log(value)

    renderOrderSummary()
    renderPaymentSummary()

})
*/





/*

Promise.all([
    new Promise((resolve)=>{
        loadProducts(()=>{
            resolve("promise1")
        })
    }),
    new Promise((resolve)=>{
        loadCart(()=>{
         resolve("promise2")
        })
     })
]).then((value)=>{
    console.log(value)

    renderOrderSummary()
    renderPaymentSummary()

})
*/


/*
new Promise((resolve)=>{
    loadProducts(()=>{
        resolve()
    })
}).then(()=>{
    return new Promise((resolve)=>{
       loadCart(()=>{
        resolve()
       })
    })
}).then(()=>{
    renderOrderSummary()
    renderPaymentSummary()
})
*/
/*
loadProducts(()=>{

    loadCart(()=>{

        renderOrderSummary()
        renderPaymentSummary()
    
    })

    
})*/

