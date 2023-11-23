import { createHashRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./components/layout";

const routes = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/", // Corrigido para "/#cripto"
        element: <Home />
      },
      {
        path: "detail/:cripto", // Corrigido para "#detail/:cripto"
        element: <Detail />
      },
      {
        path: "*", // Corrigido para "#*"
        element: <NotFound />
      }
    ]
  }
]);

export { routes };
