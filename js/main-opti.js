// Variables Global

const url = "http://localhost:3000/api/teddies"
let carts = document.querySelectorAll('.add')
let item = {}
let params = new URLSearchParams(document.location.search.substring(1));
document.querySelector('.cart').textContent = localStorage.getItem('cartNumbers');

// Switch Urls
console.log(window.location.pathname)

switch (window.location.pathname) {
    case '/P5/index.html':
    case '/P5/':
    case '/eshop/index.html':
    case '/eshop/':
    case '/index.html':
    case '/':
        console.log('Acceuil')
        listing(url)
        break
    case '/eshop/products.html':
    case '/products.html':
        let id = params.get("id");
        console.log('Produit, id : ' + id)
        id ? prod(id) : notfound()
        break
    case '/eshop/cart.html':
    case '/cart.html':
        console.log('Panier')
        displayCart()
        document.querySelector('.buy').addEventListener('click', e => {
            let inputs = document.querySelectorAll('input.form-control')
            ValidRegex(inputs)
        })
        break
    case '/eshop/order.html':
    case '/order.html':
        let order = params.get("order");
        console.log('Commande n° : ' + order)
        order ? orders(order) : notfound()
}

// Loops Events

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', (e) => {
        e.preventDefault()
        cartNum()
        cartItems()
    })
}


// Fonctions

