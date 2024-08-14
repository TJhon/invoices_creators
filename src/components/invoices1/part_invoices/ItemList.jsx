// ItemList.js

import {
  List,
  ListItem,
  TextField,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import useInvoiceStore from "../store/store";

const ItemList = () => {
  const { items, updateItem, addItem, removeItem, typeInvoice } =
    useInvoiceStore();

  const handleItemChange = (id, field, value) => {
    updateItem(
      id,
      field,
      field === "item_price" || field === "item_qnt" ? parseFloat(value) : value
    );
  };

  return (
    <>
      <Typography variant="h4">Detalles de {typeInvoice}</Typography>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <TextField
              label="Descripción del producto"
              value={item.item_name}
              required
              onChange={(e) =>
                handleItemChange(item.id, "item_name", e.target.value)
              }
              style={{ marginRight: "10px" }}
            />
            <TextField
              label="Cantidad"
              type="number"
              value={item?.item_qnt}
              onChange={(e) =>
                handleItemChange(
                  item.id,
                  "item_qnt",
                  parseFloat(e.target.value)
                )
              }
              inputProps={{
                step: 0.001,
                min: -999999999.999,
                max: 999999999.999,
              }}
              style={{ marginRight: "10px" }}
            />
            <TextField
              label="Precio"
              type="number"
              value={item?.item_price}
              onChange={(e) =>
                handleItemChange(
                  item.id,
                  "item_price",
                  parseFloat(e.target.value)
                )
              }
              inputProps={{
                step: 0.001,
                min: -999999999.999,
                max: 999999999.999,
              }}
            />
            <Typography>{item.item_price * item.item_qnt || 0}</Typography>

            <IconButton onClick={() => removeItem(item.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button startIcon={<AddIcon />} onClick={addItem}>
        Agregar Ítem
      </Button>
    </>
  );
};

export default ItemList;
