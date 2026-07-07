let cachedToken: string | null = null;
let expiresAt = 0;

export const NOMBA_BASE_URL =
  process.env.NOMBA_ENV === "sandbox"
    ? "https://sandbox.nomba.com/v1"
    : "https://api.nomba.com/v1";

export async function getNombaAccessToken() {
  if (cachedToken && Date.now() < expiresAt) {
    return cachedToken;
  }

  const response = await fetch(
    `${NOMBA_BASE_URL}/auth/token/issue`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accountId: process.env.NOMBA_ACCOUNT_ID!,
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: process.env.NOMBA_CLIENT_ID!,
        client_secret: process.env.NOMBA_CLIENT_SECRET!,
      }),
    }
  );

  const result = await response.json();

  if (result.code !== "00") {
    throw new Error(result.description);
  }

  cachedToken = result.data.access_token;

  // refresh after 25 mins (before the 30 min expiry)
  expiresAt = Date.now() + 25 * 60 * 1000;

  return cachedToken;
}
export async function createNombaCheckout({
  amount,
  customerEmail,
  callbackUrl,
  orderReference,
}: {
  amount: number;
  customerEmail: string;
  callbackUrl: string;
  orderReference: string;
}) {
  const accessToken = await getNombaAccessToken();

  const response = await fetch(
    `${NOMBA_BASE_URL}/checkout/order`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        accountId: process.env.NOMBA_ACCOUNT_ID!,
      },
      body: JSON.stringify({
        order: {
          amount: amount.toFixed(2),
          currency: "NGN",
          customerEmail,
          callbackUrl,
          orderReference,
        },
      }),
    }
  );

  const result = await response.json();

console.log("Nomba Auth Response:", result);

if (result.code !== "00") {
  throw new Error(
    JSON.stringify(result, null, 2)
  );
}

  return result.data;
}