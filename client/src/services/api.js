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

    login: async (username, password) => {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
              const errorData = await response.json();
              errorMessage = errorData.message || errorMessage;
            } catch (parseError) {
                console.log(parseError);
            }
            throw new Error(errorMessage);
        }
        return await response.json();
    },

    register: async (username, email, password) => {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
              const errorData = await response.json();
              errorMessage = errorData.message || errorMessage;
            } catch (parseError) {
                console.log(parseError);
            }
            throw new Error(errorMessage);
        }
        return await response.json();
    },

    getProfile: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("No token found");
        }
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
              const errorData = await response.json();
              errorMessage = errorData.message || errorMessage;
            } catch (parseError) {}
            throw new Error(errorMessage);
        }
        return await response.json();
    },

    createOrder: async (items) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token found.  User must be logged in to place an order.");
        }
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ items })
        });
        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (parseError) {}
            throw new Error(errorMessage);
        }
        return await response.json();
    },

    getUserOrders: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token found. User must be logged in.");
        }
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (parseError) {}
            throw new Error(errorMessage);
        }
        return await response.json();
    }
};

export default apiService;