import { getDeliveryOption } from "./deliveryOptions.js";

export let cart;

loadFromStorage()

export function loadFromStorage(){
 cart =JSON.parse(localStorage.getItem("cartproduct"))


if(!cart){
    cart=[{
        productid:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1,
        deliveryOptionId:"1"
    }]
}
}


function addCartToLocalStorage(){

    localStorage.setItem("cartproduct",JSON.stringify(cart))
}



export function addToCart(productid) {
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
        matchingitem.quantity +=quantity
    }

    else {
        cart.push({
            // productid:productid
            productid,
            // quantity:quantity
            quantity,
            deliveryOptionId:"1"
        })

    }
    addCartToLocalStorage()
  
}



export function removeProductFromCart(productId){
    const newCart=[]
    console.log(newCart)
    cart.forEach((cartItem)=>{

        if(cartItem.productid!==productId){

            newCart.push(cartItem)

        }
    })
   console.log(cart)
    cart=newCart
    console.log(cart)


    addCartToLocalStorage()
   

}

// export var num_quantity=0;
export function updateCartQuantity() {
   let num_quantity = 0;
    cart.forEach((cartItem) => {
        num_quantity += cartItem.quantity
        // addNumQuantityToLocalStorage()
        // localStorage.setItem("num_quantity",JSON.stringify(num_quantity))
        
    })

    return num_quantity    
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productid) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
  
    addCartToLocalStorage()
}


export function updateDeliveryOption(productId,deliveryOptionId){

    let matchingProduct

  
   let deliveryOption=getDeliveryOption(deliveryOptionId)


   
    cart.forEach((cartItem)=>{
        if(productId===cartItem.productid){
            matchingProduct=cartItem
        }

       
    })


    if(!matchingProduct){
        return; 
    }

    if(!deliveryOption){
        return;
    }



    matchingProduct.deliveryOptionId=deliveryOptionId

  addCartToLocalStorage()
}

export function loadCartFetch(){
    const promise1=fetch("https://supersimplebackend.dev/cart").then((response)=>{
        return response.text()
    }).then((value)=>{
        console.log(value)
    })

    return promise1
}

// loadCartFetch()




export function loadCart(fun) {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", () => {
      
    //   console.log("load cart")
      fun()
      
    })
  
    xhr.open("GET", "https://supersimplebackend.dev/cart")
    xhr.send()
  }