function listing(url) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                response.json().then(json => {
                    var list = document.querySelector("#list")
                    Object.values(json).map(items => {
                        list.innerHTML += `
                        <div class="col-12 col-sm-8 col-md-4 col-lg-4 py-2">
                            <div class="card shadow-lg">
                                <img class="card-img"
                                src="${items.imageUrl}"
                                alt="${items.name}">
                                <div class="card-body bg-dark">
                                    <h4 class="card-title">${items.name}</h4>
                                    <h6 class="card-subtitle mb-2 text-info">Ref : ${items._id}</h6>
                                    <p class="card-text">${items.description}</p>
                                    <div class="buy d-flex justify-content-between align-items-center" >
                                        <div class="price text-success" >
                                            <h5 id="price" class="mt-4">${items.price / 100} €</h5>
                                        </div>
                                        <a id="${items._id}" onclick="product(this.id)" href="#" class="btn btn-primary shadow mt-3 add"> Details </a>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    })
                });
            }
        })
        .catch(err => {
            window.location = '404.html'
        })
}

function product(id) {
    document.location = 'products.html?id=' + id
}

function prod(id) {
    fetch(url + '/' + id)
        .then(response => {
            if (response.ok) {
                response.json().then(json => {
                    document.querySelector("#name").textContent = json.name
                    document.querySelector("#desc").textContent = json.description
                    document.querySelector("#categ").textContent = "teddies"
                    document.querySelector('.cat').setAttribute('href', '/index.html#teddies')
                    document.querySelector('img').setAttribute('src', json.imageUrl)
                    document.querySelector('#price').textContent = json.price / 100 + '€'
                    document.querySelector('.add').setAttribute('id', json._id)
                    for (let i = 0; i < json.colors.length; i++) {
                        const color = json.colors[i]
                        try {
                            document.querySelector('#options').appendChild(new Option(color, i))
                        } catch (e) {
                            document.querySelector('#options').appendChild(new Option(color, null))
                        }
                    }
                })
            }
        })
        .catch(err => {
            window.location = '404.html'
        })
}



function ValidRegex(inputs) {
    let data = {}
    let valid = 0
    let reg = {
        "mail": /([\w-\.]+@[\w-\.]+\.{1}[\w]+)/i, // Adresse Mail
        "text": /^\S[a-z ,.'à-ÿ-]+$/i, // Nom, Prénom, Ville
        "postalcode": /^[0-9]{5}$/i, // Code postal
        "postal": /^[0-9]{1,5}[A-z0-9 'à-ÿ-]{5,30}$/i // Adresse postale
    }
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].name == "name" || inputs[i].name == "lastname" || inputs[i].name == "city") {
            formV(reg.text.test(inputs[i].value), inputs[i])
        } else if (inputs[i].name == "email") {
            formV(reg.mail.test(inputs[i].value), inputs[i])
        } else if (inputs[i].name == "adress") {
            formV(reg.postal.test(inputs[i].value), inputs[i])
        } else if (inputs[i].name == "postalcode") {
            formV(reg.postalcode.test(inputs[i].value), inputs[i])
        }
        if (inputs[i].classList[1] == 'is-valid') {
            valid = i
        }
        if (valid == 5) {
            // document.querySelector('form').submit()
            let pducts = JSON.parse(localStorage.getItem('itemsInCart'))
            data = {
                'contact': {
                    'firstName': inputs[0].value,
                    'lastName': inputs[1].value,
                    'address': inputs[3].value,
                    'city': inputs[4].value,
                    'email': inputs[2].value
                },
                'products': [

                ]
            }
            Object.keys(pducts).map(pdt => {
                for (let i = 0; i < pducts[pdt].length; i++) {
                    const e = pducts[pdt][i];
                    if (e.incart > 1) {
                        for (let x = 0; x < e.incart; x++) {
                            console.log(e)
                            data.products.push(e.id)
                        }
                    } else {
                        data.products.push(e.id)
                    }
                }
            })
            console.log(data)
            // Ici le post et localstorage
            let posturl = "http://localhost:3000/api/teddies/order"
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            fetch(posturl, options)
                .then(response => {

                    response.json().then(data => {
                        console.log(data);
                        localStorage.setItem('order', JSON.stringify(data))
                        localStorage.removeItem('cartNumbers')
                        localStorage.removeItem('totalCost')
                        localStorage.removeItem('itemsInCart')
                        document.location = 'order.html?order=' + data.orderId
                    });
                })
                .catch(e => {
                    window.location = '404.html'
                })
        }
    }

}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function formV(Regtest, input) {
    if (Regtest) {
        input.classList.remove("is-invalid")
        input.classList.add("is-valid")
    } else {
        input.classList.remove("is-valid")
        input.classList.add("is-invalid")
    }
}

function cartNum() {
    let num = parseInt(localStorage.getItem('cartNumbers'))
    if (num) {
        localStorage.setItem('cartNumbers', num + 1)
        document.querySelector('.cart').textContent = num + 1;
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart').textContent = 1;
    }
}

function cartItems() {
    // 1) Verifier s'il y a déjà des items dans le panier
    // 2) Récuperer les items dans un tableau
    // 3) Ajouter le nouvel item au tableau
    // 4) Ajouter le nouveau tableau dans le localstorage
    if (localStorage.getItem('itemsInCart') != null) {

        let inCart = JSON.parse(localStorage.getItem('itemsInCart'))

        let product = updateproduct()
        total()

        let ids = Object.keys(inCart)
        if (ids.indexOf(product[0].id) != -1) { //si l'id est déjà dans le panier
            let i = ids.indexOf(product[0].id)
            let curid = ids[i]

            // let info = existcolor(inCart, curid, product[0].color)
            let info = 0


            if (info === false) {
                console.log('la couleur : ' + product[0].color + " n'est pas dans le panier")
                localStorage.setItem('itemsInCart', JSON.stringify(inCart))
            } else {
                console.log('la couleur : ' + inCart[curid][info].color + ' est déjà dans le panier')
                inCart[curid][info].incart += 1
                localStorage.setItem('itemsInCart', JSON.stringify(inCart))
            }
        } else {
            localStorage.setItem('itemsInCart', JSON.stringify(additem(product[0].id, product, inCart)))
        }

    } else {
        let product = updateproduct()
        total()
        localStorage.setItem('itemsInCart', JSON.stringify(additem(product[0].id, product)))
    }

}

function existcolor(inCart, curid, color) {
    for (let i = 0; i < inCart[curid].length; i++) {
        const element = inCart[curid][i].color;
        if (element == color) {
            return i
        } else {
            return false
        }
    }
}

function updateproduct() {
    let product = [{
        name: $("#name").text(),
        desc: $("#desc").text(),
        img: $("img").attr('src'),
        price: parseInt($("#price").text()),
        color: $('#options option:selected').text(),
        id: $(".add").attr('id'),
        incart: 1
    }]
    return product
}

function additem(id, product, json) {
    if (json != null) {
        if (json[id] === undefined) {
            item = {
                ...json,
                [id]: product
            }
        }
    } else {
        item = {
            [id]: product
        }
    }
    return item
}

function deleteitem(id) {
    let json = JSON.parse(localStorage.getItem('itemsInCart'))
    if (json != null) {
        if (json[id] != undefined) {
            const itemcount = new Promise((resolve, reject) => {
                resolve(json[id][0].incart)
            }).then(items => {
                let num = parseInt(localStorage.getItem('cartNumbers'))
                num = num - items
                localStorage.setItem('cartNumbers', num)
                let price = json[id][0].price * json[id][0].incart
                price = parseInt(localStorage.getItem('totalCost')) - price
                localStorage.setItem('totalCost', price)
                delete json[id]
                localStorage.setItem('itemsInCart', JSON.stringify(json))
            })
        }
        window.location.reload()
    }
}

function total() {
    let product = updateproduct()
    let cartCost = localStorage.getItem('totalCost')
    if (cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem('totalCost', cartCost + product[0].price)
    } else {
        localStorage.setItem('totalCost', product[0].price)
    }
}

function displayCart() {
    let cartITems = localStorage.getItem('itemsInCart')
    cartITems = JSON.parse(cartITems)
    let productsInCart = document.querySelector('.cart.additem')
    document.querySelector('#total').textContent = `Total : ${localStorage.getItem('totalCost')} €`
    if (cartITems && productsInCart) {
        productsInCart.innerHTML = ''
        Object.values(cartITems).map(item => {
            productsInCart.innerHTML += `
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-2 text-center">
                        <img class="img-responsive" src ="${item[0].img}" alt="prewiew" width="100%">
                    </div>
                    <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                        <h4 class="product-name font-weight-bold my-1">${item[0].name}</h4>
                        <p>${item[0].desc}</p>
                    </div>
                    <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                        <div class="col-3 col-sm-3 col-md-6 text-md-right">
                            <h6>${item[0].price} <span class="text-muted"> € </span></h6>
                        </div>
                        <div class="col-4 col-sm-4 col-md-4">
                            <div class ="quantity">
                                <input id="${item[0].id}" class="itemcount" type = "number" step="1" max="99" min="1" value="${item[0].incart}" title="Qty" class="qty" size = "4" >
                            </div>
                        </div>
                        <div class = "col-2 col-sm-2 col-md-2 text-right">
                            <button id="${item[0].id}" onclick="deleteitem(this.id)" type="button" class="btn btn-outline-danger btn-xs">
                            <i class="fa fa-trash" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
                <hr>
                `
        })
    }

    let inputs = document.querySelectorAll('.itemcount')
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("change", (e) => {
            console.log(e)
            let id = inputs[i].getAttribute('id')
            cartITems[id][0].incart = parseInt(inputs[i].value)
            localStorage.setItem('itemsInCart', JSON.stringify(cartITems))
            if (parseInt(e.srcElement.defaultValue) > parseInt(inputs[i].value)) {
                console.log('-1')
                /*Prendre le nombre de teddies le soustraire au total d'objets dans le panier puis ajouter le nombre modifier.*/
                /*Prendre le prix du produit et le soustraire au total */

                let price = localStorage.getItem('totalCost') - cartITems[id][0].price
                localStorage.setItem('totalCost', price)
                let itemstotal = parseInt(localStorage.getItem('cartNumbers'))
                let numteddies = parseInt(e.srcElement.defaultValue)
                let teddiesmodifier = cartITems[id][0].incart
                if (itemstotal > numteddies) {
                    itemstotal = itemstotal - numteddies
                    itemstotal = itemstotal + teddiesmodifier
                    localStorage.setItem('cartNumbers', itemstotal)
                } else if (itemstotal === numteddies) {
                    console.log("c'est le même nombre")
                    itemstotal = teddiesmodifier
                    localStorage.setItem('cartNumbers', itemstotal)
                }
            } else if (parseInt(e.srcElement.defaultValue) < parseInt(inputs[i].value)) {
                console.log('+1')
                let price = parseInt(localStorage.getItem('totalCost')) + parseInt(cartITems[id][0].price)
                let number = parseInt(localStorage.getItem('cartNumbers')) + 1
                localStorage.setItem('totalCost', price)
                localStorage.setItem('cartNumbers', number)
            }
            window.location.reload()
        });
    }
}

function orders(id) {
    let order = JSON.parse(localStorage.getItem('order'))
    if (id == order.orderId) {
        document.querySelector('.orderid').textContent = `Commande n° : ${order.orderId}`
        let total = 0
        Object.values(order.products).map(items => {
            document.querySelector('#products').innerHTML += `<tr>
                            <th scope="row">${items._id}</th>
                            <td>${items.name}</td>
                            <td>${items.price / 100 + '€'}</td>
                        </tr>`
            total += items.price
        })
        document.querySelector('.price').textContent = `Prix total : ${total / 100 + '€'}`
        document.querySelector('#thanks').textContent = `Merci ${order.contact.lastName} pour votre commande`
    }
}

function notfound() {
    document.location = '404.html'
}