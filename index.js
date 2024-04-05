async function login() {
    const res = await fetch("https://gateway.igloorooms.com/IR/Authenticate", {
        body: JSON.stringify({
            "username": "A35",
            "password": "12345"
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data.My_Result
}