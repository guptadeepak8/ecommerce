//Api for fetching all products
export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/products') 
    const data = await response.json()
    resolve({data})
  }
  );
}


//Api for filtering products 
export function fetchProductsByFilters(filter,sort) {
  let queryString=''


  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/products?'+queryString) 
    const data = await response.json()
    resolve({data})
  }
  );
}

//Api for fetching all categories
export function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/categories') 
    const data = await response.json()
    resolve({data})
  }
  );
}
//Api for fetching all brands
export function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/brands') 
    const data = await response.json()
    resolve({data})
  }
  );
}
//Api for fetching product details
export function fetchProductDetails(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch(`http://localhost:3000/products/${id}`) 
    const data = await response.json()
    resolve({data})
  }
  );
}