import { ProductStyles } from "@/styles/product/ProductStyle";
import Link from "next/link";
const Product = ({ product }) => {
  const { title, price, slug } = product.attributes;
  const { url } = product.attributes.image.data.attributes.formats.thumbnail;

  return (
    <ProductStyles>
      <Link href={`/product/${slug}`}>
        <div>
          <img src={process.env.NEXT_PUBLIC_BACKEND_URL + url} alt="" />
        </div>
      </Link>
      <h2>{title}</h2>
      <h3>{price}</h3>
    </ProductStyles>
  );
};

export default Product;
