import "@/styles/globals.css";
import {
  createClient,
  Provider,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from "urql";
import Nav from "@/components/Nav";
import { StateContext } from "@/lib/context";

export const client = createClient({
  url: process.env.NEXT_PUBLIC_BACKEND_API,
});

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Provider value={client}>
        <Nav />
        <Component {...pageProps} />
      </Provider>
    </StateContext>
  );
}
