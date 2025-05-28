import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import {fetchSingleProduct, findExistingReview} from "@/utils/actions";
import Image from "next/image";
import {formatCurrency} from "@/utils/format";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import ProductRating from "@/components/single-product/ProductRating";
import ShareButton from "@/components/single-product/ShareButton";
import SubmitReview from "@/components/reviews/SubmitReview";
import ProductReviews from "@/components/reviews/ProductReviews";
import {auth} from "@clerk/nextjs/server";

async function page({params}: {params: Promise<{id: string}>}) {
  // Await params -- Next 15
  const productId = (await params).id;
  console.log(productId);
  const product = fetchSingleProduct(productId);
  const {name, image, company, description, price} = await product;
  const poundsAmount = formatCurrency(price);
  const {userId} = await auth();
  const reviewDoesNotExist = userId && !(await findExistingReview(userId, productId));

  return (
    <section>
      <BreadCrumbs name={name} />

      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE FIRST COL */}
        <div className="relative h-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="w-full rounded object-cover"
          ></Image>
        </div>
        {/* PRODUCT INFO SECOND COL */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize font-bold text-3xl">{name}</h1>
            <div className="flex items-center gap-x-2">
              <FavoriteToggleButton productId={productId} />
              <ShareButton productId={productId} name={name} />
            </div>
          </div>
          <ProductRating productId={productId} />
          <h4 className="text-xl mt-2">{company}</h4>
          <p className="mt-3 text-md bg-muted inline-block p-2 rounded">{poundsAmount}</p>
          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
          <AddToCart productId={productId} />
        </div>
      </div>
      <ProductReviews productId={productId} />
      {reviewDoesNotExist && <SubmitReview productId={productId} />}
      {/* <SubmitReview productId={productId} /> */}
    </section>
  );
}

export default page;
