import axios from 'axios';

async function fetchAndRenderData(productType) {
    if (!productType) {
        alert("Please enter a valid product type ID.");
        return;
    }

    try {
        // Promise.all should solve race conditions
        const [productsResponse, productTypesResponse] = await Promise.all([
            axios.get('http://localhost:3001/products'),
            axios.get('http://localhost:3001/producttypes')
        ]);

        const products = productsResponse.data;
        const productTypes = productTypesResponse.data;

        const productTypeMapping = {};
        for (const pt of productTypes) {
            productTypeMapping[pt.id] = pt.type;
        }

        const tableBody = document.getElementById('product-table-body');
        // Clear previous rows
        tableBody.innerHTML = '';

        for (const product of products) {
            if (product.productTypeId === Number(productType)) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>${product.price}</td>
                    <td>${productTypeMapping[product.productTypeId] || 'Unknown'}</td>
                `;
                tableBody.appendChild(row);
            }
        }
    } catch (error) {
        console.error('Error fetching and rendering data:', error);
    }
}

window.handleFetchClick = function() {
    const productTypeId = document.getElementById('product-type-input').value;
    fetchAndRenderData(productTypeId);
};

