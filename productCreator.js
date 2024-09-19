
function productCreator(data) {
  let product = {
    name: data.product.product_name,
    imgSrc: data.product.selected_images.front.thumb.en,
    toHTML: function(id){
      return `
        <div class="col-3">
          <div class="card">
            <img src="${this.imgSrc}" class="card-img-top" alt="image of ${this.name}">
            <p class="card-text">
              ${this.name}
            </p>
            <button class="btn btn-danger" id="deleteProduct${id}">delete</button>
          </div>
        </div>
      `;
    },
    addDeleteListener: function(id, state, render) {
      let deleteButton = document.getElementById(`deleteProduct${id}`);
      let handler = function() {
        console.log("delete called");
        state.products.splice(id, 1);
        render();
      }
      deleteButton.addEventListener("click", handler);
    }
  };
  return product;
}

async function productFetcher(barcode) {
  let url =`https://world.openfoodfacts.org/api/v3/product/${barcode}.json`;
  console.log(url);
  let result = await fetch(url);
  let data = await result.json();
  let product = productCreator(data);
  console.log(product);
  return product;
}