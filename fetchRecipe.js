let inferenceEndpoint = "https://api-inference.huggingface.co/models/google/gemma-1.1-2b-it";
let inferenceToken = "";

function createRecipePrompt(products) {
  let list = "";
  for(let i=0; i<products.length; i++) {
    list += products[i].name;
    if(products.length === i+2) {
      list += ", and";
    } else if(products.length > i+1) {
      list += ", ";
    }
  }
  return `Create a recipe for ${list}`;
}

async function fetchAI(prompt){
  let payload = {
    "inputs": prompt
  }
  let url = inferenceEndpoint;
  let result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { 
      'Authorization': `Bearer ${inferenceToken}`,
      'Content-Type': 'application/json'
    }
  })
  let data = await result.json();
  let generatedText = data[0].generated_text;
  console.log(generatedText);
  return generatedText;
}