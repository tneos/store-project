import ProductsContainer from "@/components/products/ProductsContainer";

function ProductsPage({searchParams}: {searchParams: {layout?: string; search?: string}}) {
  // Set default values if props undefined
  const layout = searchParams.layout || "grid";
  const search = searchParams.search || "";
  console.log(searchParams);

  return <ProductsContainer layout={layout} search={search} />;
}
export default ProductsPage;
