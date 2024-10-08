import { useLoaderData, useNavigate } from "react-router-dom";
import db from "../../appwrite/databases";
import { Query } from "appwrite";
import { CardInvoice } from "./CardInvoice";
import { Button, Container, Grid, Typography } from "@mui/material";

export function loader() {
  return db.invoice_main.list([Query.orderDesc("$createdAt")]);
}
import { useUserL } from "../../pages/login/zustantd";
import { account } from "../../appwrite/config";

export const InvoicesList = () => {
  const invoices = useLoaderData().documents;
  const logout = useUserL((s) => s.logoutUser);
  const { user } = useUserL();

  const getuser = async () => {
    const actual = await account.get();
    console.log({ actual, user });
  };
  getuser();
  const navigate = useNavigate();

  const listInvoices = invoices.map((invoice) => (
    <CardInvoice key={invoice.$id} invoice={invoice} />
  ));
  const handleCreate = () => {
    navigate("/invoice/create");
  };
  const container = (
    <Container>
      <Typography variant="h1">Invoices</Typography>
      <Button variant="contained" spacing={3} onClick={() => handleCreate()}>
        Crear Invoice
      </Button>
      <Button variant="contained" spacing={3} onClick={() => logout()}>
        Salir
      </Button>
      <Grid container spacing={3}>
        {listInvoices}
      </Grid>
    </Container>
  );

  return container;
};
