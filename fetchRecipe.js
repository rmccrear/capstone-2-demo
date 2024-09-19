let inferenceEndpoint = "https://api-inference.huggingface.co/models/google/gemma-1.1-2b-it";

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

async function fetchAI2(prompt) {
  // let prompt = `Create a recipe for chicken and almond with chia seeds and coca cola`;
  let token = localStorage.getItem("token");
  let url = "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct/v1/chat/completions";
  let payload = {
    "model": "microsoft/Phi-3-mini-4k-instruct",
    "messages": [{"role": "user", "content": prompt}],
    "max_tokens": 500,
    "stream": false
  };
  let result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  console.log(result)
  let data = await result.json();
  console.log(data);
  let message = data.choices[0].message.content;
  console.log(message);
  return message;
}

async function fetchAI(prompt, inferenceToken){
  console.log(inferenceToken)
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