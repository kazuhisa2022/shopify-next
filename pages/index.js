import Link from "next/link";
import { storeFront, formatPrice } from "../utils";

const Home = ({ products }) => {
  return (
    <>
      <main>
        <div className="mx-auto mt-24 max-w-7xl px-4 sm:mt-32 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center ">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-center md:text-6xl">
              Shopify ecommerce shop on Next JS
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:text-lg sm:text-center md:mt-5 md:text-xl lg:mx-32">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-center">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 divide-x divide-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 md:py-4 md:px-10 md:text-lg"
                >
                  <span className="px-6">Lets explore</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-32 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.edges.map((item) => {
              const product = item.node;
              const image = product.images.edges[0].node;
              return (
                <Link
                  key={product.handle}
                  href={`/products/${product.handle}`}
                  className="group"
                >
                  <a>
                    <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden rounded-lg bg-gray-200 ">
                      <img
                        src={image.url}
                        alt={image.altText}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-lg  text-right font-medium text-gray-900">
                      {formatPrice(product.priceRange.minVariantPrice.amount)}
                    </p>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const { data } = await storeFront(productsQuery);
  return {
    props: {
      products: data?.products,
    },
  };
}

const gql = String.raw;
const productsQuery = gql`
  query Products {
    products(first: 8) {
      edges {
        node {
          title
          handle
          tags
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 3) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;
