import PropTypes from 'prop-types';
import {
  Box,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { ProgramData, ProgramDataStatus } from '@/models/program_data';
import Label from '@/components/Label';

function DetailModal(props) {
  const { onClose, data, open } = props;
  const [list, setList] = useState<ProgramData[]>([]);
  const handleClose = () => {
    onClose();
  };
  const [item, setItem] = useState({
    username: '',
    program_name: '',
    start_at: '',
    completed_at: ''
  });

  useEffect(() => {
    if (data.id) {
      axios.get(`/api/train/${data.id}`).then((res) => {
        setList(res.data);
        console.log(res.data);
        setItem(res.data[0]);
      });
    }
  }, [data]);
  useEffect(() => {
    setList([]);
    setItem({ username: '', program_name: '', start_at: '', completed_at: '' });
  }, [open]);

  const showTime = (time) => {
    return time ? format(new Date(time), 'yyyy-MM-dd h:m:s') : null;
  };

  const getStatusLabel = (
    ProgramDataStatus: ProgramDataStatus
  ): JSX.Element => {
    const map = {
      failed: {
        text: 'Failed',
        color: 'error'
      },
      completed: {
        text: 'Completed',
        color: 'success'
      },
      null: {
        text: 'Pending',
        color: 'warning'
      },
      training: {
        text: 'Training',
        color: 'primary'
      }
    };
    const { text, color }: any = map[ProgramDataStatus];
    return <Label color={color}>{text}</Label>;
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>View</DialogTitle>
      <DialogContent dividers>
        <Box justifyContent="space-between" display={'flex'}>
          <Box display="flex" marginBottom={'15px'}>
            <div style={{ fontSize: '16px' }}>Name:</div>
            <div
              style={{
                fontSize: '16px',
                marginLeft: '40px'
              }}
            >
              {item?.username}
            </div>
          </Box>
          <Box display="flex" marginBottom={'15px'}>
            <div style={{ fontSize: '16px' }}>ProgramName:</div>
            <div
              style={{
                fontSize: '16px',
                marginLeft: '45px'
              }}
            >
              {item?.program_name}
            </div>
          </Box>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box display="flex">
            <div style={{ fontSize: '16px' }}>Start:</div>
            <div
              style={{
                fontSize: '16px',
                marginLeft: '15px'
              }}
            >
              {showTime(item?.start_at)}
            </div>
          </Box>
          <Box display="flex">
            <div style={{ fontSize: '16px' }}>End:</div>
            <div
              style={{
                fontSize: '16px',
                marginLeft: '15px'
              }}
            >
              {showTime(item?.completed_at)}
            </div>
          </Box>
        </Box>
        <Table sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" width={'50%'}>
                Module Number
              </TableCell>
              <TableCell align="center" width={'50%'}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item) => {
              return (
                <TableRow hover key={item.dataid}>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.module_num}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {getStatusLabel(item.status)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

DetailModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  data: PropTypes.object
};

export default DetailModal;
