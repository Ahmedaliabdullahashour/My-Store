let searchInput=document.getElementById("searchInput")
let categorySelect=document.getElementById("categorySelect")
let minPrice=document.getElementById("minPrice")
let maxPrice=document.getElementById("maxPrice")
let btnApplyFilters=document.getElementById("btnApplyFilters")
let sortSelect=document.getElementById("sortSelect")
let cartList=document.getElementById("cartList")
let totalQuantity=document.getElementById("totalQuantity")
let totalPriceBadge=document.getElementById("totalPriceBadge")
let productsGrid=document.getElementById("productsGrid")
let addimgdi=document.getElementById("di_img")
let adddialog=document.querySelector(".product-card")
let addlog=document.getElementById("story1")


let product = [];
let cart = [];

fetch("https://fakestoreapi.com/products?limit=6")
.then(response => response.json())
.then(data => {
    product = data;
    displayProducts(product);
});

function displayProducts(items) {
    productsGrid.innerHTML = ""

    for(let i =0;i < items.length;i++){

      let card = document.createElement("div")
      card.className = "product-card"
      card.addEventListener("click", function() {
        addimgdi.src = items[i].image;
        addlog.showModal();
        })
      productsGrid.appendChild(card)
      
      let title1=document.createElement("h2")
      title1.textContent=items[i].title
      card.appendChild(title1)

      let image1=document.createElement("img")
     image1.src = items[i].image
      card.appendChild(image1)

      let price=document.createElement("p")
      price.textContent = items[i].price
      card.appendChild(price)

      let catigory=document.createElement("p")
      catigory.textContent=items[i].catigory
      card.appendChild(catigory)
      
      let rating = document.createElement("p")
      
      rating.textContent = `⭐ ${items[i].rating.rate} (${items[i].rating.count} reviews)`;
      card.appendChild(rating);
      let addbtn=document.createElement("button")
      addbtn.className = "add-to-cart"
      addbtn.textContent="Add to Cart"
      card.appendChild(addbtn)
     addbtn.addEventListener("click", function(event) {
     event.stopPropagation();
     addToCart(items[i]);
    });

    function addToCart(item) {
        
     let searchProduct = cart.find(product => product.id === item.id)
            
      if (searchProduct ) {
        searchProduct .quantity++
          } else {
           cart.push({
               ...item,
             quantity: 1
             })
          }
            
          renderCart()
            
     }
        
    }
}
function renderCart() {
    
    cartList.innerHTML = ""
    
    let total = 0
    let quantity = 0

    for (let i = 0; i < cart.length; i++) {
        
        let item = document.createElement("div")
        
        let name = document.createElement("p")
        name.textContent = cart[i].title
        item.appendChild(name)
        
        let price = document.createElement("p")
        price.textContent = `$${cart[i].price}`
        item.appendChild(price)
        
        let count = document.createElement("p");
        count.textContent = `Quantity: ${cart[i].quantity}`
        item.appendChild(count)
        cartList.appendChild(item)
        total += cart[i].price * cart[i].quantity
        quantity += cart[i].quantity

        let removeBtn = document.createElement("button")
        removeBtn.textContent = "Remove"
        removeBtn.className = "remove-btn"
        removeBtn.addEventListener("click", function() {
            cart.splice(i, 1)
            renderCart()
        });

        item.appendChild(removeBtn)
    }
    
    totalQuantity.textContent =quantity
    totalPriceBadge.textContent = `$${total.toFixed(2)}`
}

btnApplyFilters.addEventListener("click", function() {
console.log("Button Clicked");
    let storageinput = searchInput.value.toLowerCase()
    let select = categorySelect.value

    let min = minPrice.value === "" ? 0 : Number(minPrice.value);
    let max = maxPrice.value === "" ? Infinity : Number(maxPrice.value);

    let fun_filter = product.filter((item) => {
        
     let search = item.title.toLowerCase().includes(storageinput)
     let category = select === "all" || item.category === select
     let price = item.price >= min && item.price <= max
     return search && category && price
    })
    console.log(fun_filter);
    displayProducts(fun_filter)

})