export function addCart(items) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/cart", {
      method: "POST",
      body: JSON.stringify(items),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItemsById() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/cart')
    const data = await response.json()
    resolve({data})
  }
  );
}
export function updateCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/cart/"+item.id, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItems(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/cart/"+itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data:{id:itemId} });
  });
}

export function resetCart() {
  return new Promise(async (resolve) =>{
    const response = await fetchItemsById()
    const items = response.data
    for(let item of items){
      await deleteItems(item.id)
    } 
    resolve({status:'success'})
  }
  );
}

