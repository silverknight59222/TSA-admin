import PropTypes from 'prop-types';
import * as React from 'react';
import axios from 'axios';
import {
  Slide,
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
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function AddModal(props) {
  const { onClose, id, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleOk = () => {
    axios
      .delete(`/api/train/data/${id}`)
      .then(async () => {
        onClose();
        successNotification('Successful.');
      })
      .catch((error) => console.log('*******err', error.data));
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
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
