import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  InvoicesList,
  loader as invoicesLoader,
} from "./components/invoices/InvoicesList";
import InvoiceCreate from "./components/invoices/InvoiceCreate";

import InvoiceDetails, {
  loader as invoiceData,
} from "./components/invoices/InvoiceDetails";
import InvoiceEdit from "./components/invoices/InvoiceEdit";
import LoginForm from "./pages/login/LoginForm";
import UploadFile from "./components/Files/UploadFile";

import {
  PrivateRoutes,
  loader as userLoader,
} from "./pages/user/PrivateRoutes";

import InvoiceCreate1 from "./components/invoices1/InvoiceCreate";
// import { Upload } from "@mui/icons-material";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <PrivateRoutes />,
    loader: userLoader,
    children: [
      {
        index: true,
        element: <InvoicesList />,
        loader: invoicesLoader,
      },
      {
        path: "invoice/:id",
        element: <InvoiceDetails />,
        loader: invoiceData,
      },
      {
        path: "invoice/create",
        element: <InvoiceCreate1 />,
      },
      {
        path: "invoice/edit/:id",
        element: <InvoiceEdit />,
        loader: invoiceData,
      },
      { path: "upload/", element: <UploadFile /> },
    ],
  },
  {
    path: "/invoices",
    element: <InvoiceCreate1 />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
