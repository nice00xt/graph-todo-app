import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./styles/app.css";
import ApolloContext from "./context/apollo";

export function links() {
  return [{ rel: "stylesheet", href: styles }]
};

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
  const initialState = React.useContext(ApolloContext);
  return (
    <html data-theme="night" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__=${JSON.stringify(
              initialState
            ).replace(/</g, "\\u003c")};`,
          }}
        />
      </body>
    </html>
  );
}
