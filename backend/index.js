const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

const products = [
    {
        id: 1,
        name: "Ryu Action Figure",
        description: "A detailed action figure of the legendary Street Fighter, Ryu.",
        price: 20.99,
        productTypeId: 1
    },
    {
        id: 2,
        name: "Chun-Li Keychain",
        description: "A keychain featuring the iconic spinning bird kick pose of Chun-Li.",
        price: 9.99,
        productTypeId: 2
    },
    {
        id: 3,
        name: "Ken Poster",
        description: "A poster showcasing Ken in his signature Shoryuken pose.",
        price: 5.99,
        productTypeId: 3
    }
];

const productTypes = [
    {
        id: 1,
        type: "Action Figure"
    },
    {
        id: 2,
        type: "Keychain"
    },
    {
        id: 3,
        type: "Poster"
    }
];

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/producttypes', (req, res) => {
    res.json(productTypes);
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
