import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import { ContextState } from "../../Context";

function SimpleDialog(props) {
  const { setUser } = ContextState();
  const { onClose, selectedValue, open } = props;
  const [mobileNo, setMobileNo] = React.useState("");
  const [userName, setuserName] = React.useState("");
  const [err, setErr] = React.useState("");

  const handleClose = () => {
    onClose(selectedValue);
  };
  // const handleListItemClick = (value) => {
  //   onClose(value);
  // };
  const handleSubmit = async () => {
    if (!mobileNo || !userName) {
      setErr("Please fill All Details");
    } else {
      try {
        const response = await fetch(`http://localhost:7000/api/createUser`, {
          method: "POST",
          body: JSON.stringify({
            userName,
            mobileNo,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        if (response.status === 201) {
          const data = await response.json();
          setUser(`${data.userName} (${data.mobileNo})`);
          handleClose();
        } else if (response.status === 200) {
          setErr("User already Exists");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ color: err ? "red" : "black" }}>
        {err ? err : "Create New User"}
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField
            variant="outlined"
            type="text"
            value={userName}
            label="Enter Your Name"
            onChange={(e) => {
              setErr("");
              setuserName(e.target.value);
            }}
            required
          />
          <ListItemText />
        </ListItem>
        <ListItem>
          <TextField
            variant="outlined"
            label="Enter Mobile Number"
            value={mobileNo}
            type="tel"
            onChange={(e) => {
              setErr("");
              setMobileNo(e.target.value);
            }}
            required
          />
          <ListItemText />
        </ListItem>
        <ListItem>
          <Button variant="contained" onClick={handleSubmit}>
            submit
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function UserForm({
  open,
  selectedValue,
  handleClickOpen,
  handleClose,
}) {
  return (
    <div>
      <br />
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
