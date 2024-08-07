// PaymentList.js
import {
  List,
  ListItem,
  TextField,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import useInvoiceStore from "./store/store";

const PaymentList = () => {
  const { payments, setPayments, addPayment, removePayment } =
    useInvoiceStore();

  const handlePaymentChange = (index, field, value) => {
    const newPayments = [...payments];
    newPayments[index][field] = field === "payment" ? parseFloat(value) : value;
    setPayments(newPayments);
  };

  return (
    <>
      <Typography variant="h4">Detalles de Pagos</Typography>
      <List>
        {payments.map((payment, index) => (
          <ListItem key={index}>
            <TextField
              label="Como se paga"
              value={payment.how_payed}
              onChange={(e) =>
                handlePaymentChange(index, "how_payed", e.target.value)
              }
              style={{ marginRight: "10px" }}
            />
            <TextField
              label="Quien recibe"
              value={payment.who_received}
              onChange={(e) =>
                handlePaymentChange(index, "who_received", e.target.value)
              }
              style={{ marginRight: "10px" }}
            />
            <TextField
              label="Cantidad"
              type="number"
              value={payment.payment}
              onChange={(e) =>
                handlePaymentChange(
                  index,
                  "payment",
                  parseFloat(e.target.value)
                )
              }
              inputProps={{
                step: 0.001,
                min: -999999999.999,
                max: 999999999.999,
              }}
            />
            <IconButton onClick={() => removePayment(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button startIcon={<AddIcon />} onClick={addPayment}>
        Agregar Pago
      </Button>
    </>
  );
};

export default PaymentList;
