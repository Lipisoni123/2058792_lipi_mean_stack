let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: 'Grey Tshirt',
        tag: 'greytshirt',
        price: 15,
        inCart: 0
    },
    {
        name: "Grey Hoodie",
        tag: "greyhoodie",
        price: 50,
        inCart: 0
    },
    {
        name: "Black Tshirt",
        tag: "blacktshirt",
        price: 10,
        inCart: 0
    },
    {
        name: "Black Hoodie",
        tag: "blackhoodie",
        price: 25,
        inCart: 0
    }

];
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])

    })
}
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem
        ('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent =
            productNumbers;
    }
}
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');


    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    } else {
        localStorage.setItem('cartNumbers', + 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);

}
function setItems(product) {
    let cartItems = localStorage.getItem('productsIncart')
    cartItems = JSON.parse(cartItems);
    console.log("My cartItems are", cartItems);

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsIncart", JSON.stringify
        (cartItems));
}
function totalCost(product) {
    //console.log("The product price is ", product.price);
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }


}
function displaycart() {
    debugger;
    let cartItems = localStorage.getItem("productsIncart");
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);
    let productContainer = document.querySelector
        (".products");
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
    <div class="product">
        <ion-icon name="close-circle-outline"></ion-icon>
        <img src="./images/${item.tag}.jfif"
        <span>${item.name}</span>
    </div>
    <div class="price">$${item.price},00</div>
    <div class="quantity">
        <ion-icon class="decrease "name="caret-back-circle-sharp"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon class"increase" name="caret-forward-circle-sharp"></ion-icon>
    </div>
    <div class="total">
    $${item.price * item.inCart},00
    </div>
    `;
        });
        productContainer.innerHTML += `
        <div class = "basketTotalContainer">
            <h4 class="basketTotalTitle">
            Basket Total
            </h4>
            <h4 class ="basketTotal">
                $${cartCost},00
            </h4>
        </div>
        `;
    }
}

onLoadCartNumbers();
displaycart();





