export default async function getProducts() {
    const res = await fetch('https://fakestoreapi.com/products');

    if (!res.ok) throw new Error('Failed to fetch data')

    return res.json()
}