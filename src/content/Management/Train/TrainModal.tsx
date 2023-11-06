import PropTypes from 'prop-types';
import { useEffect } from 'react';
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
import { successNotification } from '@/utils/notification';

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
          .post('/api/train', { program_id: id })
          .then((train) => {
            console.log(train);
            axios
              .get(`/api/data/${id}`)
              .then((data) => {
                console.log(data);
                axios
                  .post(
                    'https://api.tradies-success-academy.com/api/train',
                    data
                  )
                  .then(() => {
                    successNotification('The training is started.');
                  })
                  .catch((error) => console.log('*******err', error));
              })
              .catch((error) => console.log('*******err', error));
          })
          .catch((error) => console.log('*******err', error));
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
