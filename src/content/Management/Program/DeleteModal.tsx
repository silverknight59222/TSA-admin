import PropTypes from 'prop-types';
import * as React from 'react';
import axios from 'axios';
import {
  DialogTitle,
  Dialog,
  DialogActions,
  // DialogContent,
  // DialogContentText,
  Button
} from '@mui/material';
// import { Formik, Field, Form, ErrorMessage, FieldProps } from 'formik';
// import * as Yup from 'yup';
import { successNotification } from '@/utils/notification';
function AddModal(props) {
  const { onClose, id, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleOk = () => {
    axios
      .delete(`/api/program/${id}`)
      .then(async () => {
        onClose();
        successNotification('Successful.');
      })
      .catch((error) => console.log('*******err', error.data));
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{'Are you really delete?'}</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleOk}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
}

AddModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  id: PropTypes.string
};

export default AddModal;
