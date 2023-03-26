import { GET_PRODUCT_QUERY } from "@/lib/query";
import { useQuery } from "urql";
import { useRouter } from "next/router";
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "@/styles/product/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { client } from "../_app";
import { useStateContext } from "@/lib/context";
const ProductDetails = ({ data }) => {
  const { qty, incQty, decQty, onAdd } = useStateContext();
  // const { query } = useRouter();
  // //FETCH
  // const [results] = useQuery({
  //   query: GET_PRODUCT_QUERY,
  //   variables: { slug: query.slug },
  // });

  // const { data, fetching, error } = results;
  const { title, description, price } = data.products.data[0].attributes;
  const { url } = data.products.data[0].attributes.image.data.attributes;

  // //LOADING
  // if (fetching) {
  //   return <p>Loading...</p>;
  // }
  // //ERROR
  // if (error) {
  //   return <p>Oh no ... {error.message}</p>;
  // }

  return (
    <DetailsStyle>
      <img src={process.env.NEXT_PUBLIC_BACKEND_URL + url} alt="" />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button>
            <AiFillPlusCircle onClick={incQty} />
          </button>
          <p>{qty}</p>
          <button>
            <AiFillMinusCircle onClick={decQty} />
          </button>
        </Quantity>
        <Buy onClick={() => onAdd(data.products.data[0].attributes, qty)}>
          Add to Cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const query = GET_PRODUCT_QUERY;
  const variables = { slug };
  const { data } = await client.query(GET_PRODUCT_QUERY, variables).toPromise();

  return {
    props: {
      data,
    },
  };
}

export default ProductDetails;
