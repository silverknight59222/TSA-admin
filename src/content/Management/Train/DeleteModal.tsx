import PropTypes from 'prop-types';
import * as React from 'react';
import axios from 'axios';
import {
  Slide,
  DialogTitle,
  Dialog,
  DialogActions,
  Button
} from '@mui/material';
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
  const { onClose, id, open, ids } = props;

  const handleClose = () => {
    onClose();
  };

  const handleOk = () => {
    if (id != 0)
      axios
        .delete(`/api/data/${id}`)
        .then(async () => {
          onClose();
          successNotification('Successful.');
        })
        .catch((error) => console.log('*******err', error.data));
    else {
      axios
        .post(`/api/data/deletemany`, { ids: ids })
        .then(async () => {
          onClose();
          successNotification('Successful.');
        })
        .catch((error) => console.log('*******err', error.data));
    }
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
  id: PropTypes.string,
  ids: PropTypes.array
};

export default AddModal;
