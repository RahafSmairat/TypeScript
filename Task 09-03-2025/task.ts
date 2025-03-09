//Exercise 1
interface Person {
    name: string;
    age: number;
}

function checkAge(person: Person) {
    if (person.age > 18)
        console.log("Adult!")
    else
        console.log("Minor!")
}

let person: Person = {
    name: "Rahaf",
    age: 26
}

checkAge(person)

//Exercise 2
console.log("---------------------------------------------------------------")
interface Teacher {
    name: string;
    subjects: string[];
}

let teacher: Teacher = {
    name: "Rudaina",
    subjects: ["Math", "English", "History"]
}

console.log("\n" + "Subjects of " + teacher.name)
teacher.subjects.forEach(subject => {
    console.log(subject)
});

//Exercise 3
console.log("---------------------------------------------------------------")
interface Product {
    name: string;
    price: number;
    quantity: number;
}

let products: Product[] = [
    {
        name: "Sunblock",
        price: 15.5,
        quantity: 11
    },
    {
        name: "Eyecream",
        price: 20.35,
        quantity: 4
    },
    {
        name: "Lipoil",
        price: 6.5,
        quantity: 5
    }
]

products.forEach(product => {
    console.log(product.name + ": " + product.price)
})

products.forEach(product => {
    if (product.quantity > 5)
        product.price = product.price - product.price * 0.15;
})
console.log("-----------------------------")
products.forEach(product => {
    console.log(product.name + ": " + product.price)
})

//Exercise 4

interface Productt {
    name: string;
    price: number;
    quantity: number;
    description: string;
}

let productss: Productt[] = JSON.parse(localStorage.getItem("Products") || "[]"); //////

function save(event) {

    event.preventDefault();

    let name = (document.getElementById("name") as HTMLInputElement).value
    let description = (document.getElementById("description") as HTMLInputElement).value
    let price = parseInt((document.getElementById("price") as HTMLInputElement).value)
    let quantity = parseInt((document.getElementById("quantity") as HTMLInputElement).value)

    let product1: Productt = {
        name: name,
        description: description,
        price: price,
        quantity: quantity
    }

    productss.push(product1);
    localStorage.setItem("Products", JSON.stringify(productss));
    (document.getElementById("successMessage") as HTMLInputElement).innerHTML =
        `<div class="alert alert-success" role="alert">
        Product saved successfully!
    </div>`;

    // (document.getElementById("formContainer") as HTMLFormElement).reset();
    (document.getElementById("name") as HTMLInputElement).value = '';
    (document.getElementById("description") as HTMLInputElement).value = '';
    (document.getElementById("price") as HTMLInputElement).value = '';
    (document.getElementById("quantity") as HTMLInputElement).value = '';
    (document.getElementById("successMessage") as HTMLDivElement).classList = "d-block";
}

function loadData() {
    (document.getElementById("successMessage") as HTMLDivElement).classList = "d-none";
    let dataContainer = document.getElementById("data")
    if (dataContainer) {

        dataContainer.innerHTML = "";

        if(productss.length != 0){
            productss.forEach(product => {
                // dataContainer.innerHTML += `
                // <p>${product.name}</p>
                // <p>${product.description}</p>
                // <p>${product.price}</p>
                // <p>${product.quantity}</p>
                // `
    
                dataContainer.innerHTML += `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <h6 class="card-subtitle mb-3">${product.description}</h6>
                    <p class="card-text mb-0"><strong>Price:</strong> ${product.price}$</p>
                    <p class="card-text"><strong>QTY:</strong> ${product.quantity}</p>
                </div>
            </div>`
            })
        }
        else{
            dataContainer.innerHTML = `<p class="text-body-secondary">No Products To View!</p>`
        }
    }
}

