import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "./input.css";
import { useState } from "react";
import UserForm from "./UserForm";
const Input = ({
  type,
  label,
  value,
  read,
  defaultValue,
  handleChange,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <span className="input-span">
      <label htmlFor="">
        {label}: <sup>*</sup>
      </label>
      {label === "Delivery Type" ? (
        <select style={{ height: "35px" }} onChange={handleChange}>
          <option value="Hand-to-Hand">Hand-to-Hand</option>
          <option value="Epresss">Epresss</option>
          <option value="First-Class">First-Class</option>
          <option value="Special-Handling">Special-Handling</option>
        </select>
      ) : (
        <span style={{ display: "flex" }}>
          <input
            type={type}
            defaultValue={defaultValue}
            readOnly={read}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
          />
          {label === "Customer" ? (
            <>
              <UserForm
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                open={open}
                setOpen={setOpen}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
              />
              <Button variant="contained" onClick={handleClickOpen}>
                <AddIcon />
              </Button>
            </>
          ) : (
            ""
          )}
        </span>
      )}
    </span>
  );
};
export default Input;
