import ProductsContainer from "@/components/products/ProductsContainer";
import {use} from "react";

function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{layout?: string; search?: string}>;
}) {
  const params = use(searchParams);
  // Set default values if props undefined
  const layout = params.layout || "grid";
  const search = params.search || "";

  return <ProductsContainer layout={layout} search={search} />;
}
export default ProductsPage;
