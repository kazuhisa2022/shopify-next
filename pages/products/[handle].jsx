import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";

import { storeFront, formatPrice } from "../../utils";
import { format } from "date-fns";

const reviews = { href: "#", average: 4, totalCount: 117 };
const base = {
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ product }) {
  const image = product.images.edges[0].node;
  const variantId = product.variants.edges[0].node.id;
  const [isLoading, setIsLoading] = useState(false);

  async function checkout() {
    setIsLoading(true);
    const { data } = await storeFront(checkoutMutation, { variantId });
    const { webUrl } = data.checkoutCreate.checkout;
    window.location.href = webUrl;
  }
  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-w-6 aspect-h-5 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={image.url}
              alt={image.altText}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="aspect-w-6 aspect-h-5 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={image.url}
              alt={image.altText}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="aspect-w-6 aspect-h-5 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={image.url}
              alt={image.altText}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.title}
            </h1>
          </div>
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <p className="text-md  tracking-tight text-gray-500 ">
              {product.tags[0]} Updated {""}
              <time dateTime={product.updatedAt}>
                {format(new Date(product.updatedAt), "dd/mm/yyyy")}
              </time>
            </p>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {formatPrice(product.priceRange.minVariantPrice.amount)}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <button
              onClick={checkout}
              type="submit"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Pay {formatPrice(product.priceRange.minVariantPrice.amount)}
            </button>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {base.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { data } = await storeFront(gql`
    {
      products(first: 6) {
        edges {
          node {
            handle
          }
        }
      }
    }
  `);
  return {
    paths: data.products.edges.map((product) => ({
      params: { handle: product.node.handle },
    })),
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const { data } = await storeFront(SingleProductQuery, {
    handle: params.handle,
  });
  return {
    props: {
      product: data.productByHandle,
    },
  };
}
const gql = String.raw;
const SingleProductQuery = gql`
  query SingleProduct($handle: String!) {
    productByHandle(handle: $handle) {
      title
      description
      tags
      updatedAt
      priceRange {
        minVariantPrice {
          amount
        }
      }
      images(first: 6) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;
const checkoutMutation = gql`
  mutation CheckoutCreate($variantId: ID!) {
    checkoutCreate(
      input: { lineItems: { variantId: $variantId, quantity: 1 } }
    ) {
      checkout {
        webUrl
      }
    }
  }
`;
