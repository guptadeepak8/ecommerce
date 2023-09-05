//Api for fetching user
export function fetchAllOrders() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/orders') 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/users/own') 
    const data = await response.json()
    resolve({data})
  }
  );
}
export function updateUser(userData) {
  return new Promise(async (resolve,reject) => {
    try {
      const response = await fetch(import.meta.env.VITE_REACT_APP_API_URL+"/users/"+userData.id, {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
    } catch (error) {
      reject(error)
    }
  });
}