var reg = [
    /([\w-\.]+@[\w-\.]+\.{1}[\w]+)/i, // Adresse Mail
    /^\S[a-z ,.'à-ÿ-]+$/i, // Nom, Prénom, Ville
    /^[0-9]{5}$/i, // Code postal
    /^[0-9]{1,5}[A-z0-9 'à-ÿ-]{5,30}$/i // Adresse postale
]
let form = document.querySelector("form");
let inputs = document.querySelectorAll("input");
form.addEventListener("submit", (e) => {
    e.preventDefault();
});
for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].getAttribute('name') == 'email') {
        inputs[i].addEventListener('keyup', (e) => {
            formV(reg[0].test(inputs[i].value), inputs)
        })
    } else if (inputs[i].getAttribute('name') == 'name') {
        inputs[i].addEventListener('keyup', (e) => {
            formV(reg[1].test(inputs[i].value), inputs)
        })
    }
}

function formV(Regtest, inputs) {
    if (Regtest) {
        inputs[i].classList.remove("is-invalid")
        inputs[i].classList.add("is-valid")
    } else {
        inputs[i].classList.remove("is-valid")
        inputs[i].classList.add("is-invalid")
    }
}