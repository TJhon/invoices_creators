import { Container, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useInvoiceStore from "./store/store";
import GeneralInfo from "./GeneralInfo";
import ItemList from "./ItemList";
import PaymentList from "./PaymentList";
import db, { uploadFilesGetURL } from "../../appwrite/databases";
import { AddAPhoto } from "@mui/icons-material";
import { useState } from "react";

const InvoiceCreate1 = () => {
  const navigate = useNavigate();
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
  //   console.log(invoicePhotos);

  const handleSubmit = async () => {
    let items_photos;
    if (invoicePhotos) {
      items_photos = await uploadFilesGetURL(invoicePhotos);
    }
    const newItems = items.map((item) => {
      // eslint-disable-next-line no-unused-vars
      const { id, ...rest } = item;
      return rest;
    });
    const payload = {
      user_name: userName,
      type_invoice: typeInvoice,
      invoice_items: newItems,
      invoice_payments: payments,
      invoice_total,
      invoice_payment,
      items_photos,
    };
    await db.invoice_main.create(payload);
    // console.log(response);
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
      <Typography variant="h3">Crear Invoice</Typography>
      <GeneralInfo />
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

export default InvoiceCreate1;
