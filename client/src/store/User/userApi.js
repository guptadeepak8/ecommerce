//Api for fetching user
export function fetchAllOrders() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/orders') 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/users/own') 
    const data = await response.json()
    resolve({data})
  }
  );
}
export function updateUser(userData) {
  return new Promise(async (resolve,reject) => {
    try {
      const response = await fetch("/users/"+userData.id, {
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