export function createUser(userData) {
  console.log(userData);
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function checkUser(logInfo) {
  return new Promise(async (resolve,reject) => {
try {
  const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: JSON.stringify(logInfo),
      headers: { "content-type": "application/json" },
    });
      if(response.ok){
        const data = await response.json();
      resolve({data});
      }else{
        const error = await response.json();
      reject(error)
      }
      
} catch (error) {
  reject(error)
}
  });
}



export function signOutUser(userId) {
  return new Promise(async (resolve) => {
   
    resolve({ data:'success' });
  });
}
