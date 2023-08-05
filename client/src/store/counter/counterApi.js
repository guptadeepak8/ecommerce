export function fetchCount(amount ) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://') 
    const data = await response.json()
    resolve({data})
  }
  );
}