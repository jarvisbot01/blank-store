const probar = async (correo, clave) => {
  try {

    const response = await fetch("http://localhost:9090/api/passport/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, clave }),
    });

    const results = await response.json();
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export default {
    probar
};
