export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(import.meta.env.VITE_REACT_APP_API_URL+"/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function loginUser(logInfo) {
  return new Promise(async (resolve,reject) => {
try {
  const response = await fetch(import.meta.env.VITE_REACT_APP_API_URL+"/auth/login", {
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
export function checkUser() {
  return new Promise(async (resolve,reject) => {
try {
  const response = await fetch(import.meta.env.VITE_REACT_APP_API_URL+"/auth/check");
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



export function signOutUser() {
  return new Promise(async (resolve,reject) => {
    try {
      const response = await fetch('http://localhost:3000/auth/logout');
      if (response.ok) {
        resolve({ data:'success' });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      console.log(error)
      reject( error );
    }
  });
}
