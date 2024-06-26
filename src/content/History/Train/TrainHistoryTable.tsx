import React from 'react';
import { FC, ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  Button,
  TextField
} from '@mui/material';
import { TrainHistoryData } from '@/models/train_history';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { styled } from '@mui/material/styles';
import DeleteModal from './DeleteModal';
import DetailModal from './DetailModal';
import { format } from 'date-fns';

interface TrainHistoryTalbeProps {
  className?: string;
}

const applyPagination = (
  hisotryDatas: TrainHistoryData[],
  page: number,
  limit: number
): TrainHistoryData[] => {
  return hisotryDatas.slice(page * limit, page * limit + limit);
};

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.dark};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.main};
     }
    `
);
const TrainHistoryTable: FC<TrainHistoryTalbeProps> = () => {
  const [selectedHistoryDatas, setSelectedHistoryDatas] = useState<number[]>(
    []
  );
  const [hisotryDatas, setHisotryDatas] = useState([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const handleSelectAllhisotryDatas = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedHistoryDatas(
      event.target.checked
        ? hisotryDatas.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    _event: ChangeEvent<HTMLInputElement>,
    chathistoryID: number
  ): void => {
    if (!selectedHistoryDatas.includes(chathistoryID)) {
      setSelectedHistoryDatas((prevSelected) => [
        ...prevSelected,
        chathistoryID
      ]);
    } else {
      setSelectedHistoryDatas((prevSelected) =>
        prevSelected.filter((id) => id !== chathistoryID)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPage(0);
    setLimit(parseInt(event.target.value));
  };
  const paginatedhisotryDatas = applyPagination(hisotryDatas, page, limit);
  const selectedSomehisotryDatas =
    selectedHistoryDatas.length > 0 &&
    selectedHistoryDatas.length < hisotryDatas.length;
  const selectedAllhisotryDatas =
    selectedHistoryDatas.length === hisotryDatas.length;
  const theme = useTheme();

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteID, setDeleteID] = useState<number>(0);
  const [detailData, setDetailData] = useState({
    id: 0,
    start_at: '',
    completed_at: '',
    created_at: '',
    status: '',
    username: '',
    program_name: ''
  });

  const getList = () => {
    axios
      .get('/api/train', {
        params: { search: searchTerm }
      })
      .then((res) => {
        setHisotryDatas(res.data);
      })
      .catch((error) => console.log('*******err', error.data));
  };

  useEffect(() => {
    getList();
  }, [detailModalOpen, deleteModalOpen]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const showTime = (time) => {
    return time ? format(new Date(time), 'yyyy-MM-dd h:m:s') : null;
  };
  return (
    <Card style={{ marginTop: '8px' }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={'8px'}
      >
        <Box
          marginLeft={'10px'}
          style={{ marginLeft: '10px' }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <TextField
            fullWidth
            size="small"
            InputProps={{
              onKeyDown: (event) => {
                if (event.key === 'Enter') {
                  getList();
                }
              },
              endAdornment: (
                <IconButton
                  type="button"
                  sx={{ p: '10px' }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              )
            }}
            placeholder="Input search text."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <ButtonError
            sx={{ mr: 1 }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
            disabled={selectedHistoryDatas.length ? false : true}
            onClick={() => {
              setDeleteModalOpen(true);
            }}
          >
            Delete
          </ButtonError>
        </Box>
      </Box>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllhisotryDatas}
                  indeterminate={selectedSomehisotryDatas}
                  onChange={handleSelectAllhisotryDatas}
                />
              </TableCell>
              <TableCell align="center">Actions</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">ProgramName</TableCell>
              <TableCell align="center">Start</TableCell>
              <TableCell align="center">End</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedhisotryDatas.map((item) => {
              const ishisotryDataselected = selectedHistoryDatas.includes(
                item.id
              );
              return (
                <TableRow hover key={item.id} selected={ishisotryDataselected}>
                  <TableCell padding="checkbox" size="small">
                    <Checkbox
                      color="primary"
                      checked={ishisotryDataselected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, item.id)
                      }
                      value={ishisotryDataselected}
                    />
                  </TableCell>
                  <TableCell align="center" size="small">
                    <Tooltip
                      title="Detail"
                      arrow
                      onClick={() => {
                        setDetailData(item);
                        setDetailModalOpen(true);
                      }}
                    >
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <RemoveRedEyeIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title="Delete"
                      arrow
                      onClick={() => {
                        setDeleteID(item.id);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center" size="small">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.username}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" size="small">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.program_name}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" size="small">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {showTime(item.start_at)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" size="small">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {showTime(item.completed_at)}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={hisotryDatas.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </Box>
      <DeleteModal
        open={deleteModalOpen}
        id={deleteID}
        ids={selectedHistoryDatas}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedHistoryDatas([]);
        }}
      />
      <DetailModal
        open={detailModalOpen}
        data={detailData}
        onClose={() => {
          setDetailModalOpen(false);
          setSelectedHistoryDatas([]);
          setDetailData({
            id: 0,
            start_at: '',
            completed_at: '',
            created_at: '',
            status: '',
            username: '',
            program_name: ''
          });
        }}
      />
    </Card>
  );
};

export default TrainHistoryTable;
