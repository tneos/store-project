import CartItemsList from "@/components/cart/CartItemsList";
import CartTotals from "@/components/cart/CartTotals";
import SectionTitle from "@/components/global/SectionTitle";
import {fetchOrCreateCart, updateCart} from "@/utils/actions";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";

async function CartPage() {
  // If no user found redirect to home page
  const {userId} = await auth();
  if (!userId) redirect("/");
  const previousCart = await fetchOrCreateCart({userId});
  const {currentCart, cartItems} = await updateCart(previousCart);
  // Check if cart is empty or not
  if (cartItems.length === 0) return <SectionTitle text="Your cart is empty" />;

  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList cartItems={cartItems} />
        </div>
        <div className="lg:col-span-4">
          <CartTotals cart={currentCart} />
        </div>
      </div>
    </>
  );
}
export default CartPage;
