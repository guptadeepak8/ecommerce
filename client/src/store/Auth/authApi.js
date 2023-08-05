export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/users", {
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
    const email=logInfo.email
    const password=logInfo.password
    const response = await fetch("http://localhost:3000/users?email="+email);
    if(response){
    
      const data = await response.json();
      if(data.length){
        if(password===data[0].password){
          resolve({ data:data[0] });
        }else{
          reject({message:'wrong password'})
        }
      }else{
        reject({message:'user not found'})
      }
    }
    
  });
}

export function updateUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/users/"+userData.id, {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
