import { FC, ChangeEvent, useState, useEffect } from 'react';
// import axios from 'axios';
// import { successNotification } from '@/utils/notification';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
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
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Button,
  InputAdornment,
  TextField
} from '@mui/material';
import { ChatHistoryData } from '@/models/chat_history';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/material/styles';
import DeleteModal from '@/content/Management/Train/DeleteModal';
import React from 'react';

interface ChatHistoryTalbeProps {
  className?: string;
}

const applyPagination = (
  hisotryDatas: ChatHistoryData[],
  page: number,
  limit: number
): ChatHistoryData[] => {
  return hisotryDatas.slice(page * limit, page * limit + limit);
};

const ButtonAdd = styled(Button)(
  ({ theme }) => `
  background: ${theme.colors.primary.dark};
     color: ${theme.palette.success.contrastText};
     height: 50%;
     align-items: center;
     &:hover {
      background: ${theme.colors.primary.main};
   }
    `
);
const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.dark};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.main};
     }
    `
);
const ChatHistoryTable: FC<ChatHistoryTalbeProps> = () => {
  const [selectedHistoryDatas, setSelectedHistoryDatas] = useState<number[]>(
    []
  );
  const [hisotryDatas, setHisotryDatas] = useState([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'training',
      name: 'Training'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e);
    // let value = null;
    // if (e.target.value !== 'all') {
    //   val = e.target.value;
    // }
  };

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
    setLimit(parseInt(event.target.value));
  };

  const paginatedhisotryDatas = applyPagination(hisotryDatas, page, limit);
  const selectedSomehisotryDatas =
    selectedHistoryDatas.length > 0 &&
    selectedHistoryDatas.length < hisotryDatas.length;
  const selectedAllhisotryDatas =
    selectedHistoryDatas.length === hisotryDatas.length;
  const theme = useTheme();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteID, setDeleteID] = useState<string>('0');

  useEffect(() => {
    getList();
  }, [addModalOpen, deleteModalOpen]);

  const getList = () => {
    setHisotryDatas([]);
    // axios
    // .get(`/api/data/${id}`, {
    //   params: { search: searchTerm }
    // })
    // .then((res) => {
    //   setHisotryDatas(res.data);
    // })
    // .catch((error) => console.log('*******err', error.data));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Card style={{ marginTop: '8px' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box
          marginLeft={'10px'}
          style={{ marginLeft: '10px' }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              ),
              onKeyDown: (event) => {
                if (event.key === 'Enter') {
                  getList();
                }
              }
            }}
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <CardHeader
            action={
              <Box width={150}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={'all'}
                    onChange={handleStatusChange}
                    label="Status"
                    autoWidth
                  >
                    {statusOptions.map((statusOption) => (
                      <MenuItem key={statusOption.id} value={statusOption.id}>
                        {statusOption.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            }
            title=""
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
          <ButtonAdd
            sx={{ mr: 1 }}
            startIcon={<AddCircleOutlineIcon />}
            variant="contained"
            onClick={() => setAddModalOpen(true)}
          >
            Add
          </ButtonAdd>
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
              <TableCell align="center">Username</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedhisotryDatas.map((item) => {
              const ishisotryDataselected = selectedHistoryDatas.includes(
                item.id
              );
              return (
                <TableRow hover key={item.id} selected={ishisotryDataselected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={ishisotryDataselected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, item.id)
                      }
                      value={ishisotryDataselected}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip
                      title="Delete"
                      arrow
                      onClick={() => {
                        setDeleteID(item.id.toString());
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
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.username}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.content}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.time}
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
        }}
      />
    </Card>
  );
};

export default ChatHistoryTable;
