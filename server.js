// a route that responds to URLs like /greetings/<username-parameter>.

const express = require('express');
const app = express();

// Route to greet the user
app.get('/greetings/:username', (req, res) => {
    let username = req.params.username;
    res.send(`Hello there, ${username}! What a delight it is to see you once more.`);
});



// 2. Rolling the Dice
// Route to handle /roll/:number
app.get('/roll/:number', (req, res) => {
    let number = req.params.number;

    if (isNaN(number)) {
        res.send("You must specify a number.");
    } else {
        const max = parseInt(number);

        const roll = Math.floor(Math.random() * (max + 1));
        res.send(`You rolled a ${roll}.`);
    }
});


// 3. I Want THAT One!

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];


app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);

    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        res.send("This item is not yet in stock. Check back soon!");
    } else {
        const item = collectibles[index];

        res.send(`So, you want the ${item.name}? For ${item.price.toFixed(2)}, it can be yours!`);
    }
});


// 4. Filter Shoes by Query Parameters

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


app.get('/shoes', (req, res) => {
    const {'min-price': minPrice, 'max-price': maxPrice, type } = req.query;

    let filteredShoes = shoes;

    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice));
    }

    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type.toLowerCase());
    }

    res.json(filteredShoes);
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
