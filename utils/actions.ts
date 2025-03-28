import db from "@/utils/db";

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });

  return products;
};

export const fetchAllProducts = ({search = ""}: {search: string}) => {
  return db.product.findMany({
    where: {
      OR: [
        {name: {contains: search, mode: "insensitive"}},
        {company: {contains: search, mode: "insensitive"}},
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
