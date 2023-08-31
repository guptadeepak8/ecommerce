//Api for fetching user
export function fetchAllOrders(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/orders?user='+userId) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/users/'+userId) 
    const data = await response.json()
    resolve({data})
  }
  );
}
export function updateUser(userData) {
  return new Promise(async (resolve,reject) => {
    try {
      const response = await fetch("http://localhost:3000/users/"+userData.id, {
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