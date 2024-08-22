import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

export default function CreaTable({
  options_to_select = [],
  search_in_object = "title",
  title_label,
  set_option,
}) {
  const [value, setValue] = useState(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            [search_in_object]: newValue,
          });
          set_option(newValue);
          console.log({ aqui: 12 });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            [search_in_object]: newValue.inputValue,
          });
          set_option(newValue.inputValue);
          console.log({ aqui: 12 });
        } else {
          setValue(newValue);
          set_option(newValue[search_in_object]);
          // console.log({ aqui: 12 });
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === option[search_in_object]
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            [search_in_object]: `Agregar "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={options_to_select}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option[search_in_object];
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            {option[search_in_object]}
          </li>
        );
      }}
      // sx={{ width: 300 }}
      freeSolo
      margin="normal"
      fullWidth
      renderInput={(params) => <TextField {...params} label={title_label} />}
    />
  );
}
