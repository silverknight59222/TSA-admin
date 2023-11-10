import PropTypes from 'prop-types';
import { Box, DialogTitle, Dialog, DialogContent } from '@mui/material';

function DetailModal(props) {
  const { onClose, data, open } = props;

  const handleClose = () => {
    onClose();
  };

  const showTime = (time) => {
    const date = new Date(time * 1000);
    const formattedDate =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2) +
      ' ' +
      ('0' + date.getHours()).slice(-2) +
      ':' +
      ('0' + date.getMinutes()).slice(-2) +
      ':' +
      ('0' + date.getSeconds()).slice(-2);
    return formattedDate;
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>View</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" marginBottom={'15px'}>
          <div style={{ fontSize: '16px' }}>Name:</div>
          <div
            style={{
              fontSize: '16px',
              marginLeft: '40px'
            }}
          >
            {data.username}
          </div>
        </Box>
        <Box display="flex" marginBottom={'15px'}>
          <div style={{ fontSize: '16px' }}>Time:</div>
          <div
            style={{
              fontSize: '16px',
              marginLeft: '45px'
            }}
          >
            {showTime(data.time)}
          </div>
        </Box>
        <Box display="flex">
          <div style={{ fontSize: '16px' }}>Message:</div>
          <text
            style={{
              fontSize: '16px',
              marginLeft: '15px'
            }}
          >
            {data.content}
          </text>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

DetailModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  data: PropTypes.object
};

export default DetailModal;
