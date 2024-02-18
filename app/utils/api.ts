// utils/api.ts
export const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching products');
    }
  };
  