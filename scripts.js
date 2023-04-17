const articulo = document.getElementById("Producto")

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: "cama",
        descripcion: 'Colchon Cannon',
        img: "./assets/imagen.jpg",
        precio: "4250",
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then(response => response.json())
    .then(listado => {
        const div = document.createElement("div")
        div.innerHTML = `
            <div class="card shadow mb-1 bg-dark rounded" style="width: 20rem;">
                    <h5 class="card-title pt-2 text-center text-light">${listado.title}</h5>
                    <img src="./assets/imagen.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text text-white-50 ">${listado.descripcion}</p>
                    <h5 class="text-primary">Precio: <span class="precio">$${listado.precio}</span></h5>
                <div class="d-grid gap-2">
                    <button class="btn btn-dark button bordes">Añadir a Carrito</button>
            </div>
        </div>
    </div>
        `
        articulo.append(div);
    });







const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem(e) {
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    addItemCarrito(newItem)
}


function addItemCarrito(newItem) {

    const alert = document.querySelector('.alert')

    setTimeout(function () {
        alert.classList.add('hide')
    }, 2000)
    alert.classList.remove('hide')

    const InputElemnto = tbody.getElementsByClassName('input__elemento')
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === newItem.title.trim()) {
            carrito[i].cantidad++;
            const inputValue = InputElemnto[i]
            inputValue.value++;
            CarritoTotal()
            return null;
        }
    }

    carrito.push(newItem)

    renderCarrito()
}


function renderCarrito() {
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
                <img src=${item.img}  alt="">
                <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
                <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                <button class="delete btn btn-danger">x</button>
            </td>
    
    `
        tr.innerHTML = Content;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })
    CarritoTotal()
}

function CarritoTotal() {
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        Total = Total + precio * item.cantidad
    })

    itemCartTotal.innerHTML = `Total $${Total}`
    addLocalStorage()
}

function removeItemCarrito(e) {
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }
    }

    const alert = document.querySelector('.remove')

    setTimeout(function () {
        alert.classList.add('remove')
    }, 2000)
    alert.classList.remove('remove')

    tr.remove()
    CarritoTotal()
}

function sumaCantidad(e) {
    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if (item.title.trim() === title) {
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            CarritoTotal()
        }
    })
}

function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if (storage) {
        carrito = storage;
        renderCarrito()
    }
}


const finalizarCompra = document.getElementById("btn-comprar")

finalizarCompra.addEventListener("click", () => {
    Swal.fire({
        icon: 'error',
        title: 'Casi!',
        text: 'Estamos trabajando.',
    })
})







