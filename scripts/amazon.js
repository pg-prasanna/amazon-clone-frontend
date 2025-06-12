import { products, loadProducts, loadProductsFetch, getProduct } from '../data/products.js'
import { cart } from '../data/cart-class.js'
import { renderHeaderHtml } from './shared/amazon-header.js'

// generaing HTML code 
let product_html = ""

// loadProducts(renderProducts)
loadProductsFetch().then(() => {
    renderProducts()
})


renderHeaderHtml()



function renderProducts() {

    const url = new URL(window.location.href)

    const search = url.searchParams.get("search")

    let filteredProduct = products

    if (search) {
        filteredProduct = filteredProduct.filter((product) => {
            let matchingKeyword = false
            product.keywords.forEach((keyword) => {
                if (keyword.toLowerCase().includes(search.toLowerCase())) {
                    matchingKeyword = true
                }
            })
            document.querySelector(".js-header-input").value = search
            document.querySelector(".js-mobile-header-input").value = search
            return product.name.toLowerCase().includes(search) || matchingKeyword

        })
    }


    if (filteredProduct.length === 0) {
        document.querySelector(".products-container").innerHTML = `
                         <div class="empty-results-message">
                             No products matched your search.
                         </div>`
        return
    }

    console.log(filteredProduct)


    filteredProduct.forEach((product) => {
        let productImage = product.createImageUrl();
        product_html += ` <div class="product-container js-product-container" data-product-id=${product.id}>
   <div class="product-image-container">
       <img  class="product-image" src="${productImage}">
   </div>
   <p class="product-name limit-text-to-2-lines">
       ${product.name}
   </p>
   <div class="product-rating-container">
       <img class="product-rating-stars" src="${product.getStarsUrl()}">
       <p class="product-rating-num">${product.rating.count}</p>
   </div>
   <div class="product-price">
       <i class="fa-solid fa-indian-rupee-sign"></i>
       <p>${product.price}</p>
   </div>
   <div class="product-quantity">
       <select class="js-quantity-selector-${product.id}">
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
   </div>
   ${createVariationSelectorHtml(product)}
   <div class="spacer"></div>
   <div class="added-to-cart js-added-to-cart-${product.id}">
     <img src="images/icons/checkmark.png">
      Added
    </div>
   
    <button class="Add-to-Cart-btn js-add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
   
</div>`


    })

    function createVariationSelectorHtml(product) {
        if (!product.variations) {
            return ""
        }

        let variationHtml = ""

        Object.keys(product.variations).forEach((name) => {
            console.log(name)

            variationHtml += `
              <div class="option-header">${name}</div>
              <div class="option-container">
                ${creatVariationOptionHtml(name, product.variations[name])}
              </div>`
        })

        return variationHtml


    }

    function creatVariationOptionHtml(variationName, variationOption) {
        let optionHtml = ""
        variationOption.forEach((option, index) => {
            optionHtml += `
             <button class="${index === 0 ? "variation-option-btn-selected" : " "} variation-option-btn" 
              data-variation-name="${variationName}"
              data-variation-value="${option}"
              data-testid="variation-${variationName}-${option}">
                ${option} 
             </button>`
        })
        return optionHtml
    }
    document.querySelector(".products-container").innerHTML = product_html;
   
    function getSelectedVariation(productContainer) {

        if (!productContainer.querySelector(".variation-option-btn-selected")) {
            return;
        }


        let selectedVariation = {}

        productContainer.querySelectorAll(".variation-option-btn-selected").forEach((button) => {
            const name = button.dataset.variationName
            const value = button.dataset.variationValue
            console.log(name)
            console.log(value)

            selectedVariation[name] = value
            console.log(selectedVariation)
        })

        return selectedVariation



    }

    let cartQuantity = cart.updateCartQuantity();
    document.querySelector(".order-num").innerHTML = cartQuantity

   

    const productsContainer = document.querySelector(".products-container")

    let addedMessageTimeout;
    productsContainer.addEventListener("click", (event) => {
        if (Object.values(event.target.classList).includes("Add-to-Cart-btn")) {
            let productid = event.target.dataset.productId
            let productContainer = event.target.closest(".js-product-container")
            let selectedVariationDetails = {}

            productContainer.querySelectorAll(".variation-option-btn-selected").forEach((button) => {
                selectedVariationDetails[button.dataset.variationName] = button.dataset.variationValue


            })

            console.log(selectedVariationDetails)

            let quantity = parseInt(document.querySelector(`.js-quantity-selector-${productid}`).value)
            cart.addToCart(productid, quantity, selectedVariationDetails);
            let cartQuantity = cart.updateCartQuantity();
            document.querySelector(".order-num").innerHTML = cartQuantity


            // when we click add cart button added with color green will display and when click add cart button within 3 sec continuously added popup will display 3 sec and display,will not  continue to previous timeout it will start with new timeout
            if (addedMessageTimeout) {
                console.log("hello")
                clearInterval(addedMessageTimeout)
            }
            let addedmessage = document.querySelector(`.js-added-to-cart-${productid}`)
            addedmessage.classList.add("added-to-cart-visible")

            const closure_id = setTimeout(() => {
                addedmessage.classList.remove("added-to-cart-visible")
            }, 3000)


            addedMessageTimeout = closure_id

        }

        if(Object.values(event.target.classList).includes("variation-option-btn")){

            
                let button = event.target
                const variationContainer = button.closest(".option-container")
    
                const previousButton = variationContainer.querySelector(".variation-option-btn-selected")
    
                previousButton.classList.remove("variation-option-btn-selected")
    
                button.classList.add("variation-option-btn-selected")
    
                const productContainer = button.closest(".js-product-container")
                console.log(productContainer)
    
                const productId = productContainer.dataset.productId
                console.log(productId)
    
                const product = getProduct(productId)
                console.log(product)
    
                const variation = getSelectedVariation(productContainer)
    
                const productImage = product.createImageUrl(variation)
    
                productContainer.querySelector(".product-image").src = productImage
           

        }

        })
}





