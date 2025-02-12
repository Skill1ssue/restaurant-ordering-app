import menuArray from "/data.js"

const productsHtml = document.querySelector('.products')
const formEl = document.getElementById('form-modal')

// using one global event listener for the app

document.addEventListener('click', (e) => {
    if (e.target.dataset.add) {
        addProductToOrderArray(e.target.dataset.add)
    }
    if (e.target.dataset.remove) {
        removeProductFromOrder(e.target.dataset.remove)
    }
    if (e.target.id === 'complete-order') {
        completeOrder()
    }
    if (e.target.id === 'pay') {
        e.preventDefault()
        paymentComplete()
    }
})

// Adding quantity to the array

menuArray.forEach(product => product.count = 1)

// constructing products html with .map()

const itemsHtml = menuArray.map(product => {
    return `
    <article>
        <div class="product">
            <span class="product-img">${product.emoji}</span>
            <div class="product-description">
                <h3>${product.name}</h3>
                <p>${product.ingredients.join(', ')}</p>
                <span class="product-price">$${product.price}</span>
            </div>
        </div>
            <span class="add-button" data-add="${product.id}">+</span>
    </article>
    `
}).join('')

// Adding products to the order

const orderArray = []

function addProductToOrderArray(productId) {
    const productObj = menuArray.filter(product => product.id === Number(productId))[0]
    // if product already exist in order array add 1 to count
    const orderProductObjIndex = orderArray.findIndex(product => product.id === Number(productId))
    if (orderProductObjIndex >= 0) {
        orderArray[orderProductObjIndex].count++
    } else {
        orderArray.push(productObj)
    }
    renderOderArray()
    calculateTotal()

}

function renderOderArray() {
    const orderEl = document.getElementById('order')
    if (orderArray.length > 0) {
        const orderProductsHtml = orderArray.map(product => {
            const numberOfItems = product.count > 1 ? `(${product.count})` : ''
            return `
            <div class="order-item">
                <span class="item-name">
                    ${product.name}  ${numberOfItems}
                    <button data-remove="${product.id}">remove</button>
                </span>
                <span class="product-price">$${product.price * product.count}</span>
            </div>
            `
        }
        ).join('')

        orderEl.classList.remove('hidden')
        document.querySelector('.order-items').innerHTML = orderProductsHtml

        const hasDiscount = orderArray.filter(product => {
            return product.name === 'Beer' || product.name === 'Hamburger'
        }).length === 2 ? true : false

        document.getElementById('discount').textContent = hasDiscount ? '15%' : '0%'

    } else {
        orderEl.classList.add('hidden')
    }
}

// Removing products from the order

function removeProductFromOrder(productId) {
    const index = orderArray.findIndex(product => product.id === Number(productId))
    if (orderArray[index].count > 1) {
        orderArray[index].count--
    } else {
        orderArray.splice(index, 1)
    }
    renderOderArray()
    calculateTotal()
}

// Complete the order and show pay form

function completeOrder() {
    formEl.classList.remove('hidden')
}

// Final message and confirm order

function paymentComplete() {
    const userName = document.getElementById('name-input')
    const orderEl = document.querySelector('.order')
    const completeMessageEl = document.createElement('div')
    completeMessageEl.classList.add('message')
    completeMessageEl.textContent = `Thanks, ${userName.value}! Your order is on its way!`
    orderEl.innerHTML = ''
    productsHtml.innerHTML = ''
    formEl.classList.add('hidden')
    orderEl.appendChild(completeMessageEl)
    document.querySelector('.rating').classList.remove('hidden')
}

// Total price with reduce and map

function calculateTotal() {
    const total = orderArray.map(product => product.count * product.price).reduce((totalPrice, productPrice) => totalPrice + productPrice)

    const hasDiscount = orderArray.filter(product => {
            return product.name === 'Beer' || product.name === 'Hamburger'
        }).length === 2 ? true : false

        if (hasDiscount) {
            document.getElementById('total-price').innerHTML = `$${total - (total * 0.15)}`
        } else {
            document.getElementById('total-price').innerHTML = `$${total}`
        }
}

// Rating stars logic

// To access the stars
const stars = 
    document.getElementsByClassName("star");
const output = 
    document.getElementById("output");

document.getElementById('star1').addEventListener('click', () => gfg(1));
document.getElementById('star2').addEventListener('click', () => gfg(2));
document.getElementById('star3').addEventListener('click', () => gfg(3));
document.getElementById('star4').addEventListener('click', () => gfg(4));
document.getElementById('star5').addEventListener('click', () => gfg(5));

// Function to update rating
function gfg(n) {
    remove();  // Remove pre-applied styling

    // Determine the class based on the rating
    let cls;
    switch (n) {
        case 1: cls = "one"; break;
        case 2: cls = "two"; break;
        case 3: cls = "three"; break;
        case 4: cls = "four"; break;
        case 5: cls = "five"; break;
        default: cls = ""; break;  // Default case if an invalid value is provided
    }

    // Apply the appropriate class to each star up to the rating
    for (let i = 0; i < n; i++) {
        stars[i].className = "star " + cls;
    }

    // Update the output text
    output.innerText = "Rating is: " + n + "/5";
}

// To remove the pre-applied styling (reset all stars)
function remove() {
    for (let i = 0; i < 5; i++) {
        stars[i].className = "star";  // Reset class to just "star"
    }
}


// Rendering Products

function renderProducts() {
    productsHtml.innerHTML = itemsHtml
}

renderProducts()
