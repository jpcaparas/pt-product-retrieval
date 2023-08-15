import axios from 'axios';

async function fetchAndRenderData() {
    try {
        // Promise.all should solve race conditions
        const [productsResponse, productTypesResponse] = await Promise.all([
            axios.get('http://localhost:3001/products'),
            axios.get('http://localhost:3001/producttypes')
        ]);

        const products = productsResponse.data;
        const productTypes = productTypesResponse.data;

        const productTypeMapping = {};
        for (let pt of productTypes) {
            productTypeMapping[pt.id] = pt.type;
        }

        const tableBody = document.getElementById('product-table-body');
        for (let product of products) {
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
    } catch (error) {
        console.error('Error fetching and rendering data:', error);
    }
}

fetchAndRenderData();
