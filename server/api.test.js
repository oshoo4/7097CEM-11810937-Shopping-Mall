const apiService = require('../client/src/services/api').default;

global.fetch = jest.fn();

const localStorageMock = (() => {
    let store = {};
    return {
        getItem: jest.fn(key => store[key] || null),
        setItem: jest.fn((key, value) => { store[key] = value.toString() }),
        removeItem: jest.fn(key => { delete store[key] }),
        clear: jest.fn(() => { store = {} }),
    };
})();
global.localStorage = localStorageMock;

describe('API Service Tests', () => {
    beforeEach(() => {
        fetch.mockClear();
        localStorageMock.clear();
        process.env.API_BASE_URL = '/api'
    });

    describe('getProducts', () => {
        it('should fetch products successfully', async () => {
            const mockProducts = [
                { _id: '1', name: 'Product 1', price: 10 },
                { _id: '2', name: 'Product 2', price: 20 },
            ];

            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockProducts,
            });

            const products = await apiService.getProducts();

            expect(fetch).toHaveBeenCalledWith('/api/products');
            expect(products).toEqual(mockProducts);
        });

        it('should handle fetch errors', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                json: async () => ({ message: 'Internal Server Error' }),
            });
            await expect(apiService.getProducts()).rejects.toThrow('HTTP error! status: 500');
            expect(fetch).toHaveBeenCalledWith('/api/products');
        });
    });

    describe('getProductById', () => {
      it('should fetch a single product by ID', async () => {
          const mockProduct = { _id: '1', name: 'Product 1', price: 10 };

          fetch.mockResolvedValueOnce({
              ok: true,
              json: async () => mockProduct,
          });

          const product = await apiService.getProductById('1');

          expect(fetch).toHaveBeenCalledWith('/api/products/1');
          expect(product).toEqual(mockProduct);

      });

      it('should handle product not found', async() => {
        fetch.mockResolvedValueOnce({
          ok: false,
          status: 404,
          json: async () => ({ message: 'Product not found' }),
        });

        await expect(apiService.getProductById('nonexistent')).rejects.toThrow('HTTP error! status: 404');
        expect(fetch).toHaveBeenCalledWith('/api/products/nonexistent');
      })
    });

    describe('login', () => {
      it('should return a token on successful login', async() => {
        const mockToken = { token: 'testtoken123' };
        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockToken,
        });
        const result = await apiService.login('testuser', 'password123');
        expect(fetch).toHaveBeenCalledWith('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: 'testuser', password: 'password123' }),
        });
        expect(result).toEqual(mockToken);
      });

      it('should handle login failure', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 401,
            json: async () => ({ message: 'Invalid credentials' }),
        });
        await expect(apiService.login('testuser', 'wrongpassword')).rejects.toThrow('Invalid credentials');
        expect(fetch).toHaveBeenCalledWith('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: 'testuser', password: 'wrongpassword' }),
        });
      });
    });

    describe('register', () => {
      it('should return a token on successful register', async() => {
        const mockToken = { token: 'testtoken123' };

        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockToken,
        });
        const result = await apiService.register('testuser', 'test@test.com', 'password123');

        expect(fetch).toHaveBeenCalledWith('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: 'testuser', email: 'test@test.com', password: 'password123' }),
        });
        expect(result).toEqual(mockToken);
      });

      it('should handle register failure', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            json: async () => ({ message: 'Username already exists' }),
        });
        await expect(apiService.register('testuser', 'test@test.com', 'password123')).rejects.toThrow('Username already exists');

        expect(fetch).toHaveBeenCalledWith('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: 'testuser', email: 'test@test.com', password: 'password123' }),
        });
      });
    });

    describe('getProfile', () => {
      it('should retrieve user profile successfully', async () => {
          const mockProfile = { username: 'testuser', email: 'test@example.com' };
          const mockToken = 'valid-token';
          localStorageMock.getItem.mockReturnValue(mockToken);

          fetch.mockResolvedValueOnce({
              ok: true,
              json: async () => mockProfile,
          });

          const profile = await apiService.getProfile();

          expect(fetch).toHaveBeenCalledWith('/api/users/profile', {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${mockToken}`,
              },
          });
          expect(profile).toEqual(mockProfile);

      });

      it('should handle missing token', async () => {
        localStorageMock.getItem.mockReturnValue(null);
        await expect(apiService.getProfile()).rejects.toThrow('No token found');
        expect(fetch).not.toHaveBeenCalled();

      });

      it('should handle profile retrieval failure', async () => {
          const mockToken = 'valid-token';
          localStorageMock.getItem.mockReturnValue(mockToken);
          fetch.mockResolvedValueOnce({
              ok: false,
              status: 401,
              json: async () => ({ message: 'Not authorized' })
          });

          await expect(apiService.getProfile()).rejects.toThrow('Not authorized');
          expect(fetch).toHaveBeenCalledWith('/api/users/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${mockToken}`,
            },
          });
      });
    });

    describe('createOrder', () => {
        it('should create an order successfully', async () => {
            const mockOrder = { _id: 'order1', user: 'user1', items: [], totalPrice: 0 };
            const mockToken = 'valid-token';
            const mockItems = [{ productId: 'product1', quantity: 2}];
            localStorageMock.getItem.mockReturnValue(mockToken);


            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockOrder,
            });

            const order = await apiService.createOrder(mockItems);

            expect(fetch).toHaveBeenCalledWith('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${mockToken}`,
                },
                body: JSON.stringify({ items: mockItems }),
            });
            expect(order).toEqual(mockOrder);
        });
        it('should handle missing token', async () => {
          localStorageMock.getItem.mockReturnValue(null);
          await expect(apiService.createOrder([])).rejects.toThrow('No token found');
          expect(fetch).not.toHaveBeenCalled();
        });
        it('should handle order creation failure', async () => {
            const mockToken = 'valid-token';
            localStorageMock.getItem.mockReturnValue(mockToken);

            const mockItems = [{ productId: 'product1', quantity: 2}];


            fetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                json: async () => ({message: 'Invalid order data'})
            });

            await expect(apiService.createOrder(mockItems)).rejects.toThrow('Invalid order data');
            expect(fetch).toHaveBeenCalledWith('/api/orders', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${mockToken}`,
              },
              body: JSON.stringify({ items: mockItems }),
            });
        });
    });

    describe('getUserOrders', () => {
        it('should retrieve user orders successfully', async () => {
            const mockOrders = [{ _id: 'order1', user: 'user1', items: [], totalPrice: 10 }];
            const mockToken = 'valid-token';

            localStorageMock.getItem.mockReturnValue(mockToken);

            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockOrders,
            });

            const orders = await apiService.getUserOrders();

            expect(fetch).toHaveBeenCalledWith('/api/orders', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${mockToken}`,
                },
            });
            expect(orders).toEqual(mockOrders);
        });

        it('should handle missing token', async () => {
          localStorageMock.getItem.mockReturnValue(null);
          await expect(apiService.getUserOrders()).rejects.toThrow('No token found');
          expect(fetch).not.toHaveBeenCalled();
        });

        it('should handle order retrieval failure', async () => {
            const mockToken = 'valid-token';
            localStorageMock.getItem.mockReturnValue(mockToken);

            fetch.mockResolvedValueOnce({
              ok: false,
              status: 500,
              json: async () => ({ message: 'Internal Server Error'})
            });

            await expect(apiService.getUserOrders()).rejects.toThrow('Internal Server Error');
            expect(fetch).toHaveBeenCalledWith('/api/orders', {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${mockToken}`,
              },
            });
        });
    });
});