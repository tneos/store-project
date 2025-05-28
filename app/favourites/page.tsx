import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import {fetchUserFavorites} from "@/utils/actions";

async function FavouritesPage() {
  const favorites = await fetchUserFavorites();
  if (favorites.length === 0) return <SectionTitle text="You don't have any favourites" />;

  return (
    <div>
      <SectionTitle text="Favourites" />
      <ProductsGrid products={favorites.map(favorite => favorite.product)} />
    </div>
  );
}
export default FavouritesPage;
