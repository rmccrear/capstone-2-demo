let state = {};

let nameInput = document.getElementById("username");
let emailInput = document.getElementById("email");
let tokenInput = document.getElementById("token");
let saveButton = document.getElementById("saveUser");

function handleSaveUser(){
  console.log("hello")
  let username = nameInput.value;
  let email = emailInput.value;
  let token = tokenInput.value;
  localStorage.setItem("name", username);
  localStorage.setItem("email", email);
  localStorage.setItem("token", token);
  nameInput.value = '';
  emailInput.value = '';
  tokenInput.value = '';
}

saveButton.addEventListener("click", handleSaveUser);
