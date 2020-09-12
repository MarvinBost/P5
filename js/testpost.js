let url = "http://localhost:3000/api/teddies/order"
let btn = document.querySelector('.btn')
btn.addEventListener('click', e => {
    e.preventDefault()
    const data = {
        'contact': {
            'firstName': 'Dupont',
            'lastName': 'Alain',
            'address': '30 rue Louis Pons',
            'city': 'Paris',
            'email': 'alain.dupont@gmail.com'
        },
        'products': [
            '5be9c8541c9d440000665243',
            '5beaaa8f1c9d440000a57d95'
        ]
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(url, options).then((response) => {

        response.json().then((data) => {
            console.log(data);
        });
    })
})

// let model = {
//     contact: {
//         firstName: string,
//         lastName: string,
//         address: string,
//         city: string,
//         email: string
//     },
//     products: [string] //< --array of product _id
// }