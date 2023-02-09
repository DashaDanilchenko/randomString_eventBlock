const chance = new Chance();
const urlReg = "https://fakestoreapi.com/users";
const urlLogin = "https://fakestoreapi.com/auth/login";
const urlProducts = "https://fakestoreapi.com/products";
let arrBuy = []
let storageBuy = JSON.parse(localStorage.getItem('arrBuy')) || []


function checkAuth() {
    let isAuth = !!localStorage.getItem("token");
    if (isAuth) {
        $("#auth").addClass("none")
        $("#store").removeClass("none")
        getProducts();
    } else {
        $("#auth").removeClass("none")
        $("#store").addClass("none")
    }
}

checkAuth();

$("#gen").click(
    () => {
        $("#email").val(chance.email());
        $("#username").val(chance.string({ length: 6, alpha: true }));
        $("#password").val(chance.string({ length: 8, pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()[]" }));
    }
)

$("#authForm").submit(
    (e) => {
        $("#loader").removeClass("none")
        e.preventDefault();
        const body = {
            email: $("#email").val(),
            username: $("#username").val(),
            password: $("#password").val(),
        }
        reg(body);
        log({
            username: "mor_2314",
            password: "83r5^_"
        });
    }
)

function reg(body) {
    console.log(body)
    $.ajax({
        url: urlReg,
        method: 'post',
        data: body
    })
        .done(function (response) {
            localStorage.setItem("id", response.id)
        })
        .fail(function () {
            console.log("error")
        })
        .always(function () {
            console.log("complete")
        });
}

function log(body) {

    $.ajax({
        url: urlLogin,
        method: 'post',
        data: body
    })
        .done(function (response) {
            localStorage.setItem("token", response.token);
            checkAuth();

        })
        .fail(function () {
            console.log("error")
        })
        .always(function () {
            $("#loader").addClass("none")
        });
}

$("#logout").click(
    () => {
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        checkAuth();
    }
)

function getProducts() {
    $.ajax({
        url: urlProducts,

    })
        .done(function (response) {
            console.log(response)
            $("#products").empty()
            $("#products").append('<div class="products-wrap"></div>')
            response.map(item => {
                $(".products-wrap").append(`<div class="card" onClick="getProductByID(${item.id})">
                    <div class="card_content">
                        <img src=${item.image} class="card-img-top" alt="...">
                        <h5 class="card-title">${item.title}</h5>
                    </div>
                    <h3 class="card-price">${item.price} $</h3>
                </div>`)
            }
            )
        })
        .fail(function () {
            console.log("error")
        })
        .always(function () {
            console.log("complete")
        });
}

function returnStore() {
    location.reload(true);
}

function saveMemory(arrBuy) {
    localStorage.setItem("arrBuy", JSON.stringify(arrBuy))
}

function listBuy() {
    $("#basket").append(`${arrBuy.length}`)
    $('#list').append(`<lu class="listIn_basket"></lu>`)
    arrBuy.map(item => {
        $(".listIn_basket").append(`
            <li>
                <span>${item.title}</span>
                <span class="card-price">${item.price} $</span>
            </li>
        `)
    })

    let sum = arrBuy.reduce((accumulator, currentValue) => accumulator + Number(currentValue.price), 0)
    
    $('#list').append('<hr/>')

    $('#list').append(`<p class="card-price">${sum} $</p>`)
}

function buyProduct(id) {
    $.ajax({
        url: urlProducts + "/" + id,   
    })
    .done(function (response) {
        const dataProduct = {
            title: `${response.title}`,
            price:`${response.price}`,
        }
        arrBuy.push(dataProduct)
        saveMemory(arrBuy)
        $("#basket").empty()
        $('#list').empty()
        listBuy()
    })
    .fail(function () {
        console.log("error")
    })
    .always(function () {
        console.log("complete")
    });
}

function getProductByID(id) {
    console.log(id)

    $.ajax({
        url: urlProducts + "/" + id,
        
    })
        .done(function (response) {
            $("#products").empty();
            $("#products").append(`<div class="card_solo">
            <img src=${response.image} class="card-img-solo" alt="...">
            <div class="card-body-solo">
              <h5 class="card-title">${response.title}</h5>
              <p class="card-category">${response.category}</p>
              <p class="card-text">${response.description}</p> 
              <h3 class="card-price">${response.price} $</h3>
              <button type="button" class="btn btn-danger" id="buy" onClick="buyProduct(${id})">Buy</button> 
              <button type="button" class="btn btn-primary" id="products_all" onClick="returnStore()">Return to the store</button>
            </div>
          </div>
         
          `)

        })
        .fail(function () {
            console.log("error")
        })
        .always(function () {
            console.log("complete")
        });
}

if (storageBuy) {
    arrBuy = storageBuy 
    listBuy()
}