//Api for fetching all products
export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    const response = await fetch("/products") 
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
    const response = await fetch("/products?"+queryString) 
    const data = await response.json()
    resolve({data})
  }
  );
}

//Api for fetching all categories
export function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch("/categories") 
    const data = await response.json()
    resolve({data})
  }
  );
}
//Api for fetching all brands
export function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch("/brands") 
    const data = await response.json()
    resolve({data})
  }
  );
}
//Api for fetching product details
export function fetchProductDetails(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch("/products/"+id) 
    const data = await response.json()
    resolve({data})
  }
  );
}