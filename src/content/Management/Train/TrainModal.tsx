import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  Button
} from '@mui/material';

function TrainModal(props) {
  const { setOpen, data, open, id } = props;
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log('sdsssssssssssssssssssss');
    if (open === true) {
      if (data.length) {
      } else {
        axios
          .get(`/api/train/data/${id}`)
          .then(async (res) => {
            res.data.map(async (item) => {
              await axios
                .post('http://54.177.103.247/api/train', item)
                .then(async (res) => {
                  console.log('*************res', res);
                })
                .catch((error) => console.log('*******err', error));
              return;
            });
          })
          .catch((error) => console.log('*******err', error.data));
      }
    }
  }, [open]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="responsive-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
        <CircularProgress />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Disagree
        </Button>
        <Button onClick={handleClose} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

TrainModal.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  data: PropTypes.array,
  id: PropTypes.string
};

export default TrainModal;
