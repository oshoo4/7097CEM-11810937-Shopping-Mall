// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = '/api';

const apiService = {
    getProducts: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/products`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Could not fetch products:", error);
            throw error;
        }
    },

    getProductById: async (id) => {
        try {
            const response = await fetch(`<span class="math-inline">\{API\_BASE\_URL\}/products/</span>{id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Could not fetch product with id ${id}:`, error);
            throw error;
        }
    },
};

export default apiService;