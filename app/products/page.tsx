import getProducts from '@/lib/getProducts'
import ProductList from '../components/ProductList'
import Search from '../components/SearchBar'

export default async function ProductPage() {
    const productData: Promise<Product[]> = getProducts()
    const products = await productData

    const content = (
        <div className="container mx-auto px-4 py-8">
            <ProductList products={products} />
        </div>
            
    )
    return content
}