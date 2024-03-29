/*console-log('cart.js connected');

document.getElementById('cartModal').addEventListener('show.bs.modal', async(event ) =>{

    try {
        
        let response = await fetch('/api/carts');
        let resultst = await response.json()
console.log(resultst)

    } catch (error) {
        console.error
    }
}
)*/
console.log('cart.js connected');
const carrito = document.getElementById('cart-items')

const showItems = (items) => {
    if(items.length){
        carrito.innerHTML = null;
        items.forEach(({quantity, product}) => {
            carrito.innerHTML += `
            <tr>
            <td>
              <img src="/stock-photos/${product.imagenes[0].archivo}" width=80 alt="image">
            </td>
            <td>
              ${product.nombre}
            </td>
            <td>
              <div class="d-flex">
                <button class="btn btn-sm btn-danger" onclick="removeQuantity(${product.id})"><i class="fas fa-minus"></i></button>
                <input type="text" style="border: none; width:20px; text-align: center;" value="${+quantity}">
                <button class="btn btn-sm btn-success" onclick="addCartItem(${product.id})"><i class="fas fa-plus"></i></button>
              </div>
            </td>
           
            <td>
              <button class="btn btn-sm btn-danger" onclick="removeItem(${product.id})"><i class="fas fa-trash"></i></button>

            </td>
          </tr>
            `
        });
    }
}


document.getElementById('cartModal').addEventListener('show.bs.modal', async (event) => {
    
    try {

        let response = await fetch('/api/carts');
        let result = await response.json();
       
        console.log(result)
        if(result.ok){
            if(result.data.items.length){
                const {items} = result.data;
                showItems(items)
            }else {
                carrito.innerHTML = "<p class='alert alert-warning w-100 mt-4'>No hay productos en el carrito</p>"
            }
        }

        
    } catch (error) {
        console.error
    }
  })
  
const addCartItem = async (id) => {
    try {

        let response = await fetch('/api/carts', {
            method : 'POST',
            body : JSON.stringify({
                id
            }),
            headers : {
                "Content-Type" : "application/json"
            }
        });

        let result = await response.json();

        if(result.ok){
            const {items} = result.data;
            showItems(items)
        }
        
    } catch (error) {
        console.error(error);
    }
};

const removeQuantity = async (id) => {
    try {

        let response = await fetch('/api/carts/' + id, {
            method : 'DELETE'
        });

        let result = await response.json();

        if(result.ok) {
            showItems( result.data.items)
        }

        
    } catch (error) {
        console.error(error);
    }
}