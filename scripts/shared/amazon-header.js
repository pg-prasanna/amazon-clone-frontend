import { cart } from "../../data/cart-class.js"


export function renderHeaderHtml() {

    let headerHtml = `<div class="amazon-header-left-section">

    <a class="amazon-logo-link header-link" href="index.html">
        <img class="amazon-logo" src="images/amazon-logo-white.png">
        <img class="amazon-mobile-logo" src="images/amazon-mobile-logo-white.png">
    </a>


</div>

<div class="amazon-header-middle-section">

    <input class="header-input js-header-input" type="text" placeholder="Search">
    <button class="search-button js-search-button">
        <i class="fa-solid fa-magnifying-glass"></i>
    </button>

</div>

<div class="amazon-header-right-section">

    <a class="header-order-link header-link" href="orders.html">
        <p class="return">Return</p>
        <p class="order">& Orders </p>
    </a>

    <a class="header-cart-link header-link" href="checkout.html">

        <img class="cart-icon" src="images/icons/cart-icon.png">
        <span class="order-num">${cart.updateCartQuantity()}</span>

        <div class="cart">Cart</div>
    </a>

</div>
`



    document.querySelector(".amazon-header").innerHTML = headerHtml

    if (document.querySelector(".js-header-input")) {
        document.querySelector(".js-search-button").addEventListener("click", () => {
            const searchInput = document.querySelector(".js-header-input").value
            window.location.href = `index.html?search=${searchInput}`
        })

        document.querySelector(".js-header-input").addEventListener("keydown", (event) => {

            if (event.key === "Enter") {
                window.location.href = `index.html?search=${event.target.value}`
            }
        })

        let searchText = debouncing((searchInput) => {
            window.location.href = `index.html?search=${searchInput}`
            console.log("debouncing")
        })

        document.querySelector(".js-header-input").addEventListener("input", (event) => {
            searchText(event.target.value)
        })
        function debouncing(func, delay = 2000) {
            let timeout
            return function (...args) {
                clearInterval(timeout)
                timeout = setTimeout(() => {
                    func(...args)
                }, delay)

            }
        }
        

    }

    if (document.querySelector(".js-mobile-search-button")) {
        document.querySelector(".js-mobile-search-button").addEventListener("click", () => {
            const searchInput = document.querySelector(".js-header-input").value
            window.location.href = `index.html?search=${searchInput}`
        })

        document.querySelector(".js-mobile-header-input").addEventListener("keydown", (event) => {

            if (event.key === "Enter") {
                window.location.href = `index.html?search=${event.target.value}`
            }

        })

        let searchText = debouncing((searchInput) => {
            window.location.href = `index.html?search=${searchInput}`
            console.log("debouncing")
        })

        document.querySelector(".js-mobile-header-input").addEventListener("input", (event) => {
            searchText(event.target.value)
        })
        function debouncing(func, delay = 2000) {
            let timeout
            return function (...args) {
                clearInterval(timeout)
                timeout = setTimeout(() => {
                    func(...args)
                }, delay)

            }
        }
    }
}
