import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  InvoicesList,
  loader as invoicesLoader,
} from "./components/invoices/InvoicesList";

import InvoiceDetails, {
  loader as invoiceData,
} from "./components/invoices/InvoiceDetails";
import InvoiceEdit from "./components/invoices/InvoiceEdit";
import LoginForm from "./pages/login/LoginForm";
import UploadFile from "./components/Files/UploadFile";

import {
  PrivateRoutes,
  loader as userLoader,
} from "./pages/login/user/PrivateRoutes";

import InvoiceCreate, {
  loader as createInvoiceLoader,
} from "./components/invoices1/InvoiceCreate";
import UserList, {user_loader as clients} from "./modules/users/UserList";

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
        element: <InvoiceCreate />,
        loader: createInvoiceLoader,
      },
      {
        path: "invoice/edit/:id",
        element: <InvoiceEdit />,
        loader: invoiceData,
      },
      { path: "upload/", element: <UploadFile /> },
    ],
  },
  {path: '/users', element: <PrivateRoutes/>, loader: userLoader, children: [
    {index: true, element: <UserList/>, loader: clients}
  ]}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
