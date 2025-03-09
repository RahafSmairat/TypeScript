function checkAge(person) {
    if (person.age > 18)
        console.log("Adult!");
    else
        console.log("Minor!");
}
var person = {
    name: "Rahaf",
    age: 26
};
checkAge(person);
//Exercise 2
console.log("---------------------------------------------------------------");
var teacher = {
    name: "Rudaina",
    subjects: ["Math", "English", "History"]
};
console.log("\n" + "Subjects of " + teacher.name);
teacher.subjects.forEach(function (subject) {
    console.log(subject);
});
//Exercise 3
console.log("---------------------------------------------------------------");
var products = [
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
];
products.forEach(function (product) {
    console.log(product.name + ": " + product.price);
});
products.forEach(function (product) {
    if (product.quantity > 5)
        product.price = product.price - product.price * 0.15;
});
console.log("-----------------------------");
products.forEach(function (product) {
    console.log(product.name + ": " + product.price);
});
var productss = JSON.parse(localStorage.getItem("Products") || "[]"); //////
function save(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var price = parseInt(document.getElementById("price").value);
    var quantity = parseInt(document.getElementById("quantity").value);
    var product1 = {
        name: name,
        description: description,
        price: price,
        quantity: quantity
    };
    productss.push(product1);
    localStorage.setItem("Products", JSON.stringify(productss));
}
function loadData() {
    var dataContainer = document.getElementById("data");
    if (dataContainer) {
        dataContainer.innerHTML = "";
        productss.forEach(function (product) {
            // dataContainer.innerHTML += `
            // <p>${product.name}</p>
            // <p>${product.description}</p>
            // <p>${product.price}</p>
            // <p>${product.quantity}</p>
            // `
            dataContainer.innerHTML += "\n            <div class=\"card\" style=\"width: 18rem;\">\n  <div class=\"card-body\">\n    <h5 class=\"card-title\">".concat(product.name, "</h5>\n    <h6 class=\"card-subtitle mb-2 text-body-secondary\">").concat(product.description, "</h6>\n    <p class=\"card-text\">").concat(product.price, "$</p>\n    <p class=\"card-text\">QTY: ").concat(product.quantity, "</p>\n  </div>\n</div>\n            ");
        });
    }
}
