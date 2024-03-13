
import api from "./api.js";



/* document.addEventListener("DOMContentLoaded", () => {


});
 */



// eslint-disable-next-line no-undef
const from = document.querySelector("#formLogin");

from.addEventListener("submit", async(e) => {   
    e.preventDefault();

    // eslint-disable-next-line no-undef
    const email = document.querySelector("#username").value;
    // eslint-disable-next-line no-undef
    const password = document.querySelector("#password").value;
    const res = await api.probar(email, password);
    console.log(email,  password);  
    console.log(res);
});

