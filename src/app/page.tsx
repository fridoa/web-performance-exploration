import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import { PAGE_SIZE } from "@/constants";
import productService from "@/services/product.service";

export default async function Home() {
  const initialData = await productService.getProducts(
    `limit=${PAGE_SIZE}&skip=0`,
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-350 px-6 py-12">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Product List
          </h1>
          <p className="text-lg text-gray-500">
            Beautiful, modern product card work, designs, illustrations, and
            graphic elements
          </p>
        </div>

        <ProductList
          initialProducts={initialData.products}
          totalProducts={initialData.total}
        />
      </main>
    </div>
  );
}
