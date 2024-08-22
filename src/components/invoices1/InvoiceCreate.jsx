import { Container, Typography, Button, IconButton } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import useInvoiceStore from "./store/store";
import GeneralInfo from "./part_invoices/GeneralInfo";
import ItemList from "./part_invoices/ItemList";
import PaymentList from "./part_invoices/PaymentList";
import db, { uploadFilesGetURL } from "../../appwrite/databases";
import { AddAPhoto } from "@mui/icons-material";
import { useState } from "react";

function dropID(arrayObjects) {
  const result = arrayObjects.map((obj) => {
    const { id, ...rest } = obj;
    return rest;
  });
  return result;
}
export async function loader() {
  const { documents } = await db.users.list();
  // const {}
  const users = documents;
  return { users };
}

const InvoiceCreate = () => {
  const navigate = useNavigate();
  const { users } = useLoaderData();
  // console.log(users);
  const { items, payments, userName, typeInvoice } = useInvoiceStore();

  const [invoicePhotos, setInvoicePhotos] = useState(null);

  const invoice_total = items.reduce(
    (sum, item) => sum + item.item_price * item.item_qnt,
    0
  );
  const invoice_payment = payments.reduce(
    (sum, payment) => sum + payment.payment,
    0
  );

  const handleSubmit = async () => {
    let items_photos;
    if (invoicePhotos) {
      items_photos = await uploadFilesGetURL(invoicePhotos);
    }
    const invoice_items = dropID(items);
    const invoice_payments = dropID(payments);

    console.log(payments);
    const payload = {
      user_name: userName,
      type_invoice: typeInvoice,
      invoice_items,
      invoice_payments,
      invoice_total,
      invoice_payment,
      items_photos,
      users: { user_name: userName },
    };
    await db.invoice_main.create(payload);
    // Lógica para enviar la factura
    navigate("/");
  };
  //   creamos el payload
  // primero por cada item subimos los archivos items [href]
  // pagos archivos [href]
  // estos agregados al item y pagos
  // subir a la base de datos

  return (
    <Container>
      <Typography variant="h3">Crear {typeInvoice}</Typography>
      <GeneralInfo users={users} />
      <ItemList />
      <Typography>Total: S/. {invoice_total} </Typography>
      <div style={{ display: "flex" }}>
        <Typography variant="h5">Agregar photos</Typography>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id={`icon-button-file`}
          type="file"
          multiple
          onChange={(e) => setInvoicePhotos(e.target.files)}
        />
        <label htmlFor={`icon-button-file`}>
          <IconButton component="span">
            <AddAPhoto />
          </IconButton>
        </label>
      </div>
      <PaymentList />
      <Typography>Total: S/. {invoice_payment} </Typography>
      <Button
        variant="contained"
        onClick={handleSubmit}
        style={{ marginTop: "20px" }}
        fullWidth
      >
        Registrar Invoice
      </Button>
    </Container>
  );
};

export default InvoiceCreate;
