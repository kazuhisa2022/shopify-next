export async function storeFront(query, variables = {}) {
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export function formatPrice(number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "JPY",
    minimumFractionDigits: 0,
  }).format(number);
}
