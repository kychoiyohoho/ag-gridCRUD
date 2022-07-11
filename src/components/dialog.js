import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
export default function FormDialog({ open, handleClose, data,onChange,handleFormSubmit }) {
  const { id,name, email, phone, dob } = data;
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {id?"Update user":"Create new User"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              value={name}
              onChange={e =>onChange(e)}
              id="name"
              placeholder="Enter name"
              variant="standard"
              margin="dense"
              label="Name"
              fullWidth
            />
            <TextField
              value={email}
              onChange={e =>onChange(e)}
              id="email"
              placeholder="Enter email"
              variant="standard"
              label="Email"
              margin="dense"
              fullWidth
            />
            <TextField
              value={phone}
              onChange={e =>onChange(e)}
              id="phone"
              placeholder="Enter phone number"
              variant="standard"
              label="Phone Number"
              margin="dense"
              fullWidth
            />
            <TextField
              value={dob}
              onChange={e =>onChange(e)}
              id="dob"
              placeholder="Enter Date of birth"
              variant="standard"
              label="Date of Birth"
              margin="dense"
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button color="primary" onClick={()=>handleFormSubmit()} variant="contained">
           {id?"Update":"Submit"} 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
