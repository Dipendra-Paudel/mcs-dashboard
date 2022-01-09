import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmationDialog({
  message,
  handleClose,
  submitting,
}) {
  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>{message}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton onClick={() => handleClose("ok")} loading={submitting}>
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
