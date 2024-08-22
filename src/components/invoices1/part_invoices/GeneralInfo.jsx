import { Select, MenuItem, Typography } from "@mui/material";
import useInvoiceStore from "../store/store";
import CreaTable from "../../mui/CreaTable";
const GeneralInfo = ({ users }) => {
  const { typeInvoice, setUserName, setTypeInvoice, userName } =
    useInvoiceStore();
  // console.log(userName);

  return (
    <>
      <Typography variant="h4">Información general</Typography>
      <CreaTable
        options_to_select={users}
        search_in_object="user_name"
        title_label="Nombre del usuario / Cliente"
        set_option={setUserName}
      />

      <Select
        margin="dense"
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
