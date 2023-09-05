export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(import.meta.env.VITE_REACT_APP_API_URL+"/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

