let state = {};
state.products = [];

let productButton = document.getElementById("findProductButton");
let productInput = document.getElementById("productIdInput");
let productOutput = document.getElementById("productsDiv")

async function findProductHandler() {
  let productBarcode = productInput.value;
  console.log(productBarcode);
  let product = await productFetcher(productBarcode);
  console.log(product);
  state.products.push(product);
  renderProducts();
}

function renderProducts() {
  let html = "";
  for(let i=0; i<state.products.length; i++){
    html += state.products[i].toHTML(i);
  }
  productOutput.innerHTML = html;
  for(let i=0; i<state.products.length; i++){
    state.products[i].addDeleteListener(i, state, renderProducts);
  }
}

productButton.addEventListener("click", findProductHandler);