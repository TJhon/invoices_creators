import { TextField, Select, MenuItem, Typography } from "@mui/material";
import useInvoiceStore from "../store/store";

const GeneralInfo = () => {
  const { userName, typeInvoice, setUserName, setTypeInvoice } =
    useInvoiceStore();

  return (
    <>
      <Typography variant="h4">Información general</Typography>
      <TextField
        onChange={(e) => setUserName(e.target.value)}
        fullWidth
        label="Nombre"
        value={userName}
        margin="normal"
      />
      <Select
        value={typeInvoice}
        fullWidth
        onChange={(e) => setTypeInvoice(e.target.value)}
      >
        <MenuItem value="Venta">Venta</MenuItem>
        <MenuItem value="Compra">Compra</MenuItem>
      </Select>
    </>
  );
};

export default GeneralInfo;
